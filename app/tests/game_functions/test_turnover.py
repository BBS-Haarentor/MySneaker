

import unittest
from app.models.cycle import Cycle

from app.models.scenario import Scenario
from app.models.stock import Stock


class TestTurnover(unittest.TestCase):
    
    def setUp(self):
        self.scenario: Scenario = []
        self.stock_list: list[Stock] = [] 
        self.cycle_list: list[Cycle] = []
    
    def test_turnover_management_parameters(self):
        self.assertEqual(self.scenario.__class__, Scenario.__class__)