import logging
from types import NoneType
import unittest
from app.game_functions.turnover_v2 import Turnover
from app.models.cycle import Cycle

from app.models.scenario import Scenario
from app.models.stock import Stock


class TestTurnover(unittest.TestCase):
    turnover: Turnover
    
    def setUp(self) -> None:
        scenarion_dict = {
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
            "production_cost_per_sneaker": 60.00,
            "tender_offer_count": 50
        }
        test_cycle_0 = {
            "game_id": 1,
            "current_cycle_index": 0,
            "company_id": 3,
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
            "sales_bid": 400.00,
            "tender_offer_price": 5.00,
            "research_invest": 1000.00,
            "ad_invest": 0.00,
            "take_credit": 1000.00,
            "payback_credit": 0.00,
            "new_employees": 2,
            "let_go_employees": 0,
            "buy_new_machine": 0
        }

        test_cycle_1 = {
            "game_id": 1,
            "current_cycle_index": 0,
            "company_id": 2,
            "buy_sneaker": 200,
            "buy_paint": 400,
            "planned_production_1": 300,
            "planned_production_2": 0,
            "planned_production_3": 0,
            "planned_workers_1": 8,
            "planned_workers_2": 0,
            "planned_workers_3": 0,
            "include_from_stock": 0,
            "sales_planned": 300,
            "sales_bid": 400.00,
            "tender_offer_price": 2.00,
            "research_invest": 4000.00,
            "ad_invest": 10.00,
            "take_credit": 100.00,
            "payback_credit": 1000.00,
            "new_employees": 2,
            "let_go_employees": 0,
            "buy_new_machine": 0
        }

        default_stock = {
            "id": 0,
            "game_id": 0,
            "company_id": 0,
            "creation_date": 12345.0,
            "current_cycle_index": 0,
            "sneaker_count": 0,
            "paint_count": 0,
            "finished_sneaker_count": 0,
            "employees_count": 8,
            "research_budget": 0,
            "account_balance": 0,
            "credit_taken": 0,
            "machine_1_bought": 1,
            "machine_2_bought": False,
            "machine_3_bought": False,
            "real_sales": 0,
            "income_from_sales": 0,
            "research_production_modifier": 0
        }

        self.scenario: Scenario = Scenario.parse_obj(scenarion_dict)
        self.stock_list: list[Stock] = []
        self.cycle_list: list[Cycle] = []

        user_1_stock: Stock = Stock.parse_obj(default_stock)
        user_1_stock.company_id = 5
        self.stock_list.append(user_1_stock)
        user_2_stock: Stock = Stock.parse_obj(default_stock)
        user_2_stock.company_id = 6
        self.stock_list.append(user_2_stock)

        
        self.cycle_list.append(Cycle.parse_obj(test_cycle_1))
        self.cycle_list.append(Cycle.parse_obj(test_cycle_0))
        
        self.turnover = Turnover(input_cycles=self.cycle_list, input_stocks=self.stock_list, scenario=self.scenario)


    def test_type_safety_scenario(self) -> None:
        self.assertIsInstance(self.scenario, Scenario)

    def test_type_safety_cycle_list(self) -> None:
        self.assertIsInstance(self.cycle_list, list)
        self.assertIsInstance(self.cycle_list[0], Cycle)



    def test_game_init(self) -> None:
        for c in self.turnover.companies:
            #print(f"{c.stock=} - {c.cycle=} - {c.result_stock=}")
            logging.warning(f"{c.stock=} - {c.cycle=} - {c.result_stock=}")




    def test_sell_sneaker_simple(self) -> None:
        # setup sneakers ready for sale -> tested in test_company_init
        for c in self.turnover.companies:
            c._for_sale = c.cycle.sales_planned
        self.turnover._remaining_sales = sum(x._for_sale for x in self.turnover.companies)
        self.turnover.sell_sneaker()
        for c in self.turnover.companies:
            logging.warning(f"{c.ledger}")
        self.assertEqual(self.turnover._remaining_sales, 0)
        
        return None
    
    def test_sell_sneaker_oversupply(self) -> None:
        """Tests normal sneaker sale with more sneakers for sale than asks are given by the scenario

        Raises:
            NotImplementedError: _description_
        """
        for c in self.turnover.companies:
            c._for_sale = c.cycle.sales_planned 
        self.turnover._remaining_sales = sum(x._for_sale for x in self.turnover.companies) - 10
        self.turnover.sell_sneaker()
        for c in self.turnover.companies:
            logging.warning(f"{c.ledger}")
        self.assertEqual(self.turnover._remaining_sales, 0)
        
        return None

    def test_sell_sneaker_undersupply(self) -> None:
        for c in self.turnover.companies:
            c._for_sale = c.cycle.sales_planned 
        self.turnover._remaining_sales = sum(x._for_sale for x in self.turnover.companies) + 10
        self.turnover.sell_sneaker()
        for c in self.turnover.companies:
            logging.warning(f"{c.ledger}")
        self.assertEqual(self.turnover._remaining_sales, 10)
        
        return None
    
    def test_sell_sneaker_no_offers(self) -> None:
        for c in self.turnover.companies:
            c._for_sale = 0
        self.turnover._remaining_sales = 100
        self.turnover.sell_sneaker()
        for c in self.turnover.companies:
            logging.warning(f"{c.ledger}")
        self.assertEqual(self.turnover._remaining_sales, 100)
        return None
    
    
    def test_sell_sneaker_ad_simple(self) -> None:
        
        raise NotImplementedError
    
    def test_sell_sneaker_ad_oversupply(self) -> None:
        
        raise NotImplementedError

    def test_sell_sneaker_ad_undersupply(self) -> None:
        
        raise NotImplementedError
    
    def test_sell_sneaker_ad_no_offers(self) -> None:
        
        raise NotImplementedError
    
    
    def test_sell_sneaker_all(self) -> None:
        raise NotImplementedError
    
    
    
    def test_sell_sneaker_tender(self) -> None:
        lowest_price: float = 2.00
        self.turnover.companies[0].cycle.tender_offer_price = lowest_price
        self.turnover.companies[1].cycle.tender_offer_price = 50.00
        self.turnover.scenario.tender_offer_count = 100
        for c in self.turnover.companies:
            c._for_sale = self.scenario.tender_offer_count
        
        self.turnover.sell_sneaker_tender()
        
        self.assertEqual(self.turnover.companies[0].result_stock.tender_sales, 100)
        self.assertEqual(self.turnover.companies[0].ledger[0].amount, lowest_price * self.turnover.scenario.tender_offer_count)
        return None
    
    def test_sell_sneaker_tender_sortout(self) -> None:
        """Tests sell_sneaker_tender() on edge case where the lowest price company 
        does not have enough sneakers for sale.
        
        Expected: Higher price company gets tender sales

        
        """
        lowest_price: float = 2.00
        self.turnover.companies[0].cycle.tender_offer_price = lowest_price
        self.turnover.companies[1].cycle.tender_offer_price = 5.00
        
        self.turnover.scenario.tender_offer_count = 100
        self.turnover.companies[0]._for_sale = 90
        self.turnover.companies[1]._for_sale = self.scenario.tender_offer_count
        
        self.turnover.sell_sneaker_tender()
        
        self.assertIsInstance(self.turnover.companies[0].result_stock.tender_sales, NoneType)
        self.assertEqual(self.turnover.companies[1].result_stock.tender_sales, self.scenario.tender_offer_count)
        self.assertEqual(self.turnover.companies[1].result_stock.tender_price, self.turnover.companies[1].cycle.tender_offer_price)
        return None
    
    def test_sell_sneaker_tender_no_offers(self) -> None:
        
        raise NotImplementedError
    
    def test_sell_sneaker_tender_no_fitting_offers(self) -> None:
        
        raise NotImplementedError
    

if __name__ == "__main__":
    unittest.main()
