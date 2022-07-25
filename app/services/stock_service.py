from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.models.stock import Stock
from app.repositories.stock_repository import StockRepository




class StockService():

    stock_repo: StockRepository

    
    def __init__(self, session: AsyncSession):
        self.stock_repo = StockRepository(session=session)


        