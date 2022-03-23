
from fastapi import APIRouter, Depends
#from sqlmodel import Session
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import Session, select
from app.db.session import get_session, get_async_session
from app.models.dummy import Dummy
from app.schemas.dummy import DummyUpdate, DummyPost
from starlette import status


router = APIRouter()

@router.get("/", status_code=200)
async def get_dummy_root():
    return { "HAHA": "du dummy, dummyroot hier" }

@router.post("/create", status_code=status.HTTP_201_CREATED)
async def post_new_dummy(new_dummy: Dummy, session : AsyncSession = Depends(get_async_session)):
    session.add(new_dummy)
    await session.commit()
    await session.refresh(new_dummy)
    return { f"Dummy created with {new_dummy.id}"}

@router.get("/get_by_id/{id}", status_code=status.HTTP_200_OK)
async def get_dummy_by_id(id: int, session: AsyncSession = Depends(get_async_session)):
    result = await session.execute(select(Dummy).where(Dummy.id == id))
    return result.scalars().all()

@router.put("/update", status_code=status.HTTP_200_OK)
async def update_dummy(dummy_data: DummyUpdate, session: AsyncSession = Depends(get_async_session)):
    result = await session.execute(select(Dummy).where(Dummy.id == dummy_data.id))
    dummy_entry = result.scalars().one()
    dummy_entry.dumdum = dummy_data.dumdum
    session.add(dummy_entry)
    await session.commit()
    await session.refresh(dummy_entry)
    return dummy_entry