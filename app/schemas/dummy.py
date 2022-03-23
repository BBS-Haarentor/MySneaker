from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel

class DummyBase(SQLModel):
    id: int
    date: Optional[datetime]
    dumdum: str

class DummyPost(DummyBase):
    dumdum: str

class DummyUpdate(DummyBase):
    id: int
    dumdum: str