
from sqlmodel import Field
from app.schemas.groups import GroupBase


class BaseGroup(GroupBase, table=True):
    __tablename__ = "basegroup"
    user_id: int | None = Field(default=None, primary_key=True, foreign_key="user.id")


class VIPGroup(GroupBase, table=True):
    __tablename__ = "vipgroup"
    user_id: int | None = Field(default=None, primary_key=True, foreign_key="user.id")


class AdminGroup(GroupBase, table=True):
    __tablename__ = "admingroup"
    entry_id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(default=None, foreign_key="user.id")