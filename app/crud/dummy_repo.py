
from pydantic import validator
from sqlmodel import Field, SQLModel, UniqueConstraint, select
from sqlmodel.ext.asyncio.session import AsyncSession


class DummyBase(SQLModel):
    id: int | None
    name: str

class DummyPost(DummyBase):
    pass

class Dummy(DummyBase, table=True):
    __table_args__ = (UniqueConstraint("name"),)
    id: int | None = Field(default=None, primary_key=True)
    name: str
    
    @validator('name')
    def valid_name(cls, name):
        if len(name) < 3:
            raise ValueError("name must be 3 chars or longer")
        return name


class DummyRepository():
    session: AsyncSession
    def __init__(self, session: AsyncSession):
        self.session = session
        
    async def get_dummy_by_id(self, dummy_id: int) -> Dummy:
        result = await self.session.exec(select(Dummy).where(Dummy.id == dummy_id))
        return result.one_or_none()
    
    async def add_new_dummy(self, dummy_data: DummyPost) -> Dummy:
        new_dummy: Dummy = Dummy.from_orm(dummy_data)
        self.session.add(new_dummy)
        await self.session.commit()
        await self.session.refresh(new_dummy)
        return new_dummy


class NotFoundError(Exception):

    entity_name: str

    def __init__(self, entity_id):
        super().__init__(f"{self.entity_name} not found, id: {entity_id}")


class DummyNotFoundError(NotFoundError):

    entity_name: str = "Dummy"