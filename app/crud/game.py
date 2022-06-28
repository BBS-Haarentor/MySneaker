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
from app.schemas.game import GameCreate, GamePatch
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
                    session (AsyncSession): An asynchronous Session handed down via function call from endpoint

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
    
    if (len(unsorted_cycle_list) != len(unsorted_stock_list)): # or unsorted_cycle_list.size() == 0
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Periode abschließen nicht möglich, da nicht alle Unternehmen ihre Daten eingereicht haben.")
    
    # check every user has valid cycle and stock data
    
    # sort by company_id 
    id_sorted_cycles: list[Cycle] = sorted(unsorted_cycle_list, key= lambda x: x.company_id)
    id_sorted_stocks: list[Stock] = sorted(unsorted_stock_list, key= lambda x: x.company_id)
    # zip the two lists for sorting by feature only given in one list
    zipped = zip(id_sorted_cycles, id_sorted_stocks)
    sorted_zipped = sorted(zipped, key= lambda x: x[0].sales_bid, reverse=True)
    
    tuples = zip(*sorted_zipped)
    
    sorted_cycle_list, sorted_stock_list = [ list(tuple) for tuple in tuples]
    
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

async def get_all_users_for_game(game_id: int, session: AsyncSession) -> list[User]:
    """Function to get all users for a given game id

    Args:
        game_id (int): id parameter of the Game for which the Users are to be returned 
        session (AsyncSession): An asynchronous Session handed down via function call from endpoint

    Returns:
        list[User]: list of Users found for the given game
    """
    game: Game = await get_game_by_id(id=game_id, session=session)
    result = await session.exec(select(User).where(User.game_id == game_id))
    user_list = result.all()
    
    return user_list


async def get_all_games_by_owner(user_id: int, session: AsyncSession) -> list[Game]:
    """Function to find all Games for a Teacher User  

    Args:
        user_id (int): _description_
        session (AsyncSession): An asynchronous Session handed down via function call from endpoint

    Returns:
        list[Game]: _description_
    """
    result = await session.exec(select(Game).where(Game.owner_id == user_id))
    return result.all()



async def delete_game_by_id(id: int, session: AsyncSession) -> bool | None:
    result = await session.exec(select(Game).where(Game.id == id))
    tbd_game: Game = result.one_or_none()
    if isinstance(tbd_game, NoneType):
        return None
    await session.delete(tbd_game)
    await session.commit()
    double_check_result = await session.exec(select(Game).where(Game.id == id))
    double_check = double_check_result.one_or_none()
    if isinstance(double_check, NoneType):
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
    """_summary_

    Args:
        id (int): _description_
        session (AsyncSession): _description_

    Returns:
        list[Cycle]: _description_
    """
    game: Game = await get_game_by_id(id=id, session=session)
    result = await session.exec(select(Cycle).where(Cycle.game_id == game.id).where(Cycle.current_cycle_index == game.current_cycle_index))
    return result.all()

async def get_current_stocks_by_game_id(id: int, session: AsyncSession) -> list[Stock]:
    game: Game = await get_game_by_id(id=id, session=session)
    result = await session.exec(select(Stock).where(Stock.game_id == game.id).where(Stock.current_cycle_index == game.current_cycle_index -1))
    return result.all()



async def set_back_cycle_index(game_id: int, new_index: int, session: AsyncSession) -> int | None:
    result = await session.exec(select(Game).where(Game.id == game_id))
    game: Game | None = result.one_or_none()
    if isinstance(game, NoneType):
        return game
    # check cycle in the past
    if game.current_cycle_index >= new_index:
        return None
    # delete all cycles after new index
    cycle_result = await session.exec(select(Cycle).where(Cycle.game_id == game.id).where(Cycle.current_cycle_index >= new_index))
    cycles: list[Cycle] = cycle_result.all()
    await session.delete(cycles)
    await session.commit()
    # delete all stocks after new index
    stock_result = await session.exec(select(Cycle).where(Cycle.game_id == game.id).where(Cycle.current_cycle_index >= new_index))
    stocks: list[Stock] = stock_result.all()
    await session.delete(stocks)
    await session.commit()
    # setback index on game
    game.current_cycle_index = new_index
    await session.add(game)
    await session.commit()
    await session.refresh(game)
    return game.current_cycle_index


async def get_game_state(game_id: int, session: AsyncSession) -> bool | None:
    result = await session.exec(select(Game).where(Game.id ==game_id))
    game: Game | None = result.one_or_none()
    if isinstance(game, NoneType):
        return game
    else:
        return game.is_active
    
    
async def edit_game(patch_data: GamePatch, session: AsyncSession) -> Game | None:
    result = await session.exec(select(Game).where(Game.id == patch_data.id))
    game: Game | None = result.one_or_none()
    if isinstance(game, NoneType):
        return game
    if not isinstance(patch_data.owner_id, NoneType):
        game.owner_id = patch_data.owner_id
    if not isinstance(patch_data.grade_name, NoneType):
        game.grade_name = patch_data.grade_name
    if not isinstance(patch_data.scenario_order, NoneType):
        game.scenario_order = patch_data.scenario_order
    session.add(game)
    await session.commit()
    await session.refresh(game)
    
    return game