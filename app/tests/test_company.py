from itertools import cycle
import json
import logging
import unittest
from app.game_functions.company import Company
from app.game_functions.utils import Invoice
from app.models.cycle import Cycle

from app.models.scenario import Scenario
from app.models.stock import Stock


class TestCompany(unittest.TestCase):
    
    company: Company

    
    
    
    def setUp(self) -> None:
        # load default data
        with open('./app/tests/test_data/cycles.json') as file:
            cycle_data = json.load(file)
            cycle = Cycle.parse_obj(cycle_data["data"]["default"])
        with open('./app/tests/test_data/stocks.json') as file:
            stock_data = json.load(file)
            stock = Stock.parse_obj(stock_data["data"]["default"])
        with open('./app/db/seeds/scenario_seed_data.json') as file:
            scenarios = json.load(file)
            scenario = Scenario.parse_obj(scenarios["data"][0])

        self.company = Company(company_id=cycle.company_id, cycle=cycle, stock=stock, scenario=scenario)
        logging.warning(f"\n{self.company=}")

        return None
    
    
    def test_pay_employees(self) -> None:
        employee_test_count = 12
        self.company.stock.employees_count = employee_test_count
        self.company.pay_employees()
        salary_total: float = round(self.company.scenario.employee_salary * employee_test_count, 2)
        self.assertEqual(self.company.ledger[0].amount, salary_total)
        return None
        
        
    def test_produce_sneakers(self) -> None:
        
        return None
    
    def test_pay_interest(self) -> None:
        self.company.stock.credit_taken = 5000
        self.company.pay_interest()
        interest: float = round(self.company.stock.credit_taken * self.company.scenario.factor_interest_rate)
        
        self.assertIsInstance(self.company.ledger[0], Invoice)
        self.assertEqual(self.company.ledger[0].amount, interest)
        
        return None
    

    def test_pay_machine_maintenance_simple(self) -> None:
        self.company.pay_machine_maintenance()
        
        return None
    
    
    def test_pay_machine_maintenance_2_spaces(self) -> None:
        self.company.stock.machine_2_space = 2
        
        return None
    
    
    def test_buy_new_machine(self) -> None:
        self.company.cycle.buy_new_machine = 3
        return None
    
    
    def test_update_employee_count_new(self) -> None:
        self.company.cycle.new_employees = 3
        self.company.update_employee_count()
        return None
    
    
    def test_update_employee_count_let_go(self) -> None:
        self.company.cycle.let_go_employees = 2
        self.company.update_employee_count()
        return None
    
    def test_update_research(self) -> None:
        
        return None
    
    def test_take_credit(self) -> None:
        
        return None
    
    def test_payback_credit(self) -> None:
        
        return None
    
    def test_update_dead(self) -> None:
        
        return None
    
    
    def test_do_inventory(self) -> None:
        
        return None
    
    def test_process_txs(self) -> None:
        
        return None