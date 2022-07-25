from datetime import datetime
from sqlmodel import SQLModel

from app.schemas.base import BaseSchema


class ScenarioBase(BaseSchema):
    char: str 
    description: str 
    sneaker_price: float | None
    paint_price: float | None
    storage_fee_sneaker: float | None 
    storage_fee_paint: float  | None
    storage_fee_finished_sneaker: float | None
    employee_count_modifier_temporary: int | None
    employee_count_modifier_permanent: int | None
    factor_interest_rate: float | None
    employee_salary: float | None
    employee_signup_bonus: float  | None
    employee_production_capacity: int | None
    employee_cost_modfier: float | None
    sneaker_ask: int | None
    factor_ad_take: float | None
    tender_offer_count: int | None
    
    machine_purchase_allowed: bool | None
    machine_purchase_cost1: float | None
    machine_purchase_cost2: float | None
    machine_purchase_cost3: float | None
    machine_production_capacity1: int | None
    machine_production_capacity2: int | None
    machine_production_capacity3: int | None
    machine_employee_max: int | None
    machine_maintainance_cost1: float | None
    machine_maintainance_cost2: float | None
    machine_maintainance_cost3: float | None
    production_cost_per_sneaker1: float | None
    production_cost_per_sneaker2: float | None
    production_cost_per_sneaker3: float | None


class ScenarioCreate(ScenarioBase):
    pass


