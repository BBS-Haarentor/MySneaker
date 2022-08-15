from sqlmodel import SQLModel

from app.schemas.base import BaseSchema


class GroupBase(BaseSchema):
    user_id: int | None


class AdminBase(GroupBase):
    pass


class TeacherBase(GroupBase):
    pass


class BaseGroupBase(GroupBase):
    pass
