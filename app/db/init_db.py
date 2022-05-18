import logging
from fastapi import Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import SQLModel
from app.core.config import SETTINGS
from app.crud.user import create_user

from app.db.session import engine, get_async_session
from app.models.user import User
from app.schemas.user import UserPost


async def init_db() -> None:
    SQLModel.metadata.create_all(engine)

async def init_async_db() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.drop_all)
        await conn.run_sync(SQLModel.metadata.create_all)


async def init_admin_user() -> None:
    session:AsyncSession = get_async_session()
    new_admin_user = UserPost(name=SETTINGS.ADMIN_USER_NAME, hashed_pw=SETTINGS.ADMIN_USER_HASHED_PW)
    admin_id: int = await create_user(user_post=new_admin_user, session=session)
    #logging.info(f"{admin_id=}")
    