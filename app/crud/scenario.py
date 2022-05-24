from sqlmodel import select
from app.models.scenario import Scenario
from sqlmodel.ext.asyncio.session import AsyncSession


async def get_scenario_by_id(id: int, session: AsyncSession) -> Scenario | None:
    result = await session.exec(select(Scenario).where(Scenario.id == id))
    return result.one_or_none()

async def get_scenario_by_char(char: str, session: AsyncSession) -> Scenario | None:
    result = await session.exec(select(Scenario).where(Scenario.char == char))
    return result.one_or_none()