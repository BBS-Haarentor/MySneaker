from fastapi import APIRouter, Depends, HTTPException
from starlette import status
from sqlmodel.ext.asyncio.session import AsyncSession
from app.api.auth.util import teacher_auth_required, base_auth_required, admin_auth_required, get_current_active_user

from app.crud.stock import get_stock_entries_by_user_id, get_stock_entries_by_user_id_and_cycle_id, get_stock_entry_by_user_id_and_cycle_id, new_stock_entry
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

@router.post("/get_by_id/{stock_id}", status_code=status.HTTP_200_OK, response_model=Stock)
@base_auth_required
async def get_stock_by_stock_id(stock_id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> Stock | None:
    #check if owner == user or auth override teacher/admin
    
    # check teacher owner of game with user
    # get game id 
    user_service: UserService = UserService(session=session)
    owner_check = await user_service.game_owner_check(user_id=current_user.id, game_id=current_user.game_id)
    raise NotImplementedError

@router.get("/get_all_my_stocks",status_code=status.HTTP_200_OK, response_model=list[Stock])
@base_auth_required
async def get_all_my_stocks(current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> list[Stock]:
    stock_list: list[Stock] = await get_stock_entries_by_user_id(user_id=current_user.id, session=session)
    return stock_list

@router.get("/get_my_stock_by_index/{index}",status_code=status.HTTP_200_OK, response_model=Stock)
@base_auth_required
async def get_all_my_stocks(index: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> Stock:
    stock: Stock = await get_stock_entry_by_user_id_and_cycle_id(user_id=current_user.id, index=index,  session=session)
    return stock



@router.get("/get_all_by_user/{user_id}", status_code=status.HTTP_200_OK, response_model=list[Stock])
@teacher_auth_required
async def get_stocks_by_user(user_id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> list[Stock]:
    stock_list: list[Stock] = await get_stock_entries_by_user_id(user_id=user_id, session=session)
    return stock_list

@router.get("/get_all_by_user/{user_id}/cycle_index/{index}", status_code=status.HTTP_200_OK, response_model=list[Stock])
@teacher_auth_required
async def get_stocks_by_user_and_index(user_id: int, index: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> list[Stock]:
    stock_list: list[Stock] = await get_stock_entries_by_user_id_and_cycle_id(user_id=user_id, index=index,  session=session)
    return stock_list


@router.patch("/patch_by_id", status_code=status.HTTP_202_ACCEPTED, response_model=Stock)
async def patch_stock_by_id(stock_data: StockCreate, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> Stock:
    raise NotImplementedError 