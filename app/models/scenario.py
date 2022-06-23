from sqlmodel import Field
from app.schemas.scenario import ScenarioBase


class Scenario(ScenarioBase, table=True):
    __tablename__ = 'scenario'
    id: int | None = Field(default=None, primary_key=True)
    char: str 
    description: str
    sneaker_price: float  = Field(default=20)
    paint_price: float = Field(default=10)
    storage_fee_sneaker: float = Field(default=4.00)
    storage_fee_paint: float = Field(default=1.00)
    storage_fee_finished_sneaker: float = Field(default=8.00)
    employee_count_modifier_temporary: int = Field(default=0)
    employee_count_modifier_permanent: int = Field(default=0)
    factor_interest_rate: float = Field(default=0.04)
    employee_salary: float = Field(default=400)
    employee_signup_bonus: float = Field(default=100.00)
    employee_production_capacity: int = Field(default=10)
    employee_cost_modfier: float = Field(default=0.00)
    machine_purchase_allowed: bool = Field(default=False)
    machine_purchase_cost: float = Field(default=1_000.00)
    sneaker_ask: int = Field(default=400)
    factor_ad_take: float = Field(default=0.1)
    machine_production_capacity: int = Field(default=200)
    machine_employee_max: int = Field(default=10)
    machine_maintainance_cost: float = Field(default=4_000.00)
    production_cost_per_sneaker: float = Field(default=60.00)
