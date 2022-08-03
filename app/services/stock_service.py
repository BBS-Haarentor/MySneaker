from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.models.game import Game
from app.models.stock import Stock
from app.models.user import User
from app.repositories.game_repository import GameRepository
from app.repositories.stock_repository import StockRepository
from app.repositories.user_repository import UserRepository
from app.schemas.stock import StockCreate




class StockService():

    stock_repo: StockRepository
    user_repo: UserRepository
    game_repo: GameRepository
    
    def __init__(self, session: AsyncSession):
        self.stock_repo = StockRepository(session=session)
        self.user_repo= UserRepository(session=session)
        self.game_repo= GameRepository(session=session)

    async def get_stock_entry_by_id(self, id: int) -> Stock:
        stock: stock = await self.stock_repo.get(id=id)
        return stock


    async def new_stock_entry(self, stock_data: StockCreate) -> int:
        new_stock_id: int = await self.stock_repo.create(create_data=stock_data)
        return new_stock_id


    async def get_stock_by_user_id(self, user_id: int):
        result = await self.session.exec(select(Stock).where(Stock.company_id == user_id))
        stocks: list = result.all()
        if len(stocks) == 0:
            raise StockNotFoundError(entity_id=user_id, type_identifier="User")
        return result.all()

    async def get_current_stock_by_user_id(self, user_id: int) -> Stock:
        
        user: User = await self.user_repo.get(id=user_id)
        game: Game = await self.game_repo.get(id=user.game_id)
        result = await self.session.exec(select(Stock).where(Stock.company_id == user.id).where(Stock.current_cycle_index == game.current_cycle_index).order_by(Stock.creation_date.desc()))
        return result.first()

