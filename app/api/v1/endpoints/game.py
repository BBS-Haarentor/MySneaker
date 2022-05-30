import re
from types import NoneType
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlmodel import select
from starlette import status
from sqlmodel.ext.asyncio.session import AsyncSession
from app.api.auth.user_auth import admin_auth_required, get_current_active_user

from app.api.auth.user_auth import teacher_auth_required
from app.crud.game import create_game, get_all_game_ids, get_all_user_ids_for_game, get_game_by_id, toggle_game_state, turnover_next_cycle
from app.crud.groups import check_user_in_admingroup
from app.db.session import get_async_session
from app.models.user import User
from app.models.game import Game
from app.schemas.game import GameCreate, GamePatch, GameResponse
from app.schemas.user import UserResponse




router = APIRouter()

@router.get("/", status_code=status.HTTP_200_OK)
async def get_game_root():
    return { "HAHA": "du player, gameroot hier" }


@router.post("/create", status_code=status.HTTP_201_CREATED)
@teacher_auth_required
async def post_new_game(game_init_data: GameCreate, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> int: 
    new_game_id = await create_game(game_init_data, session)
    return new_game_id

@router.get("/get_all_ids",status_code=status.HTTP_200_OK)
@teacher_auth_required
async def get_all_my_game_ids(current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> list[int]:
    all_game_ids: list[int] = await get_all_game_ids(user_id=current_user.id, session=session)
    return all_game_ids
    
@router.get("/get_by_id/{game_id}", status_code=status.HTTP_200_OK, response_model=GameResponse)
@teacher_auth_required
async def get_by_id(game_id: int,current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> Game | None:
    result: Game | None = await get_game_by_id(id=game_id, session=session)
    return result

@router.get("/get_all_games_by_teacher/{user_id}",status_code=status.HTTP_200_OK)
@admin_auth_required
async def get_all_games_by_user_id(user_id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> list[int]:
    all_game_ids: list[int] = await get_all_game_ids(user_id=current_user.id, session=session)
    # do stuff
    return all_game_ids
    


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
        
    new_index:int| None = turnover_next_cycle(game_id=game_id, session=session)
    
    
    if isinstance(new_index, NoneType):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No next cycle found")
    else:
        return new_index




@router.get("/current_cycle_index/{game_id}", status_code=status.HTTP_200_OK)
async def get_cycle_index(game_id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> int:
    game: Game = await get_game_by_id(id=game_id, session=session)
    return game.current_cycle_index

@router.put("/edit", status_code=status.HTTP_202_ACCEPTED)
async def game_patch(game_patch: GamePatch, session: AsyncSession = Depends(get_async_session)) -> GameResponse | None:
    raise NotImplementedError

@router.put("/toggle_active/{game_id}", status_code=status.HTTP_202_ACCEPTED)
async def toggle_active(game_id: int, session: AsyncSession = Depends(get_async_session)) -> bool:
    result: bool = await toggle_game_state(id=game_id, session=session)
    return result

@router.get("/get_all_users_for_game/{game_id}", status_code=status.HTTP_202_ACCEPTED)
async def get_all_users_for_game(game_id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> list[User] :
    user_list: list[User] = await get_all_user_ids_for_game(game_id=game_id, session=session)
    # parse user_list to list[UserResponse]
    #return user_list
    response_list = list[UserResponse]
    for user in user_list:
        response_list.add(UserResponse.from_orm(user))
    return response_list