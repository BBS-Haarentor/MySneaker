import asyncio
from os import stat
from fastapi import Depends, HTTPException
import time
from fastapi import FastAPI, Request
from sqlmodel.ext.asyncio.session import AsyncSession
from app.api.v1.api import v1_router
from app.api.auth.endpoints.user import router as user_router
from app.core.config import SETTINGS, Settings
from app.db.init_db import init_admin_user, init_async_db, init_db
from fastapi.middleware.cors import CORSMiddleware
from starlette import status

from app.db.session import get_async_session

settings = Settings()

if settings.MODE == "DEBUG":
    api = FastAPI()
elif settings.MODE == "PROD":
    api = FastAPI(docs_url=None)

api.include_router(v1_router, prefix="/api/v1", tags=["v1"])

api.include_router(user_router, prefix="/user", tags=["user"])


# middleware to add a process-time field in the response-header
@api.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["Request-Process-Timedelta"] = str(process_time)
    return response


@api.middleware("http")
async def error_handling(request: Request, call_next):
    try:
        return await call_next(request)
    except HTTPException as ex:
        raise HTTPException(status_code=status.HTTP_418_IM_A_TEAPOT, detail="")


api.add_middleware(
    CORSMiddleware,
    allow_origins=SETTINGS.ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@api.on_event("startup")
async def setup_db():
    await asyncio.sleep(5)
    await init_async_db()
    #await init_admin_user()
    #await init_async_user_db()
    #await init_db()



