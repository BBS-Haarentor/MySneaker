from fastapi import APIRouter 
from app.api.v1.endpoints.game import router as game_router
from app.api.v1.endpoints.scenario import router as scenario_router
from app.api.v1.endpoints.cycle import router as cycle_router
from app.api.v1.endpoints.stock import router as stock_router

v1_router = APIRouter()


v1_router.include_router(game_router, prefix="/game", tags=["game"])
v1_router.include_router(scenario_router, prefix="/scenario", tags=["scenario"])
v1_router.include_router(cycle_router, prefix="/cycle", tags=["cycle"])
v1_router.include_router(stock_router, prefix="/stock", tags=["stock"])

@v1_router.get("/")
async def get_root():
    return {'dis' : 'v1root'}


