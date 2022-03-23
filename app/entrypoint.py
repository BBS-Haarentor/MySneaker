import asyncio
import time
from fastapi import FastAPI, Request
from app.api.v1.api import v1_router
from app.core.config import SETTINGS
from app.db.init_db import init_async_db, init_db
#from app.api.auth.login import mysneaker_companies


if SETTINGS.MODE == "DEBUG":
    api = FastAPI()
elif SETTINGS.MODE == "PROD":
    api = FastAPI(docs_url=None)

api.include_router(v1_router, prefix="/api/v1", tags=["v1"])



# middleware to add a process-time field in the response-header
@api.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["Request-Process-Timedelta"] = str(process_time)
    return response

@api.on_event("startup")
async def setup_db():
    await asyncio.sleep(5)
    await init_async_db()
    #await init_db()