
from sqlmodel import Field
from app.schemas.group import AdminBase, BaseGroupBase, TeacherBase


class BaseGroup(BaseGroupBase, table=True):
    __tablename__ = "basegroup"
    entry_id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(default=None, primary_key=True, foreign_key="user.id")


class TeacherGroup(TeacherBase, table=True):
    __tablename__ = "teachergroup"
    entry_id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(default=None, primary_key=True, foreign_key="user.id")


class AdminGroup(AdminBase, table=True):
    __tablename__ = "admingroup"
    entry_id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(default=None, foreign_key="user.id")