import { ICompany } from './company.interface';

export interface ICycle {
  id: number;
  current_cycle_index: number;
  company: ICompany;
  buy_sneaker: number;
  buy_paint: number;
  planned_production_1: number;
  planned_production_2: number;
  planned_production_3: number;
  planned_workers_1: number;
  planned_workers_2: number;
  planned_workers_3: number;
  include_from_stock: number;
  sales_planned: number;
  sales_bid: number;
  tender_offer_price: number;
  research_invest: number;
  ad_invest: number;
  take_credit: number;
  payback_credit: number;
  new_employees: number;
  let_go_employees: number;
  buy_new_machine: number;
}