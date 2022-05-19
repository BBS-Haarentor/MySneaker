from os import stat
from types import NoneType
from fastapi import APIRouter, Depends, HTTPException, Request
#from sqlmodel import Session
#from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import SQLModel, Session, select
from app.api.auth.api_key_auth import get_api_key
from app.api.auth.user_auth import admin_auth_required, base_auth_required, get_current_active_user, teacher_auth_required
from app.crud.dummy import create_dummy, get_single_dummy, remove_dummy, update_dummy
from app.crud.groups import check_user_in_group
from app.db.session import get_session, get_async_session
from app.models.groups import AdminGroup, TeacherGroup
from app.models.user import User
from app.models.dummy import Dummy
from app.schemas.dummy import DummyPatch, DummyPost
from starlette import status
from sqlmodel import Session as SQLSession
from sqlmodel.ext.asyncio.session import AsyncSession
from fastapi.security.api_key import APIKey

router = APIRouter()

@router.get("/", status_code=status.HTTP_200_OK)
async def get_dummy_root():
    return { "HAHA": "du dummy, dummyroot hier" }

@router.post("/create", status_code=status.HTTP_201_CREATED)
@teacher_auth_required
async def post_new_dummy(dummy_data: DummyPost, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)): #, creating_user: User = Depends(get_current_active_user)
    new_dummy_id = await create_dummy(dummy_post=dummy_data, session=session)
    #new_dummy = Dummy(dumdum=dummy_post)
    #session.add(new_dummy)
    #await session.commit()
    #await session.refresh(new_dummy)
    #logging.info(f"created new Dummy with id: {new_dummy.id}")
    return { f"Dummy created with {new_dummy_id}"}

@router.get("/get_by_id/{id}", status_code=status.HTTP_200_OK)
async def get_dummy_by_id(id: int, session: AsyncSession = Depends(get_async_session)):
    #result = await session.exec(select(Dummy).where(Dummy.id == id))
    #filtered: Dummy = result.one_or_none()
    result = await get_single_dummy(id, session)
    if isinstance(result, NoneType):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    else:
        return result

@router.get("/duf", status_code=status.HTTP_202_ACCEPTED)
@admin_auth_required
async def duf(current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> User | None:
    result: User | None = await check_user_in_group(session=session, user_id=current_user.id, target_group=AdminGroup())

    return result


@router.patch("/patch", status_code=status.HTTP_200_OK)
@admin_auth_required
async def patch_dummy(dummy_data: DummyPatch, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)):
    result = await update_dummy(update_data=dummy_data, session=session)
    return result

@router.delete("/", status_code=status.HTTP_200_OK)
async def delete_dummy(id: int, session: AsyncSession = Depends(get_async_session), api_key: APIKey = Depends(get_api_key)):
    result: bool | None = await remove_dummy(id=id, session=session)
    if isinstance(result, NoneType):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    if result == True:
        return { "success" }
    elif result == False:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
