from types import NoneType
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.repositories.crud_repository import CRUDRepository, NotFoundError
from app.models.user import User
from app.repositories.game_repository import GameNotFoundError
from app.models.groups import TeacherGroup

class UserRepository(CRUDRepository):


    def __init__(self, session: AsyncSession):
        super().__init__(session=session, type_identifier=User())
    
    
    async def get_user_by_name(self, name: str) -> User:
        result = await self.session.exec(select(User).where(User.name == name))
        user: User | None = result.one_or_none()
        if isinstance(user, NoneType):
            raise UserNotFoundError(entity_id=name)
        return user
    
    
    async def get_users_by_game(self, game_id: int) -> list[User]:
        result = await self.session.exec(select(User).where(User.game_id == game_id))
        users: list[User] = result.all()
        if len(users) <= 0:
            raise GameNotFoundError(entity_id=game_id)
        return users


    async def get_all_teachers(self) -> list[User]:
        result = await self.session.exec(select(User).join(TeacherGroup).where(User.id == TeacherGroup.user_id))
        teachers: list[User] = result.all()
        if len(teachers <= 0):
            raise UserNotFoundError(entity_id=None)
        return teachers
    
    
class UserNotFoundError(NotFoundError):

    entity_name: str = "User"
    