
from datetime import datetime
from sqlmodel import SQLModel

# Lager
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
    

class StockCreate(StockBase): 
    pass
    
    
class StockResponse(StockBase): 
    id: int
    game_id: int 
    company_id: int
    creation_date: datetime
    current_cycle_index: int    
    sneaker_count: int
    paint_count: int
    finished_sneaker_count: int
    employees_count: int
    research_budget: float
