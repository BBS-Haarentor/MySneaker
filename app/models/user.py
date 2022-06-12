from datetime import datetime
from tokenize import String
from typing import List
from sqlmodel import Field, SQLModel, UniqueConstraint, Column, String, ARRAY

from app.core.config import SETTINGS, RolesEnums
from app.schemas.user import UserBase


class User(UserBase, table=True):
    __tablename__ = 'user'
    __table_args__ = (UniqueConstraint("name"),)
    id: int | None = Field(default=None, primary_key=True)
    last_login: datetime | None = Field(datetime.now()) 
    name: str
    email: str | None = Field(default=None)
    hashed_pw: str
    is_active: bool | None = Field(default=False)
    game_id: int | None = Field(default=None)




