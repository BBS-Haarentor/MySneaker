from datetime import datetime
from sqlmodel import SQLModel


class CompanyBase(SQLModel):
    id: int
    name: str
    signup_date: datetime
    grade: str
    
