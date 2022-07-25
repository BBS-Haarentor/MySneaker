from types import NoneType
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.repositories.crud_repository import CRUDRepository, NotFoundError
from app.models.stock import Stock

class StockRepository(CRUDRepository):
        
    def __init__(self, session: AsyncSession):
        super().__init__(session=session, type_identifier=Stock())
        
    async def get_stocks_by_user(self, user_id: int) -> list[Stock]:
        result = await self.session.exec(select(Stock).where(Stock.company_id == user_id))
        stocks: list[Stock] = result.all()
        if len(stocks <= 0):
            raise NotImplementedError
        return stocks
    
    async def get_stocks_by_user_and_index(self, user_id: int, index: int) -> list[Stock]:
        result = await self.session.exec(select(Stock).where(Stock.company_id == user_id).where(Stock.current_cycle_index == index))
        stocks: list[Stock] = result.all()
        if len(stocks <= 0):
            raise NotImplementedError
        return stocks
    
    async def get_newest_stock_by_user_and_index(self, user_id: int, index: int) -> Stock:
        result = await self.session.exec(select(Stock).where(Stock.company_id == user_id).where(Stock.current_cycle_index == index).order_by(Stock.creation_date.desc()))
        stock: Stock | None = result.first()
        if isinstance(stock, NoneType):
            raise NotImplementedError
        return stock
    
    