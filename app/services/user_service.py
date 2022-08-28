from datetime import datetime
import logging
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.exception.general import ValidationError
from app.models.game import Game
from app.api.auth.util import hash_pw, pwd_context
from app.models.groups import AdminGroup, BaseGroup, TeacherGroup

from app.models.user import User
from app.repositories.game_repository import GameRepository
from app.repositories.group_repository import GroupRepository
from app.repositories.scenario_repository import ScenarioRepository
from app.repositories.stock_repository import StockRepository
from app.repositories.user_repository import UserNotFoundError, UserRepository
from app.schemas.stock import StockCreate
from app.schemas.user import UserBase, UserPost, UserPostElevated, UserPostStudent, UserResponse
from app.validation.user import validate_student_signup
from sqlalchemy.exc import IntegrityError

class UserService():


    user_repo: UserRepository
    game_repo: GameRepository
    basegroup_repo: GroupRepository
    teacher_repo: GroupRepository
    admin_repo: GroupRepository
    stock_repo: StockRepository
    
    def __init__(self, session: AsyncSession):
        self.user_repo = UserRepository(session=session)
        self.game_repo = GameRepository(session=session)
        self.basegroup_repo = GroupRepository(session=session, group_identifier=BaseGroup())
        self.teacher_repo = GroupRepository(session=session, group_identifier=TeacherGroup())
        self.admin_repo = GroupRepository(session=session, group_identifier=AdminGroup())
        self.stock_repo = StockRepository(session=session)

    async def create_student(self, create_data: UserPostStudent) -> int: 
        # student validation
        validate_student_signup(user_data=create_data)
        create_data.hashed_pw = hash_pw(create_data.unhashed_pw)
        create_data.unhashed_pw = ""
        game: Game = await self.game_repo.read(id=create_data.game_id)
        if not game.is_active:
            raise ValidationError(entity_name="User", 
                                  detail= "attempted student-User creation on inactive game", 
                                  user_message="Dieses Spiel ist nicht aktiv. Registrieren ist zu diesem Zeitpunkt nicht möglich. Bitte den Lehrer das Spiel freizuschalten.")
        try:
            user: User = await self.user_repo.create(create_data=create_data)
        except IntegrityError:
            raise ValidationError(entity_name="User", 
                                  detail="attempted student-User creation on already taken username", 
                                  user_message="Dieser Nutzername ist bereits vergeben. Bitte wähle einen anderen.") # Validation
        await self.basegroup_repo.create(create_data=BaseGroup(user_id=user.id))

        stock_data = StockCreate(game_id=create_data.game_id, company_id=user.id, current_cycle_index=game.current_cycle_index)
        stock = await self.stock_repo.create(create_data=stock_data)
    
        return user.id
    
    
    async def create_teacher(self, create_data: UserPostElevated) -> int:
        try:
            user: User = await self.user_repo.create(create_data=create_data)
        except IntegrityError:
            raise ValidationError(entity_name="User", 
                                              detail="attempted teacher-User creation on already taken username", 
                                              user_message="Dieser Nutzername ist bereits vergeben. Bitte wähle einen anderen.") # Validation
        await self.teacher_repo.create(create_data=TeacherGroup(user_id=user.id))
        return user.id
    
    
    
    async def create_admin(self, create_data: UserPostElevated) -> int:
        # user validation
        user: User = await self.user_repo.create(create_data=create_data)
        await self.basegroup_repo.create(create_data=AdminGroup(user_id=user.id))
        return user.id
    
    
    async def read_players_by_game_id(self, game_id: int) -> list[User]:
        users: list[User] = await self.user_repo.get_users_by_game(game_id=game_id)
        return users
    
    
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
    
    async def toggle_active(self, user_id: int) -> bool:
        user: User = await self.user_repo.read(id=user_id)
        user.is_active = not user.is_active
        updated: User = await self.user_repo.update(user)
        return updated.is_active
    
    
