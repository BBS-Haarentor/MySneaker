from types import NoneType
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.models.game import Game
from app.repositories.crud_repository import CRUDRepository , NotFoundError


class GameRepository(CRUDRepository):
    
    
    def __init__(self, session: AsyncSession):
        super().__init__(session=session, type_identifier=Game())
        
    
    async def get_game_ids_by_owner(self, owner_id: int) -> list[int]:
        result = await self.session.exec(select(Game.id).where(Game.owner_id == owner_id))
        return result.all()
    
    
    
    
    
class GameNotFoundError(NotFoundError):

    entity_name: str = "Game"
    def __init__(self, entity_id, detail) -> None:
        super().__init__(entity_id=entity_id, entity_name=self.entity_name, detail=detail)
