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
    planned_production_1: int
    planned_production_2: int
    planned_production_3: int
    planned_workers_1: int
    planned_workers_2: int
    planned_workers_3: int 
    include_from_stock: int
    sales_planned: int
    sales_bid: float
    tender_offer_count: int
    tender_offer_price: float
    research_invest: float
    ad_invest: float
    take_credit: float
    payback_credit: float
    new_employees: int
    buy_new_machine: bool

class CycleCreate(CycleBase):
    pass

class CylcePost(CycleBase):
    game_id: int
    company_id: int
    buy_sneaker: int
    buy_paint: int
    planned_production: int 
    planned_personelle: int
    
class CyclePatch(CycleBase):
    id: int
    buy_sneaker: int
    buy_paint: int
    planned_production: int 
    planned_personelle: int
    planned_production_1: int
    planned_production_2: int
    planned_production_3: int
    planned_workers_1: int
    planned_workers_2: int
    planned_workers_3: int
    sale_from_stock: int
    