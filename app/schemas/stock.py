from datetime import datetime
from app.schemas.base import BaseSchema


class StockBase(BaseSchema):
    game_id: int 
    company_id: int
    creation_date: float | None
    current_cycle_index: int 
    sneaker_count: int | None
    paint_count: int | None
    finished_sneaker_count: int | None
    employees_count: int | None
    research_budget: float | None
    account_balance: float | None
    credit_taken: float | None
    real_sales: int | None
    income_from_sales: float | None
    research_production_modifier: float | None
    machine_1_space: int | None
    machine_2_space: int | None
    machine_3_space: int | None
    insolvent: bool | None

    

class StockCreate(StockBase): 
    pass
    
    

