from sqlmodel import select
from app.models.game import Game
from app.models.scenario import Scenario
from sqlmodel.ext.asyncio.session import AsyncSession

from app.schemas.scenario import ScenarioPost


async def get_scenario_by_id(id: int, session: AsyncSession) -> Scenario | None:
    result = await session.exec(select(Scenario).where(Scenario.id == id))
    return result.one_or_none()

async def get_scenario_by_char(char: str, session: AsyncSession) -> Scenario | None:
    result = await session.exec(select(Scenario).where(Scenario.char == char))
    return result.one_or_none()


#returns scenario for specific game
async def get_current_scenario_by_game(game_id: int, session: AsyncSession) -> Scenario | None:
    result = await session.exec(select(Game).where(Game.id == game_id))
    game: Game | None = result.one_or_none()
    if not game.is_active:
        return None
    search_char = game.scenario_order[game.current_cycle_index]
    result = await session.exec(select(Scenario).where(Scenario.char == search_char))
    return result.one_or_none()


async def get_scenario_by_index(game_id: int, index: int, session: AsyncSession) -> Scenario | None:
    game_result = await session.exec(select(Game).where(Game.id == game_id))
    game: Game = game_result.one_or_none()
    if not game.is_active:
        return None    
    search_char = game.scenario_order[index]
    scenario_result = await session.exec(select(Scenario).where(Scenario.char == search_char))
    return scenario_result.one_or_none()


async def add_new_scenario(new_scenario_data: ScenarioPost, session: AsyncSession) -> Scenario:
    scenario = Scenario.from_orm(new_scenario_data)
    session.add(scenario)
    await session.commit()
    await session.refresh(scenario)
       
    return scenario

async def get_all_scenario_chars(session: AsyncSession) -> list[str]:
    result = await session.exec(select(Scenario.char))
    char_list: list[str] = result.all()
    return char_list


async def get_all_scenarios(session: AsyncSession) -> list[Scenario]:
    result = await session.exec(select(Scenario))
    scenario_list: list[Scenario] = result.all()
    return scenario_list