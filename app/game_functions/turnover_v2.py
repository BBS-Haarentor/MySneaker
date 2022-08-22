from itertools import groupby
import logging
import random
from app.game_functions.company import Company
from app.models.cycle import Cycle
from app.models.stock import Stock
from app.models.scenario import Scenario
from app.schemas.stock import StockCreate






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
        self.__generate_companies(input_cycles=input_cycles, input_stocks=input_stocks)
        self.__sort_out_dead()
        
        # Environment
        self._remaining_sales: int = scenario.sneaker_ask
        self._remaining_sales_ad: int = round(self._remaining_sales * scenario.factor_ad_take, None)
        self._remaining_sales -= self._remaining_sales_ad
        return None
    
    
    def __generate_companies(self, input_cycles: list[Cycle], input_stocks: list[Stock]) -> None:
        sorted_cycles: list[Cycle] = sorted(input_cycles, key= lambda x: x.company_id)
        sorted_stocks: list[Stock] = sorted(input_stocks, key= lambda x: x.company_id)
        zipped = zip(sorted_cycles, sorted_stocks)
        for c,s in zipped:
            self.companies.append(Company(company_id=c.company_id, cycle=c, stock=s, scenario=self.scenario))
        self.__sort_out_dead()
        return None
    
    
    def __sort_out_dead(self) -> None:
        
        for c in self.companies:
            if c.stock.insolvent:
                self.dead_companies.append(c)
                self.companies.remove(c)
        return None
    
    def __process_dead(self) -> None:
        
        return None
    
    def turnover(self) -> list[StockCreate]:
    
        # do single stuff
        for c in self.companies:
            c._pay_employees()
            c._produce_sneakers()
            c._take_and_pay_back_credit()
            c._pay_interest()
            c._pay_machine_maintenance()
            c._buy_new_machine()
            c._do_inventory()
            c._update_employee_count()
            c._update_research()
            
            c._update_dead()

        
        # do group stuff
        self._sell_sneaker_tender()
        self._sell_sneaker_ad()
        self._sell_sneaker()
        
        return None


    def __sort_and_group(self, companies: list[Company], key):
        return [list(v) for k, v in groupby(sorted(companies, key=key), key=key)]

    
    
    def _sell_sneaker_tender(self) -> None:
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
                    c._update_account_balance_(update= + key(c))
                    c.result_stock.income_from_sales += key(c)
                    _remaining_sales -= 1
        for c in companies:
            c.result_stock.finished_sneaker_count = c._for_sale
        return _remaining_sales
    
    
    def _sell_sneaker_ad(self) -> None:
        _remaining_sales: int = self._remaining_sales_ad
        key = lambda x: x.cycle.ad_invest
        batched_companies = self.__sort_and_group(companies=self.companies , key=key)
        # sell in batches
        sales_key = lambda c: c.cycle.sales_bid
        for b in batched_companies:
            _remaining_sales: int = self.__general_sales_in_batch(companies=b, sales=_remaining_sales, key=sales_key)
        self._remaining_sales_ad = _remaining_sales
        
        return _remaining_sales


    def _sell_sneaker(self):
        _remaining_sales: int = self._remaining_sales
        key = lambda x: x.cycle.sales_bid
        batched_companies = self.__sort_and_group(companies=self.companies , key=key)
        # sell in batches
        sales_key = lambda c: c.cycle.sales_bid
        for b in batched_companies:
            _remaining_sales: int = self.__general_sales_in_batch(companies=b, sales=_remaining_sales, key=sales_key)
        self._remaining_sales = _remaining_sales
        
        return _remaining_sales
    
    
    
    
    
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
    def _sell_sneaker(self):

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
