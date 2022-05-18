
from sqlmodel.ext.asyncio.session import AsyncSession

from app.models.cycle import Cycle



async def start_new_cycle(cycle_id: int, session: AsyncSession) -> int:
    raise NotImplementedError



async def get_cycle_by_id() -> Cycle:
    raise NotImplementedError