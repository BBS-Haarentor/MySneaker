from fastapi import APIRouter, Depends
from app.crud.dummy_repo import Dummy, DummyPost, DummyRepository
from sqlmodel.ext.asyncio.session import AsyncSession
from starlette import status
from app.db.session import get_async_session


router = APIRouter()


@router.get("/")
async def get_dummy_root():
    return {f"Dummy root here"}


@router.get("/get_by_id/{dummy_id}")
async def get_single_dummy_by_id(dummy_id: int, session: AsyncSession = Depends(get_async_session)) -> Dummy:
    repo = DummyRepository(session=session)
    dummy: Dummy = await repo.get_dummy_by_id(dummy_id=dummy_id)
    
    return dummy


@router.post("/new_dummy",status_code=status.HTTP_202_ACCEPTED)
async def post_new_dummy(post_data: DummyPost, session: AsyncSession = Depends(get_async_session)) -> int:
    repo = DummyRepository(session=session)
    new_dummy: Dummy = await repo.add_new_dummy(dummy_data=post_data)
    
    return new_dummy.id

@router.get("/no_dep_get/{dummy_id}", status_code=status.HTTP_200_OK)
async def no_dep_get(dummy_id: int) -> Dummy:
    async with get_async_session() as session:
        repo = DummyRepository(session=session)
        dummy: Dummy = await repo.get_dummy_by_id(dummy_id=dummy_id)
    
        return dummy