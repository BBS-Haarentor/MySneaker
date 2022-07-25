

from types import NoneType


class NotFoundError(Exception):

    entity_name: str

    def __init__(self, entity_id):
        super().__init__(f"{self.entity_name} not found, id: {entity_id}")




class ValidationError(Exception):
    calling_service: str
    
    def __init__(self, entity_id, calling_service) -> None:
        self.calling_service = calling_service
        super().__init__(f"{self.calling_service.__str__()} produced a ValidationError for {calling_service=}:  - with: {entity_id=}")
        
