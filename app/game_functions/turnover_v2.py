import inspect
from itertools import groupby
import logging
from random import choice, random
from app.game_functions.company import Company
from app.game_functions.utils import Transaction, create_transaction
from app.models.cycle import Cycle
from app.models.stock import Stock
from app.models.scenario import Scenario


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
        self.dead_companies = []
        for c in self.companies:
            if c.stock.insolvent:
                self.dead_companies.append(c)
                self.companies.remove(c)
        return None
    
    
    def __process_dead(self) -> None:
        """Called after all operations on alive companies

        Returns:
            NoneType: Mutates self.companies 
        """
        for dc in self.dead_companies:
            self.companies.append(dc)
        return None
    
    
    def turnover(self):# -> list[StockCreate]:
        
        # do single stuff
        for c in self.companies:
            c.stock_up()
            c.do_inventory()
            c.pay_employees()
            c.pay_employees_cost_modfier()
            c.produce_sneakers()
            c.pay_interest()
            c.pay_machine_maintenance()
            c.buy_new_machine()
            c.update_employee_count()
            c.update_research()
            c.take_credit()
            c.payback_credit()    
            
        logging.warning(f"\nGroup calc start\n\n")
        # do group stuff
        self.sell_sneaker_tender()
        self.sell_sneaker_ad()
        self.sell_sneaker()
        
        
        for c in self.companies:
            c.process_transactions()
            c.tidy_shelves()
            c.update_dead()
        
        self.__process_dead()
        
        return [ x.result_stock for x in self.companies ]


    def __sort_and_group(self, companies: list[Company], key) -> list[list[Company]]:
        return [list(v) for k, v in groupby(sorted(companies, key=key), key=key)]

    
    
    def sell_sneaker_tender(self) -> None:
        key = lambda x: x.cycle.tender_offer_price 
        batched_companies = self.__sort_and_group(companies=self.companies , key=key)
        sorted_companies2 = [x for x in batched_companies if x[0]._for_sale >= self.scenario.tender_offer_count]
        sorted_companies = [x for x in sorted_companies2 if x[0].cycle.tender_offer_price > 0.0]
        #sorted_companies = sorted([x for x in batched_companies if x[0].cycle.tender_offer_price], key=lambda x: (x[0]._for_sale >= self.scenario.tender_offer_count))
        #logging.warning(f"{sorted_companies=}")
        if len(sorted_companies) <= 0:
            return None
        lowest_price_company = choice(sorted_companies[0])
        
        # sell tender
        lowest_price_company._for_sale -= self.scenario.tender_offer_count
        _income_tender = round(self.scenario.tender_offer_count * lowest_price_company.cycle.tender_offer_price, 2)
        lowest_price_company.result_stock.income_from_sales += _income_tender
        lowest_price_company.result_stock.real_sales += self.scenario.tender_offer_count
        logging.warning(f"{_income_tender=} - {lowest_price_company.cycle.tender_offer_price=}- {self.scenario.tender_offer_count=}")

        tx: Transaction = create_transaction(amount= _income_tender, company_id=lowest_price_company.company_id, detail={ "_income_tender": _income_tender })
        lowest_price_company.add_tx([tx])
        
        lowest_price_company.result_stock.tender_sales = self.scenario.tender_offer_count
        lowest_price_company.result_stock.tender_price = lowest_price_company.cycle.tender_offer_price
        
        
        # move sneakers from not awarded companies to storage
        non_winning_companies = [c for c in self.companies if (c.company_id != lowest_price_company.company_id) and (c.cycle.tender_offer_price > 0.0)]
        
        for nw in non_winning_companies:
            nw.result_stock.finished_sneaker_count += self.scenario.tender_offer_count
            nw._for_sale -= self.scenario.tender_offer_count
        
        return None
    
    
    def __general_sales_in_batch(self, companies: list[Company], sales: int, price_key):
        if sales <= 0:
            return sales
        curframe = inspect.currentframe()
        callframe = inspect.getouterframes(curframe)
        issuer = callframe[1][3]
        _remaining_sales: int = sales
        companies.sort(key= lambda x: random())
        company_dict = dict(zip(companies, [0 for x in companies]))
        while _remaining_sales > 0:
            for c,count in company_dict.items():
                if _remaining_sales > 0 and c._for_sale > 0:
                    c._for_sale -= 1
                    c.result_stock.real_sales += 1
                    company_dict[c] += 1      
                    _remaining_sales -= 1
            if sum(x._for_sale for x in companies) <= 0:
                break
        for c,count in company_dict.items():
            logging.warning(f"{count=}")
            tx: Transaction = create_transaction(amount=  price_key(c) * count, company_id=c.company_id, detail={ "sale_price_sneaker": (price_key(c)),
                                                                                                                    "sale_type": issuer})
            c.add_tx([tx])
            c.result_stock.income_from_sales += price_key(c) * count

        return _remaining_sales
    
    
    def sell_sneaker_ad(self) -> None:
        _remaining_sales: int = self._remaining_sales_ad
        sort_key = lambda x: - x.cycle.ad_invest
        batched_companies = self.__sort_and_group(companies=self.companies , key=sort_key)
        sorted_companies = [x for x in batched_companies if x[0].cycle.ad_invest > 0.0]

        sales_key = lambda c: c.cycle.sales_bid
        for b in sorted_companies:
            _remaining_sales: int = self.__general_sales_in_batch(companies=b, sales=_remaining_sales, price_key=sales_key)
        self._remaining_sales_ad = _remaining_sales
        
        return None


    def sell_sneaker(self):
        
        _remaining_sales: int = self._remaining_sales
        _remaining_sales += self._remaining_sales_ad
        sort_key = lambda x: x.cycle.sales_bid
        batched_companies = self.__sort_and_group(companies=self.companies , key=sort_key)
        # sell in batches
        sales_key = lambda c: c.cycle.sales_bid
        for b in batched_companies:
            _remaining_sales: int = self.__general_sales_in_batch(companies=b, sales=_remaining_sales, price_key=sales_key)
        self._remaining_sales = _remaining_sales
        
        return None
