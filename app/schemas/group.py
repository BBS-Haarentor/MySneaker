

from sqlmodel import SQLModel


class GroupBase(SQLModel):
    entry_id: int | None
    user_id: int | None

class AddToGroup(SQLModel):
    user_id: int


class AdminBase(GroupBase):
    pass

class TeacherBase(GroupBase):
    pass

class BaseGroupBase(GroupBase):
    pass

