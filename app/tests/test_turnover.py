

import logging
import unittest
from app.game_functions.turnover import mock_turnover
from app.models.cycle import Cycle

from app.models.scenario import Scenario
from app.models.stock import Stock

class TestTurnover(unittest.TestCase):
    
    def setUp(self):
        scenarion_json = {
  "id": 0,
  "char": "X",
  "sneaker_price": 60,
  "paint_price": 10,
  "storage_fee_sneaker": 4.00,
  "storage_fee_paint": 1.00,
  "storage_fee_finished_sneaker": 8.00,
  "employee_count_modifier_temporary": 0,
  "employee_count_modifier_permanent": 0,
  "factor_interest_rate": 0.04,
  "employee_salary": 400,
  "employee_signup_bonus": 100,
  "employee_production_capacity": 10,
  "employee_cost_modfier": 0.00,
  "machine_purchase_allowed": False,
  "machine_purchase_cost": 1000.00,
  "sneaker_ask": 400,
  "factor_ad_take": 0.1,
  "machine_production_capacity": 200,
  "machine_maintainance_cost": 4000.00,
  "production_cost_per_sneaker": 60.00
}

    user_1_stock = {
  "game_id": 1,
  "current_cycle_index": 0,
  "company_id": 2,
  "buy_sneaker": 100,
  "buy_paint": 200,
  "planned_production_1": 100,
  "planned_production_2": 0,
  "planned_production_3": 0,
  "planned_workers_1": 5,
  "planned_workers_2": 0,
  "planned_workers_3": 0,
  "include_from_stock": 0,
  "sales_planned": 100,
  "sales_bid": 200.00,
  "tender_offer_count": 0,
  "tender_offer_price": 0.00,
  "research_invest": 1000.00,
  "ad_invest": 0.00,
  "take_credit": 1000.00,
  "payback_credit": 0.00,
  "new_employees": 2,
  "buy_new_machine_2": False,
  "buy_new_machine_3": False
    }

    user_2_stock = {
  "game_id": 1,
  "current_cycle_index": 0,
  "company_id": 2,
  "buy_sneaker": 160,
  "buy_paint": 320,
  "planned_production_1": 160,
  "planned_production_2": 0,
  "planned_production_3": 0,
  "planned_workers_1": 8,
  "planned_workers_2": 0,
  "planned_workers_3": 0,
  "include_from_stock": 0,
  "sales_planned": 160,
  "sales_bid": 130.00,
  "tender_offer_count": 0,
  "tender_offer_price": 0.00,
  "research_invest": 2500.00,
  "ad_invest": 0.00,
  "take_credit": 0.00,
  "payback_credit": 0.00,
  "new_employees": 0,
  "buy_new_machine_2": False,
  "buy_new_machine_3": False
    }

        
        self.scenario: Scenario = Scenario.from_orm(scenarion_json)
        logging.error(f"{self.scenario=}")
        self.stock_list: list[Stock] = [] 
        self.cycle_list: list[Cycle] = []
    
    def test_turnover_management_parameters(self):
        self.assertEqual(self.scenario.__class__, Scenario().__class__)
        result_stocks: list[Stock] = mock_turnover(scenario=self.scenario, stock_list=self.stock_list, cycle_list=self.cycle_list)
        
        self.assertEq
        
if __name__ == "__main__":
    unittest.main()