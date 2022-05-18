

from datetime import datetime
from sqlmodel import SQLModel

class UserBase(SQLModel):
    id: int | None
    name: str
    last_login: datetime | None
    email: str | None
    hashed_pw: str
    is_active: bool | None
    game_id: int | None

class UserPost(UserBase):
    pass


class UserPatch(UserBase):
    id: int | None
    name: str | None
    change_name: str | None
    change_email: str | None
    change_roles: int | None


class UserLogin(UserBase):
    name: str
    hashed_pw: str

