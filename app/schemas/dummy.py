from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel

class DummyBase(SQLModel):
    id: int | None
    date: datetime | None
    dumdum: str


class DummyPost(DummyBase):
    pass

class DummyPatch(DummyBase):
    id: int
    dumdum: str
    
