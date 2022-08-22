from dataclasses import dataclass
from itertools import groupby
import logging
import random
from app.models.cycle import Cycle
from app.models.stock import Stock
from app.models.scenario import Scenario
from sqlmodel import SQLModel
from app.schemas.stock import StockCreate, StockInternal


class Invoice():
    pass


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



class Company():
    
    company_id: int
    
    machines: list[Machine]
    machine_types: dict
    
    cycle: Cycle
    stock: Stock
    result_stock: StockCreate
    
    scenario: Scenario
    _for_sale: int
    _new_shoes_shelf: int
    
    def __init__(self, company_id: int,  cycle: Cycle, stock: Stock, scenario: Scenario) -> None:
        self.company_id = company_id
        self.cycle = cycle
        self.stock = stock
        self.scenario = scenario
        self.machine_types = self.__generate_machine_types__()
        self.machines = self._create_machines_(stock=stock, cycle=cycle)
        
        internal_stock: StockInternal = StockInternal.parse_obj(stock)
        internal_stock.current_cycle_index += 1
        self.result_stock: StockCreate = StockCreate.parse_obj(internal_stock)
        self.result_stock.income_from_sales = 0.0
        self.result_stock.real_sales = 0.0
        self._for_sale = 0
        self._new_shoes_shelf = 0
        return None
    
    def __generate_machine_types__(self) -> dict:
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
    
    
    def _create_machines_(self, stock: Stock, cycle: Cycle)-> list[Machine]:
        
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


    def _update_account_balance_(self, update: float) -> None:
        result = self.result_stock.account_balance + update
        self.result_stock.account_balance = round(result, 2)
        return None


    def _pay_interest(self) -> None:
        _interest_fee: float = round(self.stock.credit_taken * self.scenario.factor_interest_rate, 2)
        self._update_account_balance_(update= - (_interest_fee))
        return None


    def _take_and_pay_back_credit(self) -> None:
        self._update_account_balance_(update= - (self.cycle.payback_credit))
        self._update_credit_balance_(update= - (self.cycle.payback_credit))
        self._update_credit_balance_(update= + (self.cycle.take_credit))
        return None


    def _update_credit_balance_(self, update: float) -> None:
        result = self.result_stock.credit_taken + update
        self.result_stock.credit_taken = round(result, 2)
        return None


    def _check_account_balance(self) -> None:
        if self.result_stock.account_balance < 0:
            self._update_credit_balance_(update=self.result_stock.account_balance)
            self.result_stock.account_balance = 0.0
        return None
    
    
    def _update_dead_(self) -> None:
        if self.result_stock.credit_taken > 50_000:
            self.result_stock.insolvent = True
        return None    
    
    
    def _pay_employees_(self) -> None:
        _employee_salaries_: float = round((self.scenario.employee_salary * self.stock.employees_count) , 2) 
        self._update_account_balance_(update= -(_employee_salaries_) )
        return None


    def _update_employee_count_(self) -> None:
        self.result_stock.employees_count -= self.cycle.let_go_employees
        self.result_stock.employees_count += self.cycle.new_employees
        _signup_bonuses_: float = round((self.cycle.new_employees * self.scenario.employee_signup_bonus), 2)
        self._update_account_balance_(update= - (_signup_bonuses_) )
        self.result_stock.employees_count += self.scenario.employee_count_modifier_permanent
        return None


    def _pay_machine_maintenance_(self) -> None:
        _cumulative_cost: float = 0
        
        for m in self.machines:
            _cumulative_cost += m.type.maintainance_cost
            
        self._update_account_balance_(update= - (_cumulative_cost) )
        
        return None


    def _buy_new_machine_(self) -> None:
        if self.cycle.buy_new_machine > 0:
            if self.stock.machine_2_space > 0:
                self.result_stock.machine_3_space = self.cycle.buy_new_machine
            else:
               self.result_stock.machine_2_space = self.cycle.buy_new_machine
            _machine_type: MachineType = MachineType.parse_obj(self.machine_types[self.cycle.buy_new_machine])
            self._update_account_balance_(update= - (_machine_type.purchase_cost) )
            
        return None 
    
    
    def _update_research(self) -> None:
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
        
        self._update_account_balance_(update= - (actual_investment))
        
        return None


    def _restock(self) -> None: 
        self.result_stock.sneaker_count += self.cycle.buy_sneaker
        _cost_sneaker: float = round(self.cycle.buy_sneaker * self.scenario.sneaker_price, 2)
        self.result_stock.paint_count += self.cycle.buy_paint
        _cost_paint: float = round(self.cycle.buy_paint * self.scenario.paint_price, 2)

        self._update_account_balance_(update= - (_cost_sneaker + _cost_paint))
        # TODO: STORAGE FEE!!!!
        return None


    def _produce_sneakers(self) -> None:
        _produced_sneakers: int = 0
        _running_cost: float = 0.0
        for m in self.machines:
            _produced_sneakers += m.planned_workers * m.type.employee_production_capacity
            _running_cost += round( m.planned_production * m.type.production_cost_per_sneaker * self.stock.research_production_modifier, 2)
            pass
        self._new_shoes_shelf = _produced_sneakers
        self._for_sale = self._new_shoes_shelf + self.cycle.include_from_stock
        self.result_stock.finished_sneaker_count -= self.cycle.include_from_stock
        self._update_account_balance_(update= - (_running_cost))
        
        return None



class Turnover():
    
    scenario: Scenario
    companies: list[Company]
    
    dead_companies: list[Company]
    
    research_levels: dict
    _remaining_sales: int 
    _remaining_sales_ad: int

    
    def __init__(self, input_cycles: list[Cycle], input_stocks: list[Stock], scenario: Scenario) -> None:
        self.input_cycles = input_cycles
        self.input_stocks = input_stocks
        self.scenario = scenario
        self.companies = []
        self.__generate_companies__(input_cycles=input_cycles, input_stocks=input_stocks)
        self.__sort_out_dead__()
        
        # Environment
        self._remaining_sales: int = scenario.sneaker_ask
        self._remaining_sales_ad: int = round(self._remaining_sales * scenario.factor_ad_take, None)
        self._remaining_sales -= self._remaining_sales_ad
        return None
    
    
    def __generate_companies__(self, input_cycles: list[Cycle], input_stocks: list[Stock]) -> None:
        sorted_cycles: list[Cycle] = sorted(input_cycles, key= lambda x: x.company_id)
        sorted_stocks: list[Stock] = sorted(input_stocks, key= lambda x: x.company_id)
        zipped = zip(sorted_cycles, sorted_stocks)
        for c,s in zipped:
            self.companies.append(Company(company_id=c.company_id, cycle=c, stock=s, scenario=self.scenario))
        
        return None
    
    
    def __sort_out_dead__(self) -> None:
        
        for c in self.companies:
            if c.stock.insolvent:
                self.dead_companies.append(c)
                self.companies.remove(c)
        return None
    
    def __process_dead__(self) -> None:
        
        return None
    
    def turnover(self) -> list[StockCreate]:
        
        # do single stuff
        for c in self.companies:
            # do income stuff
            
            # do costly stuff
            c._pay_employees_()
            c._take_and_pay_back_credit()
            c._pay_interest()
            c._pay_machine_maintenance_()
            pass
        
        # do group stuff
        
        
        return None

    #def __do_sales(self, companies: list[Company], sales: int)
    
    def __sort_and_group(self, companies: list[Company], key):
        return [list(v) for k, v in groupby(sorted(companies, key=key), key=key)]

    
    def _sell_sneaker_tender_(self) -> None:
        key = lambda x: x.cycle.tender_offer_price
        batched_companies = self.__sort_and_group(companies=self.companies , key=key)
        sorted_companies = sorted([x for x in batched_companies if x.cycle.tender_offer_price], key=lambda x: (x._for_sale >= self.scenario.tender_offer_count))
        lowest_price_company = random.choice(sorted_companies[0])
        
        # sell tender
        lowest_price_company._for_sale -= self.scenario.tender_offer_count
        _income_tender = round(self.scenario.tender_offer_count * lowest_price_company.cycle.tender_offer_price, 2)
        lowest_price_company.result_stock.income_from_sales += _income_tender
        lowest_price_company.result_stock.real_sales += self.scenario.tender_offer_count
        lowest_price_company._update_account_balance_(update= + _income_tender)
        return None
    
    
    def __general_sales_in_batch(self, companies: list[Company], sales: int, key):
        _remaining_sales: int = sales
        companies.sort(key= lambda x: random)
        while _remaining_sales > 0:
            for c in companies:
                if _remaining_sales > 0:
                    c._for_sale -= 1
                    c.result_stock.real_sales += 1
                    c._update_account_balance_(update= + (key)(c))
                    c.result_stock.income_from_sales += (key)(c)
                    _remaining_sales -= 1
        for c in companies:
            c.result_stock.finished_sneaker_count = c._for_sale
        return _remaining_sales
    
    def _sell_sneaker_ad_(self) -> None:
        _remaining_sales: int = self._remaining_sales_ad
        key = lambda x: x.cycle.ad_invest
        batched_companies = self.__sort_and_group(companies=self.companies , key=key)
        # sell in batches
        sales_key = lambda c: c.cycle.sales_bid
        for b in batched_companies:
            _remaining_sales: int = self.__general_sales_in_batch(companies=b, sales=_remaining_sales, key=sales_key)
        self._remaining_sales_ad = _remaining_sales
        
        return _remaining_sales


    def _sell_sneaker_(self):
        _remaining_sales: int = self._remaining_sales
        key = lambda x: x.cycle.sales_bid
        batched_companies = self.__sort_and_group(companies=self.companies , key=key)
        # sell in batches
        sales_key = lambda c: c.cycle.sales_bid
        for b in batched_companies:
            _remaining_sales: int = self.__general_sales_in_batch(companies=b, sales=_remaining_sales, key=sales_key)
        self._remaining_sales = _remaining_sales
        
        return batched_companies
    
    
    
    
    
    ####
    def __normal_sales_randomly_in_batch(self, companies: list[Company], sales: int):# -> None:
        # do shuffle
        _remaining_sales: int = sales
        companies.sort(key= lambda x: random)
        while _remaining_sales > 0:
            for c in companies:
                if _remaining_sales > 0:
                    c._for_sale -= 1
                    c.result_stock.real_sales += 1
                    c._update_account_balance_(update= + (c.cycle.sales_bid))
                    c.result_stock.income_from_sales += (c.cycle.sales_bid)
                    _remaining_sales -= 1
        for c in companies:
            c.result_stock.finished_sneaker_count = c._for_sale
        key_normal = lambda c: c.cycle.sales_bid,
        key_normal = lambda c: c.cycle.tender_offer_price

        
        return _remaining_sales
        
    ######### sales #########
    def _sell_sneaker_(self):

        _remaining_sales: int = self._remaining_sales
        # s_key = lambda x: x.cycle.sales_bid

        batched_companies = [list(v) for k, v in groupby(sorted(self.companies, key=lambda x: x.cycle.sales_bid), key=lambda x: x.cycle.sales_bid)]
        #sorted_list: list = sorted(lel, key= lambda x : x[0].cycle.sales_bid)
        for inner_list in batched_companies:
            _remaining_sales: int = self.__normal_sales_randomly_in_batch(companies=inner_list, sales=_remaining_sales)
        # for elem in companies:
        #     if not any(tc.cycle.sales_bid == elem.cycle.sales_bid for tc in sorted_companies):
        #         pass
        return batched_companies
