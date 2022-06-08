from fastapi import APIRouter, Body, Depends, HTTPException
from starlette import status
from app.api.auth.user_auth import admin_auth_required, base_auth_required
from app.crud.scenario import add_new_scenario, get_all_scenarios, get_scenario_by_char
from app.db.session import get_async_session

from app.models.scenario import Scenario
from app.schemas.scenario import ScenarioCreate

router = APIRouter()


@router.get("/get_by_char/{char}", status_code=status.HTTP_200_OK, response_model=Scenario)
@base_auth_required
async def get_scenario_by_character(char: str, session =Depends(get_async_session)) -> Scenario | None:
    if len(char) != 1:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    scenario: Scenario | None = await get_scenario_by_char(char=char, session=session)
    return scenario


@router.get("/get_all_scenarios", status_code=status.HTTP_200_OK, response_model=list[Scenario])
@base_auth_required
async def get_all_scenarios_as_list(session =Depends(get_async_session)) -> list[Scenario]:
    scenario_list: list[Scenario] = await get_all_scenarios(session=session)
    return scenario_list


@router.post("/new_scenario", status_code=status.HTTP_201_CREATED)
@admin_auth_required
async def create_new_scenario(*, scenario_data: ScenarioCreate, session=Depends(get_async_session)) -> Scenario:
    new_scenario: Scenario = await add_new_scenario(new_scenario_data=scenario_data, session=session)
    return new_scenario