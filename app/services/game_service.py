import logging
from fastapi import HTTPException
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.exception.general import ServiceError
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
    
    
    async def get_players_by_game_id(self, game_id: int) -> list:
        
        return 
    
            
    async def get_game_by_id(self, game_id: int) -> Game:
        game: Game = await self.game_repo.read(id=game_id)
        return game
        
        
    async def create_game(self, create_data: GameCreate) -> int:
        game_id: int = await self.game_repo.create(create_data=create_data)
        return game_id
    
    
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
            raise ServiceError(entity_id=game_id, calling_service=self.__class__.__str__(), detail="Game is active. Please deactivate before deleting.")
        else:
            await self.game_repo.delete(id=game_id)
        return None
    
    
    async def get_player_info(self, user_id: int, index: int) -> PlayerInfo:
        #info = PlayerInfo(company_id=user_id, index=index)
        user: User = await self.user_repo.read(id=user_id)
        sid: int = await self.stock_repo.get_stock_id_by_user_and_index(user_id=user_id, index=index)
        s: Stock = await self.stock_repo.read(id=sid)
        info: PlayerInfo = PlayerInfo.parse_obj(s)
        info.name = user.name
        info.index = index

        if index > 0:
            prev_c: Cycle = await self.cycle_repo.get_newest_cycle_by_user_and_index(user_id=user_id, index=(index - 1))
            info.sales_bid = prev_c.sales_bid
        #info.account_balance = float(s.account_balance)
        #info.credit_taken = float(s.credit_taken)
        #info.income_from_sales = s.income_from_sales
        #info.real_sales = s.real_sales
        #info.insolvent = s.insolvent

        info.turnover_ready = False
        try:
            c: Cycle = await self.cycle_repo.get_newest_cycle_by_user_and_index(user_id=user_id, index=index)
            info.turnover_ready = True
        except CycleNotFoundError:
            pass

        return info
        
    
    async def get_game_info(self, game_id: int, index: int) -> list[PlayerInfo]: 
        game: Game = await self.game_repo.read(id=game_id)
        if index < 0 or index > game.current_cycle_index:
            raise IndexError("Index out of bounds")
        users: list[User] = await self.user_repo.get_users_by_game(game_id=game_id)
        infos: list[PlayerInfo] = []
        for u in users:
            infos.append(await self.get_player_info(user_id=u.id, index=index))
        if index > 0:
            total_sold: int = sum(x.real_sales for x in infos)
            logging.warning(f"{total_sold=}")
            for i in infos:
                i.market_share = round(i.real_sales / total_sold, 2)
        return infos
        
        
    async def turnover(self, game_id: int) -> int:
        
        return 