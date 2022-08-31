from datetime import datetime
from sqlalchemy import Column, ForeignKey, Integer
from sqlmodel import Field
from app.schemas.stock import StockBase


class Stock(StockBase, table=True):
    __tablename__ = 'stock'
    id: int | None = Field(primary_key=True, index=True)
    creation_date: float | None = Field(default=datetime.now().timestamp())
    last_edit: float | None = Field(default=datetime.now().timestamp())
    game_id: int = Field(sa_column=Column(Integer, ForeignKey("game.id", onupdate="CASCADE", ondelete="CASCADE")))
    company_id: int = Field(sa_column=Column(Integer, ForeignKey("user.id", onupdate="CASCADE", ondelete="CASCADE")))
    current_cycle_index: int | None = Field(default=0)

    sneaker_count: int | None = Field(default=0)#
    paint_count: int | None = Field(default=0)#
    finished_sneaker_count: int | None = Field(default=0)#
    employees_count: int | None = Field(default=8)#
    research_budget: float | None = Field(default=0.0)#
    account_balance: float | None = Field(default=50000.00)#
    credit_taken: float | None = Field(default=0.00)#
    real_sales: int | None = Field(default=0)#
    income_from_sales: float | None = Field(default=0.00)#
    research_production_modifier: float | None = Field(default=1.00)#

    machine_1_space: int | None = Field(default=1)
    machine_2_space: int | None = Field(default=0)
    machine_3_space: int | None = Field(default=0)
    insolvent: bool | None = Field(default=False)
    tender_sales: int | None = Field(default=0)
    tender_price: float | None = Field(default=0.0)
