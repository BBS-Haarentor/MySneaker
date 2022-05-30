from datetime import datetime

from sqlmodel import Field
from app.schemas.stock import StockBase


class Stock(StockBase, table=True):
    __tablename__ = 'stock'
    id: int | None = Field(default=None, primary_key=True)
    game_id: int = Field(foreign_key="game.id")
    company_id: int = Field(foreign_key="user.id")
    creation_date: datetime | None = Field(datetime.now()) 
    current_cycle_index: int 
    sneaker_count: int = Field(default=0)
    paint_count: int = Field(default=0)
    finished_sneaker_count: int = Field(default=0)
    employees_count: int = Field(default=8)

    
