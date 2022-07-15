from sqlmodel import SQLModel
from app.db.session import engine


async def init_db() -> None:
    SQLModel.metadata.create_all(engine)


async def init_async_db() -> None:
    async with engine.begin() as conn:
        """
        COMMENT OUT THE LINE BELOW AFTER FIRST STARTUP.
        OTHERWISE THE DB WILL BE DROPPED ON RESTART.
        """
        #await conn.run_sync(SQLModel.metadata.drop_all)
        await conn.run_sync(SQLModel.metadata.create_all)
