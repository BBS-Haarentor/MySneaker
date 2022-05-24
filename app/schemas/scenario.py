from sqlmodel import SQLModel

class ScenarioBase(SQLModel):
    id: int | None
    char: str | None
    sneaker_price: float
    paint_price: float



class ScenarioCreate(ScenarioBase):
    pass

class ScenarioPatch(ScenarioBase):
    id: int
    char: str | None
    sneaker_price: float | None
    paint_price: float | None
    
