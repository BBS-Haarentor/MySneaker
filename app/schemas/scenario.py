from sqlmodel import SQLModel

class ScenarioBase(SQLModel):
    id: int | None
    char: str | None
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
    machine_purchase_allowed: bool | None
    machine_purchase_cost: float | None
    sneaker_ask: int | None
    factor_ad_take: float | None
    machine_production_capacity: int | None
    machine_employee_max: int | None
    machine_maintainance_cost: float | None
    production_cost_per_sneaker: float | None


class ScenarioCreate(ScenarioBase):
    pass

class ScenarioPatch(ScenarioBase):
    id: int
    char: str | None
    sneaker_price: float | None
    paint_price: float | None
    storage_fee_sneaker: float | None
    storage_fee_paint: float | None
    storage_fee_finished_sneaker: float | None
    employee_count_modifier: int | None
