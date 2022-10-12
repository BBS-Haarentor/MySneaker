from datetime import datetime
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.models.game import Game

from app.models.scenario import Scenario
from app.repositories.game_repository import GameRepository
from app.repositories.scenario_repository import ScenarioRepository
from app.schemas.scenario import ScenarioBase, ScenarioPost


class ScenarioService():

    scenario_repo: ScenarioRepository
    game_repo: GameRepository
    
    def __init__(self, session: AsyncSession):
        self.scenario_repo = ScenarioRepository(session=session)
        self.game_repo = GameRepository(session=session)
        
        
    async def get_scenario_by_char(self, char: str) -> Scenario:
        scenario = await self.scenario_repo.read_by_char(char=char)
        return scenario


    async def get_current_scenario_by_game(self, game_id: int) -> Scenario | None:
        game: Game = await self.game_repo.read(id=game_id)
        if not game.is_active:
            return None
        search_char = game.scenario_order[game.current_cycle_index]
        return await self.scenario_repo.read_by_char(char=search_char)

    # dep?
    async def get_scenario_by_index(self, game_id: int, index: int) -> Scenario | None:
        game: Game = await self.game_repo.read(id=game_id)
        if not game.is_active:
            return None 
        search_char = game.scenario_order[index]
        return await self.scenario_repo.read_by_char(char=search_char)


    async def add_new_scenario(self, new_scenario_data: ScenarioPost) -> int:
        return await self.scenario_repo.create(create_data=new_scenario_data)


    async def get_all_scenario_chars(self) -> list[str]:
        return await self.scenario_repo.get_all_chars()
   
   
    async def get_all_scenarios(self) -> list[Scenario]:
        chars: list[str] = await self.scenario_repo.get_all_chars()
        scenarios = []
        for c in chars:
            scenarios.append(await self.scenario_repo.read_by_char(char=c))
        ss = [(await self.scenario_repo.read_by_char(char=c)) for c in chars ]
        return scenarios
    
    
    async def delete_scenario(self, id: int) -> None:
        self.scenario_repo.delete(id=id)
        return None


    async def update_scenario(self, update_data: ScenarioBase) -> Scenario:
        update_data.last_edit: float = datetime.now().timestamp()
        return await self.scenario_repo.update(update_data=update_data)
        