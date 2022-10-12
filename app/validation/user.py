

from app.exception.general import ValidationError
from app.schemas.user import UserPostStudent, UserPwChange


def validate_student_signup(user_data: UserPostStudent) -> None:

    if len(user_data.name) < 5 or len(user_data.name) > 30:
        raise UserValidationError(
            detail="attempted usercreation with invalid name",
            user_message="Validierung fehlgeschlagen. Der Nutzername darf nicht kürzer als 5 und nicht länger als 30 Zeichen sein.")
    return None



def validate_pw(pw_data: UserPwChange) -> None:
    return None


class UserValidationError(ValidationError):

    entity_name: str = "User"

    def __init__(self, detail: str | None, user_message: str | None) -> None:
        super().__init__(self.entity_name, detail, user_message)
    #def __init__(self, detail: str | None) -> None:
    #    super().__init__(self.entity_name, self.calling_service, detail)

