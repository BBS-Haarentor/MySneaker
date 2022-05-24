from fastapi import APIRouter, Depends
from starlette import status
from sqlmodel.ext.asyncio.session import AsyncSession
from app.api.auth.user_auth import get_current_active_user

from app.api.auth.user_auth import teacher_auth_required
from app.crud.game import create_game, get_all_game_ids, get_game_by_id
from app.db.session import get_async_session
from app.models.user import User
from app.models.game import Game
from app.schemas.game import GamePatch, GameResponse, GameCreate




router = APIRouter()

@router.get("/", status_code=status.HTTP_200_OK)
async def get_game_root():
    return { "HAHA": "du player, gameroot hier" }


@router.post("/create", status_code=status.HTTP_201_CREATED)
@teacher_auth_required
async def post_new_game(game_init_data: GameCreate, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)): 
    game_init_data.owner_id = current_user.id
    new_game_id = await create_game(game_init_data, session)
    return { f"Game created with {new_game_id}"}

@router.get("/get_all_ids",status_code=status.HTTP_200_OK)
@teacher_auth_required
async def get_all_my_game_ids(current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> list[int]:
    all_game_ids: list[int] = await get_all_game_ids(user_id=current_user.id, session=session)
    return all_game_ids
    
@router.get("/get_by_id/{game_id}", status_code=status.HTTP_200_OK)
@teacher_auth_required
async def get_by_id(game_id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session))-> Game | None:
    result: Game | None = await get_game_by_id(id=game_id, session=session)
    return result

@router.put("/turnover/{game_id}", status_code=status.HTTP_200_OK) # Umschlagsrechnung
async def turnover(game_id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> int | None:
    raise NotImplementedError

@router.get("/current_cycle_index/{game_id}", status_code=status.HTTP_200_OK)
async def get_cycle_index(game_id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> int | None:
    # counts all unique cycle_entries and returns the index of the current cycle
    raise NotImplementedError

@router.put("/edit", status_code=status.HTTP_202_ACCEPTED)
async def game_patch(game_patch: GamePatch, session: AsyncSession = Depends(get_async_session)) -> GameResponse | None:
    raise NotImplementedError

@router.put("/close/{game_id}", status_code=status.HTTP_202_ACCEPTED)
async def close_game(game_id: int, session: AsyncSession = Depends(get_async_session)) -> bool:
    raise NotImplementedError

@router.get("/get_all_user_for_game/{game_id}", status_code=status.HTTP_202_ACCEPTED)
async def close_game(game_id: int, session: AsyncSession = Depends(get_async_session)) -> bool:
    raise NotImplementedError
