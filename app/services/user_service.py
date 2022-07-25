from datetime import datetime
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.models.game import Game

from app.models.user import User
from app.repositories.game_repository import GameRepository
from app.repositories.scenario_repository import ScenarioRepository
from app.repositories.user_repository import UserNotFoundError, UserRepository
from app.schemas.user import UserBase, UserPost


class UserService():

    user_repo: UserRepository
    scenario_repo: ScenarioRepository
    game_repo: GameRepository
    
    def __init__(self, session: AsyncSession):
        self.scenario_repo = ScenarioRepository(session=session)
        self.game_repo = GameRepository(session=session)
        
        
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
    
