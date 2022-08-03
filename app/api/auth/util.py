from datetime import datetime, timedelta
from functools import wraps
from fastapi import Depends, HTTPException
from passlib.context import CryptContext
from app.core.config import SETTINGS
from app.crud.groups import check_user_in_admingroup, check_user_in_basegroup, check_user_in_teachergroup
from app.models.user import User
from starlette import status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from app.repositories.user_repository import UserNotFoundError, UserRepository
from sqlmodel.ext.asyncio.session import AsyncSession
from app.db.session import get_async_session

from app.schemas.token import TokenData

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/user/login")    



def hash_pw(unhashed_pw: str):
    return pwd_context.hash(unhashed_pw)


def create_access_token(self, data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=SETTINGS.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SETTINGS.SECRET_KEY, algorithm=SETTINGS.ALGORITHM)
    return encoded_jwt


async def get_current_active_user(token: str = Depends(oauth2_scheme), session: AsyncSession = Depends(get_async_session))-> User | None:
    user_repo: UserRepository(session=session)
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
    try:
        current_user: User = await user_repo.get_user_by_name(search_name=token_data.username)
    except UserNotFoundError:
        raise credentials_exception
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


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
