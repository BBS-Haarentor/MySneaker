

from sqlmodel import SQLModel


class GroupBase(SQLModel):
    entry_id: int | None
    user_id: int | None

class AddToGroup(SQLModel):
    user_id: int


class AdminBase(SQLModel):
    entry_id: int | None
    user_id: int | None

class TeacherBase(SQLModel):
    entry_id: int | None
    user_id: int | None
class BaseGroupBase(SQLModel):
    entry_id: int | None
    user_id: int | None

class GroupPatch(SQLModel):
    to_be_patched_user_id: int
    remove_groups: list[str]
    add_groups: list[str]