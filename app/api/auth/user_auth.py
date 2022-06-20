


from datetime import timedelta, datetime
from functools import wraps
import logging
from types import NoneType
from fastapi import Depends, HTTPException, Request
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.config import SETTINGS, ordered_roles
from app.crud.game import get_game_by_id
from app.crud.groups import add_user_to_admingroup, add_user_to_teachergroup, check_user_in_admingroup, check_user_in_basegroup, check_user_in_teachergroup
from app.crud.user import create_user, get_user_by_name, update_last_login
from app.db.session import get_async_session
from jose import JWTError, jwt
from app.models.game import Game
from app.models.groups import AdminGroup, TeacherGroup

from app.models.user import User
from app.schemas.token import TokenData
from app.schemas.user import UserLogin, UserPost
from fastapi.security import OAuth2PasswordBearer
from starlette import status
from app.core.config import SETTINGS, RolesEnums
from app.api.auth.util import pwd_context, hash_pw



oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/user/login")    



async def authenticate_user(session: AsyncSession, username: str, password: str) -> User | bool :
    # check user exists
    result: User | None = await get_user_by_name(search_name=username, session=session)
    if isinstance(result, NoneType):
        return None
    # check if pw correct
    if not pwd_context.verify(password, result.hashed_pw):
        return False
    else:
        update_login_succeeded = await update_last_login(user=result, session=session)
        if update_login_succeeded:
            return result
        else:
            return False


# function decorator for authentication requirement and check, right now only checking implicitly
def base_auth_required(func):
    @wraps(func)
    async def decorated(*args,**kwargs):
        user: User = kwargs["current_user"]
        role_check = await check_user_in_basegroup(session=kwargs["session"], user_id=user.id)
        role_check_teacher = await check_user_in_teachergroup(session=kwargs["session"], user_id=user.id)
        role_check_admin = await check_user_in_admingroup(session=kwargs["session"], user_id=user.id)
        if not isinstance(role_check, User) and not isinstance(role_check_teacher, User) and not isinstance(role_check_admin, User):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Insufficient Credentials")
        return await func(*args,**kwargs)
    return decorated

def teacher_auth_required(func):
    @wraps(func)
    async def decorated(*args,**kwargs):
        user: User = kwargs["current_user"]
        role_check_teacher = await check_user_in_teachergroup(session=kwargs["session"], user_id=user.id)
        role_check_admin = await check_user_in_admingroup(session=kwargs["session"], user_id=user.id)
        if not isinstance(role_check_teacher, User) and not isinstance(role_check_admin, User):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Insufficient Credentials")
        return await func(*args,**kwargs)
    return decorated

def admin_auth_required(func):
    @wraps(func)
    async def decorated(*args,**kwargs):
        user: User = kwargs["current_user"]
        role_check = await check_user_in_admingroup(session=kwargs["session"], user_id=user.id)
        if not isinstance(role_check, User):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Insufficient Credentials")
        return await func(*args,**kwargs)
    return decorated


async def game_owner_check(user_id: int, game_id: int, session: AsyncSession) -> bool:
    game: Game = await get_game_by_id(id=game_id, session=session)
    
    return game.owner_id == user_id


async def get_current_active_user(token: str = Depends(oauth2_scheme), session: AsyncSession = Depends(get_async_session))-> User | None:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SETTINGS.SECRET_KEY, algorithms=[SETTINGS.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    current_user: User | None = await get_user_by_name(search_name=token_data.username, session=session)
    #user = get_user(fake_users_db, username=token_data.username)
    if isinstance(current_user, NoneType):
        raise credentials_exception
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SETTINGS.SECRET_KEY, algorithm=SETTINGS.ALGORITHM)
    return encoded_jwt

async def init_admin(session: AsyncSession) -> int:
    new_admin_user = UserPost(name=SETTINGS.ADMIN_USER_NAME, hashed_pw=SETTINGS.ADMIN_USER_HASHED_PW)
    admin_id: int = await create_user(user_post=new_admin_user, session=session)
    result = await add_user_to_admingroup(user_id=admin_id, session=session)
    if not isinstance(result, AdminGroup):
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    return admin_id


async def init_teachers(session: AsyncSession) -> list[int]:
    result_list: list[int] = []
    new_teacher_1 = UserPost(name=SETTINGS.TEACHER_1_NAME, hashed_pw=SETTINGS.TEACHER_1_HASHED_PW)
    teacher_1_id: int = await create_user(user_post=new_teacher_1, session=session)
    auth_result_1 = await add_user_to_teachergroup(user_id=teacher_1_id, session=session)
    if isinstance(auth_result_1, TeacherGroup):
        result_list.append(teacher_1_id)
    
    new_teacher_2 = UserPost(name=SETTINGS.TEACHER_2_NAME, hashed_pw=SETTINGS.TEACHER_2_HASHED_PW)
    teacher_2_id: int = await create_user(user_post=new_teacher_2, session=session)
    auth_result_2 = await add_user_to_teachergroup(user_id=teacher_2_id, session=session)
    if isinstance(auth_result_2, TeacherGroup):
        result_list.append(teacher_2_id)    
    
    new_teacher_3 = UserPost(name=SETTINGS.TEACHER_3_NAME, hashed_pw=SETTINGS.TEACHER_3_HASHED_PW)
    teacher_3_id: int = await create_user(user_post=new_teacher_3, session=session)
    auth_result_3 = await add_user_to_teachergroup(user_id=teacher_3_id, session=session)
    if isinstance(auth_result_3, TeacherGroup):
        result_list.append(teacher_3_id)    

    return result_list
