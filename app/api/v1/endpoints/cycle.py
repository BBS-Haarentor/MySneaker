from os import stat
from types import NoneType
from fastapi import APIRouter, Depends, HTTPException, Request
from app.crud.cycle import get_cycle_entry_by_id, new_cycle_entry
from app.db.session import get_async_session
from app.models.cycle import Cycle
from app.schemas.cycle import CycleCreate
from starlette import status
from sqlmodel.ext.asyncio.session import AsyncSession


router = APIRouter()


@router.post("/new_entry")
async def create_new_cycle_entry(cycle_data: CycleCreate, session: AsyncSession = Depends(get_async_session)) -> int:
    result: int = await new_cycle_entry(cycle_data=cycle_data, session=session)
    return result

@router.get("/get_by_id/{id}", status_code=status.HTTP_200_OK)
async def get_by_id(id: int, session: AsyncSession = Depends(get_async_session)) -> Cycle:
    result: Cycle | None = await get_cycle_entry_by_id(id=id, session=session)
    return result

