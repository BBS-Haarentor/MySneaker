
import logging
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.models.cycle import Cycle
from app.schemas.cycle import CycleCreate, CylcePost



async def get_cycle_entry_by_id(cycle_id: int, session: AsyncSession) -> Cycle | None:
    result: Cycle | None = await session.exec(select(Cycle).where(Cycle.id == cycle_id)).one_or_none()
    return result

async def new_cycle_entry(cycle_data: CylcePost, session: AsyncSession) -> int:
    new_cycle = Cycle(cycle_data)
    session.add(new_cycle)
    await session.commit()
    await session.refresh(new_cycle)
    logging.info(f"Created new Cycle with ID: {new_cycle.id}")
    return new_cycle.id


async def patch_cycle_entry(cycle_data: CylcePost, session: AsyncSession) -> Cycle:
    cycle: Cycle = await get_cycle_entry_by_id(cycle_id=cycle_data.id, session=session)
    raise NotImplementedError