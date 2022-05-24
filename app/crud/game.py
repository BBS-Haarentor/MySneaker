

import logging
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.models.game import Game
from app.schemas.game import GameCreate


async def create_game(new_game_data: GameCreate, session: AsyncSession) -> int:
    new_game = Game(grade_name=new_game_data.grade_name, owner_id=new_game_data.owner_id, scenario_order=new_game_data.scenario_order)
    
    session.add(new_game)
    await session.commit()
    await session.refresh(new_game)
    logging.info(f"created new Dummy with id: {new_game.id}")
    return new_game.id


async def get_game_by_id(id: int, session: AsyncSession) -> Game | None:
    result = await session.exec(select(Game).where(Game.id == id))
    return result.one_or_none()


async def get_all_game_ids(user_id: int, session: AsyncSession) -> list[int]:
    ids= await session.exec(select(Game.id).where(Game.owner_id == user_id))
    result: list[int] = ids.all()
    return result


async def toggle_game_state(id: int, session: AsyncSession) -> bool:
    game: Game | None = await get_game_by_id(id=id, session=session)
    old_status = game.is_active
    game.is_active = not old_status
    session.add(game)
    await session.commit()
    await session.refresh(game)
    if game.is_active is not old_status:
        return True
    return False

async def start_new_cycle(game_id: int, session: AsyncSession) -> int | None:
    current_game: Game | None = await get_game_by_id(id=game_id, session=session)
    # cycle index or id?
    raise NotImplementedError

async def delete_game() -> bool:
    raise NotImplementedError



