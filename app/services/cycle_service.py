from types import NoneType
from sqlmodel.ext.asyncio.session import AsyncSession
from app.models.cycle import Cycle
from app.models.game import Game
from app.models.stock import Stock
from app.models.user import User
from app.models.scenario import Scenario
from app.repositories.game_repository import GameRepository
from app.repositories.scenario_repository import ScenarioRepository
from app.repositories.stock_repository import StockRepository
from app.repositories.user_repository import UserRepository
from app.schemas.cycle import CycleCreate
from app.repositories.cycle_repository import CycleRepository
from app.validation.cycle import validate_cycle

class CycleService():
    repo: CycleRepository
    game_repo: GameRepository
    user_repo: UserRepository
    stock_repo: StockRepository
    scenario_repo: ScenarioRepository
    
    def __init__(self, session: AsyncSession) -> None:
        self.repo = CycleRepository(session=session)
        self.game_repo = GameRepository(session=session)
        self.user_repo = UserRepository(session=session)
        self.stock_repo = StockRepository(session=session)
        self.scenario_repo = ScenarioRepository(session=session)

    async def get_cycle_entry_by_id(self, id: int) -> Cycle:
        cycle: Cycle = await self.repo.read(id=id)
        return cycle


    async def new_cycle_entry(self, cycle_data: CycleCreate) -> int:
        if isinstance(cycle_data.game_id, NoneType) or isinstance(cycle_data.current_cycle_index, NoneType):
            user: User = await self.user_repo.read(id=cycle_data.company_id)
            game: Game = await self.game_repo.read(id=user.game_id)
            cycle_data.game_id = game.id
            cycle_data.current_cycle_index = game.current_cycle_index
        stock: Stock = await self.stock_repo.get_stock_by_user_and_index(user_id=cycle_data.company_id, index=cycle_data.current_cycle_index)
        scenario: Scenario = await self.scenario_repo.read_by_char(char=game.scenario_order[game.current_cycle_index])
        validate_cycle(cycle=cycle_data, stock=stock, scenario=scenario)
        new_cycle_id: int = await self.repo.create(create_data=cycle_data)
        return new_cycle_id


    async def get_cycle_by_user_id_and_index(self, user_id: int, index: int) -> Cycle:
        return await self.repo.read_cycle_by_user_and_index(user_id=user_id, index=index)
    
    
    async def get_current_cycle_by_user_id(self, user_id: int) -> Cycle:
        user: User = await self.user_repo.read(id=user_id)
        game: Game = await self.game_repo.read(id=user.game_id)
        return await self.repo.read_cycle_by_user_and_index(user_id=user_id, index=game.current_cycle_index)
