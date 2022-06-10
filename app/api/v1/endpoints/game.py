import re
from types import NoneType
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlmodel import select
from starlette import status
from sqlmodel.ext.asyncio.session import AsyncSession
from app.api.auth.user_auth import admin_auth_required, base_auth_required, get_current_active_user

from app.api.auth.user_auth import teacher_auth_required
from app.crud.cycle import get_current_cycle_by_user_id, get_cycle_by_user_id_and_index
from app.crud.game import create_game, delete_game_by_id, get_all_game_ids, get_all_games_by_owner, get_all_users_for_game, get_current_cycles_by_game_id, get_current_stocks_by_game_id, get_game_by_id, toggle_game_state, toggle_signup_by_id, turnover_next_cycle
from app.crud.groups import check_user_in_admingroup
from app.crud.scenario import get_scenario_by_index
from app.crud.stock import get_stock_entries_by_user_id_and_cycle_id
from app.crud.user import get_user_by_id
from app.db.session import get_async_session
from app.models.cycle import Cycle
from app.models.scenario import Scenario
from app.models.stock import Stock
from app.models.user import User
from app.models.game import Game
from app.schemas.game import GameCreate, GamePatch, GameResponse
from app.schemas.user import UserResponse




router = APIRouter()



@router.post("/create", status_code=status.HTTP_201_CREATED)
@teacher_auth_required
async def post_new_game(game_init_data: GameCreate, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> int: 
    if game_init_data.owner_id == None:
        game_init_data.owner_id = current_user.id
    new_game_id = await create_game(game_init_data, session)
    return new_game_id

@router.get("/get_all_ids",status_code=status.HTTP_200_OK)
@teacher_auth_required
async def get_all_my_game_ids(current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> list[int]:
    all_game_ids: list[int] = await get_all_game_ids(user_id=current_user.id, session=session)
    return all_game_ids
    
@router.get("/get_by_id/{game_id}", status_code=status.HTTP_200_OK, response_model=GameResponse)
@teacher_auth_required
async def get_by_id(game_id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> Game | None:
    result: Game | None = await get_game_by_id(id=game_id, session=session)
    return result

@router.get("/get_all_game_ids_by_teacher/{user_id}",status_code=status.HTTP_200_OK)
@admin_auth_required
async def get_all_game_ids_by_user_id(user_id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> list[int]:
    all_game_ids: list[int] = await get_all_game_ids(user_id=current_user.id, session=session)
    # do stuff
    return all_game_ids
    
    
@router.get("/student/my_game", status_code=status.HTTP_200_OK, response_model=GameResponse)
@base_auth_required
async def get_my_game(current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> Game:
    game: Game = await get_game_by_id(current_user.game_id, session=session)
    return game


@router.get("/student/my_summary", status_code=status.HTTP_200_OK)
@base_auth_required
async def get_my_summary(current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)): 
    #current_cycle = await get_cy
    current_cycle: Cycle = await get_current_cycle_by_user_id(user_id=current_user.id, session=session)
    game: Game = await get_game_by_id(current_user.game_id, session=session)
    current_stock: Stock = await get_stock_entries_by_user_id_and_cycle_id(user_id=current_user.id, index=game.current_cycle_index, session=session)
    current_scenario: Scenario = await get_scenario_by_index(game_id=game.id, index=game.current_cycle_index, session=session)
    return { "current_stock" : current_stock, "scenario" : current_scenario, "current_cycle" : current_cycle }

@router.get("/student/my_summary/{index}", status_code=status.HTTP_200_OK)
@base_auth_required
async def get_my_summary_by_index(index: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)): 
    cycle: Cycle = await get_current_cycle_by_user_id(user_id=current_user.id, session=session)
    game: Game = await get_game_by_id(current_user.game_id, session=session)
    stock: Stock = await get_stock_entries_by_user_id_and_cycle_id(user_id=current_user.id, index=index, session=session)
    scenario: Scenario = await get_scenario_by_index(game_id=game.id, session=session)
    
    return { "stock" : stock, "scenario" : scenario, "cycle" : cycle }


@router.get("/teacher/summary/user/{user_id}/index/{index}", status_code=status.HTTP_200_OK)
@teacher_auth_required
async def get_my_summary(user_id: int, index: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)): 
    user: User = await get_user_by_id(id=user_id, session=session)
    cycle: Cycle = await get_cycle_by_user_id_and_index(user_id=user.id, index=index, session=session)
    game: Game = await get_game_by_id(id=user.game_id, session=session)
    scenario: Scenario = await get_scenario_by_index(game_id=game.id, index=index, session=session)
    stock: Stock = await get_stock_entries_by_user_id_and_cycle_id(user_id=user.id, index=index, session=session)
    
    return { "stock" : stock, "scenario" : scenario, "cycle" : cycle }

    


@router.get("/teacher/my_games",status_code=status.HTTP_200_OK, response_model=list[GameResponse])
@teacher_auth_required
async def get_all_my_games(current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> list[Game]:
    game_list: list[Game] = await get_all_games_by_owner(user_id=current_user.id, session=session)
    return game_list
    
    
@router.get("/all_games_by_teacher/{user_id}",status_code=status.HTTP_200_OK, response_model=list[GameResponse])
@admin_auth_required
async def get_all_games_by_user_id(user_id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> list[Game]:
    game_list: list[Game] = await get_all_games_by_owner(user_id=user_id, session=session)
    return game_list
    

@router.put("/turnover/{game_id}", status_code=status.HTTP_200_OK) # Umschlagsrechnung
@teacher_auth_required
async def turnover(game_id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> int:
    game: Game| None = await get_game_by_id(id=game_id, session=session)
    if isinstance(game, NoneType):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Game not found")
    if not game.owner_id == current_user.id: 
        check_admin = await check_user_in_admingroup(session=session, user_id=current_user.id)
        if isinstance(check_admin, NoneType):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Insufficient credentials")
        
    
    new_index: int = await turnover_next_cycle(game_id=game_id, session=session)
    
    
    if isinstance(new_index, NoneType):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No next cycle found")
    else:
        return new_index


@router.get("/current_cycle_index/{game_id}", status_code=status.HTTP_200_OK)
@base_auth_required
async def get_cycle_index(game_id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> int:
    game: Game = await get_game_by_id(id=game_id, session=session)
    return game.current_cycle_index


@router.put("/edit", status_code=status.HTTP_202_ACCEPTED, response_model=GameResponse)
async def game_patch(game_patch: GamePatch, session: AsyncSession = Depends(get_async_session)) -> GameResponse | None:
    raise NotImplementedError


@router.put("/toggle_active/{game_id}", status_code=status.HTTP_202_ACCEPTED)
@teacher_auth_required
async def toggle_active(game_id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> bool:
    result: bool = await toggle_game_state(id=game_id, session=session)
    return result

@router.get("/current_cycles/{game_id}", status_code=status.HTTP_200_OK, response_model=list[Cycle])
@teacher_auth_required
async def get_current_cycle(game_id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> list[Cycle]:
    cycle_list: list[Cycle] = await get_current_cycles_by_game_id(id=game_id, session=session)
    return cycle_list


@router.get("/get_all_users_for_game/{game_id}", status_code=status.HTTP_202_ACCEPTED, response_model=list[UserResponse])
@teacher_auth_required
async def get_all_users_for_game_by_game_id(game_id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> list[User]:
    user_list: list[User] = await get_all_users_for_game(game_id=game_id, session=session)
    return user_list


@router.put("/toggle_signup/{game_id}", status_code=status.HTTP_202_ACCEPTED)
@teacher_auth_required
async def toggle_signup(game_id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> bool:
    signup_status: bool = await toggle_signup_by_id(id=game_id, session=session)
    return signup_status
    
    
@router.get("/current_stocks/{game_id}", status_code=status.HTTP_200_OK, response_model=list[Stock])
@teacher_auth_required
async def get_current_cycle(game_id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> list[Stock]:
    stock_list: list[Stock] = await get_current_stocks_by_game_id(id=game_id, session=session)
    return stock_list


@router.delete("/delete/{game_id}", status_code=status.HTTP_202_ACCEPTED)
@teacher_auth_required
async def delete_game(game_id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> bool:
    return await delete_game_by_id(id=game_id, session=session) 