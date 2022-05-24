from sqlmodel import Field
from app.schemas.scenario import ScenarioBase


class Scenario(ScenarioBase, table=True):
    __tablename__ = 'scenario'
    id: int | None = Field(default=None, primary_key=True)
    char: str | None = Field(default=None)
    sneaker_price: int 
    paint_price: int



