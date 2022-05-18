

import logging
from types import NoneType
from fastapi import Depends
from sqlmodel import select
from app.db.session import get_async_session
from app.models.dummy import Dummy
from sqlmodel.ext.asyncio.session import AsyncSession

from app.schemas.dummy import DummyPost, DummyPatch


async def create_dummy(dummy_post: DummyPost, session: AsyncSession) -> int:
    new_dummy = Dummy(dumdum=dummy_post)
    session.add(new_dummy)
    await session.commit()
    await session.refresh(new_dummy)
    logging.info(f"created new Dummy with id: {new_dummy.id}")
    return new_dummy.id

async def get_single_dummy(id: int, session: AsyncSession) -> Dummy | None:
    result = await session.exec(select(Dummy).where(Dummy.id == id))
    return result.one_or_none()

async def update_dummy(update_data: DummyPatch, session: AsyncSession) -> Dummy | None:
    result = await session.exec(select(Dummy).where(Dummy.id == update_data.id))
    to_be_updated_dummy: Dummy | None = result.one_or_none()
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

async def remove_dummy(id: int, session: AsyncSession) -> bool | None:
    result = await session.exec(select(Dummy).where(Dummy.id == id))
    to_be_deleted: Dummy | None = result.one_or_none()
    if isinstance(to_be_deleted, NoneType):
        return to_be_deleted
    await session.delete(to_be_deleted)
    await session.commit()
    double_check = await session.exec(select(Dummy).where(Dummy.id == id))
    typed_double_check: Dummy | None = double_check.one_or_none()
    if isinstance(typed_double_check, NoneType):
        return True
    else:
        return False