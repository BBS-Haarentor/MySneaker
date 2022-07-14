from types import NoneType
from sqlmodel import SQLModel, select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.exception.general import NotFoundError


class CRUDRepository():
    session: AsyncSession
    entity_type: SQLModel
    
    
    def __init__(self, session: AsyncSession, entity_type: SQLModel):
        self.session = session
        self.entity_type = entity_type
        
        
    async def create(self, create_data: SQLModel):
        raise NotImplementedError
        

    async def read(self, id: int) -> SQLModel:
        result = await self.session.exec(select(self.entity_type.__class__).where(self.entity_type.__class__.id == id))
        entity = result.one_or_none()
        if isinstance(entity, NoneType):
            raise NotFoundError(entity_id=self.entity_type.__class__)
        return entity
    
    
    async def update() -> SQLModel:
        raise NotImplementedError
    
    
    async def delete(self, id: int) -> None:
        result = await self.session.exec(select(self.entity_type.__class__).where(self.entity_type.__class__.id == id))
        entity = result.one_or_none()
        if isinstance(entity, NoneType):
            raise NotFoundError(entity_id=self.entity_type.__class__)
        self.session.delete(entity)
        await self.session.commit()
        return None
    