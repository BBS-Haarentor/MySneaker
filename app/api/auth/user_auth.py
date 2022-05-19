


from datetime import timedelta, datetime
from functools import wraps
import logging
from types import NoneType
from fastapi import Depends, HTTPException
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.config import SETTINGS
from app.crud.groups import check_user_in_admingroup, check_user_in_basegroup, check_user_in_teachergroup
from app.crud.user import get_user_by_name, update_last_login
from app.db.session import get_async_session
from jose import JWTError, jwt

from app.models.user import User
from app.schemas.token import TokenData
from app.schemas.user import UserLogin
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from starlette import status
from app.core.config import SETTINGS, RolesEnums

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/user/login")

def hash_pw(unhashed_pw: str):
    return pwd_context.hash(unhashed_pw)


async def authenticate_user(session: AsyncSession, username: str, password: str) -> User | bool :
    # check user exists
    result: User | None = await get_user_by_name(search_name=username, session=session)
    if isinstance(result, NoneType):
        return None
    # check if pw correct
    if not pwd_context.verify(password, result.hashed_pw):
        return False
    else:
        return result
    # log newest login for user
    #update_login_succeeded = await update_last_login(user=result, session=session)
    #if update_login_succeeded == True:
    #    return result
    #else:
    #    return False

# function decorator for authentication requirement and check, right now only checking implicitly
def base_auth_required(func):
    @wraps(func)
    async def decorated(current_user: User, session: AsyncSession, *args, **kwargs):
        role_check = await check_user_in_basegroup(session=session, user_id=current_user.id)
        if not isinstance(role_check, User):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Insufficient Credentials")
        return await func(current_user,session,*args,**kwargs)
    return decorated

def teacher_auth_required(func):
    @wraps(func)
    async def decorated(current_user: User, session: AsyncSession, *args, **kwargs):
        role_check = await check_user_in_teachergroup(session=session, user_id=current_user.id)
        if not isinstance(role_check, User):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Insufficient Credentials")
        return await func(current_user,session,*args,**kwargs)
    return decorated

def admin_auth_required(func):
    @wraps(func)
    async def decorated(current_user: User, session: AsyncSession, *args, **kwargs):
        role_check = await check_user_in_admingroup(session=session, user_id=current_user.id)
        if not isinstance(role_check, User):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Insufficient Credentials")
        return await func(current_user,session,*args,**kwargs)
    return decorated





async def get_current_active_user(token: str = Depends(oauth2_scheme), session: AsyncSession = Depends(get_async_session)) -> User | None:
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

def create_role_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SETTINGS.SECRET_KEY, algorithm=SETTINGS.ALGORITHM)
    return encoded_jwt