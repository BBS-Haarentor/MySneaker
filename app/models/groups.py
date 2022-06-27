
from sqlalchemy import Column, ForeignKey, Integer
from sqlmodel import Field
from app.schemas.group import AdminBase, BaseGroupBase, TeacherBase


class BaseGroup(BaseGroupBase, table=True):
    __tablename__ = "basegroup"
    entry_id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(sa_column=Column(Integer, ForeignKey("user.id", onupdate="CASCADE", ondelete="CASCADE")))


class TeacherGroup(TeacherBase, table=True):
    __tablename__ = "teachergroup"
    entry_id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(sa_column=Column(Integer, ForeignKey("user.id", onupdate="CASCADE", ondelete="CASCADE")))


class AdminGroup(AdminBase, table=True):
    __tablename__ = "admingroup"
    entry_id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(sa_column=Column(Integer, ForeignKey("user.id", onupdate="CASCADE", ondelete="CASCADE")))
