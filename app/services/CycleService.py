
from datetime import datetime
from msilib import type_binary
from types import NoneType
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.exception.general import NotFoundError, UserNotFoundError
from app.models.cycle import Cycle
from app.models.game import Game
from app.models.user import User
from app.schemas.cycle import CycleCreate

class CycleService():
    session: AsyncSession
    def __init__(self, session: AsyncSession) -> None:
        self.session = session
        
    

    async def get_cycle_entry_by_id(self, cycle_id: int) -> Cycle:
        result = await self.session.exec(select(Cycle).where(Cycle.id == cycle_id))
        cycle: Cycle | None = result.one_or_none()
        if isinstance(cycle, NoneType):
            raise CycleNotFoundError(entity_id=cycle_id)
        return cycle


    async def new_cycle_entry(self, cycle_data: CycleCreate) -> int:
        cycle_data.entry_date = datetime.now()
        new_cycle = Cycle.from_orm(cycle_data)
        self.session.add(new_cycle)
        await self.session.commit()
        await self.session.refresh(new_cycle)
        return new_cycle.id


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
            raise UserNotFoundError(entity_id=user_id)
        result_game = await self.session.exec(select(Game).where(Game.id == user.game_id))
        game: Game | None = result_game.one_or_none()
        if isinstance(game, NoneType):
            raise NotImplementedError
        result = await self.session.exec(select(Cycle).where(Cycle.company_id == user.id).where(Cycle.current_cycle_index == game.current_cycle_index).order_by(Cycle.entry_date.desc()))
        return result.first()

    async def get_cycle_by_user_id_and_index(self, user_id: int, index: int) -> Cycle | None:
        user: User = await get_user_by_id(id=user_id, session=session)
        if isinstance(user, NoneType):
            return None
        game: Game = await get_game_by_id(id=user.game_id , session=session)
        if isinstance(game, NoneType):
            return None
        result = await self.session.exec(select(Cycle).where(Cycle.company_id == user.id).where(Cycle.current_cycle_index == index).order_by(Cycle.entry_date.desc()))
        return result.first()
    

class CycleNotFoundError(NotFoundError):

    entity_name: str = "Cycle"
   