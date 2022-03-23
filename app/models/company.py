from datetime import datetime
from typing import Optional

from sqlmodel import Field
from app.schemas.company import CompanyBase

class Company(CompanyBase, table=True):
    __tablename__ = 'companies'
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    signup_date: Optional[datetime] = Field(datetime.now())
    grade: str