from types import NoneType
from fastapi import APIRouter, Depends, HTTPException, Request
from app.api.auth.util import teacher_auth_required, base_auth_required, get_current_active_user
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

from app.services.cycle_service import CycleService
from app.services.game_service import GameService


router = APIRouter()


@router.post("/new_entry", status_code=status.HTTP_201_CREATED)
@base_auth_required 
async def create_new_cycle_entry(cycle_data: CycleCreate, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> int:
    cycle_data.company_id = current_user.id
    game_service: GameService = GameService(session=session)
    game: Game = await game_service.get_game_by_id(game_id=current_user.game_id)

    #game: Game = await get_game_by_id(id=current_user.game_id, session=session)
    cycle_data.current_cycle_index = game.current_cycle_index
    cycle_data.game_id = game.id
    cycle_service: CycleService = CycleService(session=session)
    cycle_id: int = await cycle_service.new_cycle_entry(cycle_data=cycle_data)
    return cycle_id


@router.post("/teacher/new_entry", status_code=status.HTTP_201_CREATED, response_model=int)
@teacher_auth_required
async def create_new_cycle_entry_override(cycle_data: CycleCreate, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> int:
    cycle_service: CycleService = CycleService(session=session)
    cycle_id: int = await cycle_service.new_cycle_entry(cycle_data=cycle_data)
    return cycle_id

#deprecated?
@router.get("/my_cycles", status_code=status.HTTP_200_OK, response_model=list[Cycle])
@base_auth_required
async def my_cycles(current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> list[Cycle]:
    cycle_service: CycleService = CycleService(session=session)
    cycle_list: list[Cycle] = await cycle_service.get_cycles_by_user_id(user_id=current_user.id)
    #cycle_list: list[Cycle] = await get_cycles_by_user_id(user_id=current_user.id, session=session)
    return cycle_list


@router.get("/get_by_user/{user_id}", status_code=status.HTTP_200_OK)
@teacher_auth_required
async def get_by_id(user_id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> Cycle:
    cycle_service: CycleService = CycleService(session=session)
    cycle: Cycle = await cycle_service.get_current_cycle_by_user_id(user_id=current_user.id)
    return cycle


@router.get("/my_current_cycle", status_code=status.HTTP_200_OK, response_model=Cycle)
@base_auth_required
async def my_current_cycle(current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> Cycle:
    cycle_service: CycleService = CycleService(session=session)
    cycle: Cycle = await cycle_service.get_current_cycle_by_user_id(user_id=current_user.id)
    return cycle
