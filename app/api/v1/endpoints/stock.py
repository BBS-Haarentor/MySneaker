from fastapi import APIRouter, Depends
from starlette import status
from sqlmodel.ext.asyncio.session import AsyncSession
from app.api.auth.util import teacher_auth_required, get_current_active_user

from app.crud.stock import new_stock_entry
from app.db.session import get_async_session

from app.models.stock import Stock
from app.models.user import User
from app.schemas.stock import StockCreate
from app.services.user_service import UserService

router = APIRouter()


@router.post("/create", status_code=status.HTTP_201_CREATED, response_model=Stock)
@teacher_auth_required
async def create_stock_entry(stock_data: StockCreate, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> Stock:
    stock_data.company_id = current_user.id
    new_stock: Stock = await new_stock_entry(entry_data=stock_data, session=session)
    
    return new_stock
