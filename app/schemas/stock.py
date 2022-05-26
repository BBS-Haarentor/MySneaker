
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