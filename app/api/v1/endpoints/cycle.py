from os import stat
from types import NoneType
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlmodel import SQLModel, Session, select
from app.api.auth.api_key_auth import get_api_key
from app.api.auth.user_auth import admin_auth_required, base_auth_required, get_current_active_user
from app.crud.cycle import get_cycle_by_id, new_cycle_entry
from app.crud.dummy import create_dummy, get_single_dummy, remove_dummy, update_dummy
from app.crud.groups import check_user_in_group
from app.db.session import get_session, get_async_session
from app.models.groups import AdminGroup, TeacherGroup
from app.models.user import User
from app.models.dummy import Dummy
from app.schemas.dummy import DummyPatch, DummyPost
from app.models.cycle import Cycle
from app.schemas.cycle import CycleCreate
from starlette import status
from sqlmodel.ext.asyncio.session import AsyncSession
from fastapi.security.api_key import APIKey


router = APIRouter()


@router.post("/new_entry")
async def create_new_cycle_entry(cycle_data: CycleCreate, session: AsyncSession = Depends(get_async_session)) -> int:
    result: int = await new_cycle_entry(cycle_data=cycle_data, session=session)
    return result

@router.get("/get_by_id/{id}", status_code=status.HTTP_200_OK)
async def get_by_id(id: int, session: AsyncSession = Depends(get_async_session)) -> Cycle:
    result: Cycle | None = await get_cycle_by_id(id=id, session=session)
    return result

