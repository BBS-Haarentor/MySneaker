from types import NoneType
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.repositories.crud_repository import CRUDRepository, NotFoundError
from app.models.cycle import Cycle


class CycleRepository(CRUDRepository):
    
    
    def __init__(self, session: AsyncSession):
        super().__init__(session=session, type_identifier=Cycle())
        
    
    async def read_cycle_by_user_and_index(self, user_id: int, index: int) -> Cycle:
        result = await self.session.exec(select(Cycle).where(Cycle.company_id == user_id).where(Cycle.current_cycle_index == index).order_by(Cycle.creation_date.desc()))
        cycle: Cycle | None = result.first()
        if isinstance(cycle, NoneType):
            raise CycleNotFoundError(entity_id=None, detail="Called from CycleRepository")
        return cycle

    async def read_cycle_ids_by_user_and_index(self, user_id: int, index: int) -> list[int]:
        result = await self.session.exec(select(Cycle.id).where(Cycle.company_id == user_id).where(Cycle.current_cycle_index == index))
        ids: list[int] | None = result.all()
        if len(ids) == 0:
            raise CycleNotFoundError(entity_id=None, detail="Called from CycleRepository")
        return ids
    
    async def delete_cycles_after_including_index(self, game_id: int , new_index: int) -> None:
        result = await self.session.exec(select(Cycle).where(Cycle.game_id == game_id).where(Cycle.current_cycle_index >= new_index))
        cycles: list[Cycle] = result.all()
        if len(cycles) == 0:
            raise CycleNotFoundError(entity_id=None, detail="Called from CycleRepository")
        for c in cycles:
            await self.delete(id=c.id)
        return None
        
    
    
class CycleNotFoundError(NotFoundError):

    entity_name: str = "Cycle"
    def __init__(self, entity_id, detail) -> None:
        super().__init__(entity_id=entity_id, entity_name=self.entity_name, detail=detail)
