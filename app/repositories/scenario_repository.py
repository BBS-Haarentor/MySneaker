from types import NoneType
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.repositories.crud_repository import CRUDRepository, NotFoundError
from app.models.scenario import Scenario


class ScenarioRepository(CRUDRepository):
        
        
    def __init__(self, session: AsyncSession):
        super().__init__(session=session, type_identifier=Scenario())
        
        
    async def get_all_scenarios(self) -> list[Scenario]:
        result = await self.session.exec(select(Scenario))
        scenarios: list[Scenario] = result.all()
        return scenarios
    
    
    async def read_by_char(self, char: str) -> Scenario:
        result = await self.session.exec(select(Scenario).where(Scenario.char == char))
        scenario: Scenario = result.one_or_none()
        if isinstance(scenario, NoneType):
            raise ScenarioNotFoundError(entity_id=char)
        return scenario


    async def get_all_chars(self) -> list[str]:
        result = await self.session.exec(select(Scenario.char))
        chars = result.all()
        if len(chars) <= 0:
            raise ScenarioNotFoundError(entity_id=None)
        return chars


class ScenarioNotFoundError(NotFoundError):

    entity_name: str = "Scenario"
    