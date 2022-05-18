

import logging
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
