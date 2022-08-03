from datetime import datetime
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.models.game import Game
from app.api.auth.util import pwd_context

from app.models.user import User
from app.repositories.game_repository import GameRepository
from app.repositories.scenario_repository import ScenarioRepository
from app.repositories.user_repository import UserNotFoundError, UserRepository
from app.schemas.user import UserBase, UserPost


class UserService():

    user_repo: UserRepository
    
    def __init__(self, session: AsyncSession):
        self.user_repo = UserRepository(session=session)
        
        
    async def get_user_by_id(self, id: int) -> User:
        return await self.user_repo.get(id=id)
    
    
    async def get_user_by_name(self, name: str) -> User:
        return await self.user_repo.get_user_by_name(name=name)
    
    
    async def update_last_login(self, user: User) -> None:
        now: float = datetime.now().timestamp()
        user.last_login = now
        updated_user: User = await self.user_repo.update(update_data=user)
        return None
    
    
    async def remove_user(self, id: int) -> None:
        user: User = await self.user_repo.get(id=id)
        if user.is_active:
            raise NotImplementedError
        self.user_repo.delete(id=id)
        return None
    
    
    async def authenticate_user(self, name: str, password: str) -> User:
        user: User = await self.user_repo.get_user_by_name(name=name)
        if not pwd_context.verify(password, user.hashed_pw):
            raise NotImplementedError
        else:
            await self.update_last_login(user=user)
            return user
        
        
    async def game_owner_check(self, user_id: int, game_id: int) -> bool:
        game: Game = await self.game_repo.get(id=game_id)
        return (game.owner_id is user_id)