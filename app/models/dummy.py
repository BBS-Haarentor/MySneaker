from datetime import datetime
from typing import Optional
from sqlalchemy import VARCHAR
from sqlmodel import Column, Integer, Date, SQLModel, Field
from app.schemas.dummy import DummyBase


class Dummy(DummyBase, table=True):
    __tablename__ = 'dummy'
    id: Optional[int] = Field(default=None, primary_key=True)
    date: Optional[datetime] = Field(datetime.now())
    dumdum: str