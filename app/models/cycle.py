from datetime import datetime
from pydantic import validator
from sqlalchemy import Column, ForeignKey, Integer
from sqlmodel import Field
from app.schemas.cycle import CycleBase


class Cycle(CycleBase, table=True):
    __tablename__ = 'cycle'
    id: int | None = Field(index=True, primary_key=True)
    creation_date: float | None = Field(default=datetime.now().timestamp())
    last_edit: float | None = Field(default=datetime.now().timestamp())
    game_id: int = Field(sa_column=Column(Integer, ForeignKey("game.id", onupdate="CASCADE", ondelete="CASCADE")))
    company_id: int = Field(sa_column=Column(Integer, ForeignKey("user.id", onupdate="CASCADE", ondelete="CASCADE")))
    current_cycle_index: int | None = Field(default=0)
    
    buy_sneaker: int | None= Field(default=0)
    buy_paint: int | None= Field(default=0)
    planned_production_1: int | None = Field(default=0)
    planned_production_2: int | None = Field(default=0)
    planned_production_3: int | None = Field(default=0)
    planned_workers_1: int | None = Field(default=0)
    planned_workers_2: int | None = Field(default=0)
    planned_workers_3: int | None = Field(default=0)
    include_from_stock: int | None = Field(default=0)
    sales_planned: int | None = Field(default=0)
    sales_bid: float | None = Field(default=0.0)
    tender_offer_price: float | None = Field(default=0.0)
    research_invest: float | None = Field(default=0.0)
    ad_invest: float | None = Field(default=0.0)
    take_credit: float | None = Field(default=0.0)
    payback_credit: float | None = Field(default=0.0)
    new_employees: int | None = Field(default=0)
    let_go_employees: int | None = Field(default=0)
    buy_new_machine: int | None = Field(default=0)
