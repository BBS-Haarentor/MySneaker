import logging
from fastapi import Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import SQLModel
from sqlalchemy.orm import declarative_base
from app.core.config import SETTINGS
from app.crud.user import create_user
  
from app.db.session import engine, get_async_session
from app.models.user import User
from app.schemas.user import UserPost


async def init_db() -> None:
    SQLModel.metadata.create_all(engine)


async def init_async_db() -> None:
    async with engine.begin() as conn:
        """
        COMMENT OUT THE LINE BELOW AFTER FIRST STARTUP.
        OTHERWISE THE DB WILL BE DROPPED ON RESTART.
        """
        #await conn.run_sync(SQLModel.metadata.drop_all)
        await conn.run_sync(SQLModel.metadata.create_all)
