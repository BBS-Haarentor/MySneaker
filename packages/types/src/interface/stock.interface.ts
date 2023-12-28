import { ICompany } from './company.interface';

export interface IStock {
  id: number;
  company: ICompany;
  current_cycle_index: number;
  sneaker_count: number;
  paint_count: number;
  finished_sneaker_count: number;
  employees_count: number;
  research_budget: number;
  account_balance: number;
  credit_taken: number;
  real_sales: number;
  income_from_sales: number;
  research_production_modifier: number;
  machine_1_space: number;
  machine_2_space: number;
  machine_3_space: number;
  insolvent: boolean;
  tender_sales: number;
  tender_price: number;
}