
from datetime import datetime
from types import NoneType
from sqlmodel import SQLModel, select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.exception.general import NotFoundError
from app.schemas.base import BaseSchema

class CRUDRepository():
    session: AsyncSession
    type_identifier: BaseSchema
    
    def __init__(self, session: AsyncSession, type_identifier: BaseSchema):
        self.session = session
        self.type_identifier = type_identifier
        
        
    async def create(self, create_data: SQLModel) -> int:
        create_data.entry_date = datetime.now().timestamp()
        entity = self.type_identifier.__class__.from_orm(create_data)
        self.session.add(entity)
        await self.session.commit()
        await self.session.refresh(entity)
        return entity.id
    
    async def get(self, id: int) -> BaseSchema:
        result = await self.session.exec(select(self.type_identifier.__class__).where(self.type_identifier.__class__.id == id))
        entity: SQLModel = result.one_or_none()
        if isinstance(entity, NoneType):
            raise NotFoundError(entity_id=id, type_identifier=self.type_identifier.__class__)
        return entity
    
    
    async def update(self, update_data: BaseSchema) -> BaseSchema:
        
        raise NotImplementedError
    
    async def delete(self, id: int) -> None:
        result = await self.session.exec(select(self.type_identifier.__class__).where(self.type_identifier.__class__.id == id))
        entity = result.one_or_none()
        if isinstance(entity, NoneType):
            raise NotFoundError(entity_id=id, type_identifier=self.type_identifier.__class__)
        self.session.delete(entity)
        await self.session.commit()
        await self.session.flush()
        return None