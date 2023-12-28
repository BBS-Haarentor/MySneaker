export interface IScenario {
  id?: number;
  description: string;
  sneaker_price: number,
  paint_price: number;
  storage_fee_sneaker: number;
  storage_fee_paint: number;
  storage_fee_finished_sneaker: number;
  employee_count_modifier_permanent: number;
  factor_interest_rate: number;
  employee_salary: number;
  employee_signup_bonus: number;
  employee_production_capacity: number;
  employee_cost_modfier: number;
  sneaker_ask: number;
  factor_ad_take: number;
  tender_offer_count: number;
  employee_change_allowed: boolean;
  machine_purchase_allowed: boolean;
  research_allowed: boolean;
  advertisement_allowed: boolean;
}