


from datetime import datetime

from sqlmodel import Field
from app.schemas.cycle import CycleBase


class Cycle(CycleBase, table=True):
    __tablename__ = 'cycle'
    id: int | None = Field(default=None, primary_key=True)
    entry_date: datetime = Field(datetime.now()) 
    game_id: int = Field(foreign_key="game.id")
    company_id: int = Field(foreign_key="user.id")
    buy_sneaker: int
    buy_paint: int

