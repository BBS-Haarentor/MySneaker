from datetime import datetime
from pydantic import validator
from sqlalchemy import ForeignKey, Integer
from sqlmodel import Field, UniqueConstraint, Column
from app.schemas.user import UserBase


class User(UserBase, table=True):
    __tablename__ = 'user'
    __table_args__ = (UniqueConstraint("name"),)
    id: int | None = Field(primary_key=True, index=True)
    creation_date: float | None = Field(default=datetime.now().timestamp())
    last_edit: float | None = Field(default=datetime.now().timestamp())
    last_login: float | None = Field(default=datetime.now().timestamp()) 
    name: str = Field(index=True)
    email: str | None = Field(default=None)
    hashed_pw: str
    is_active: bool | None = Field(default=False)
    game_id: int | None = Field(sa_column=Column(Integer, ForeignKey("game.id", onupdate="CASCADE", ondelete="CASCADE")))


    @validator('name')
    def valid_name(cls, name):
        try:
            len(name) >= 3
            return name
        except ValueError:
            raise ValueError("name must be 3 chars or longer")