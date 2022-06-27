from datetime import datetime
from sqlalchemy import Column, ForeignKey, Integer
from sqlmodel import Field
from app.schemas.cycle import CycleBase


class Cycle(CycleBase, table=True):
    __tablename__ = 'cycle'
    id: int | None = Field(default=None, index=True, primary_key=True)
    entry_date: datetime = Field(datetime.now()) 
    game_id: int | None = Field(sa_column=Column(Integer, ForeignKey("game.id", onupdate="CASCADE", ondelete="CASCADE")))
    company_id: int | None = Field(sa_column=Column(Integer, ForeignKey("user.id", onupdate="CASCADE", ondelete="CASCADE")))
    current_cycle_index: int = Field(default=0)
    buy_sneaker: int = Field(default=0)
    buy_paint: int = Field(default=0)
    planned_production_1: int = Field(default=0)
    planned_production_2: int = Field(default=0)
    planned_production_3: int = Field(default=0)
    planned_workers_1: int = Field(default=0)
    planned_workers_2: int = Field(default=0)
    planned_workers_3: int = Field(default=0)
    include_from_stock: int = Field(default=0)
    sales_planned: int = Field(default=0)
    sales_bid: float = Field(default=0.0)
    tender_offer_count: int = Field(default=0)
    tender_offer_price: float = Field(default=0.0)
    research_invest: float = Field(default=0.0)
    ad_invest: float = Field(default=0.0)
    take_credit: float = Field(default=0.0)
    payback_credit: float = Field(default=0.0)
    new_employees: int = Field(default=0)
    buy_new_machine_2: bool = Field(default=False)
    buy_new_machine_3: bool = Field(default=False)