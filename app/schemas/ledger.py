




from app.schemas.base import BaseSchema


class Ledger(BaseSchema):
    game_id: int
    company_id: int
    current_cycle_index: int
    
    