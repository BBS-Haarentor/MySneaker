

import logging
from types import NoneType
from fastapi import HTTPException
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.crud.scenario import get_scenario_by_char
from app.game_functions.turnover import mock_turnover
from app.models.game import Game
from app.models.scenario import Scenario
from app.models.user import User
from app.models.cycle import Cycle
from app.models.stock import Stock

from app.schemas.game import GameCreate
from starlette import status

async def create_game(new_game_data: GameCreate, session: AsyncSession) -> int:
    '''
    Creates a new game and returns the id of the created game

            Parameters:
                    new_game_data (GameCreate): ORM-Object with creation-data
                    session (AsyncSession): FastAPI dependecy-injected session, supplied by route-call

            Returns:
                    new_game.id (int): New game_id
    '''
    new_game = Game.from_orm(new_game_data)
    #new_game = Game(grade_name=new_game_data.grade_name, owner_id=new_game_data.owner_id, scenario_order=new_game_data.scenario_order)
    session.add(new_game)
    await session.commit()
    await session.refresh(new_game)

    # create first stock entry for games
    
    return new_game.id


async def get_game_by_id(id: int, session: AsyncSession) -> Game | None:
    '''
    Gets game by id

            Parameters:
                    id (int): game_id for to be returned game
                    session (AsyncSession): FastAPI dependecy-injected session, supplied by route-call

            Returns:
                    result (Game): game
    '''
    result = await session.exec(select(Game).where(Game.id == id))
    return result.one_or_none()


async def get_all_game_ids(user_id: int, session: AsyncSession) -> list[int]:
    '''
    Gets all game ids for a user 
    
            Parameters:
                    user_id (int): user_id for which to search for games
                    session (AsyncSession): FastAPI dependecy-injected session, supplied by route-call

            Returns:
                    result (list[int]): List of ids of games owned by user with supplied id
    '''
    ids= await session.exec(select(Game.id).where(Game.owner_id == user_id))
    result: list[int] = ids.all()
    return result


async def toggle_game_state(id: int, session: AsyncSession) -> bool:
    '''
    Toggles game activity status 
    
            Parameters:
                    id (int): game_id which to toggle
                    session (AsyncSession): FastAPI dependecy-injected session, supplied by route-call

            Returns:
                    bool : True if successfully toggled, False if not successful
    '''    
    game: Game | None = await get_game_by_id(id=id, session=session)
    old_status = game.is_active
    game.is_active = not old_status
    session.add(game)
    await session.commit()
    await session.refresh(game)
    return game.is_active


async def turnover_next_cycle(game_id: int, session: AsyncSession) -> int:
    '''
    Initiates turnover calculations for a game
    Starts new cycle by changing game-state and saving stock as basis for new cycle
    
            Parameters:
                    game_id (int): game_id which to turnover
                    session (AsyncSession): FastAPI dependecy-injected session, supplied by route-call

            Returns:
                    game.current_cycle_index (int) : returns increased cycle_index of the game
            
    '''     
    # check if game is active
    game: Game = await get_game_by_id(id=game_id, session=session)
    if game.is_active == False:
        return None
    
    # save new stock entry for end of game cycle
    
    # increase cycle_index by 1
    current_index = game.current_cycle_index
    # last scenario reached?
    if current_index >= len(game.scenario_order) - 1:
        return None

    # get current scenario
    current_scenario: Scenario = await get_scenario_by_char(char=game.scenario_order[current_index], session=session)

    cycle_result = await session.exec(select(Cycle).where(Cycle.current_cycle_index == game.current_cycle_index).where(Cycle.game_id == game.id))
    unsorted_cycle_list: list[Cycle] = cycle_result.all()

    stock_result = await session.exec(select(Stock).where(Stock.current_cycle_index == game.current_cycle_index).where(Stock.game_id == game.id))
    unsorted_stock_list: list[Stock] = stock_result.all()
    
    if (unsorted_cycle_list.size() != unsorted_stock_list.size()): # or unsorted_cycle_list.size() == 0
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="not all users have submitted new cycle data")
    
    # check every user has valid cycle and stock data
    
    # sort cycles by Cycle.sales_bid , lowest first
    
    #unsorted_cycle_list.sort(key=lambda x:Cycle.sales_bid, reverse=True)

    # sort lists TODO: sort
    sorted_stock_list = unsorted_stock_list
    sorted_cycle_list = unsorted_cycle_list
    
    ################################
    # turnover logic here
    new_stocks: list[Stock] = await mock_turnover(scenario=current_scenario, stock_list=sorted_stock_list, cycle_list=sorted_cycle_list)
    #return new_stocks
    # add new stocks to db
    session.add_all(new_stocks)
    await session.commit()
    await session.flush()
    if isinstance(new_stocks[0].id, NoneType):
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="error while adding new Stocks for turnover")
    ################################

    # if all successful then increase index by 1     
    game.current_cycle_index = current_index + 1
    session.add(game)
    await session.commit()
    await session.refresh(game)
    #if game.current_cycle_index == current_index + 1:
    #    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="error while increasing index")
    
    return game.current_cycle_index

async def get_all_user_ids_for_game(game_id: int, session: AsyncSession) -> list[User]:
    game: Game = await get_game_by_id(id=game_id, session=session)
    result = await session.exec(select(User.id).where(User.game_id == game_id))
    user_list = result.all()
    
    return user_list


async def get_all_games_by_owner(user_id: int, session: AsyncSession) -> list[Game]:
    result = await session.exec(select(Game).where(Game.owner_id == user_id))
    return result.all()



async def delete_game_by_id(id: int, session: AsyncSession) -> bool:
    tbd_game: Game = await get_game_by_id(id=id, session=session)
    session.delete(tbd_game)
    await session.commit()
    await session.refresh(tbd_game)
    if isinstance(tbd_game, NoneType):
        return True
    else:
        return False



async def toggle_signup_by_id(id: int, session: AsyncSession) -> bool:
    game: Game = await get_game_by_id(id=id, session=session)
    game.signup_enabled = not game.signup_enabled
    session.add(game)
    await session.commit()
    await session.refresh(game)
    return game.signup_enabled


async def get_current_cycles_by_game_id(id: int, session: AsyncSession) -> list[Cycle]:
    game: Game = await get_game_by_id(id=id, session=session)
    result = await session.exec(select(Cycle).where(Cycle.game_id == game.id).where(Cycle.current_cycle_index == game.current_cycle_index))
    return result.all()

async def get_current_stocks_by_game_id(id: int, session: AsyncSession) -> list[Stock]:
    game: Game = await get_game_by_id(id=id, session=session)
    result = await session.exec(select(Stock).where(Stock.game_id == game.id).where(Stock.current_cycle_index == game.current_cycle_index -1))
    return result.all()
