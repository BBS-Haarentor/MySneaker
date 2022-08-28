import inspect
import traceback
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



class BaseError(Exception):
    
    caller: str
    entity_name: str | None
    detail: str | None
    user_message: str | None

    def __init__(self, entity_name: str | None, detail: str | None, user_message: str | None) -> None:
        
        self.caller = inspect.stack()[1].function
        if not isinstance(detail, NoneType):
            self.entity_name = entity_name
        if isinstance(detail, NoneType):
            self.detail = traceback.format_exc()
        else:
            self.detail = detail
        if not isinstance(detail, NoneType):
            self.user_message = user_message
        else:
            self.user_message = "Ein Fehler ist aufgetreten. Wenn dieser fortbesteht benachrichtige bitte deinen Lehrer. " 
        
        super().__init__(f"{self.detail}")


class ServiceError(BaseError):

    calling_service: str


    def __init__(self, entity_name: str | None, detail: str | None, user_message: str | None) -> None:
        self.calling_service = inspect.stack()[1].__class__.__name__
        super().__init__(entity_name, detail, user_message)
        

    #def __init__(self, entity_id: int | None, entity_name: str | None, calling_service: str | None, detail: str | None) -> None:
    #    self.calling_service = calling_service
    #    self.entity_name = entity_name
    #    self.detail = detail
    #    super().__init__(f"{calling_service} produced a ServiceError for {entity_name=}:  - with: {entity_id=}")


class ValidationError(BaseError):
    
    calling_service: str

    
    def __init__(self, entity_name: str | None, detail: str | None, user_message: str | None) -> None:
        self.calling_service = inspect.stack()[1].__class__.__name__
        super().__init__(entity_name, detail, user_message)
    #def __init__(self, entity_name: str | None, calling_service: str | None, detail: str | None) -> None:
    #    self.calling_service = calling_service
    #    self.entity_name = entity_name
    #    self.detail = detail
    #    super().__init__(f"{calling_service} produced a ValidationError for {entity_name=}")


class GameError(Exception):
    
    calling_method: str
    detail: str
    
    def __init__(self, calling_method: str , detail: str) -> None:
        self.calling_method = calling_method
        self.detail = detail
        super().__init__(f"{calling_method} produced a GameError")
