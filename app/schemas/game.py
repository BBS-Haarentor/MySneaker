from datetime import datetime
from sqlmodel import SQLModel
from app.game_functions.utils import Transaction
from app.models.cycle import Cycle
from app.models.scenario import Scenario
from app.models.stock import Stock

from app.schemas.base import BaseSchema


class GameBase(BaseSchema):
    grade_name: str
    owner_id: int | None
    current_cycle_index: int  | None
    is_active: bool | None
    scenario_order: str 
    signup_enabled: bool | None


class GameCreate(GameBase):
    pass

class GamePost(GameBase):
    grade_name: str
    owner_id: int | None
    current_cycle_index: int  | None
    is_active: bool | None
    scenario_order: str 
    signup_enabled: bool | None

class GamePatch(GameBase):
    id: int
    grade_name: str | None
    owner_id: int | None
    scenario_order: str | None


class GameResponse(GameBase):
    id: int
    grade_name: str
    creation_date: float
    last_edit: float | None
    owner_id: int
    current_cycle_index: int    
    is_active: bool 
    scenario_order: str 
    signup_enabled: bool


class PlayerInfo(SQLModel):
    company_id: int #
    name: str | None #
    index: int | None
    account_balance: float | None  
    credit_taken: float | None  
    income_from_sales: float | None 
    sales_bid: float | None 
    real_sales: int | None 
    insolvent: bool | None  
    turnover_ready: bool | None   
    market_share: float | None 
    
    
class PlayerInfoStudent(SQLModel):
    company_id: int #
    name: str | None #
    index: int | None
    sales_bid: float | None  # 
    real_sales: int | None   #
    market_share: float | None    #


class Summary(SQLModel):
    cycle: Cycle | None
    stock: Stock | None
    scenario: Scenario | None
    gameFinished: bool | None


class GameFinishStudent:
    stocks: list[Stock] | None
    place: int | None


class TurnoverDetailsPlayer(SQLModel):
    company_id: int
    # company_name: str
    index: int
    game_id: int
    
    stock: Stock
    ledger: list
    