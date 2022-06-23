from datetime import datetime
from sqlalchemy import ForeignKey, Integer
from sqlmodel import Field, UniqueConstraint, Column
from app.schemas.user import UserBase



class User(UserBase, table=True):
    __tablename__ = 'user'
    __table_args__ = (UniqueConstraint("name"),)
    id: int | None = Field(default=None, primary_key=True)
    last_login: datetime | None = Field(datetime.now()) 
    name: str = Field(default=None, index=True)
    email: str | None = Field(default=None)
    hashed_pw: str
    is_active: bool | None = Field(default=False)
    game_id: int | None = Field(sa_column=Column(Integer, ForeignKey("game.id", onupdate="CASCADE", ondelete="CASCADE")))

