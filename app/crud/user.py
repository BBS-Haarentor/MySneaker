

from datetime import datetime
import logging
from types import NoneType
from fastapi import Depends, HTTPException
from sqlmodel import or_, select
from app.api.v1.endpoints.game import get_game_by_id
from app.db.session import get_async_session
from app.models.game import Game
from app.models.user import User
from sqlmodel.ext.asyncio.session import AsyncSession
from starlette import status
from app.schemas.user import UserPost, UserPatch


async def create_user(user_post: UserPost, session: AsyncSession) -> int:
    result: Game | None = await get_game_by_id(user_post.game_id)
    if isinstance(result, NoneType):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    if result.signup_enabled == False:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    new_user = User(name=user_post.name, hashed_pw=user_post.hashed_pw)
    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)
    logging.info(f"created new User with id: {new_user.id}")
    return new_user.id

async def get_user_by_id_or_name(id: int | None, name: str | None, session: AsyncSession) -> User | None:
    result = await session.exec(select(User).where(or_(User.id == id, User.name == name)))
    return result.one_or_none()


async def get_user_by_id(id: int, session: AsyncSession) -> User | None:
    result = await session.exec(select(User).where(User.id == id))
    return result.one_or_none()


async def get_user_by_name(search_name: str, session: AsyncSession) -> User | None:
    result = await session.exec(select(User).where(User.name == search_name))
    return result.one_or_none()


async def update_user(update_data: UserPatch, session: AsyncSession) -> User | None:
    raise NotImplementedError
    result = await session.exec(select(User).where(User.id == update_data.id))
    to_be_updated_dummy: User | None = result.one_or_none()
    if isinstance(to_be_updated_dummy, NoneType):
        return to_be_updated_dummy
    to_be_updated_dummy.dumdum = update_data.dumdum
    session.add(to_be_updated_dummy)
    await session.commit()
    await session.refresh(to_be_updated_dummy)
    # check whether update successful
    if to_be_updated_dummy.dumdum == update_data.dumdum:
        return to_be_updated_dummy
    else:
        return None

async def update_last_login(user: User, session: AsyncSession) -> bool:
    now = datetime.now()
    user.last_login = now
    session.add(user)
    await session.commit()
    await session.refresh(user)
    if user.last_login == now:
        return True
    else:
        return False


async def remove_user(id: int, session: AsyncSession) -> bool | None:
    result = await session.exec(select(User).where(User.id == id))
    to_be_deleted: User | None = result.one_or_none()
    if isinstance(to_be_deleted, NoneType):
        return to_be_deleted
    await session.delete(to_be_deleted)
    await session.commit()
    double_check = await session.exec(select(User).where(User.id == id))
    typed_double_check: User | None = double_check.one_or_none()
    if isinstance(typed_double_check, NoneType):
        return True
    else:
        return False