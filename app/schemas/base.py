

from datetime import datetime
from sqlmodel import SQLModel


class BaseSchema(SQLModel):
    id: int | None
    creation_date: float | None
    last_edit: float | None
    
    
class ErrorResponse(SQLModel):
    detail: str | None
    user_message: str | None
    