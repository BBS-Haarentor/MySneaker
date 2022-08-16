from types import NoneType
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.repositories.crud_repository import CRUDRepository, NotFoundError
from app.models.stock import Stock


class StockRepository(CRUDRepository):
    
    
    def __init__(self, session: AsyncSession):
        super().__init__(session=session, type_identifier=Stock())
        
        
    async def get_stock_ids_by_user(self, user_id: int) -> list[int]:
        result = await self.session.exec(select(Stock.id).where(Stock.company_id == user_id).order_by(Stock.creation_date.desc()))
        ids: list[int] = result.all()
        if len(ids <= 0):
            raise StockNotFoundError(entity_id=user_id, detail="")
        return ids
    
    
    async def get_stock_id_by_user_and_index(self, user_id: int, index: int) -> int:
        result = await self.session.exec(select(Stock.id).where(Stock.company_id == user_id).where(Stock.current_cycle_index == index).order_by(Stock.creation_date.desc()))
        id: int | None = result.first()
        if isinstance(id, NoneType):
            raise StockNotFoundError(entity_id=user_id, detail="")
        return id
    
    

class StockNotFoundError(NotFoundError):

    entity_name: str = "Stock"
    def __init__(self, entity_id, detail) -> None:
        super().__init__(entity_id=entity_id, entity_name=self.entity_name, detail=detail)
