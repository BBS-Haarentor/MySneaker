

class NotFoundError(Exception):

    entity_name: str

    def __init__(self, entity_id):
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
