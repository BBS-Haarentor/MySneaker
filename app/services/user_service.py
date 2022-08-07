from datetime import datetime
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.models.game import Game
from app.api.auth.util import pwd_context
from app.models.groups import AdminGroup, BaseGroup, TeacherGroup

from app.models.user import User
from app.repositories.game_repository import GameRepository
from app.repositories.group_repository import GroupRepository
from app.repositories.scenario_repository import ScenarioRepository
from app.repositories.user_repository import UserNotFoundError, UserRepository
from app.schemas.user import UserBase, UserPost, UserPostElevated, UserPostStudent, UserResponse


class UserService():


    user_repo: UserRepository
    game_repo: GameRepository
    basegroup_repo: GroupRepository
    teacher_repo: GroupRepository
    admin_repo: GroupRepository
    
    
    def __init__(self, session: AsyncSession):
        self.user_repo = UserRepository(session=session)
        self.game_repo = GameRepository(session=session)
        self.basegroup_repo = GroupRepository(session=session, group_identifier=BaseGroup())
        self.teacher_repo = GroupRepository(session=session, group_identifier=TeacherGroup())
        self.admin_repo = GroupRepository(session=session, group_identifier=AdminGroup())


    async def create_student(self, create_data: UserPostStudent) -> int: 
        user: User = await self.user_repo.create(create_data=create_data)
        self.basegroup_repo.create(create_data=BaseGroup(user_id=user.id))
        return user.id
    
    
    async def create_teacher(self, create_data: UserPostElevated) -> int:
        user: User = await self.user_repo.create(create_data=create_data)
        self.basegroup_repo.create(create_data=TeacherGroup(user_id=user.id))
        return user.id
    
    
    
    async def create_admin(self, create_data: UserPostElevated) -> int:
        user: User = await self.user_repo.create(create_data=create_data)
        self.basegroup_repo.create(create_data=AdminGroup(user_id=user.id))
        return user.id
    
    
    
    async def get_user_by_id(self, id: int) -> User:
        return await self.user_repo.read(id=id)
    
    
    async def get_user_by_name(self, name: str) -> User:
        return await self.user_repo.get_user_by_name(name=name)
    
    
    async def update_last_login(self, user: User) -> None:
        now: float = datetime.now().timestamp()
        user.last_login = now
        updated_user: User = await self.user_repo.update(update_data=user)
        return None
    
    
    async def remove_user(self, id: int) -> None:
        user: User = await self.user_repo.read(id=id)
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
        game: Game = await self.game_repo.read(id=game_id)
        return (game.owner_id is user_id)
    
    
    async def get_teacher_list(self) -> list[User]:
        return await self.user_repo.get_all_teachers()
    