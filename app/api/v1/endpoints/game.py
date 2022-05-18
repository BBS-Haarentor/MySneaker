from fastapi import APIRouter, Depends
from starlette import status
from sqlmodel.ext.asyncio.session import AsyncSession
from app.api.auth.user_auth import get_current_active_user, teacher_auth_required
from app.crud.game import create_game
from app.db.session import get_async_session
from app.models.user import User
from app.schemas.game import GameInit




router = APIRouter()

@router.get("/", status_code=status.HTTP_200_OK)
async def get_game_root():
    return { "HAHA": "du player, gameroot hier" }


@router.post("/create", status_code=status.HTTP_201_CREATED)
@teacher_auth_required
async def post_new_game(game_init_data: GameInit, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)): 
    new_game_id = await create_game(game_init_data, session)
    return { f"Game created with {new_game_id}"}
