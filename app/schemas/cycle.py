from datetime import datetime
from sqlmodel import SQLModel

class CycleBase(SQLModel):
    id: int | None
    creation_date: datetime | None
    game_id: int
    current_cycle_index: int
    company_id: int
    buy_sneaker: int
    buy_paint: int
    planned_production: int 

class CycleCreate(CycleBase):
    pass

class CylcePost(CycleBase):
    id: int
    current_cycle_index: int
    game_id: int
    company_id: int
    buy_sneaker: int
    buy_paint: int
    planned_production: int 
    planned_personelle: int
    
