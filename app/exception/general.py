from types import NoneType


class NotFoundError(Exception):

    entity_name: str
    detail: str

    def __init__(self, entity_id, entity_name: str | None, detail: str | None):
        if not isinstance(detail, NoneType):
            self.detail = detail
        if not isinstance(entity_name, NoneType):
            self.entity_name = entity_name
        super().__init__(f"{self.entity_name} not found, id: {entity_id}")



class ServiceError(Exception):

    calling_service: str
    entity_name: str
    detail: str

    def __init__(self, entity_id: int | None, entity_name: str | None, calling_service: str | None, detail: str | None) -> None:
        self.calling_service = calling_service
        self.entity_name = entity_name
        self.detail = detail
        super().__init__(f"{calling_service} produced a ServiceError for {entity_name=}:  - with: {entity_id=}")


class ValidationError(Exception):
    
    calling_service: str
    entity_name: str
    detail: str
    
    def __init__(self, entity_name: str | None, calling_service: str | None, detail: str | None) -> None:
        self.calling_service = calling_service
        self.entity_name = entity_name
        self.detail = detail
        super().__init__(f"{calling_service} produced a ValidationError for {entity_name=}")


class GameError(Exception):
    
    calling_method: str
    detail: str
    
    def __init__(self, calling_method: str , detail: str) -> None:
        self.calling_method = calling_method
        self.detail = detail
        super().__init__(f"{calling_method} produced a GameError")
