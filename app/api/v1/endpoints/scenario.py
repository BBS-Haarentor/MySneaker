
from fastapi import APIRouter
from starlette import status

router = APIRouter()

@router.get("/", status_code=status.HTTP_200_OK)
async def get_scenario_root():
    return { "HAHA": "scenarioroot hier" }

