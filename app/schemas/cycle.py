from datetime import datetime
from sqlmodel import SQLModel

class CycleBase(SQLModel):
    id: int | None
    creation_date: datetime | None
    game_id: int
    company_id: int
    buy_sneaker: int
    buy_paint: int
    Mitarbeiter_Neachste_Periode: int
    Verbesserung_der_Maschienen: float    #Prozente
    Kontostand: float
    Höhe_Kontokorrentkredit: float
    Nachfrage_auf_dem_Markt: int
    Verkauf_Durch_werbung_in_procenten: float

class CycleCreate(CycleBase):
    pass

class CylcePatch(CycleBase):
    id: int
    grade_name: str
    owner_id: int
    current_cycle_id: int
    
