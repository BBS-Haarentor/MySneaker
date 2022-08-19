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
        stock: stock = await self.stock_repo.read(id=id)
        return stock


    async def new_stock_entry(self, stock_data: StockCreate) -> int:
        new_stock_id: int = await self.stock_repo.create(create_data=stock_data)
        return new_stock_id


    async def get_stocks_by_user_id(self, user_id: int) -> list[Stock]:
        return self.stock_repo.get_stocks_by_user(user_id=user_id)


    async def get_current_stock_by_user_id(self, user_id: int) -> Stock:
        user: User = await self.user_repo.read(id=user_id)
        game: Game = await self.game_repo.read(id=user.game_id)
        id: int = await self.stock_repo.get_stock_id_by_user_and_index(user_id=user_id, index=game.current_cycle_index)
        return await self.stock_repo.read(id=id)
    
    
    async def get_stock_by_user_id_and_index(self, user_id: int, index: int) -> Stock:
        id: int = await self.stock_repo.get_stock_id_by_user_and_index(user_id=user_id, index=index)
        return await self.stock_repo.read(id=id)