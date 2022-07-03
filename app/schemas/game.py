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


class PlayerInfo(SQLModel):
    company_id: int
    name: str
    index: int
    account_balance: float
    credit_taken: float
    income: float
    price: float
    sold_sneakers: int
    market_share: float
    turnover_ready: bool
    