
from datetime import datetime
from types import NoneType, new_class
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.models.cycle import Cycle
from app.models.game import Game
from app.models.user import User
from app.repositories.crud_repository import NotFoundError
from app.schemas.cycle import CycleCreate
from app.repositories.cycle_repository import CycleRepository

class CycleService():
    cycle_repository: CycleRepository
    
    def __init__(self, session: AsyncSession) -> None:
        self.cycle_repository = CycleRepository(session=session)
        

    async def get_cycle_entry_by_id(self, id: int) -> Cycle:
        cycle: Cycle = await self.cycle_repository.read(id=id)
        return cycle


    async def new_cycle_entry(self, cycle_data: CycleCreate) -> int:
        new_cycle_id: int = await self.cycle_repository.create(create_data=cycle_data)
        return new_cycle_id


    async def get_cycles_by_user_id(self, user_id: int):
        result = await self.session.exec(select(Cycle).where(Cycle.company_id == user_id))
        cycles: list = result.all()
        if len(cycles) == 0:
            raise CycleNotFoundError(entity_id=user_id, type_identifier="User")
        return result.all()

    async def get_current_cycle_by_user_id(self, user_id: int) -> Cycle | None:
        result_user = await self.session.exec(select(User).where(User.id == user_id))
        user: User = result_user.one_or_none()
        if isinstance(user, NoneType):
            raise NotFoundError(entity_id=user_id)
        result_game = await self.session.exec(select(Game).where(Game.id == user.game_id))
        game: Game | None = result_game.one_or_none()
        if isinstance(game, NoneType):
            raise NotImplementedError
        result = await self.session.exec(select(Cycle).where(Cycle.company_id == user.id).where(Cycle.current_cycle_index == game.current_cycle_index).order_by(Cycle.creation_date.desc()))
        return result.first()


class CycleNotFoundError(NotFoundError):

    entity_name: str = "Cycle"
   