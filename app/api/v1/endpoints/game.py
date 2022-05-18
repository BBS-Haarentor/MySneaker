from fastapi import APIRouter, Depends
from starlette import status
from sqlmodel.ext.asyncio.session import AsyncSession
from app.api.auth.user_auth import get_current_active_user, teacher_auth_required
from app.crud.game import create_game
from app.db.session import get_async_session
from app.models.user import User
from app.models.game import Game
from app.schemas.game import GameInit, GamePatch, GameResponse




router = APIRouter()

@router.get("/", status_code=status.HTTP_200_OK)
async def get_game_root():
    return { "HAHA": "du player, gameroot hier" }


@router.post("/create", status_code=status.HTTP_201_CREATED)
async def post_new_game(game_init_data: GameInit, session: AsyncSession = Depends(get_async_session)): 
    new_game_id = await create_game(game_init_data, session)
    return { f"Game created with {new_game_id}"}

@router.get("/get_all_ids",status_code=status.HTTP_200_OK)
async def get_all_my_game_ids(session: AsyncSession = Depends(get_async_session)) -> list[int]:
    raise NotImplementedError
    
@router.get("/get_by_id/{id}", status_code=status.HTTP_200_OK)
async def get_game_by_id(id: int)-> Game | None:
    raise NotImplementedError

@router.put("/turnover/{game_id}", status_code=status.HTTP_200_OK) # Umschlagsrechnung
async def turnover(game_id: int, session: AsyncSession = Depends(get_async_session)) -> int | None:
    raise NotImplementedError

@router.put("/edit", status_code=status.HTTP_202_ACCEPTED)
async def game_patch(game_patch: GamePatch, session: AsyncSession = Depends(get_async_session)) -> GameResponse | None:
    raise NotImplementedError

@router.put("/close/{id}", status_code=status.HTTP_202_ACCEPTED)
async def close_game(id: int, session: AsyncSession = Depends(get_async_session)) -> bool:
    raise NotImplementedError