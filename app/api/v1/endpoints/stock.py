from fastapi import APIRouter, HTTPException
from starlette import status

from app.models.stock import Stock

router = APIRouter()

@router.get("/", status_code=status.HTTP_200_OK)
async def get_scenario_root():
    return { "HAHA": "stockroot hier" }
