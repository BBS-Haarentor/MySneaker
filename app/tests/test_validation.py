import pytest
from app.models.scenario import Scenario
from app.models.stock import Stock

from app.schemas.cycle import CycleCreate
from app.validation.cycle import CycleValidationError, validate_cycle_ltzero


@pytest.fixture
def test_cycle_valid():
    cycle_data: dict = {
        "current_cycle_index": 0,
        "planned_workers_3": 0,
        "payback_credit": 0,
        "game_id": 5,
        "buy_sneaker": 0,
        "include_from_stock": 0,
        "new_employees": 0,
        "buy_paint": 0,
        "sales_planned": 0,
        "let_go_employees": 0,
        "planned_production_1": 0,
        "sales_bid": 0,
        "buy_new_machine": 0,
        "company_id": 42,
        "planned_production_2": 0,
        "tender_offer_price": 0,
        "planned_production_3": 0,
        "research_invest": 0,
        "planned_workers_1": 0,
        "ad_invest": 0.0,
        "planned_workers_2": 0,
        "take_credit": 0.0,
    }
    return CycleCreate.parse_obj(cycle_data)

@pytest.fixture
def test_cycle_ltzero():
    cycle_data: dict = {
        "current_cycle_index": 0,
        "planned_workers_3": -5,
        "payback_credit": -5,
        "game_id": 5,
        "buy_sneaker": -10,
        "include_from_stock": -4,
        "new_employees": 0,
        "buy_paint": 0,
        "sales_planned": 0,
        "let_go_employees": 0,
        "planned_production_1": 0,
        "sales_bid": 0,
        "buy_new_machine": 0,
        "company_id": 42,
        "planned_production_2": 0,
        "tender_offer_price": 0,
        "planned_production_3": 0,
        "research_invest": 0,
        "planned_workers_1": 0,
        "ad_invest": 0.0,
        "planned_workers_2": 0,
        "take_credit": 0.0,
    }
    return CycleCreate.parse_obj(cycle_data)


@pytest.fixture(name="test_scenario")
def test_scenario():
    scenario_data: dict = {
        "char": "A",
        "description": "Politik  Aufgrund der hohen Überschüsse in den Sozialkassen ist in den kommenden Perioden mit einer Absenkung der Sozialbeiträge (Personalnebenkosten) zu rechnen.  Markteinschätzung  Der wirtschaftliche Aufschwung gewinnt an Dynamik. Die Nachfrage am Markt nach Sneakern dürfte gegenüber der Vorperiode um ca. 50 % zunehmen. ",
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
        "employee_production_capacity": 20,
        "employee_cost_modfier": 0.20,
        "machine_purchase_allowed": True,
        "sneaker_ask": 400,
        "tender_offer_count": 0,
        "factor_ad_take": 0.1,
    }
    return Scenario.parse_obj(scenario_data)


@pytest.fixture(name="test_stock")
def test_stock():
    stock_data: dict = {
        "paint_count": 0,
        "income_from_sales": 0,
        "company_id": 42,
        "finished_sneaker_count": 0,
        "research_production_modifier": 1,
        "game_id": 5,
        "employees_count": 8,
        "machine_1_space": 1,
        "id": 3,
        "research_budget": 0,
        "machine_2_space": 0,
        "creation_date": 1663151251.089532,
        "account_balance": 50000,
        "machine_3_space": 0,
        "last_edit": 1663151251.089544,
        "credit_taken": 0,
        "insolvent": False,
        "current_cycle_index": 0,
        "real_sales": 0,
        "tender_sales": 0,
        "sneaker_count": 0,
        "tender_price": 0,
    }
    return Stock.parse_obj(stock_data)


def test_validate_cycle_ltzero(test_cycle_ltzero):
    with pytest.raises(CycleValidationError):
        validate_cycle_ltzero(cylce=test_cycle_ltzero)
    


def test_validate_cycle_check_scenario(cycle=test_cycle_valid, scenario=test_scenario):
    pass


def test_validate_cycle_production(cycle=test_cycle_valid, stock=test_stock):
    pass


def test_validate_cycle_sales(cycle=test_cycle_valid, stock=test_stock):
    pass
