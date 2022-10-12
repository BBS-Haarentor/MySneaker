from fastapi import APIRouter, Depends
from app.api.auth.util import teacher_auth_required, base_auth_required, get_current_active_user
from app.db.session import get_async_session
from app.models.cycle import Cycle
from app.models.user import User
from app.schemas.cycle import CycleCreate
from starlette import status
from sqlmodel.ext.asyncio.session import AsyncSession
from app.services.cycle_service import CycleService


router = APIRouter()


@router.post("/new_entry", status_code=status.HTTP_201_CREATED)
@base_auth_required
async def create_new_cycle_entry(cycle_data: CycleCreate,
                                 current_user: User = Depends(get_current_active_user),
                                 session: AsyncSession = Depends(get_async_session)) -> int:
    cycle_data.company_id = current_user.id
    cycle_service: CycleService = CycleService(session=session)
    cycle_id: int = await cycle_service.new_cycle_entry(cycle_data=cycle_data)
    return cycle_id


@router.post("/teacher/new_entry", status_code=status.HTTP_201_CREATED, response_model=int)
@teacher_auth_required
async def create_new_cycle_entry_override(cycle_data: CycleCreate,
                                          current_user: User = Depends(get_current_active_user),
                                          session: AsyncSession = Depends(get_async_session)) -> int:
    cycle_service: CycleService = CycleService(session=session)
    cycle_id: int = await cycle_service.new_cycle_entry(cycle_data=cycle_data)
    return cycle_id
