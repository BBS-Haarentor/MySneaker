


from datetime import datetime

from sqlmodel import Field
from app.schemas.game import GameBase


class Game(GameBase, table=True):
    __tablename__ = 'game'
    id: int | None = Field(default=None, primary_key=True)
    creation_date: datetime | None = Field(datetime.now()) 
    grade_name: str | None = Field(default=None)
    owner_id: int | None = Field(default=None, foreign_key="user.id")
    current_cycle_id: int = Field(default=0)
    is_active: bool = Field(default=True)
    scenario_order: str = Field(default="ABCDEFGHIJ")
    signup_enabled: bool
