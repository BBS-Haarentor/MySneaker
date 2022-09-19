import logging
from app.exception.general import ValidationError

from app.schemas.cycle import CycleCreate
from app.models.scenario import Scenario
from app.models.stock import Stock


def validate_cycle(cycle: CycleCreate, stock: Stock, scenario: Scenario) -> None:
    if cycle.buy_sneaker < 0:
        raise CycleValidationError(
            user_message="Es können nicht weniger als 0 sneaker gekauft werden.")

    if cycle.buy_paint < 0:
        raise CycleValidationError(
            user_message="Es können nicht weniger als 0 farben gekauft werden.")

    if cycle.sales_planned < 0:
        raise CycleValidationError(
            user_message="Es können keine Negativen Schuhe verkauft werden.")

    if cycle.planned_production_1 > (cycle.planned_workers_1*scenario.machine_production_capacity1):
        raise CycleValidationError(
            user_message=f"Es können nur {cycle.planned_workers_1*scenario.machine_production_capacity1} schue an der Maschiene Produziert werden.")
    if cycle.planned_production_1 < 0:
        raise CycleValidationError(
            user_message="Es können nicht weniger als 0 Schuhe Produziert werden.")

    if stock.machine_2_space == 1:
        if cycle.planned_production_2 > (cycle.planned_workers_2*scenario.machine_production_capacity1):
            raise CycleValidationError(
                user_message=f"Es können nur {cycle.planned_workers_2*scenario.machine_production_capacity1} schue an der Maschiene Produziert werden.")
        if cycle.planned_production_2 < 0:
            raise CycleValidationError(
                user_message="Es können nicht weniger als 0 Schuhe Produziert werden.")

    if stock.machine_2_space == 2:
        if cycle.planned_production_2 > (cycle.planned_workers_2*scenario.machine_production_capacity2):
            raise CycleValidationError(
                user_message=f"Es können nur {cycle.planned_workers_2*scenario.machine_production_capacity2} schue an der Maschiene Produziert werden.")
        if cycle.planned_production_2 < 0:
            raise CycleValidationError(
                user_message="Es können nicht weniger als 0 Schuhe Produziert werden.")

    if stock.machine_2_space == 3:
        if cycle.planned_production_2 > (cycle.planned_workers_2*scenario.machine_production_capacity3):
            raise CycleValidationError(
                user_message=f"Es können nur {cycle.planned_workers_2*scenario.machine_production_capacity3} schue an der Maschiene Produziert werden.")
        if cycle.planned_production_2 < 0:
            raise CycleValidationError(
                user_message="Es können nicht weniger als 0 Schuhe Produziert werden.")

    if stock.machine_3_space == 1:
        if cycle.planned_production_3 > (cycle.planned_workers_3*scenario.machine_production_capacity1):
            raise CycleValidationError(
                user_message=f"Es können nur {cycle.planned_workers_3*scenario.machine_production_capacity1} schue an der Maschiene Produziert werden.")
        if cycle.planned_production_3 < 0:
            raise CycleValidationError(
                user_message="Es können nicht weniger als 0 Schuhe Produziert werden.")

    if stock.machine_3_space == 2:
        if cycle.planned_production_3 > (cycle.planned_workers_3*scenario.machine_production_capacity2):
            raise CycleValidationError(
                user_message=f"Es können nur {cycle.planned_workers_3*scenario.machine_production_capacity2} schue an der Maschiene Produziert werden.")
        if cycle.planned_production_3 < 0:
            raise CycleValidationError(
                user_message="Es können nicht weniger als 0 Schuhe Produziert werden.")

    if stock.machine_3_space == 3:
        if cycle.planned_production_3 > (cycle.planned_workers_3*scenario.machine_production_capacity3):
            raise CycleValidationError(
                user_message=f"Es können nur {cycle.planned_workers_3*scenario.machine_production_capacity3} schue an der Maschiene Produziert werden.")
        if cycle.planned_production_3 < 0:
            raise CycleValidationError(
                user_message="Es können nicht weniger als 0 Schuhe Produziert werden.")

    if cycle.planned_workers_1 > scenario.machine_employee_max:
        raise CycleValidationError(
            user_message=f"Es können nur {scenario.machine_employee_max} arbeiter an der Maschiene arbeiten.")
    if cycle.planned_workers_1 < 0:
        raise CycleValidationError(
            user_message="Es können nicht weniger als 0 Arbeiter an der Maschiene arbeiten.")

    if cycle.planned_workers_2 > scenario.machine_employee_max:
        raise CycleValidationError(
            user_message=f"Es können nur {scenario.machine_employee_max} arbeiter an der Maschiene arbeiten.")
    if cycle.planned_workers_2 < 0:
        raise CycleValidationError(
            user_message="Es können nicht weniger als 0 Arbeiter an der Maschiene arbeiten.")

    if cycle.planned_workers_3 > scenario.machine_employee_max:
        raise CycleValidationError(
            user_message=f"Es können nur {scenario.machine_employee_max} arbeiter an der Maschiene arbeiten.")
    if cycle.planned_workers_3 < 0:
        raise CycleValidationError(
            user_message="Es können nicht weniger als 0 Arbeiter an der Maschiene arbeiten.")

    if cycle.include_from_stock < 0:
        raise CycleValidationError(
            user_message="Es kann nicht mehr aus dem Lager entnommen werden als enthalten sind.")

    if cycle.sales_planned < 0:
        raise CycleValidationError(
            user_message="Es können nicht mehr schuhe verkauft werden als vorhanden sind")
    if cycle.sales_planned > (cycle.planned_production_1+cycle.planned_production_2+cycle.planned_production_3+cycle.include_from_stock):
        raise CycleValidationError(
            user_message="Es können nicht mehr schuhe verkauft werden als peoduktiert wurden und auf lager sind")

    if cycle.sales_bid > 300:
        raise CycleValidationError(
            user_message="Es darf nicht mehr geld für sneakers verlankt werden als 300€")
    if cycle.sales_bid < 0:
        raise CycleValidationError(
            user_message="Dein Unternehmen Bezahlt geld um sneaker zu verkaufen.")

    if cycle.tender_offer_price > 300:
        raise CycleValidationError(
            user_message="Es darf nicht mehr geld für sneakers verlankt werden als 300€")
    if cycle.tender_offer_price < 0:
        raise CycleValidationError(
            user_message="Dein Unternehmen Bezahlt geld um sneaker zu verkaufen.")

    if cycle.research_invest < 0:
        raise CycleValidationError(
            user_message="Dein Unternehmen kann nicht weniger als 0€ in die entwickelung stecken")
    if cycle.research_invest < 0:
        raise CycleValidationError(
            user_message="Dein Unternehmen kann kein Geld aus der entwickelung nehmen.")
    if cycle.research_invest < 2_500:
        if stock.research_budget + cycle.research_invest > 2_500:
            raise CycleValidationError(
                user_message="Dein Unternehmen kann nur eine entwickelungsstuffe pro Periode ereichen. Diese stuffe geht bis zu 2.500.00€")
    if cycle.research_invest < 5_000:
        if stock.research_budget + cycle.research_invest > 5_000:
            raise CycleValidationError(
                user_message="Dein Unternehmen kann nur eine entwickelungsstuffe pro Periode ereichen. Diese stuffe geht bis zu 5.000.00€")
    if cycle.research_invest < 7_500:
        if stock.research_budget + cycle.research_invest > 7_500:
            raise CycleValidationError(
                user_message="Dein Unternehmen kann nur eine entwickelungsstuffe pro Periode ereichen. Diese stuffe geht bis zu 7.500.00€")
    if cycle.research_invest < 10_000:
        if stock.research_budget + cycle.research_invest > 10_000:
            raise CycleValidationError(
                user_message="Dein Unternehmen kann nur eine entwickelungsstuffe pro Periode ereichen. Diese stuffe geht bis zu 10.000.00€")
    if cycle.research_invest < 12_500:
        if stock.research_budget + cycle.research_invest > 12_500:
            raise CycleValidationError(
                user_message="Dein Unternehmen kann nur eine entwickelungsstuffe pro Periode ereichen. Diese stuffe geht bis zu 12.500.00€")

    if cycle.ad_invest < 0:
        raise CycleValidationError(
            user_message="Es kann nicht weniger als 0€ in Werbung investiert werden.")

    if cycle.take_credit < cycle.payback_credit:
        raise CycleValidationError(
            user_message=f"Dein ausgenommener Credit Beträgt: {cycle.take_credit} und du möchtest {cycle.payback_credit} ab Bezahlen.")
    if cycle.payback_credit > 50_000:  # wie Hohen Credit darf amnn maximal aufnehmen
        raise CycleValidationError(
            user_message="Dein unternahmen Darf nicht mehr als 50.000.00€ Credit aufnehemn.")
    if cycle.payback_credit < 0:
        raise CycleValidationError(
            user_message="Du kanst nicht mehr mehr zurückzahlen also du aufgenommen hast.")

    if cycle.new_employees > stock.employees_count:
        raise CycleValidationError(
            user_message=f"Es können nicht weniger als {stock.employees_count} Arbeiter entlassen werden werden.")

    if scenario.machine_purchase_allowed == False and cycle.buy_new_machine != 0:
        raise CycleValidationError(
            user_message="In dieser periode kann keine Maschiene gekauft werden.")
            
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
