
from dataclasses import dataclass
from app.models.cycle import Cycle
from app.models.stock import Stock
from app.models.scenario import Scenario


@dataclass
class MachineType():
    
    name: str
    purchase_cost: float
    production_capacity: int
    employee_max: int 
    maintainance_cost: float 
    production_cost_per_sneaker: float 
    employee_production_capacity: int 
    

@dataclass
class Machine():
    
    type: MachineType
    slot: int
    
    planned_production: int
    planned_workers: int


class Game():
    
    input_cycles: list[Cycle]
    input_stocks: list[Stock]
    scenario: Scenario
    
    dead_stocks: list
    dead_cycles: list
    machines: dict
    research_levels: dict
    
    output_stocks: list[Stock]
    
    _remaining_ordered_sneaker: int
    _tender_offer_company_id: int
    
    
    
    def __init__(self, input_cycles: list[Cycle], input_stocks: list[Stock], scenario: Scenario) -> None:
        self.input_cycles = input_cycles
        self.input_stocks = input_stocks
        self.scenario = scenario
        
        self.research_levels = {
            2_500: 0.90,
            5_000: 0.82,
            7_500: 0.76,
            10_000: 0.72,
            12_500: 0.70
        }
        
        
        

        for stock in input_stocks:
            self.stock_output.append(Stock(company_id=stock.company_id, game_id=stock.game_id, current_cycle_index=stock.current_cycle_index + 1))
        
        _remaining_ordered_sneaker: int = scenario.sneaker_ask
        _remaining_ordered_sneaker_ad: int = round(_remaining_ordered_sneaker * scenario.factor_ad_take, None)
        _remaining_ordered_sneaker -= _remaining_ordered_sneaker_ad
        
        # load account_balance and credit
        
        # parse scenario to useful machine list
        
    def __sort_out_dead__(self) -> None:
        for s, c in zip(self.input_stocks, self.input_cycles):
            if s.insolvent:
                self.dead_stocks.append(s)
                self.dead_cycles.append(c)
                
                self.input_stocks.remove(s)
                self.input_cycles.remove(c)
                
        return None
    
    def _generate_machines_(self, index: int) -> None:
        slots = {
            0: self.input_stocks[index].machine_1_space,
            1: self.input_stocks[index].machine_2_space,
            2: self.input_stocks[index].machine_3_space
            }
        for k, v in slots:
            new_machine: Machine = Machine()
            if v > 0:
                new_machine: Machine = Machine()
                
                self.machines[index].append()
        if self.input_stocks[index].machine_1_space > 0:
            new_machine: Machine = Machine()
            self.machines[index].append(new_machine)
        
        return None
            
    def __get_output_stocks__(self) -> list[Stock]:
        return self.output_stocks
        
    
    def __turnover__(self) -> None:
        
        
        for i in range(len(self.input_cycles)):
            
            self._pay_employees_(index=i)
            self._update_employee_count(index=i)
            
            self._update_research_(index=i)
            
            
            
            self._update_dead_(index=i)
            
            return
        
        # add back dead companies
        
        raise NotImplementedError
    
    def _update_dead_(self, index: int) -> None:
        if self.output_stocks[index].credit_taken > 50_000:
            self.output_stocks[index].insolvent = True
        return None
    
    def _update_account_balance_(self, update: int, index: int) -> None:
        self.output_stocks[index].account_balance += update
        if self.output_stocks[index].account_balance < 0:
            self._update_credit_balance(update=-self.output_stocks[index].account_balance, index=index)
            self.output_stocks[index].account_balance = 0
        return None
    
    def _update_credit_balance_(self, update: int, index: int) -> None:
        self.output_stocks[index].credit_taken += update
        return None
    
    
    def _pay_employees_(self, index: int) -> None:
        _employee_salaries_: float = round((self.scenario.employee_salary * self.input_stocks[index].employees_count) , 2) 
        self._update_account_balance_(update=-_employee_salaries_, index=index)
        return None

    
    def _update_employee_count_(self, index: int) -> None:
        self.output_stocks[index].employees_count = self.input_stocks[index].employees_count + self.input_cycles[index].new_employees
        _signup_bonuses_: float = round((self.input_cycles[index].new_employees*self.scenario.employee_signup_bonus), 2)
        self._update_account_balance_(update=-_signup_bonuses_, index=index)
        self.output_stocks[index].employees_count -= self.input_cycles[index].let_go_employees 
        self.output_stocks[index].employees_count += self.scenario.employee_count_modifier_permanent
        return None


    def _update_research_(self, index: int) -> None:
        self.output_stocks[index].research_budget += self.input_cycles[index].research_invest
        self._update_account_balance_(update=-self.input_cycles[index].research_invest, index=index)
        self.output_stocks[index].research_production_modifier = self.input_stocks[index].research_production_modifier
        for k, v in self.research_levels:
            if self.output_stocks[index].research_budget >= k:
                self.output_stocks[index].research_production_modifier = v
        return None
    
    
    ## machine stuff
    
    def _pay_machine_maintenance_(self, index: int) -> None:
        _cumulative_cost: float = 0
        # parse scenario to usefull machine data
        
        if self.input_stocks[index].machine_1_space > 0:
            #_cumulative_cost += self.input_stocks[index].machine_1_space * 
            pass
        raise NotImplementedError

    
    def _produce_sneaker_(self) -> None:
        raise NotImplementedError

        
    def _sell_sneaker_(self) -> None:
        raise NotImplementedError

    
    def _sell_sneaker_ad_(self) -> None:
        raise NotImplementedError

    
    def _sell_sneaker_tender_(self) -> None:
        raise NotImplementedError

    
    def _buy_new_machine_(self, index: int) -> None:
        if self.input_cycles[index].buy_new_machine > 0:
    
            raise NotImplementedError

    


    
