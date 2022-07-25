import logging
from fastapi import HTTPException
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.exception.general import ValidationError
from app.models.cycle import Cycle
from app.models.game import Game

from app.models.scenario import Scenario
from app.models.stock import Stock
from app.models.user import User
from app.repositories.cycle_repository import CycleNotFoundError, CycleRepository
from app.repositories.game_repository import GameRepository
from app.repositories.scenario_repository import ScenarioRepository
from app.repositories.stock_repository import StockRepository
from app.repositories.user_repository import UserRepository
from app.schemas.game import PlayerInfo
from app.schemas.scenario import ScenarioCreate


class GameService():

    game_repo: GameRepository
    scenario_repo: ScenarioRepository
    user_repo: UserRepository
    stock_repo: StockRepository
    cycle_repo: CycleRepository
    
    def __init__(self, session: AsyncSession):
        self.game_repo = GameRepository(session=session)
        self.scenario_repo = ScenarioRepository(session=session)
        self.user_repo = UserRepository(session=session)
        self.stock_repo = StockRepository(session=session)
        self.cycle_repo = CycleRepository(session=session)
        
        
    def get_game_by_user_id(self, user_id: int) -> Game:
        pass
        
    async def get_player_info(self, user_id: int, index: int) -> PlayerInfo:
        info = PlayerInfo(company_id=user_id, index=index)
        user: User = await self.user_repo.get(id=user_id)
        info.name = user.name
        s: Stock = await self.stock_repo.get_newest_stock_by_user_and_index(user_id=user_id, index=index)
        logging.warning(f"{s=}")

        if index > 0:
            prev_c: Cycle = await self.cycle_repo.get_newest_cycle_by_user_and_index(user_id=user_id, index=(index - 1))
            info.sales_bid = prev_c.sales_bid
        info.account_balance = s.account_balance
        info.credit_taken = s.credit_taken
        info.income_from_sales = s.income_from_sales
        info.real_sales = s.real_sales
        info.insolvent = s.insolvent


        info.turnover_ready = False
        try:
            c: Cycle = await self.cycle_repo.get_newest_cycle_by_user_and_index(user_id=user_id, index=index)
            info.turnover_ready = True
        except CycleNotFoundError:
            pass

        return info
        
    
    async def get_game_info(self, game_id: int, index: int) -> list[PlayerInfo]: 
        # if index <= 0:
        #     raise HTTPException(status_code=418, detail="lol index nö")
        game: Game = await self.game_repo.get(id=game_id)
        if index < 0 or index > game.current_cycle_index:
            raise IndexError("Index out of bounds")
        #ValidationError(entity_id=None, calling_service="Game")
        users: list[User] = await self.user_repo.get_users_by_game(game_id=game_id)
        infos: list[PlayerInfo] = []
        for u in users:
            infos.append(await self.get_player_info(user_id=u.id, index=index))
        logging.warning("-----------------LEL_-_--______----_-_")
        logging.warning(f"{len(infos)}")
        for i in infos:
            logging.warning(f"{i.real_sales=}")
        if index > 0:
            total_sold: int = sum(x.real_sales for x in infos)
            logging.warning(f"{total_sold=}")
            for i in infos:
                i.market_share = round(i.real_sales / total_sold, 2)
        # cycles: list[Cycle] = []
        # for u in users:
        #     c: Cycle = await self.cycle_repo.get_newest_cycle_by_user_and_index(user_id=u.id, index=index)
        #     cycles.append(c)
        
        return infos