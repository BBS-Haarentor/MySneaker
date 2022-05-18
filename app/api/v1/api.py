from fastapi import APIRouter 
from app.api.v1.endpoints.dummy import router as dummy_router
from app.api.v1.endpoints.game import router as game_router
from app.api.v1.endpoints.scenario import router as scenario_router


v1_router = APIRouter()

#v1_router.include_router(dummy_router, prefix="/dummy", tags=["dummy"])

v1_router.include_router(game_router, prefix="/game", tags=["game"])
v1_router.include_router(game_router, prefix="/scenario", tags=["scenario"])


@v1_router.get("/")
async def get_root():
    return {'dis' : 'v1root'}


