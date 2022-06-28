from datetime import datetime
from sqlmodel import SQLModel


class StockBase(SQLModel):
    id: int | None
    game_id: int 
    company_id: int
    creation_date: datetime | None
    current_cycle_index: int 
    sneaker_count: int | None
    paint_count: int | None
    finished_sneaker_count: int | None
    employees_count: int | None
    research_budget: float | None
    account_balance: float | None
    credit_taken: float | None
    machine_1_bought: bool | None
    machine_2_bought: bool | None
    machine_3_bought: bool | None
    real_sales: int | None
    income_from_sales: float | None
    research_production_modifier: float | None
    machine_1_space: int | None
    machine_2_space: int | None
    machine_3_space: int | None

    

class StockCreate(StockBase): 
    pass
    
    

