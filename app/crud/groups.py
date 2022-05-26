from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.models.groups import AdminGroup, BaseGroup, TeacherGroup

from app.models.user import User
from app.schemas.group import GroupBase


async def check_user_in_basegroup(session: AsyncSession, user_id: int) -> User | None :
    '''
    checks if a given User is a member of the BaseGroup
    
            Parameters:
                    user_id (int): id of user to be checked
                    session (AsyncSession): FastAPI dependecy-injected session, supplied by route-call

            Returns:
                    validated_user (User) : a User object of the user who is in the Group
                    validated_user (None) : NoneType object if user is not a member of the Group
    '''   
    result = await session.exec(select(User).join(BaseGroup).where(BaseGroup.user_id == user_id))
    validated_user: User | None = result.one_or_none()
    return validated_user

async def check_user_in_teachergroup(session: AsyncSession, user_id: int) -> User | None :
    '''
    checks if a given User is a member of the TeacherGroup
    
            Parameters:
                    user_id (int): id of user to be checked
                    session (AsyncSession): FastAPI dependecy-injected session, supplied by route-call

            Returns:
                    validated_user (User) : a User object of the user who is in the Group
                    validated_user (None) : NoneType object if user is not a member of the Group
    '''   
    result = await session.exec(select(User).join(TeacherGroup).where(TeacherGroup.user_id == user_id))
    validated_user: User | None = result.one_or_none()
    return validated_user

async def check_user_in_admingroup(session: AsyncSession, user_id: int) -> User | None :
    '''
    checks if a given User is a member of the AdminGroup
    
            Parameters:
                    user_id (int): id of user to be checked
                    session (AsyncSession): FastAPI dependecy-injected session, supplied by route-call

            Returns:
                    validated_user (User) : a User object of the user who is in the Group
                    validated_user (None) : NoneType object if user is not a member of the Group
    '''   
    result = await session.exec(select(User).join(AdminGroup).where(AdminGroup.user_id == user_id))
    validated_user: User | None = result.one_or_none()
    return validated_user

# generalized group check
async def check_user_in_group(session: AsyncSession, user_id: int, target_group: GroupBase) -> User | None:
    '''
    checks if a given User is a member of any given group 
    
            Parameters:
                    user_id (int): id of user to be checked
                    session (AsyncSession): FastAPI dependecy-injected session, supplied by route-call
                    target_group (GroupBase): Group object of the the to be checked group -> has to be child of GroupBase

            Returns:
                    validated_user (User) : a User object of the user who is in the Group
                    validated_user (None) : NoneType object if user is not a member of the Group
    '''   
    # parse target_group str into Group
    result = await session.exec(select(User).join(target_group.__class__).where(User.id == user_id))
    validated_user: User | None = result.one_or_none()
    return validated_user


# add to group functions
async def add_user_to_admingroup(session: AsyncSession, user_id: int) -> User | None:
    '''
    adds User to AdminGroup
    
            Parameters:
                    user_id (int): id of user to be added to AdminGroup
                    session (AsyncSession): FastAPI dependecy-injected session, supplied by route-call

            Returns:
                    new_group_entry (AdminGroup) : a User object of the user who is in the Group
    '''   
    new_group_entry = AdminGroup(user_id=user_id)
    session.add(new_group_entry)
    await session.commit()
    await session.refresh(new_group_entry)
    return new_group_entry


async def add_user_to_teachergroup(session: AsyncSession, user_id: int) -> User | None:
    '''
    adds User to TeacherGroup
    
            Parameters:
                    user_id (int): id of user to be added to AdminGroup
                    session (AsyncSession): FastAPI dependecy-injected session, supplied by route-call

            Returns:
                    new_group_entry (TeacherGroup) : a User object of the user who is in the Group
    '''   
    new_group_entry = TeacherGroup(user_id=user_id)
    session.add(new_group_entry)
    await session.commit()
    await session.refresh(new_group_entry)
    return new_group_entry


async def add_user_to_basegroup(session: AsyncSession, user_id: int) -> User | None:
    '''
    adds User to BaseGroup
    
            Parameters:
                    user_id (int): id of user to be added to AdminGroup
                    session (AsyncSession): FastAPI dependecy-injected session, supplied by route-call

            Returns:
                    new_group_entry (BaseGroup) : a User object of the user who is in the Group
    '''   
    new_group_entry = BaseGroup(user_id=user_id)
    session.add(new_group_entry)
    await session.commit()
    await session.refresh(new_group_entry)
    return new_group_entry