

from app.exception.general import ValidationError
from app.schemas.user import UserPostStudent


def validate_student_signup(user_data: UserPostStudent) -> None:

    if len(user_data.name) < 5 or len(user_data.name) > 30:
        raise UserValidationError(
            detail="Validierung fehlgeschlagen. Der Nutzername darf nicht kürzer als 5 und nicht länger als 30 Zeichen sein.")
    return None


class UserValidationError(ValidationError):

    entity_name: str = "User"
    calling_service: str = "UserService"

    def __init__(self, detail: str | None) -> None:
        super().__init__(self.entity_name, self.calling_service, detail)
