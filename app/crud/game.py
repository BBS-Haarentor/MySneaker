

import logging
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.models.game import Game
from app.schemas.game import GameCreate, GameInit


async def create_game(new_game_data: GameInit, session: AsyncSession) -> int:
    new_dummy = Game(new_game_data)
    session.add(new_dummy)
    await session.commit()
    await session.refresh(new_dummy)
    logging.info(f"created new Dummy with id: {new_dummy.id}")
    return new_dummy.id


async def get_game_by_id(id: int, session: AsyncSession) -> Game | None:
    result = await session.exec(select(Game).where(Game.id == id))
    return result.one_or_none()


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

async def start_new_cycle() -> int | None:
    raise NotImplementedError

