
from contextlib import contextmanager
from typing import AsyncGenerator
from fastapi import Depends
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import Session, create_engine

from app.core.config import SETTINGS



sqlite_path = SETTINGS.DATABASE_URL_SQLITE

postgres_async_schema = "postgresql+asyncpg"
sqlite_async_schema = "sqlite+aiosqlite"

postgre_conn_str = f"{postgres_async_schema}://{SETTINGS.DATABASE_USER}:{SETTINGS.DATABASE_PASSWORD}@{SETTINGS.DATABASE_HOST}:{SETTINGS.DATABASE_PORT}/{SETTINGS.DATABASE_NAME}"
sqlite_conn_str = f"{sqlite_async_schema}://{SETTINGS.DATABASE_URL_SQLITE}"

engine_async_postgres = create_async_engine(postgre_conn_str, echo=True, future=True)
engine_async_sqlite = create_async_engine(f"{sqlite_async_schema}://{SETTINGS.DATABASE_URL_SQLITE}", echo=True, future=True)

engine_sqlite = create_engine(f"sqlite://{SETTINGS.DATABASE_URL_SQLITE}", echo=True)



engine = engine_async_sqlite
#engine = engine_async_postgres
async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async_session = sessionmaker(
        engine, class_ = AsyncSession, expire_on_commit=False
    )
    async with async_session() as session:
        try:
            yield session
        finally:
            await session.close()


async def get_session():
    with Session(engine) as session:
        try:
            yield session
        finally:
            session.close()

