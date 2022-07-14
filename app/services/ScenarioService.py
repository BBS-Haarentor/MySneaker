from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.exception.general import NotFoundError
from app.models.game import Game

from app.models.scenario import Scenario
from app.schemas.scenario import ScenarioCreate


class ScenarioService():

    session: AsyncSession
    def __init__(self, session: AsyncSession):
        self.session = session
        


    async def get_scenario_by_char(self, char: str) -> Scenario | None:
        result = await self.session.exec(select(Scenario).where(Scenario.char == char))
        return result.one_or_none()


#returns scenario for specific game
    async def get_current_scenario_by_game(self, game_id: int) -> Scenario | None:
        result = await self.session.exec(select(Game).where(Game.id == game_id))
        game: Game | None = result.one_or_none()
        if not game.is_active:
            return None
        search_char = game.scenario_order[game.current_cycle_index]
        result = await self.session.exec(select(Scenario).where(Scenario.char == search_char))
        return result.one_or_none()


    async def get_scenario_by_index(self, game_id: int, index: int) -> Scenario | None:
        game_result = await self.session.exec(select(Game).where(Game.id == game_id))
        game: Game = game_result.one_or_none()
        if not game.is_active:
            return None    
        search_char = game.scenario_order[index]
        scenario_result = await self.session.exec(select(Scenario).where(Scenario.char == search_char))
        return scenario_result.one_or_none()


    async def add_new_scenario(self, new_scenario_data: ScenarioCreate) -> Scenario:
        scenario = Scenario.from_orm(new_scenario_data)
        self.session.add(scenario)
        await self.session.commit()
        await self.session.refresh(scenario)

        return scenario

    async def get_all_scenario_chars(self) -> list[str]:
        result = await self.session.exec(select(Scenario.char))
        char_list: list[str] = result.all()
        return char_list


    async def get_all_scenarios(self) -> list[Scenario]:
        result = await self.session.exec(select(Scenario))
        scenario_list: list[Scenario] = result.all()
        return scenario_list
    
    
class ScenarioNotFoundError(NotFoundError):

    entity_name: str = "Scenario"
    
    