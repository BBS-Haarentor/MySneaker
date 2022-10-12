from datetime import datetime
from sqlmodel import Field
from app.schemas.game import GameBase


class Game(GameBase, table=True):
    __tablename__ = 'game'
    id: int | None = Field(primary_key=True, index=True)
    creation_date: float | None = Field(default=datetime.now().timestamp())
    last_edit: float | None = Field(default=datetime.now().timestamp())
    grade_name: str = Field(default="None")
    owner_id: int = Field(foreign_key="user.id")
    current_cycle_index: int | None = Field(default=0)
    is_active: bool | None = Field(default=True)
    scenario_order: str | None = Field(default="ABCDEFGHIJ")
    signup_enabled: bool | None = Field(default=True)
