from starlette import status
from fastapi import APIRouter


router = APIRouter()

@router.get("/", status_code=status.HTTP_200_OK)
async def get_user_root():
    return { "HAHA": "du tomate, grouproot hier" }
