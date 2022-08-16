from types import NoneType
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.repositories.crud_repository import CRUDRepository, NotFoundError
from app.models.cycle import Cycle


class CycleRepository(CRUDRepository):
    
    
    def __init__(self, session: AsyncSession):
        super().__init__(session=session, type_identifier=Cycle())
        
    
    async def get_newest_cycle_by_user_and_index(self, user_id: int, index: int) -> Cycle:
        result = await self.session.exec(select(Cycle).where(Cycle.company_id == user_id).where(Cycle.current_cycle_index == index).order_by(Cycle.creation_date.desc()))
        cycle: Cycle | None = result.first()
        if isinstance(cycle, NoneType):
            raise CycleNotFoundError(entity_id=None)
        return cycle


class CycleNotFoundError(NotFoundError):

    entity_name: str = "Cycle"
