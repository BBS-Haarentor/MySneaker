

from sqlmodel import SQLModel


class GroupBase(SQLModel):
    entry_id: int | None
    user_id: int | None

class AddToGroup(SQLModel):
    user_id: int