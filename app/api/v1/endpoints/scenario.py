import json
import logging
from urllib import response
from fastapi import APIRouter, Body, Depends, HTTPException
from starlette import status
from app.api.auth.api_key_auth import get_api_key
from app.api.auth.user_auth import admin_auth_required, base_auth_required, get_current_active_user
from app.crud.scenario import add_new_scenario, get_all_scenarios, get_scenario_by_char
from app.db.session import get_async_session
from sqlmodel.ext.asyncio.session import AsyncSession
from fastapi.security.api_key import APIKey

from app.models.scenario import Scenario
from app.models.user import User
from app.schemas.scenario import ScenarioCreate
from app.services.scenario_service import ScenarioService


router = APIRouter()


@router.get("/get_by_char/{char}", status_code=200, response_model=Scenario)
async def get_scenario_by_character_v2(char: str, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> Scenario:
    scenario_service = ScenarioService(session=session)
    if len(char) != 1:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    return await scenario_service.get_scenario_by_char(char=char)
    

@router.get("/get_all_scenarios", status_code=status.HTTP_200_OK, response_model=list[Scenario])
@base_auth_required
async def get_all_scenarios_as_list(current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> list[Scenario]:
    scenario_service = ScenarioService(session=session)
    return await scenario_service.get_all_scenarios()


@router.post("/new_scenario", status_code=status.HTTP_201_CREATED)
@admin_auth_required
async def create_new_scenario(scenario_data: ScenarioCreate, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> Scenario:
    scenario_service = ScenarioService(session=session)
    return await scenario_service.add_new_scenario(new_scenario_data=scenario_data)


@router.post("/init_scenarios", status_code=status.HTTP_201_CREATED)
async def init_scenarios(api_key: APIKey = Depends(get_api_key), session: AsyncSession = Depends(get_async_session)) -> list[Scenario]:
    new_scenarios = []
    # read from json file
    with open('./app/db/scenario_seed_data.json') as file:
        json_data = json.load(file)
    # convert json to orm
    for _ in json_data["data"]:
        session.add(Scenario.parse_obj(_))
    await session.commit()
    scenario_list: list[Scenario] = await get_all_scenarios(session=session)
    return scenario_list