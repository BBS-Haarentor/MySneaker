from types import NoneType
from fastapi import APIRouter, Depends, HTTPException, Request
from app.api.auth.user_auth import base_auth_required, game_owner_check, get_current_active_user, teacher_auth_required
from app.crud.cycle import get_current_cycle_by_user_id, get_cycle_entry_by_id, get_cycles_by_user_id, new_cycle_entry
from app.crud.game import get_game_by_id
from app.crud.user import check_user_in_game
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


@router.post("/teacher/new_entry", status_code=status.HTTP_201_CREATED, response_model=list[Cycle])
async def create_new_cycle_entry_override(cycle_data: CycleCreate, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> list[Cycle]:
    result: int = await new_cycle_entry(cycle_data=cycle_data, session=session)
    result_all = await get_cycles_by_user_id(cycle_data.company_id, session=session)
    all_cycles: list[Cycle] = result_all()
# get for all cycles for user and index
# teacher edit tag? -> cerating user tag

"""
@router.get("/get_by_id/{id}", status_code=status.HTTP_200_OK)
@base_auth_required
async def get_by_id(id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> Cycle:
    result: Cycle | None = await get_cycle_entry_by_id(cycle_id=id, session=session)
    #game_owner_check(user_id=current_user.id, game_id session=session)
    
    participant_check: bool | None = await check_user_in_game(game_id=id, user_id=current_user.id, session=session)
    if not participant_check:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Current User is not in this Game")
    return result
"""


@router.get("/my_cycles", status_code=status.HTTP_200_OK, response_model=list[Cycle])
@base_auth_required
async def my_cycles(current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> list[Cycle]:
    cycle_list: list[Cycle] = await get_cycles_by_user_id(user_id=current_user.id, session=session)
    return cycle_list


@router.get("/get_by_user/{user_id}", status_code=status.HTTP_200_OK)
@teacher_auth_required
async def get_by_id(user_id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> Cycle:
    result: Cycle | None = await get_cycles_by_user_id(user_id=user_id, session=session)
    return result


@router.get("/my_current_cycle", status_code=status.HTTP_200_OK, response_model=Cycle)
@base_auth_required
async def my_current_cycle(current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> Cycle:
    cycle: Cycle = await get_current_cycle_by_user_id(user_id=current_user.id, session=session)
    return cycle
