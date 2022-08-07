
from datetime import datetime
from sqlalchemy import Column, ForeignKey, Integer
from sqlmodel import Field
from app.schemas.group import AdminBase, BaseGroupBase, TeacherBase


class BaseGroup(BaseGroupBase, table=True):
    __tablename__ = "basegroup"
    id: int | None = Field(default=None, primary_key=True)
    creation_date: float | None = Field(default=datetime.now().timestamp())
    last_edit: float | None = Field(default=datetime.now().timestamp())
    user_id: int | None = Field(sa_column=Column(Integer, ForeignKey("user.id", onupdate="CASCADE", ondelete="CASCADE")))


class TeacherGroup(TeacherBase, table=True):
    __tablename__ = "teachergroup"
    id: int | None = Field(default=None, primary_key=True)
    creation_date: float | None = Field(default=datetime.now().timestamp())
    last_edit: float | None = Field(default=datetime.now().timestamp())
    user_id: int | None = Field(sa_column=Column(Integer, ForeignKey("user.id", onupdate="CASCADE", ondelete="CASCADE")))


class AdminGroup(AdminBase, table=True):
    __tablename__ = "admingroup"
    id: int | None = Field(default=None, primary_key=True)
    creation_date: float | None = Field(default=datetime.now().timestamp())
    last_edit: float | None = Field(default=datetime.now().timestamp())
    user_id: int | None = Field(sa_column=Column(Integer, ForeignKey("user.id", onupdate="CASCADE", ondelete="CASCADE")))
