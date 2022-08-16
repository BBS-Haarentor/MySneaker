from types import NoneType
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from app.models.user import User
from app.repositories.crud_repository import CRUDRepository
from app.schemas.group import BaseGroupBase
from app.exception.general import NotFoundError

class GroupRepository(CRUDRepository):
    
    
    def __init__(self, session: AsyncSession, group_identifier: BaseGroupBase):
        super().__init__(session=session, type_identifier=group_identifier.__class__())
            
    
    async def check_user_in_group(self, user_id: int, target_group: BaseGroupBase) -> User:
        '''
        checks if a given User is a member of any given group 

                Parameters:
                        user_id (int): id of user to be checked
                        target_group (GroupBase): Group object of the the to be checked group -> has to be child of GroupBase

                Returns:
                        validated_user (User) : a User object of the user who is in the Group
                        validated_user (None) : NoneType object if user is not a member of the Group
        '''   
        result = await self.session.exec(select(User).join(target_group.__class__).where(User.id == user_id))
        validated_user: User | None = result.one_or_none()
        if isinstance(validated_user, NoneType):
            raise GroupNotFoundError(entity_id=user_id, detail=f"relevant group: {target_group.__class__.__name__}")
        return validated_user


    async def add_user_to_group(self, user_id: int, target_group: BaseGroupBase) -> BaseGroupBase:
        new_group_entry = target_group.__class__(user_id=user_id)
        self.session.add(new_group_entry)
        await self.session.commit()
        await self.session.refresh(new_group_entry)
        return new_group_entry


class GroupNotFoundError(NotFoundError):

    entity_name: str = "Group"
    def __init__(self, entity_id, detail) -> None:
        super().__init__(entity_id=entity_id, entity_name=self.entity_name, detail=detail)
