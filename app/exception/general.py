

from types import NoneType


class NotFoundError(Exception):

    entity_name: str
    type_identifier: str = entity_name

    def __init__(self, entity_id, type_identifier):
        if isinstance(type_identifier, NoneType):
            self.type_identifier = self.entity_name
        super().__init__(f"{self.entity_name} not found, id: {entity_id}, of type: {type_identifier}")




class UserNotFoundError(NotFoundError):

    entity_name: str = "User"
    


class GameNotFoundError(NotFoundError):

    entity_name: str = "Game"
    

 

class StockNotFoundError(NotFoundError):

    entity_name: str = "Stock"
    
    
class GroupNotFoundError(NotFoundError):

    entity_name: str = "Group"
    