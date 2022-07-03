from datetime import datetime
from sqlmodel import SQLModel


class Analytics(SQLModel):
    id: int | None
    entry_date: datetime | None
    game_id: int #cascade
    index: int 

    