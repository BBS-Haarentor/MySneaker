


from dataclasses import dataclass
import inspect
from sqlmodel import SQLModel


class MachineType(SQLModel):
    
    name: str
    purchase_cost: float
    production_capacity: int
    employee_max: int 
    maintainance_cost: float 
    production_cost_per_sneaker: float 
    employee_production_capacity: int 
    

class Machine(SQLModel):
    
    owner_id: int
    slot: int
    type: MachineType
    planned_production: int
    planned_workers: int






@dataclass
class Transaction():
    company_id: int
    amount: float
    issuer: str
    detail: dict | None


class Invoice(Transaction):
    pass

class Cheque(Transaction):
    pass



def create_transaction(amount: float, company_id: int, detail: dict | None = None) -> Transaction:
    curframe = inspect.currentframe()
    callframe = inspect.getouterframes(curframe)
    issuer = callframe[1][3]
    if amount < 0:
        return Invoice(company_id=company_id, amount= (- amount), issuer=issuer, detail=detail)
    else:
        return Cheque(company_id=company_id, amount=amount, issuer=issuer, detail=detail)
