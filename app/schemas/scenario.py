from sqlmodel import SQLModel

class ScenarioBase(SQLModel):
    id: int | None
    char: str | None
    sneaker_price: float
    paint_price: float
    storage_fee_sneaker: float
    storage_fee_paint: float
    storage_fee_finished_sneaker: float



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
    
