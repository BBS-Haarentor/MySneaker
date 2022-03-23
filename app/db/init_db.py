from sqlmodel import SQLModel

from app.db.session import engine


async def init_db():
    SQLModel.metadata.create_all(engine)

async def init_async_db():
    async with engine.begin() as conn:
        #await conn.run_sync(SQLModel.metadata.drop_all)
        await conn.run_sync(SQLModel.metadata.create_all)
