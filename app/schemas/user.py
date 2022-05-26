

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

class UserPostStudent(UserBase):
    name: str
    unhashed_pw: str
    hashed_pw: str | None
    game_id: int
    
class UserPostElevated(UserPostStudent):
    game_id: int | None



class UserPatch(UserBase):
    id: int
    name: str | None
    email: str | None



class UserLogin(UserBase):
    name: str
    hashed_pw: str

class UserResponse(UserBase):
    id: int
    name: str
    last_login: datetime | None
    email: str | None
    is_active: bool | None
    game_id: int | None
