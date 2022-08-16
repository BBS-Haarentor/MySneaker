from sqlmodel import SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession
from app.core.config import SETTINGS
from app.db.session import engine
from app.schemas.user import UserPost
from app.crud.groups import add_user_to_admingroup, add_user_to_teachergroup
from app.crud.user import create_user

async def init_db() -> None:
    SQLModel.metadata.create_all(engine)


async def init_async_db() -> None:
    async with engine.begin() as conn:
        """
        COMMENT OUT THE LINE BELOW AFTER FIRST STARTUP.
        OTHERWISE THE DB WILL BE DROPPED ON RESTART.
        """
        #await conn.run_sync(SQLModel.metadata.drop_all)
        await conn.run_sync(SQLModel.metadata.create_all)


async def init_admin(session: AsyncSession) -> int:
    new_admin_user = UserPost(name=SETTINGS.ADMIN_USER_NAME, hashed_pw=SETTINGS.ADMIN_USER_HASHED_PW)
    admin_id: int = await create_user(user_post=new_admin_user, session=session)
    result = await add_user_to_admingroup(user_id=admin_id, session=session)
    
    return admin_id


async def init_teachers(session: AsyncSession) -> list[int]:
    result_list: list[int] = []
    
    new_teacher_1 = UserPost(name=SETTINGS.TEACHER_1_NAME, hashed_pw=SETTINGS.TEACHER_1_HASHED_PW)
    teacher_1_id: int = await create_user(user_post=new_teacher_1, session=session)
    auth_result_1 = await add_user_to_teachergroup(user_id=teacher_1_id, session=session)
    result_list.append(teacher_1_id)
    
    new_teacher_2 = UserPost(name=SETTINGS.TEACHER_2_NAME, hashed_pw=SETTINGS.TEACHER_2_HASHED_PW)
    teacher_2_id: int = await create_user(user_post=new_teacher_2, session=session)
    auth_result_2 = await add_user_to_teachergroup(user_id=teacher_2_id, session=session)
    result_list.append(teacher_2_id)    
    
    new_teacher_3 = UserPost(name=SETTINGS.TEACHER_3_NAME, hashed_pw=SETTINGS.TEACHER_3_HASHED_PW)
    teacher_3_id: int = await create_user(user_post=new_teacher_3, session=session)
    auth_result_3 = await add_user_to_teachergroup(user_id=teacher_3_id, session=session)
    result_list.append(teacher_3_id)    

    return result_list
