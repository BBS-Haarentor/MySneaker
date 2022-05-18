from fastapi import APIRouter, HTTPException
from starlette import status

from app.models.scenario import Scenario

router = APIRouter()

@router.get("/", status_code=status.HTTP_200_OK)
async def get_scenario_root():
    return { "HAHA": "scenarioroot hier" }

@router.get("/get_by_letter/{letter}", status_code=status.HTTP_200_OK)
async def get_scenario_by_letter(letter: str) -> Scenario:
    if len(letter) != 1:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    # crud call
    #return scenariodata
    raise NotImplementedError
    