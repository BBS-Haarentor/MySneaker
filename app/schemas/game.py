from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel

class GameBase(SQLModel):
    id: int | None
    creation_date: datetime | None
    grade_name: str
    owner_id: int 
    current_cycle_id: int | None
    is_active: bool | None
    scenario_order: str | None


class GameCreate(GameBase):
    pass

class GameInit(GameBase):
    grade_name: str
    owner_id: int 
    scenario_order: str | None

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
