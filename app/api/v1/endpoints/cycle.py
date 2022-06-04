from types import NoneType
from fastapi import APIRouter, Depends, HTTPException, Request
from app.api.auth.user_auth import base_auth_required, get_current_active_user
from app.crud.cycle import get_current_cycle_by_user_id, get_cycle_entry_by_id, get_cycles_by_user_id, new_cycle_entry, patch_cycle_entry
from app.crud.game import get_game_by_id
from app.db.session import get_async_session
from app.models.cycle import Cycle
from app.models.game import Game
from app.models.user import User
from app.schemas.cycle import CycleCreate
from starlette import status
from sqlmodel.ext.asyncio.session import AsyncSession


router = APIRouter()


@router.post("/new_entry", status_code=status.HTTP_201_CREATED)
@base_auth_required 
async def create_new_cycle_entry(cycle_data: CycleCreate, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> int:
    cycle_data.company_id = current_user.id
    game: Game = await get_game_by_id(id=current_user.game_id, session=session)
    cycle_data.current_cycle_index = game.current_cycle_index
    cycle_data.game_id = game.id
    result: int = await new_cycle_entry(cycle_data=cycle_data, session=session)
    return result

@router.get("/get_by_id/{id}", status_code=status.HTTP_200_OK)
async def get_by_id(id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> Cycle:
    result: Cycle | None = await get_cycle_entry_by_id(id=id, session=session)
    return result

@router.patch("/patch_by_id", status_code=status.HTTP_202_ACCEPTED)
async def patch_by_id(cycle_data: CycleCreate, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> Cycle:
    result: Cycle = await patch_cycle_entry(cycle_data=cycle_data, session=session)
    raise NotImplementedError

@router.get("/my_cycles", status_code=status.HTTP_200_OK, response_model=list[Cycle])
@base_auth_required
async def my_cycles(current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> list[Cycle]:
    cycle_list: list[Cycle] = await get_cycles_by_user_id(user_id=current_user.id, session=session)
    return cycle_list

@router.get("/get_by_user/{user_id}", status_code=status.HTTP_200_OK)
async def get_by_id(id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> Cycle:
    result: Cycle | None = await get_cycle_entry_by_id(id=id, session=session)
    return result

@router.get("/my_current_cycle", status_code=status.HTTP_200_OK, response_model=list[Cycle])
@base_auth_required
async def my_current_cycle(current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> Cycle:
    cycle_list: Cycle = await get_current_cycle_by_user_id(game_id=current_user.game_id, session=session)
    return 