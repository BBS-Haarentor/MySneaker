import logging
from types import NoneType
from fastapi import HTTPException
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.exception.general import NotFoundError, ServiceError
from app.game_functions.turnover_v2 import Turnover
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
from app.schemas.game import GameCreate, GamePatch, PlayerInfo
from app.schemas.scenario import ScenarioPost
from app.schemas.stock import StockCreate


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
        
        
    async def get_game_by_player_id(self, player_id: int) -> Game:
        player: User = await self.user_repo.read(id=player_id)
        game: Game = await self.game_repo.read(id=player.game_id)
        return game
    
    
    async def get_ids_by_owner_id(self, owner_id: int) -> list[int]:
        ids: list[int] = await self.game_repo.get_game_ids_by_owner(owner_id=owner_id)
        return ids
        
    
    async def get_games_by_owner_id(self, owner_id: int) -> list[Game]:
        ids: list[int] = await self.game_repo.get_game_ids_by_owner(owner_id=owner_id)
        games: list[Game] = []
        for i in ids: 
            games.append(await self.game_repo.read(id=i))
        return games
    
            
    async def get_game_by_id(self, game_id: int) -> Game:
        return await self.game_repo.read(id=game_id)
        
        
        
    async def create_game(self, create_data: GameCreate) -> int:
        return await self.game_repo.create(create_data=create_data)
    
    
    async def patch_game(self, patch_data: GamePatch) -> Game:
        return await self.game_repo.update(update_data=patch_data)
    
    
    async def toggle_active(self, game_id: int) -> bool:
        game: Game = await self.game_repo.read(id=game_id)
        game.is_active = not game.is_active
        updated_game: Game = await self.game_repo.update(update_data=game)
        return updated_game.is_active    
    
    
    async def toggle_signup(self, game_id: int) -> bool:
        game: Game = await self.game_repo.read(id=game_id)
        game.signup_enabled = not game.signup_enabled
        updated_game: Game = await self.game_repo.update(update_data=game)
        return updated_game.signup_enabled
        
        
    async def activate_signup(self, game_id: int) -> bool:
        game: Game = await self.game_repo.read(id=game_id)
        game.signup_enabled = True
        updated_game: Game = await self.game_repo.update(update_data=game)
        return updated_game.signup_enabled
    
    
    async def delete_game(self, game_id: int) -> None:
        game: Game = await self.game_repo.read(id=game_id)
        if game.is_active:
            raise GameServiceError(detail=f"Attempted delete on active game with {game_id=}", 
                                   user_message="Dieses Spiel ist aktiv. Deaktiviere das Spiel vor dem Löschversuch.")
        else:
            await self.game_repo.delete(id=game_id)
        return None
    
    #resultbased
    async def get_player_info(self, user_id: int, index: int) -> PlayerInfo:
        user: User = await self.user_repo.read(id=user_id)
        
        try:
            sid: int = await self.stock_repo.get_stock_id_by_user_and_index(user_id=user_id, index=(index + 1))
            s: Stock = await self.stock_repo.read(id=sid)
            info: PlayerInfo = PlayerInfo.parse_obj(s)
        except NotFoundError:
            info: PlayerInfo = PlayerInfo(company_id=user_id)
            pass
        info.name = user.name
        info.index = index
        info.turnover_ready = False
        try:
            prev_c: Cycle = await self.cycle_repo.read_cycle_by_user_and_index(user_id=user_id, index=(index))
            info.sales_bid = prev_c.sales_bid
            info.turnover_ready = True
        except NotFoundError:
            pass
        return info
        
    
    async def get_game_info(self, game_id: int, index: int) -> list[PlayerInfo]: 
        game: Game = await self.game_repo.read(id=game_id)
        if index < 0 or index > len(game.scenario_order):
            raise IndexError("Index out of bounds")
        users: list[User] = await self.user_repo.get_users_by_game(game_id=game_id)
        infos: list[PlayerInfo] = []
        for u in users:
            infos.append(await self.get_player_info(user_id=u.id, index=index))
        
        if index > 0 and not isinstance(infos[0].real_sales, NoneType):
            total_sold: int = sum(x.real_sales for x in infos)
            if total_sold > 0:
                for i in infos:
                    i.market_share = round(i.real_sales / total_sold, 2)
        return infos
        
        
        
    async def turnover(self, game_id: int):# -> int:
        game: Game = await self.game_repo.read(id=game_id)
        _current_index: int = game.current_cycle_index
        
        users: list[User] = await self.user_repo.get_users_by_game(game_id=game_id)
        cycles: list = [(await self.cycle_repo.read_cycle_by_user_and_index(user_id=u.id, index=_current_index)) for u in users]
        stocks: list = [(await self.stock_repo.get_stock_by_user_and_index(user_id=u.id, index=_current_index)) for u in users]
        scenario: Scenario = self.scenario_repo.read_by_char(char=game.scenario_order[_current_index])
        
        turnover: Turnover = Turnover(input_cycles=cycles, input_stocks=stocks, scenario=scenario)
        new_stocks: list = turnover.turnover()
        return new_stocks
    
    
    async def set_back_cycle_index(self, game_id: int, new_index: int) -> int:
        game: Game = await self.game_repo.read(id=game_id)
        if new_index > game.current_cycle_index or new_index < 0:
            raise GameServiceError(detail=f"attempted setback on game with id: {game_id} to out-of-bounds index.",
                                   user_message=f"Der neue Index liegt außerhalb des zulässigen Bereichs: 0 <= index <= Gesamt-Anzahl-Perioden")
        try:
            await self.cycle_repo.delete_cycles_after_including_index(game_id=game_id, new_index=new_index)
        except NotFoundError:
            pass
        try:
            await self.stock_repo.delete_stocks_after_including_index(game_id=game_id, new_index=(new_index + 1))
        except NotFoundError:
            pass
        game.current_cycle_index = new_index
        updated_game: Game = await self.game_repo.update(update_data=game)
        return updated_game.current_cycle_index
    
    
class GameServiceError(ServiceError):
    
    entity_name: str = "Game"
    
    def __init__(self, detail: str | None, user_message: str | None) -> None:
        super().__init__(self.entity_name, detail, user_message)