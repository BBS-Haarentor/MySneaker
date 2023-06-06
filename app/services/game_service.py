import logging
from types import NoneType
from unittest import result
from fastapi import HTTPException
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.api.v1.endpoints import scenario
from app.exception.general import NotFoundError, ServiceError
from app.game_functions.turnover_v2 import Turnover
from app.game_functions.utils import Transaction
from app.models.cycle import Cycle
from app.models.game import Game

from app.models.scenario import Scenario
from app.models.stock import Stock
from app.models.user import User
from app.repositories.cycle_repository import CycleNotFoundError, CycleRepository
from app.repositories.game_repository import GameRepository
from app.repositories.scenario_repository import ScenarioRepository
from app.repositories.stock_repository import StockNotFoundError, StockRepository
from app.repositories.user_repository import UserRepository
from app.schemas.game import (
    GamePatch,
    GamePost,
    PlayerInfo,
    Summary,
    TurnoverDetailsPlayer,
)


class GameService:
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

    async def create_game(self, create_data: GamePost) -> int:
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
            raise GameServiceError(
                detail=f"Attempted delete on active game with {game_id=}",
                user_message="Dieses Spiel ist aktiv. Deaktiviere das Spiel vor dem Löschversuch.",
            )
        else:
            await self.game_repo.delete(id=game_id)
        return None

    # resultbased
    async def get_player_info(self, user_id: int, index: int) -> PlayerInfo:
        user: User = await self.user_repo.read(id=user_id)

        try:
            sid: int = await self.stock_repo.get_stock_id_by_user_and_index(
                user_id=user_id, index=(index + 1)
            )
            s: Stock = await self.stock_repo.read(id=sid)
            info: PlayerInfo = PlayerInfo.parse_obj(s)
        except NotFoundError:
            info: PlayerInfo = PlayerInfo(company_id=user_id)
            pass
        info.name = user.name
        info.index = index
        info.turnover_ready = False
        try:
            prev_c: Cycle = await self.cycle_repo.read_cycle_by_user_and_index(
                user_id=user_id, index=(index)
            )
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

    async def prepare_turnover(self, game: Game, target_cycle: int) -> Turnover:
        users: list[User] = await self.user_repo.get_users_by_game(game_id=game.id)
        try:
            cycles: list = [
                (
                    await self.cycle_repo.read_cycle_by_user_and_index(
                        user_id=u.id, index=target_cycle
                    )
                )
                for u in users
            ]
        except CycleNotFoundError:
            raise GameServiceError(
                detail=f"attempted turnoverv2 execution while not all users have given in their cycles",
                user_message="Es haben nicht alle Unternehmen abgegeben. Umschlagsrechnung nicht möglich",
            )
        stocks: list = [
            (
                await self.stock_repo.get_stock_by_user_and_index(
                    user_id=u.id, index=target_cycle
                )
            )
            for u in users
        ]
        if len(stocks) != len(cycles):
            raise GameServiceError(
                detail=f"attempted turnoverv2 execution while not all users have given in their cycles",
                user_message="Es haben nicht alle Unternehmen abgegeben. Umschlagsrechnung nicht möglich",
            )
        scenario: Scenario = await self.scenario_repo.read_by_char(
            char=game.scenario_order[target_cycle]
        )

        turnover: Turnover = Turnover(
            input_cycles=cycles, input_stocks=stocks, scenario=scenario
        )

        return turnover

    async def simulate_turnover(self, game_id: int, cycle_index: int):
        game: Game = await self.game_repo.read(id=game_id)

        turnover: Turnover = await self.prepare_turnover(
            game=game, target_cycle=cycle_index
        )

        result_stocks: list[Stock] = turnover.turnover()

        details: list[TurnoverDetailsPlayer] = [
            TurnoverDetailsPlayer(
                company_id=c.company_id,
                index=cycle_index,
                game_id=game_id,
                stock=c.result_stock,
                ledger=c.ledger,
            )
            for c in turnover.companies
        ]
        
        return details
        
    async def execute_turnover(self, game_id: int) -> int:
        game: Game = await self.game_repo.read(id=game_id)
        current_index: int = game.current_cycle_index

        turnover: Turnover = await self.prepare_turnover(
            game=game, target_cycle=current_index
        )

        result_stocks: list[Stock] = turnover.turnover()

        for s in result_stocks:
            i: int = await self.stock_repo.create(create_data=s)
        # update game index
        game.current_cycle_index += 1
        game: Game = await self.game_repo.update(update_data=game)
        return game.current_cycle_index

    async def set_back_cycle_index(self, game_id: int, new_index: int) -> int:
        game: Game = await self.game_repo.read(id=game_id)
        if new_index > game.current_cycle_index or new_index < 0:
            raise GameServiceError(
                detail=f"attempted setback on game with id: {game_id} to out-of-bounds index.",
                user_message=f"Der neue Index liegt außerhalb des zulässigen Bereichs: 0 <= index <= Gesamt-Anzahl-Perioden",
            )
        try:
            await self.cycle_repo.delete_cycles_after_including_index(
                game_id=game_id, new_index=new_index
            )
        except NotFoundError:
            pass
        try:
            await self.stock_repo.delete_stocks_after_including_index(
                game_id=game_id, new_index=(new_index + 1)
            )
        except NotFoundError:
            pass
        game.current_cycle_index = new_index
        updated_game: Game = await self.game_repo.update(update_data=game)
        return updated_game.current_cycle_index

    async def summarize(self, game_id: int, index: int, user_id: int) -> Summary:
        game: Game = await self.game_repo.read(id=game_id)
        try:
            cycle: Cycle = await self.cycle_repo.read_cycle_by_user_and_index(
                user_id=user_id, index=index
            )
        except CycleNotFoundError:
            cycle = None
            pass
        try:
            stock: Stock = await self.stock_repo.get_stock_by_user_and_index(
                user_id=user_id, index=index
            )
        except StockNotFoundError:
            stock = None
            pass
        scenario: Scenario = await self.scenario_repo.read_by_char(
            game.scenario_order[index]
        )
        return Summary(cycle=cycle, stock=stock, scenario=scenario)


class GameServiceError(ServiceError):
    entity_name: str = "Game"

    def __init__(self, detail: str | None, user_message: str | None) -> None:
        super().__init__(self.entity_name, detail, user_message)
