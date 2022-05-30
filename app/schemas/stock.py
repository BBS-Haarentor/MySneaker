
from datetime import datetime
from sqlmodel import SQLModel

# Lager
class StockBase(SQLModel):
    id: int | None
    game_id: int 
    company_id: int
    creation_date: datetime | None
    current_cycle_index: int
    sneaker_count: int
    paint_count: int
    finished_sneaker_count: int
    employees_count: int
    research_budget: float
    account_balance: float
    credit_taken: float
    machine_count: int
    real_sales: int
    income_from_sales: float
    

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
