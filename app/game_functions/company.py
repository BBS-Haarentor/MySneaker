from app.game_functions.utils import Machine, MachineType, Transaction, create_transaction
from app.models.cycle import Cycle
from app.models.scenario import Scenario
from app.models.stock import Stock
from app.schemas.stock import StockCreate, StockInternal


class Company():
    
    company_id: int
    
    machines: list[Machine]
    machine_types: dict
    
    cycle: Cycle
    stock: Stock
    result_stock: StockCreate
    
    ledger: list[Transaction]
    
    scenario: Scenario
    _for_sale: int
    _new_shoes_shelf: int
    
    def __init__(self, company_id: int,  cycle: Cycle, stock: Stock, scenario: Scenario) -> None:
        self.company_id = company_id
        self.cycle = cycle
        self.stock = stock
        self.scenario = scenario
        self.machine_types = self.__generate_machine_types()
        self.machines = self.__create_machines(stock=stock, cycle=cycle)
        
        internal_stock: StockInternal = StockInternal.parse_obj(stock)
        internal_stock.current_cycle_index += 1
        self.result_stock: StockCreate = StockCreate.parse_obj(internal_stock)
        self.result_stock.income_from_sales = 0.0
        self.result_stock.real_sales = 0.0
        self._for_sale = 0
        self._new_shoes_shelf = 0
        self.ledger = []
        return None
    
    def __generate_machine_types(self) -> dict:
        types_dict = {}
        types_dict[1] = {"name": "SneakerBox200",
                    "purchase_cost" : self.scenario.machine_purchase_cost1,
                    "production_capacity": self.scenario.machine_production_capacity1,
                    "maintainance_cost": self.scenario.machine_maintainance_cost1,
                    "production_cost_per_sneaker": self.scenario.production_cost_per_sneaker1,
                    "employee_production_capacity": self.scenario.employee_production_capacity,
                    "employee_max": self.scenario.machine_employee_max
                    }
        types_dict[2] = {"name": "SneakerBox500",
                    "purchase_cost" : self.scenario.machine_purchase_cost2,
                    "production_capacity": self.scenario.machine_production_capacity2,
                    "maintainance_cost": self.scenario.machine_maintainance_cost2,
                    "production_cost_per_sneaker": self.scenario.production_cost_per_sneaker2,
                    "employee_production_capacity": self.scenario.employee_production_capacity,
                    "employee_max": self.scenario.machine_employee_max
                    }
        types_dict[3] = {"name": "SneakerBox1000",
                    "purchase_cost" : self.scenario.machine_purchase_cost3,
                    "production_capacity": self.scenario.machine_production_capacity3,
                    "maintainance_cost": self.scenario.machine_maintainance_cost3,
                    "production_cost_per_sneaker": self.scenario.production_cost_per_sneaker3,
                    "employee_production_capacity": self.scenario.employee_production_capacity,
                    "employee_max": self.scenario.machine_employee_max
                    }
        
        return types_dict
    
    
    def __create_machines(self, stock: Stock, cycle: Cycle)-> list[Machine]:
        
        machines: list[Machine] = []
        if stock.machine_1_space > 0:
            # create machine
            machine: Machine = Machine(owner_id=self.company_id, slot=1, 
                                       type=MachineType.parse_obj(self.machine_types[stock.machine_1_space]),
                                       planned_production=cycle.planned_production_1, 
                                       planned_workers=cycle.planned_workers_1
                                       )
            machines.append(machine)
            
            
        if stock.machine_2_space > 0:
            # create machine
            machine: Machine = Machine(owner_id=self.company_id, slot=2, 
                                       type=MachineType.parse_obj(self.machine_types[stock.machine_2_space]),
                                       planned_production=cycle.planned_production_2, 
                                       planned_workers=cycle.planned_workers_2
                                       )
            machines.append(machine)
            
            
        if stock.machine_3_space > 0:
            # create machine
            machine: Machine = Machine(owner_id=self.company_id, slot=3, 
                                       type=MachineType.parse_obj(self.machine_types[stock.machine_3_space]),
                                       planned_production=cycle.planned_production_3, 
                                       planned_workers=cycle.planned_workers_3
                                       )
            machines.append(machine)
        
        return machines 




    def pay_interest(self) -> None:
        _credit_interest_fee: float = round(self.stock.credit_taken * self.scenario.factor_interest_rate, 2)
        tx: Transaction = create_transaction(amount= + (_credit_interest_fee),
                             company_id=self.company_id, 
                             detail={ "_credit_interest_fee": _credit_interest_fee})
        self.add_tx([tx]) 
        return None

    def take_credit(self) -> None:
        _take_credit: float = self.cycle.take_credit
        self._update_credit(update= + (_take_credit))
        tx: Transaction = create_transaction(amount= + (_take_credit),
                             company_id=self.company_id, 
                             detail={ "_take_credit": _take_credit})
        self.add_tx([tx]) 
        return None


    def payback_credit(self) -> None:
        _payback: float = self.cycle.payback_credit
        self._update_credit(update= - (_payback))
        tx: Transaction = create_transaction(amount= + (_payback),
                             company_id=self.company_id, 
                             detail={ "_payback": _payback})
        self.add_tx([tx]) 
        return None


    def _update_credit(self, update: float) -> None:
        result = self.result_stock.credit_taken + update
        self.result_stock.credit_taken = round(result, 2)
        return None


    def _check_account_balance(self) -> None:
        if self.result_stock.account_balance < 0:
            self._update_credit(update=self.result_stock.account_balance)
            self.result_stock.account_balance = 0.0
        return None
    
    
    def update_dead(self) -> None:
        self._check_account_balance()
        if self.result_stock.credit_taken > 50_000:
            self.result_stock.insolvent = True
        return None    
    
    
    def pay_employees(self) -> None:
        _employee_salaries: float = round((self.scenario.employee_salary * self.stock.employees_count) , 2) 
        tx: Transaction = create_transaction(amount= - (_employee_salaries),
                                     company_id=self.company_id, 
                                     detail={ "_employee_salaries": _employee_salaries})
        self.add_tx([tx]) 
        return None


    def update_employee_count(self) -> None:
        self.result_stock.employees_count -= self.cycle.let_go_employees
        self.result_stock.employees_count += self.cycle.new_employees
        _signup_bonuses: float = round((self.cycle.new_employees * self.scenario.employee_signup_bonus), 2)
        tx: Transaction = create_transaction(amount= - (_signup_bonuses),
                                             company_id=self.company_id, 
                                             detail={ "_signup_bonuses": _signup_bonuses})
        self.add_tx([tx]) 
        self.result_stock.employees_count += self.scenario.employee_count_modifier_permanent
        return None


    def pay_machine_maintenance(self) -> None:
        for m in self.machines:
            _machine_maintainance_cost = m.type.maintainance_cost
            tx: Transaction = create_transaction(amount= - (_machine_maintainance_cost), 
                                                 company_id=self.company_id, 
                                                 detail={ "_machine_maintainance_cost": _machine_maintainance_cost,
                                                         "_machine_type" : m.type})
            self.add_tx([tx]) 
        return None


    def buy_new_machine(self) -> None:
        if self.cycle.buy_new_machine > 0:
            if self.stock.machine_2_space > 0:
                self.result_stock.machine_3_space = self.cycle.buy_new_machine
            else:
               self.result_stock.machine_2_space = self.cycle.buy_new_machine
            _machine_type: MachineType = MachineType.parse_obj(self.machine_types[self.cycle.buy_new_machine])
            tx: Transaction = create_transaction(amount= - (_machine_type.purchase_cost), company_id=self.company_id, detail={ "_machine_purchase_cost": _machine_type.purchase_cost })
            self.add_tx([tx])        
        return None 
    
    
    def update_research(self) -> None:
        research_levels = {
            2_500: 0.90,
            5_000: 0.82,
            7_500: 0.76,
            10_000: 0.72,
            12_500: 0.70
        }
        _budget: float = self.stock.research_budget
        _planned_investment: float = self.cycle.research_invest
        # cap invest at 2_500
        if _planned_investment > 2500:
            _planned_investment = 2500.00
        _new_budget: float = _budget + _planned_investment
        actual_investment = _planned_investment
        # cap total investment
        if _new_budget > 12_500:
            actual_investment = 12_500 - _budget
        
        self.result_stock.research_budget += actual_investment
        
        for k, v in research_levels:
            if self.result_stock.research_budget >= k:
                self.result_stock.research_production_modifier = v
        tx: Transaction = create_transaction(amount= - (actual_investment), company_id=self.company_id, detail={ "actual_investment": actual_investment })
        self.add_tx([tx])       
        return None


    def do_inventory(self) -> None: 
        
        self.result_stock.sneaker_count += self.cycle.buy_sneaker
        _purchase_cost_sneaker: float = round(self.cycle.buy_sneaker * self.scenario.sneaker_price, 2)
        self.result_stock.paint_count += self.cycle.buy_paint
        _purchase_cost_paint: float = round(self.cycle.buy_paint * self.scenario.paint_price, 2)
        
        tx1: Transaction = create_transaction(amount= - (_purchase_cost_sneaker), company_id=self.company_id, detail={ "_cost_sneaker": _purchase_cost_sneaker })
        tx2: Transaction = create_transaction(amount= - (_purchase_cost_paint), company_id=self.company_id, detail={ "_cost_paint": _purchase_cost_paint })
        
        _storage_fee_paint: float = round(self.stock.paint_count * self.scenario.storage_fee_paint, 2)
        _storage_fee_sneaker: float = round(self.stock.sneaker_count * self.scenario.storage_fee_sneaker, 2)
        _storage_fee_finished_sneaker: float = round(self.stock.finished_sneaker_count * self.scenario.storage_fee_finished_sneaker, 2)
        tx3: Transaction = create_transaction(amount= - (_storage_fee_paint), company_id=self.company_id, detail={ "_storage_fee_paint": _storage_fee_paint })
        tx4: Transaction = create_transaction(amount= - (_storage_fee_sneaker), company_id=self.company_id, detail={ "_storage_fee_sneaker": _storage_fee_sneaker })
        tx5: Transaction = create_transaction(amount= - (_storage_fee_finished_sneaker), company_id=self.company_id, detail={ "_storage_fee_finished_sneaker": _storage_fee_finished_sneaker })
        self.add_tx(tx=[tx1, tx2, tx4, tx4, tx5])
        return None

    def produce_sneakers(self) -> None:
        _produced_sneakers: int = 0
        _production_cost: float = 0.0
        for m in self.machines:
            _produced_sneakers += m.planned_workers * m.type.employee_production_capacity
            _production_cost += round( m.planned_production * m.type.production_cost_per_sneaker * self.stock.research_production_modifier, 2)
            pass
        self._new_shoes_shelf = _produced_sneakers
        self._for_sale = self._new_shoes_shelf + self.cycle.include_from_stock
        self.result_stock.finished_sneaker_count -= self.cycle.include_from_stock
        tx: Transaction = create_transaction(amount= - (_production_cost), company_id=self.company_id, detail={ "_production_cost": _production_cost })
        self.add_tx([tx])
        return None
    
    def add_tx(self, txs: list[Transaction]) -> None:
        for tx in txs:
            self.ledger.append(tx)
        return None
    
    
    def process_transactions(self) -> None:
        for tx in self.ledger:
            
            pass
        return None
    
    