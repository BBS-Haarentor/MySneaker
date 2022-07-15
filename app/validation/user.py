



from fastapi import HTTPException
from starlette import status
from app.schemas.user import UserPost


async def user_validation(user_data: UserPost) -> bool:
    
    if user_data.name < 5 or user_data.name > 30:
        raise HTTPException( status_code=status.HTTP_403_FORBIDDEN, detail="Validierung fehlgeschlagen. Der Nutzername darf nicht kürzer als 5 und nicht länger als 30 Zeichen sein.")
    
    return True