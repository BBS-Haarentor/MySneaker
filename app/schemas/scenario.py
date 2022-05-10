from sqlmodel import SQLModel

class ScenarioBase(SQLModel):
    id: int | None
    sneaker_price: float
    paint_price: float



class ScenarioCreate(ScenarioBase):
    pass

class ScenarioPatch(ScenarioBase):
    id: int
    sneaker_price: float
    paint_price: float
    
