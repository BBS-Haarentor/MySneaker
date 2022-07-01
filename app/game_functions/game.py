
from app.models.cycle import Cycle
from app.models.stock import Stock
from app.models.scenario import Scenario


class Game():
    
    input_cycles: list[Cycle]
    input_stocks: list[Stock]
    scenario: Scenario
    
    dead_data: list
    
    output_stocks: list[Stock]
    
    _remaining_ordered_sneaker: int
    _tender_offer_company_id: int
    
    
    
    def __init__(self, input_cycles: list[Cycle], input_stocks: list[Stock], scenario: Scenario) -> None:
        self.input_cycles = input_cycles
        self.input_stocks = input_stocks
        self.scenario = scenario
        
        for stock in input_stocks:
            self.stock_output.append(Stock(company_id=stock.company_id, game_id=stock.game_id, current_cycle_index=stock.current_cycle_index + 1))
        
        _remaining_ordered_sneaker: int = scenario.sneaker_ask
        _remaining_ordered_sneaker_ad: int = round(_remaining_ordered_sneaker * scenario.factor_ad_take, None)
        _remaining_ordered_sneaker -= _remaining_ordered_sneaker_ad
        
        # load account_balance and credit
        
    def __sort_out_dead__(self) -> None:
        raise NotImplementedError
            
    def __get_output_stocks__(self) -> list[Stock]:
        return self.output_stocks
        
    def __check_dead__(self, index: int) -> None:
        if self.output_stocks[index].credit_taken > 50_000:
            # set dead
            pass
        return None
    
    def __turnover__(self) -> None:
        
        
        for i in range(len(self.input_cycles)):
            
            self._pay_employees_(index=i)
            self._update_employee_count(index=i)
            
            
            self.__check_dead__(index=i)
            
            return
        
        raise NotImplementedError
    
    
    
    def _update_account_balance_(self, update: int, index: int) -> None:
        self.output_stocks[index].account_balance += update
        if self.output_stocks[index].account_balance < 0:
            self._update_credit_balance(update=-self.output_stocks[index].account_balance, index=index)
            self.output_stocks[index].account_balance = 0
        return None
    
    def _update_credit_balance(self, update: int, index: int) -> None:
        self.output_stocks[index].credit_taken += update
        return None
    
    
    def _pay_employees_(self, index: int) -> None:
        _employee_salaries_: float = round((self.scenario.employee_salary * self.input_stocks[index].employees_count) , 2) 
        self._update_account_balance_(update=-_employee_salaries_, index=index)
        return None

    
    def _update_employee_count(self, index: int) -> None:
        self.output_stocks[index].employees_count = self.input_stocks[index].employees_count +  self.input_cycles[index].new_employees - self.input_cycles[index].let_go_employees
        _signup_bonuses_: float = round((self.input_cycles[index].new_employees*self.scenario.employee_signup_bonus), 2)
        self._update_account_balance_(update=-_signup_bonuses_, index=index)
        return None

    
    
    def _pay_machine_maintenance_(self) -> None:
        raise NotImplementedError

    
    def _produce_sneaker_(self) -> None:
        raise NotImplementedError

    
        
    def _sell_sneaker_(self) -> None:
        raise NotImplementedError

    
    def _sell_sneaker_ad_(self) -> None:
        raise NotImplementedError

    
    def _sell_sneaker_tender_(self) -> None:
        raise NotImplementedError

    
    def _buy_new_machine_(self) -> None:
        raise NotImplementedError

    
    def _update_research_(self) -> None:
        raise NotImplementedError

    
