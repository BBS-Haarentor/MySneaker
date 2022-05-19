from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel

class GameBase(SQLModel):
    id: int | None
    creation_date: datetime | None
    grade_name: str
    owner_id: int
    current_cycle_id: int
    is_active: bool
    scenario_order: str | None

class GameInit(GameBase):
    grade_name: str
    owner_id: int | None
    scenario_order: str | None


class GameCreate(GameBase):
    pass

class GamePatch(GameBase):
    id: int
    grade_name: str
    owner_id: int
    current_cycle_id: int

    
class GameResponse(GameBase):
    id: int
    grade_name: str
    owner_id: int
    current_cycle_id: int
    scenario_order: str 
