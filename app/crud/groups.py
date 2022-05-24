from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.models.groups import AdminGroup, BaseGroup, TeacherGroup

from app.models.user import User
from app.schemas.group import GroupBase


async def check_user_in_basegroup(session: AsyncSession, user_id: int) -> User | None :
    result = await session.exec(select(User).join(BaseGroup).where(BaseGroup.user_id == user_id))
    validated_user: User | None = result.one_or_none()
    return validated_user

async def check_user_in_teachergroup(session: AsyncSession, user_id: int) -> User | None :
    result = await session.exec(select(User).join(TeacherGroup).where(TeacherGroup.user_id == user_id))
    validated_user: User | None = result.one_or_none()
    return validated_user

async def check_user_in_admingroup(session: AsyncSession, user_id: int) -> User | None :
    result = await session.exec(select(User).join(AdminGroup).where(AdminGroup.user_id == user_id))
    validated_user: User | None = result.one_or_none()
    return validated_user

# generalized group check
async def check_user_in_group(session: AsyncSession, user_id: int, target_group: GroupBase) -> User | None:
    # parse target_group str into Group
    result = await session.exec(select(User).join(target_group.__class__).where(User.id == user_id))
    validated_user: User | None = result.one_or_none()
    return validated_user


# add to group functions
async def add_user_to_admingroup(session: AsyncSession, user_id: int) -> User | None:
    new_group_entry = AdminGroup(user_id=user_id)
    session.add(new_group_entry)
    await session.commit()
    await session.refresh(new_group_entry)
    return new_group_entry


async def add_user_to_teachergroup(session: AsyncSession, user_id: int) -> User | None:
    new_group_entry = TeacherGroup(user_id=user_id)
    session.add(new_group_entry)
    await session.commit()
    await session.refresh(new_group_entry)
    return new_group_entry


async def add_user_to_basegroup(session: AsyncSession, user_id: int) -> User | None:
    new_group_entry = BaseGroup(user_id=user_id)
    session.add(new_group_entry)
    await session.commit()
    await session.refresh(new_group_entry)
    return new_group_entry