
import logging
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.crud.game import get_game_by_id
from app.crud.user import get_user_by_id

from app.models.cycle import Cycle
from app.models.game import Game
from app.models.user import User
from app.schemas.cycle import CycleCreate, CylcePost



async def get_cycle_entry_by_id(cycle_id: int, session: AsyncSession) -> Cycle | None:
    result: Cycle | None = await session.exec(select(Cycle).where(Cycle.id == cycle_id)).one_or_none()
    return result


async def new_cycle_entry(cycle_data: CylcePost, session: AsyncSession) -> int:
    new_cycle = Cycle.from_orm(cycle_data)
    session.add(new_cycle)
    await session.commit()
    await session.refresh(new_cycle)
    logging.info(f"Created new Cycle with ID: {new_cycle.id}")
    return new_cycle.id


async def patch_cycle_entry(cycle_data: CylcePost, session: AsyncSession) -> Cycle:
    cycle: Cycle = await get_cycle_entry_by_id(cycle_id=cycle_data.id, session=session)
    raise NotImplementedError


async def get_cycles_by_user_id(user_id: int, session: AsyncSession):
    result = await session.exec(select(Cycle).where(Cycle.company_id == user_id))
    return result.all()

async def get_current_cycle_by_user_id(user_id: int, session: AsyncSession) -> Cycle | None:
    user: User = await get_user_by_id(id=user_id, session=session)
    game: Game = await get_game_by_id(id=user.game_id , session=session)

    result = await session.exec(select(Cycle).where(Cycle.company_id == user.id).where(Cycle.current_cycle_index == game.current_cycle_index))
    return result.one_or_none()

async def get_cycle_by_user_id_and_index(user_id: int, index: int, session: AsyncSession) -> Cycle | None:
    user: User = await get_user_by_id(id=user_id, session=session)
    game: Game = await get_game_by_id(id=user.game_id , session=session)
    result = await session.exec(select(Cycle).where(Cycle.company_id == user.id).where(Cycle.current_cycle_index == index))
    return result.one_or_none()