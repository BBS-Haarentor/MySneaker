import logging
import traceback
from fastapi import HTTPException
from fastapi.responses import JSONResponse
import time
from fastapi import FastAPI, Request
from sqlmodel.ext.asyncio.session import AsyncSession
from app.api.v1.api import v1_router
from app.api.auth.endpoints.user import router as user_router
from app.core.config import SETTINGS, Settings
from app.db.init_db import init_async_db
from fastapi.middleware.cors import CORSMiddleware
from starlette import status

from app.exception.general import BaseError, NotFoundError, ServiceError, ValidationError
from app.schemas.base import ErrorResponse


settings = Settings()

if settings.MODE == "DEBUG":
    api = FastAPI()
elif settings.MODE == "PROD":
    api = FastAPI(docs_url=None)

api.include_router(v1_router, prefix="/api/v1")

api.include_router(user_router, prefix="/user", tags=["user"])


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
    except Exception as ex:
        code = status.HTTP_500_INTERNAL_SERVER_ERROR
        content=ex.__str__()
        if isinstance(ex, IndexError) or isinstance(ex, NotFoundError):
            code = status.HTTP_404_NOT_FOUND 
        if isinstance(ex, ServiceError):
            code = status.HTTP_409_CONFLICT
        if isinstance(ex, ValidationError):
            code = status.HTTP_403_FORBIDDEN
        if isinstance(ex, BaseError):
            res = ErrorResponse(detail=ex.detail, user_message=ex.user_message)
            content = res.dict()
        if isinstance(ex, NotImplementedError):
            content = "This function will be available soon."
        logging.warning(traceback.format_exc())
        return JSONResponse(status_code=code, content=content)


api.add_middleware(
    CORSMiddleware,
    allow_origins=SETTINGS.ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#@api.on_event("startup")
async def setup_db():
    await init_async_db()
