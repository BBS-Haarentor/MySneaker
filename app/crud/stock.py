




from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.models.stock import Stock
from app.schemas.stock import StockCreate, StockResponse


async def new_stock_entry(entry_data: StockCreate, session: AsyncSession) -> StockResponse:
    entry: Stock = Stock.from_orm(entry_data)
    session.add(entry)
    await session.commit()
    await session.refresh(entry)
    return entry

async def get_stock_entry_by_id(entry_id: int, session: AsyncSession) -> Stock | None:
    result = await session.exec(select(Stock).where(Stock.id == entry_id))
    entry: Stock | None = result.one_or_none()
    return entry


async def get_stock_entries_by_user_id(user_id: int, session: AsyncSession) -> list[Stock]:
    result = await session.exec(select(Stock).where(Stock.company_id == user_id))
    stock_list: list[Stock] = result.all()
    return stock_list


async def get_stock_entries_by_game(game_id: int, session: AsyncSession) -> list[StockResponse]:
    result = await session.exec(select(Stock).where(Stock.game_id == game_id))
    stock_list: list[Stock] = result.all()
    return stock_list

async def get_stock_entries_by_user_id_and_cycle_id(user_id: int, index: int, session: AsyncSession) -> Stock:
    result = await session.exec(select(Stock).where(Stock.company_id == user_id).where(Stock.current_cycle_index == index))
    stock: Stock = result.one_or_none()
    return stock