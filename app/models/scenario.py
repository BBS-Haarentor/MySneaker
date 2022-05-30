from sqlmodel import Field
from app.schemas.scenario import ScenarioBase


class Scenario(ScenarioBase, table=True):
    __tablename__ = 'scenario'
    id: int | None = Field(default=None, primary_key=True)
    char: str | None = Field(default=None)
    sneaker_price: float  = Field(default=20)
    paint_price: float = Field(default=10)
    storage_fee_sneaker: float = Field(default=4.00)
    storage_fee_paint: float = Field(default=1.00)
    storage_fee_finished_sneaker: float = Field(default=8.00)
    employee_count_modifier: int = Field(default=0)
    


