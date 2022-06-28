from datetime import datetime
from sqlalchemy import Column, ForeignKey, Integer
from sqlmodel import Field
from app.schemas.stock import StockBase


class Stock(StockBase, table=True):
    __tablename__ = 'stock'
    id: int | None = Field(default=None, primary_key=True)
    game_id: int | None = Field(sa_column=Column(Integer, ForeignKey("game.id", onupdate="CASCADE", ondelete="CASCADE")))
    company_id: int | None = Field(sa_column=Column(Integer, ForeignKey("user.id", onupdate="CASCADE", ondelete="CASCADE")))
    creation_date: datetime | None = Field(datetime.now()) 
    current_cycle_index: int = Field(default=0)

    sneaker_count: int = Field(default=0)#
    paint_count: int = Field(default=0)#
    finished_sneaker_count: int = Field(default=0)#
    employees_count: int = Field(default=8)#
    research_budget: float = Field(default=0.0)#
    account_balance: float = Field(default=5000.00)#
    credit_taken: float  = Field(default=0.00)#
    real_sales: int = Field(default=0)#
    income_from_sales: float = Field(default=0.00)#
    research_production_modifier: float = Field(default=0.00)#

    machine_1_space: int = Field(default=1)
    machine_2_space: int = Field(default=0)
    machine_3_space: int = Field(default=0)
    
    
