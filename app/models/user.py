from datetime import datetime
from typing import List
from sqlalchemy import ForeignKey, Integer
from sqlmodel import Field, Relationship, SQLModel, UniqueConstraint, Column, String, ARRAY, ForeignKeyConstraint
from sqlalchemy.orm import relationship
from app.core.config import SETTINGS, RolesEnums
from app.models.cycle import Cycle
#from app.models.link_models import UserCycleLink
from app.models.stock import Stock
from app.schemas.cycle import CycleBase
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

