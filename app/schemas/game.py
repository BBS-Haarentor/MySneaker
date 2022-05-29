from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel

class GameBase(SQLModel):
    id: int | None
    creation_date: datetime | None
    grade_name: str
    owner_id: int 
    current_cycle_index: int  | None
    is_active: bool | None
    scenario_order: str 
    signup_enabled: bool | None


class GameCreate(GameBase):
    pass



class GamePatch(GameBase):
    id: int
    grade_name: str
    owner_id: int
    current_cycle_index: int


    
class GameResponse(GameBase):
    id: int
    grade_name: str
    owner_id: int
    current_cycle_index: int
    scenario_order: str 
