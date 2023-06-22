import logging
from app.exception.general import ValidationError
from app.game_functions.company import Company

from app.schemas.cycle import CycleCreate
from app.models.scenario import Scenario
from app.models.stock import Stock

    # ORGA
    ## game_id: int | None  
    ## current_cycle_index: int | None
    ## company_id: int | None
    
    # Production
    ## buy_sneaker: int
    ## buy_paint: int
    ## planned_production_1: int
    ## planned_production_2: int
    ## planned_production_3: int
    ## planned_workers_1: int
    ## planned_workers_2: int
    ## planned_workers_3: int 
    ## include_from_stock: int
    ## sales_planned: int
    ## sales_bid: float
    ## tender_offer_price: float
    ## research_invest: float
    ## ad_invest: float
    
    ## take_credit: float
    ## payback_credit: float
    ## new_employees: int
    ## let_go_employees: int
    ## buy_new_machine: int

def validate_cycle_new(cycle: CycleCreate, stock: Stock, scenario: Scenario) -> None: 
    
    validate_cycle_ltzero(cycle=cycle)
    
    # company: Company = Company(company_id=cycle.company_id, 
    #                            cycle=cycle, 
    #                            stock=stock, 
    #                            scenario=scenario)
    
    validate_cycle_check_scenario(cycle=cycle, scenario=scenario)
    validate_cycle_production(cycle=cycle, stock=stock)
    validate_cycle_sales(cycle=cycle, stock=stock)
    
    return None


def validate_cycle_ltzero(cylce: CycleCreate) -> None:
    for k, v in cylce.dict(exclude={"game_id", "current_cycle_index", "company_id"}, exclude_none=True).items():
        if v < 0:
            raise CycleValidationError(user_message=f"{k} darf nicht < 0 sein.")            

    return None

def validate_cycle_check_scenario(cycle: CycleCreate, scenario: Scenario) -> None:
    
    
    raise NotImplementedError

def validate_cycle_production(cycle: CycleCreate, stock: Stock) -> None:
    machine_ref: dict = {}
    Company.__generate_machine_types()
    Company.__create_machines()
    
    raise NotImplementedError

def validate_cycle_sales(cycle: CycleCreate, stock: Stock) -> None:
    raise NotImplementedError



def validate_cycle(cycle: CycleCreate, stock: Stock, scenario: Scenario) -> None:
    if cycle.buy_sneaker < 0:
        raise CycleValidationError(
            user_message="Es können nicht weniger als 0 Sneaker gekauft werden.")

    if cycle.buy_paint < 0:
        raise CycleValidationError(
            user_message="Es können nicht weniger als 0 Farben gekauft werden.")

    if cycle.sales_planned < 0:
        raise CycleValidationError(
            user_message="Es können keine negativen Schuhe verkauft werden.")

    if cycle.planned_production_1 > (cycle.planned_workers_1*scenario.machine_production_capacity1):
        raise CycleValidationError(
            user_message=f"Es können nur {cycle.planned_workers_1*scenario.machine_production_capacity1} Schuhe an der Maschine produziert werden.")
    if cycle.planned_production_1 < 0:
        raise CycleValidationError(
            user_message="Es können nicht weniger als 0 Schuhe produziert werden.")

    if stock.machine_2_space == 1:
        if cycle.planned_production_2 > (cycle.planned_workers_2*scenario.machine_production_capacity1):
            raise CycleValidationError(
                user_message=f"Es können nur {cycle.planned_workers_2*scenario.machine_production_capacity1} Schuhe an der Maschine produziert werden.")
        if cycle.planned_production_2 < 0:
            raise CycleValidationError(
                user_message="Es können nicht weniger als 0 Schuhe produziert werden.")

    if stock.machine_2_space == 2:
        if cycle.planned_production_2 > (cycle.planned_workers_2*scenario.machine_production_capacity2):
            raise CycleValidationError(
                user_message=f"Es können nur {cycle.planned_workers_2*scenario.machine_production_capacity2} Schuhe an der Maschine produziert werden.")
        if cycle.planned_production_2 < 0:
            raise CycleValidationError(
                user_message="Es können nicht weniger als 0 Schuhe produziert werden.")

    if stock.machine_2_space == 3:
        if cycle.planned_production_2 > (cycle.planned_workers_2*scenario.machine_production_capacity3):
            raise CycleValidationError(
                user_message=f"Es können nur {cycle.planned_workers_2*scenario.machine_production_capacity3} Schuhe an der Maschine produziert werden.")
        if cycle.planned_production_2 < 0:
            raise CycleValidationError(
                user_message="Es können nicht weniger als 0 Schuhe produziert werden.")

    if stock.machine_3_space == 1:
        if cycle.planned_production_3 > (cycle.planned_workers_3*scenario.machine_production_capacity1):
            raise CycleValidationError(
                user_message=f"Es können nur {cycle.planned_workers_3*scenario.machine_production_capacity1} Schuhe an der Maschine produziert werden.")
        if cycle.planned_production_3 < 0:
            raise CycleValidationError(
                user_message="Es können nicht weniger als 0 Schuhe produziert werden.")

    if stock.machine_3_space == 2:
        if cycle.planned_production_3 > (cycle.planned_workers_3*scenario.machine_production_capacity2):
            raise CycleValidationError(
                user_message=f"Es können nur {cycle.planned_workers_3*scenario.machine_production_capacity2} Schuhe an der Maschine produziert werden.")
        if cycle.planned_production_3 < 0:
            raise CycleValidationError(
                user_message="Es können nicht weniger als 0 Schuhe produziert werden.")

    if stock.machine_3_space == 3:
        if cycle.planned_production_3 > (cycle.planned_workers_3*scenario.machine_production_capacity3):
            raise CycleValidationError(
                user_message=f"Es können nur {cycle.planned_workers_3*scenario.machine_production_capacity3} Schuhe an der Maschine produziert werden.")
        if cycle.planned_production_3 < 0:
            raise CycleValidationError(
                user_message="Es können nicht weniger als 0 Schuhe produziert werden.")

    if cycle.planned_workers_1 > scenario.machine_employee_max:
        raise CycleValidationError(
            user_message=f"Es können nur {scenario.machine_employee_max} Arbeiter an der Maschine arbeiten.")
    if cycle.planned_workers_1 < 0:
        raise CycleValidationError(
            user_message="Es können nicht weniger als 0 Arbeiter an der Maschine arbeiten.")

    if cycle.planned_workers_2 > scenario.machine_employee_max:
        raise CycleValidationError(
            user_message=f"Es können nur {scenario.machine_employee_max} Arbeiter an der Maschine arbeiten.")
    if cycle.planned_workers_2 < 0:
        raise CycleValidationError(
            user_message="Es können nicht weniger als 0 Arbeiter an der Maschine arbeiten.")

    if cycle.planned_workers_3 > scenario.machine_employee_max:
        raise CycleValidationError(
            user_message=f"Es können nur {scenario.machine_employee_max} Arbeiter an der Maschine arbeiten.")
    if cycle.planned_workers_3 < 0:
        raise CycleValidationError(
            user_message="Es können nicht weniger als 0 Arbeiter an der Maschine arbeiten.")

    if cycle.include_from_stock < 0:
        raise CycleValidationError(
            user_message="Es kann nicht mehr aus dem Lager entnommen werden, als enthalten sind.")

    if cycle.sales_planned < 0:
        raise CycleValidationError(
            user_message="Es können nicht mehr Schuhe verkauft werden, als vorhanden sind")
    if cycle.sales_planned > (cycle.planned_production_1+cycle.planned_production_2+cycle.planned_production_3+cycle.include_from_stock):
        raise CycleValidationError(
            user_message="Es können nicht mehr Schuhe verkauft werden, als produziert wurden und auf Lager sind")

    if cycle.sales_bid > 300:
        raise CycleValidationError(
            user_message="Es darf nicht mehr Geld für Sneakers verlangt werden als 300 €")
    if cycle.sales_bid < 0:
        raise CycleValidationError(
            user_message="Dein Unternehmen bezahlt Geld, um Sneaker zu verkaufen.")

    if cycle.tender_offer_price > 300:
        raise CycleValidationError(
            user_message="Es darf nicht mehr Geld für Sneakers verlankt werden als 300 €")
    if cycle.tender_offer_price < 0:
        raise CycleValidationError(
            user_message="Dein Unternehmen bezahlt Geld, um Sneaker zu verkaufen.")

    if cycle.research_invest < 0:
        raise CycleValidationError(
            user_message="Dein Unternehmen kann nicht weniger als 0 € in die Entwicklung stecken")
    if cycle.research_invest < 0:
        raise CycleValidationError(
            user_message="Dein Unternehmen kann kein Geld aus der Entwicklung nehmen.")
    if cycle.research_invest < 2_500:
        if stock.research_budget + cycle.research_invest > 2_500:
            raise CycleValidationError(
                user_message="Dein Unternehmen kann nur eine Entwicklungsstufe pro Periode erreichen. Diese Stufe geht bis zu 2.500.00€")
    if cycle.research_invest < 5_000:
        if stock.research_budget + cycle.research_invest > 5_000:
            raise CycleValidationError(
                user_message="Dein Unternehmen kann nur eine Entwicklungsstufe pro Periode ereichen. Diese Stufe geht bis zu 5.000.00€")
    if cycle.research_invest < 7_500:
        if stock.research_budget + cycle.research_invest > 7_500:
            raise CycleValidationError(
                user_message="Dein Unternehmen kann nur eine Entwicklungsstufe pro Periode ereichen. Diese Stufe geht bis zu 7.500.00€")
    if cycle.research_invest < 10_000:
        if stock.research_budget + cycle.research_invest > 10_000:
            raise CycleValidationError(
                user_message="Dein Unternehmen kann nur eine Entwicklungsstufe pro Periode ereichen. Diese Stufe geht bis zu 10.000.00€")
    if cycle.research_invest < 12_500:
        if stock.research_budget + cycle.research_invest > 12_500:
            raise CycleValidationError(
                user_message="Dein Unternehmen kann nur eine Entwicklungsstufe pro Periode ereichen. Diese Stufe geht bis zu 12.500.00€")

    if cycle.ad_invest < 0:
        raise CycleValidationError(
            user_message="Es kann nicht weniger als 0 € in Werbung investiert werden.")

    if cycle.take_credit < cycle.payback_credit:
        raise CycleValidationError(
            user_message=f"Dein ausgenommener Kredit beträgt: {cycle.take_credit} und du möchtest {cycle.payback_credit} ab Bezahlen.")
    if cycle.payback_credit > 50_000:  # wie Hohen Credit darf amnn maximal aufnehmen
        raise CycleValidationError(
            user_message="Dein Unternahmen darf nicht mehr als 50.000.00€ Kredit aufnehemn.")
    if cycle.payback_credit < 0:
        raise CycleValidationError(
            user_message="Du kannst nicht mehr zurückzahlen, also du aufgenommen hast.")

    if cycle.new_employees > stock.employees_count:
        raise CycleValidationError(
            user_message=f"Es können nicht weniger als {stock.employees_count} Arbeiter entlassen werden.")

    if scenario.machine_purchase_allowed == False and cycle.buy_new_machine != 0:
        raise CycleValidationError(
            user_message="In dieser Periode kann keine Maschine gekauft werden.")
            
    if stock.employees_count < (cycle.planned_workers_1+cycle.planned_workers_2+cycle.planned_workers_3):
        raise CycleValidationError(
            user_message="Du hast nicht genug Mitarbeiter")

    return None

#fix detail 
class CycleValidationError(ValidationError):

    entity_name: str = "Cycle"
    

    def __init__(self, user_message: str | None) -> None:
        logging.warning(f"\n\n\n\n{user_message=}\n\n\n\n")
        super().__init__(self.entity_name, None, user_message)
    #def __init__(self, detail: str | None) -> None:
    #    super().__init__(self.entity_name, self.calling_service, detail)
