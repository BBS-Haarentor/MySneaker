
from datetime import datetime
from types import NoneType, new_class
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.models.cycle import Cycle
from app.models.game import Game
from app.models.user import User
from app.repositories.crud_repository import NotFoundError
from app.schemas.cycle import CycleCreate
from app.repositories.cycle_repository import CycleNotFoundError, CycleRepository

class CycleService():
    repo: CycleRepository
    
    def __init__(self, session: AsyncSession) -> None:
        self.repo = CycleRepository(session=session)
        

    async def get_cycle_entry_by_id(self, id: int) -> Cycle:
        cycle: Cycle = await self.repo.read(id=id)
        return cycle


    async def new_cycle_entry(self, cycle_data: CycleCreate) -> int:
        new_cycle_id: int = await self.repo.create(create_data=cycle_data)
        return new_cycle_id


    async def get_cycle_by_user_id_and_index(self, user_id: int, index: int) -> Cycle:
        return await self.repo.read_cycle_by_user_and_index(user_id=user_id, index=index)
    
    
    async def get_current_cycle_by_user_id(self, user_id: int) -> Cycle:
        user: User = await self.user_repo.read(id=user_id)
        game: Game = await self.game_repo.read(id=user.game_id)
        return await self.repo.read_cycle_by_user_and_index(user_id=user_id, index=game.current_cycle_index)
