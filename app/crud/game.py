

import logging
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.models.game import Game
from app.models.user import User
from app.schemas.game import GameCreate


async def create_game(new_game_data: GameCreate, session: AsyncSession) -> int:
    '''
    Creates a new game and returns the id of the created game

            Parameters:
                    new_game_data (GameCreate): ORM-Object with creation-data
                    session (AsyncSession): FastAPI dependecy-injected session, supplied by route-call

            Returns:
                    new_game.id (int): New game_id
    '''
    new_game = Game(grade_name=new_game_data.grade_name, owner_id=new_game_data.owner_id, scenario_order=new_game_data.scenario_order)
    session.add(new_game)
    await session.commit()
    await session.refresh(new_game)
    logging.info(f"created new Dummy with id: {new_game.id}")
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
    if game.is_active is not old_status:
        return True
    return False


async def turnover_next_cycle(game_id: int, session: AsyncSession) -> int | None:
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
    game: Game = await get_game_by_id(id=game_id)
    if game.is_active == False:
        return None
    # increase cycle_index by 1
    current_index = game.current_cycle_index
    # last scenario reached?
    if current_index >= len(game.scenario_order) - 1:
        return None
    game.current_cycle_index = current_index + 1
    session.add(game)
    await session.commit()
    await session.refresh(game)
    if game.current_cycle_index == current_index + 1:
        return game.current_cycle_index
    else:
        return None

async def get_all_user_ids_for_game(game_id: int, session: AsyncSession) -> list[User]:
    game: Game = await get_game_by_id(id=game_id, session=session)
    result = await session.exec(select(User).where(User.game_id == game_id))
    user_list = result.all()
    
    return user_list

async def delete_game() -> bool:
    raise NotImplementedError



