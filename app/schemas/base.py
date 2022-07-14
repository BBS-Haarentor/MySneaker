

from datetime import datetime
from sqlmodel import SQLModel


class BaseSchema(SQLModel):
    id: int
    creation_date: datetime
    last_edit: datetime