
from sqlmodel.ext.asyncio.session import AsyncSession

from app.models.cycle import Cycle






async def get_cycle_by_id(cycle_id: int, session: AsyncSession) -> Cycle:
    raise NotImplementedError