from app.schemas.game import GameCreate
from app.exception.general import ValidationError


def validate_game(game: GameCreate) -> None:

    return None


class GameValidationError(ValidationError):

    entity_name: str = "Game"
    calling_service: str = "GameService"

    def __init__(self, detail: str | None) -> None:
        super().__init__(self.entity_name, self.calling_service, detail)
