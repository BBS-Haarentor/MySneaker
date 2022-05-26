




from sqlmodel.ext.asyncio.session import AsyncSession
from app.schemas.stock import StockCreate, StockResponse


async def new_stock_entry(entry_data: StockCreate, session: AsyncSession) -> StockResponse:
    raise NotImplementedError

async def get_stock_entry_by_id(entry_id: int, session: AsyncSession) -> StockResponse:
    raise NotImplementedError

async def get_stock_entries_by_user_id(user_id: int, session: AsyncSession) -> StockResponse:
    raise NotImplementedError

async def get_stock_entries_by_game(game_id: int, session: AsyncSession) -> StockResponse:
    raise NotImplementedError