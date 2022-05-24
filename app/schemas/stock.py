
from sqlmodel import SQLModel


class StockBase(SQLModel):
    id: int | None
    cycle_id: int | None
    