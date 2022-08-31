
from datetime import datetime
from types import NoneType
from sqlmodel import SQLModel, select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.exception.general import NotFoundError
from app.schemas.base import BaseSchema

class CRUDRepository():
    
    session: AsyncSession
    type_identifier: BaseSchema

    
    def __init__(self, session: AsyncSession, type_identifier: BaseSchema) -> None:
        self.session = session
        self.type_identifier = type_identifier
    
    
    async def create(self, create_data: BaseSchema) -> int:
        create_data.creation_date = datetime.now().timestamp()
        create_data.last_edit = datetime.now().timestamp()
        entity: BaseSchema = self.type_identifier.__class__.from_orm(create_data)
        self.session.add(entity)
        await self.session.commit()
        await self.session.refresh(entity)
        return entity.id
    
    
    async def read(self, id: int) -> BaseSchema:
        result = await self.session.exec(select(self.type_identifier.__class__).where(self.type_identifier.__class__.id == id))
        entity: BaseSchema = result.one_or_none()
        if isinstance(entity, NoneType):
            raise NotFoundError(entity_id=id, entity_name=self.type_identifier.__class__.__name__ ,detail="Called from CRUD-Repository")
        return entity
                #raise NotFoundError(entity_id=id, detail=f"type_identifier: {self.type_identifier.__class__.__name__}")

    
    async def update(self, update_data: BaseSchema) -> BaseSchema:
        result = await self.session.exec(select(self.type_identifier.__class__).where(self.type_identifier.__class__.id == update_data.id))
        entity: BaseSchema = result.one_or_none()
        update_data_dict = update_data.dict(exclude_unset=True)
        for key, value in update_data_dict.items():
            setattr(entity, key, value)
        setattr(entity, 'last_edit', datetime.now().timestamp())
        self.session.add(entity)
        await self.session.commit()
        await self.session.refresh(entity)
        return entity
    
        
    async def delete(self, id: int) -> None:
        result = await self.session.exec(select(self.type_identifier.__class__).where(self.type_identifier.__class__.id == id))
        entity = result.one_or_none()
        if isinstance(entity, NoneType):
            raise NotFoundError(entity_id=id, entity_name=self.type_identifier.__class__.__name__ ,detail="Called from CRUD-Repository")
        await self.session.delete(entity)
        await self.session.commit()
        await self.session.flush()
        return None
