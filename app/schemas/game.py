from datetime import datetime
from sqlmodel import SQLModel


class GameBase(SQLModel):
    id: int | None
    creation_date: datetime | None
    grade_name: str
    owner_id: int | None
    current_cycle_index: int  | None
    is_active: bool | None
    scenario_order: str 
    signup_enabled: bool | None


class GameCreate(GameBase):
    pass


class GamePatch(GameBase):
    id: int
    grade_name: str | None
    owner_id: int | None
    scenario_order: str | None


class GameResponse(GameBase):
    id: int
    grade_name: str
    creation_date: datetime
    owner_id: int
    current_cycle_index: int    
    is_active: bool 
    scenario_order: str 
    signup_enabled: bool

