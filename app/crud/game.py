

import logging
from sqlmodel.ext.asyncio.session import AsyncSession
from app.models.game import Game
from app.schemas.game import GameCreate


async def create_game(dummy_post: GameCreate, session: AsyncSession) -> int:
    new_dummy = Game(dumdum=dummy_post)
    session.add(new_dummy)
    await session.commit()
    await session.refresh(new_dummy)
    logging.info(f"created new Dummy with id: {new_dummy.id}")
    return new_dummy.id
