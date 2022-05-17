from datetime import datetime
from typing import Optional
from sqlmodel import Column, Integer, Date, SQLModel, Field
from app.schemas.dummy import DummyBase


class Dummy(DummyBase, table=True):
    __tablename__ = 'dummy'
    id: int | None = Field(default=None, primary_key=True)
    date: datetime | None = Field(datetime.now()) 
    dumdum: str