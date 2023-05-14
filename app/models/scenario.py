from datetime import datetime
from sqlmodel import Field, UniqueConstraint
from app.schemas.scenario import ScenarioBase


class Scenario(ScenarioBase, table=True):
    __tablename__ = 'scenario'
    __table_args__ = (UniqueConstraint("char"),)
    id: int | None = Field(primary_key=True, index=True)
    creation_date: float  | None = Field(default=datetime.now().timestamp())
    last_edit: float | None = Field(default=datetime.now().timestamp())
    char: str 
    description: str | None 
    sneaker_price: float | None = Field(default=20)
    paint_price: float | None = Field(default=10)
    storage_fee_sneaker: float | None = Field(default=4.00)
    storage_fee_paint: float | None = Field(default=1.00)
    storage_fee_finished_sneaker: float | None = Field(default=8.00)
    employee_count_modifier_temporary: int | None = Field(default=0)
    employee_count_modifier_permanent: int | None = Field(default=0)
    factor_interest_rate: float | None = Field(default=0.04)
    employee_salary: float | None = Field(default=400)
    employee_signup_bonus: float | None = Field(default=100.00)
    employee_production_capacity: int | None = Field(default=20)
    employee_cost_modfier: float | None = Field(default=0.00)
    sneaker_ask: int | None = Field(default=400)
    factor_ad_take: float | None = Field(default=0.1)
    tender_offer_count: int | None = Field(default=0)
    
    machine_purchase_cost1: float | None = Field(default=12_000.00)
    machine_purchase_cost2: float | None = Field(default=25_000.00)
    machine_purchase_cost3: float | None = Field(default=45_000.00)
    machine_production_capacity1: int | None = Field(default=200)
    machine_production_capacity2: int | None = Field(default=500)
    machine_production_capacity3: int | None = Field(default=1_000)
    machine_employee_max: int | None = Field(default=10)
    machine_maintainance_cost1: float | None = Field(default=4_000.00)
    machine_maintainance_cost2: float | None = Field(default=6_000.00)
    machine_maintainance_cost3: float | None = Field(default=8_000.00)
    production_cost_per_sneaker1: float | None = Field(default=60.00)
    production_cost_per_sneaker2: float | None = Field(default=50.00)
    production_cost_per_sneaker3: float | None = Field(default=40.00)
    
    employee_change_allowed: bool | None = Field(default=True)
    machine_purchase_allowed: bool | None = Field(default=False)

    research_allowed: bool | None = Field(default=True)
    advertisement_allowed: bool | None = Field(default=True)
