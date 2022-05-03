from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.models.groups import AdminGroup, BaseGroup, VIPGroup

from app.models.user import User


async def check_user_in_basegroup(session: AsyncSession, user_id: int) -> User | None :
    result = await session.exec(select(User).join(BaseGroup).where(User.id == user_id))
    validated_user: User | None = result.one_or_none()
    return validated_user

async def check_user_in_vipgroup(session: AsyncSession, user_id: int) -> User | None :
    result = await session.exec(select(User).join(VIPGroup).where(User.id == user_id))
    validated_user: User | None = result.one_or_none()
    return validated_user

async def check_user_in_admingroup(session: AsyncSession, user_id: int) -> User | None :
    result = await session.exec(select(User).join(AdminGroup).where(AdminGroup.user_id == user_id))
    validated_user: User | None = result.one_or_none()
    return validated_user


async def check_user_in_group(session: AsyncSession, user_id: int, target_group: BaseGroup) -> User | None:
    # parse target_group str into Group
    result = await session.exec(select(User).join(target_group.__class__).where(User.id == user_id))
    validated_user: User | None = result.one_or_none()
    return validated_user

async def add_user_to_admingroup(session: AsyncSession, user_id: int) -> User | None:
    #result await session.exec(select(User).join(target_group.__class__).where(User.id == user_id))
    new_group_entry = AdminGroup(user_id=user_id)
    session.add(new_group_entry)
    await session.commit()
    await session.refresh(new_group_entry)
    return new_group_entry