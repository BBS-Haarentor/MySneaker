import json
from types import NoneType
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.models.game import Game
from app.repositories.crud_repository import CRUDRepository , NotFoundError
from app.schemas.scenario import ScenarioPost

class GameRepository(CRUDRepository):
    
    
    def __init__(self, session: AsyncSession):
        super().__init__(session=session, type_identifier=Game())
        
    
    async def get_game_ids_by_owner(self, owner_id: int) -> list[int]:
        result = await self.session.exec(select(Game.id).where(Game.owner_id == owner_id))
        return result.all()
    
    
    async def init_db(self) -> None:
        new_scenarios = []
        with open('./app/db/seeds/scenario_seed_data.json') as file:
            json_data = json.load(file)
        for _ in json_data["data"]:
            self.session.add(ScenarioPost.parse_obj(_))
        await self.session.commit()
        
        return None
    
    
    
class GameNotFoundError(NotFoundError):

    entity_name: str = "Game"
    def __init__(self, entity_id, detail) -> None:
        super().__init__(entity_id=entity_id, entity_name=self.entity_name, detail=detail)
