from fastapi import APIRouter 
from app.api.v1.endpoints.dummy import router as dummy_router
from app.api.v1.endpoints.company import router as company_router

v1_router = APIRouter()
v1_router.include_router(dummy_router, prefix="/dummy", tags=["dummy"])
v1_router.include_router(company_router, prefix="/company", tags=["company"])

@v1_router.get("/")
async def get_root():
    return {'dis' : 'v1root'}


