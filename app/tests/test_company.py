from itertools import cycle
import json
import logging
import unittest
from app.game_functions.company import Company
from app.game_functions.utils import Cheque, Invoice, Machine, MachineType, create_transaction
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
        return None
    
    
    def test_pay_employees(self) -> None:
        employee_test_count = 12
        self.company.stock.employees_count = employee_test_count
        self.company.pay_employees()
        salary_total: float = round(self.company.scenario.employee_salary * employee_test_count, 2)
        self.assertIsInstance(self.company.ledger[0], Invoice)
        self.assertEqual(self.company.ledger[0].amount, salary_total)
        return None
    
       
    def test_produce_sneakers(self) -> None:
        self.company.result_stock.finished_sneaker_count = 120
        self.company.result_stock.paint_count = 300
        self.company.result_stock.sneaker_count = 150
        
        self.company.cycle.include_from_stock = 100
        self.company.cycle.sales_planned = 200
        
        logging.warning(f"{len(self.company.machines)}")
        self.company.machines[0].planned_production = 100
        self.company.machines[0].planned_workers = 8
                
        self.company.produce_sneakers()
        
        self.assertEqual(self.company._for_sale, 200)
        self.assertEqual(self.company.result_stock.finished_sneaker_count, 20)
        
        self.assertIsInstance(self.company.ledger[0], Invoice)
        self.assertEqual(self.company.ledger[0].amount, round(self.company.scenario.production_cost_per_sneaker1 * 100, 2))
        
        self.assertEqual(self.company.result_stock.paint_count, 100)
        self.assertEqual(self.company.result_stock.sneaker_count, 50)
        
        
        return None
    
    def test_produce_sneaker_high_research(self) -> None:
        self.company.result_stock.finished_sneaker_count = 120
        self.company.result_stock.paint_count = 300
        self.company.result_stock.sneaker_count = 150
        
        self.company.cycle.include_from_stock = 100
        self.company.cycle.sales_planned = 200

        logging.warning(f"{len(self.company.machines)}")
        self.company.machines[0].planned_production = 100
        self.company.machines[0].planned_workers = 8
        self.company.machines[0].research_modifier = 0.7
        
        self.company.produce_sneakers()
        
        self.assertEqual(self.company._for_sale, 200)
        self.assertEqual(self.company.result_stock.finished_sneaker_count, 20)
        
        self.assertIsInstance(self.company.ledger[0], Invoice)
        self.assertEqual(self.company.ledger[0].amount, round(self.company.scenario.production_cost_per_sneaker1 * 100 * 0.7, 2))
        
        self.assertEqual(self.company.result_stock.paint_count, 100)
        self.assertEqual(self.company.result_stock.sneaker_count, 50)
        
        return None
    
    def test_produce_sneaker_all_machines(self) -> None:
        self.company.cycle.sales_planned = 1730
        self.company.result_stock.finished_sneaker_count = 30
        self.company.cycle.include_from_stock = 30
        self.company.machines = []
        self.company.result_stock.sneaker_count = 1720
        self.company.result_stock.paint_count = 3410
        self.company.machines.append(Machine(owner_id=self.company.company_id, slot=1, 
                                       type=MachineType.parse_obj(self.company.machine_types[1]),
                                       planned_production=200, 
                                       planned_workers=0,
                                       research_modifier=self.company.stock.research_production_modifier
                                       ))
        self.company.machines.append(Machine(owner_id=self.company.company_id, slot=2, 
                                        type=MachineType.parse_obj(self.company.machine_types[2]),
                                        planned_production=500, 
                                        planned_workers=0,
                                        research_modifier=self.company.stock.research_production_modifier
                                        ))
        self.company.machines.append(Machine(owner_id=self.company.company_id, slot=3, 
                                        type=MachineType.parse_obj(self.company.machine_types[3]),
                                        planned_production=1000, 
                                        planned_workers=0,
                                        research_modifier=self.company.stock.research_production_modifier
                                        ))
        
        self.company.produce_sneakers()
        
        self.assertEqual(self.company._for_sale, 1730)
        
        self.assertIsInstance(self.company.ledger[0], Invoice)
        self.assertEqual(self.company.ledger[0].amount, 
                         round(self.company.scenario.production_cost_per_sneaker1 * 200 , 2) +
                         round(self.company.scenario.production_cost_per_sneaker2 * 500 , 2) +
                         round(self.company.scenario.production_cost_per_sneaker3 * 1000 , 2))

        
        self.assertEqual(self.company.result_stock.paint_count, 10)
        self.assertEqual(self.company.result_stock.sneaker_count, 20)
        
        self.assertEqual(self.company.result_stock.finished_sneaker_count, 0)

        
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
        self.assertIsInstance(self.company.ledger[0], Invoice)
        self.assertEqual(self.company.ledger[0].amount, 4_000.00)
        return None
    
    
    def test_pay_machine_maintenance_2_spaces(self) -> None:
        self.company.machines.append(Machine(owner_id=self.company.company_id, slot=2, 
                                       type=MachineType.parse_obj(self.company.machine_types[3]),
                                       planned_production=0, 
                                       planned_workers=0,
                                       research_modifier=self.company.stock.research_production_modifier
                                       ))
        #logging.warning(f"{len(self.company.machines)=}")
        self.company.pay_machine_maintenance()
        self.assertIsInstance(self.company.ledger[0], Invoice)
        self.assertEqual(sum(x.amount for x in self.company.ledger), 12_000.00)
        return None
    
    
    def test_buy_new_machine(self) -> None:
        self.company.cycle.buy_new_machine = 3
        
        self.company.buy_new_machine()
        
        
        self.assertEqual(self.company.result_stock.machine_2_space, 3)
        self.assertIsInstance(self.company.ledger[0], Invoice)
        self.assertEqual(self.company.ledger[0].amount, 45_000.00)
        return None
    
    
    def test_update_employee_count_new_employees(self) -> None:
        new_employee_count = 3
        self.company.cycle.new_employees = new_employee_count
        self.company.update_employee_count()
        self.assertEqual(self.company.result_stock.employees_count, self.company.stock.employees_count + new_employee_count)
        return None
    
    
    def test_update_employee_count_let_go(self) -> None:
        let_go_count = 2
        self.company.cycle.let_go_employees = let_go_count
        self.company.update_employee_count()
        self.assertEqual(self.company.result_stock.employees_count, self.company.stock.employees_count - let_go_count)
        return None
    
    def test_update_research_first_level(self) -> None:
        investment: float = 2_500.00
        self.company.cycle.research_invest = investment
        self.company.update_research()
        self.assertEqual(self.company.result_stock.research_budget, investment)
        self.assertEqual(self.company.result_stock.research_production_modifier, 0.90)
        self.assertEqual(self.company.ledger[0].amount, 2_500)

        return None
    
    def test_update_research_max_cap(self) -> None:
        investment: float = 12_500.00
        self.company.cycle.research_invest = investment
        self.company.update_research()
        self.assertEqual(self.company.result_stock.research_budget, 2_500)
        self.assertEqual(self.company.result_stock.research_production_modifier, 0.9)
        self.assertEqual(self.company.ledger[0].amount, 2_500)
        return None
    
    
    def test_take_credit(self) -> None:
        credit: float = 12_000.00
        
        self.company.cycle.take_credit = credit
        self.company.take_credit()
        
        self.assertEqual(self.company.ledger[0].amount, credit)
        self.assertIsInstance(self.company.ledger[0], Cheque)
        self.assertEqual(self.company.result_stock.credit_taken, credit)
        
        return None
    
    def test_payback_credit(self) -> None:
        taken: float = 2_500.00
        payback: float = 2_000.00
        self.company.result_stock.credit_taken = taken
        self.company.cycle.payback_credit = payback
        
        self.company.payback_credit()
        self.assertIsInstance(self.company.ledger[0], Invoice)
        
        self.assertEqual(self.company.ledger[0].amount, payback)
        self.assertEqual(self.company.result_stock.credit_taken, 500.00)
        
        return None
    
    def test_update_dead(self) -> None:
        
        self.company.result_stock.account_balance = -200.00
        self.company.result_stock.credit_taken = 49_900.00
        
        self.company.update_dead()

        self.assertTrue(self.company.result_stock.insolvent)

        return None
    
    
    def test_do_inventory(self) -> None:
        self.company.stock.paint_count = 20
        self.company.stock.sneaker_count = 15
        self.company.stock.finished_sneaker_count = 10
        
        self.company.do_inventory()

        self.assertEqual(self.company.ledger[0].amount, round(20 * self.company.scenario.storage_fee_paint,2))
        self.assertEqual(self.company.ledger[1].amount, round(15 * self.company.scenario.storage_fee_sneaker,2))
        self.assertEqual(self.company.ledger[2].amount, round(10 * self.company.scenario.storage_fee_finished_sneaker,2))
        
        return None
    
    
    def test_stock_up(self) -> None:
        self.company.cycle.buy_sneaker = 30
        self.company.cycle.buy_paint = 100
        
        self.company.stock_up()
        
        self.assertEqual(self.company.ledger[0].amount, self.company.scenario.sneaker_price * 30)
        self.assertEqual(self.company.result_stock.sneaker_count, 30)
        
        self.assertEqual(self.company.ledger[1].amount, self.company.scenario.paint_price * 100)
        self.assertEqual(self.company.result_stock.paint_count, 100)
        return None
    
    
    def test_process_txs(self) -> None:
        
        self.company.add_tx([create_transaction(amount=500.00, company_id=self.company.company_id)])
        self.company.add_tx([create_transaction(amount= (-2_000.00), company_id=self.company.company_id)])
        
        self.company.process_transactions()
        
        self.assertEqual(self.company.result_stock.account_balance, 48_500.00)
        
        return None
    
    
    def test_tidy_shelves(self) -> None:
        self.company._for_sale = 100
        self.company.result_stock.finished_sneaker_count = 5
        self.company.tidy_shelves()
        
        self.assertEqual(self.company.result_stock.finished_sneaker_count, 105)
        return None
    