


from datetime import datetime

from sqlmodel import Field
from app.schemas.cycle import CycleBase


class Cycle(CycleBase, table=True):
    __tablename__ = 'cycle'
    id: int | None = Field(default=None, primary_key=True)
    entry_date: datetime = Field(datetime.now()) 
    game_id: int = Field(foreign_key="game.id")
    company_id: int = Field(foreign_key="user.id") # NutzerID
    buy_sneaker: int = Field(default=0)
    buy_paint: int = Field(default=0)
    planned_production: int = Field(default=0)
