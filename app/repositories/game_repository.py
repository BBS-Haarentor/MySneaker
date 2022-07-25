from types import NoneType
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.models.game import Game
from app.repositories.crud_repository import CRUDRepository , NotFoundError

class GameRepository(CRUDRepository):
    
    def __init__(self, session: AsyncSession):
        super().__init__(session=session, type_identifier=Game())
        
    
class GameNotFoundError(NotFoundError):

    entity_name: str = "Game"
        