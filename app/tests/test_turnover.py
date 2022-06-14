

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