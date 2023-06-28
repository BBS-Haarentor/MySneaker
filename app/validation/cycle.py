import logging
from app.exception.general import ValidationError
from app.game_functions.company import Company

from app.schemas.cycle import CycleCreate
from app.models.scenario import Scenario
from app.models.stock import Stock

parameter_translation: dict = {
    "buy_sneaker": "Einkauf Sneaker",
    "buy_paint": "Einkauf Farbe",
    "planned_production_1": "Geplante Produktion an Maschine 1",
    "planned_production_2": "Geplante Produktion an Maschine 2",
    "planned_production_3": "Geplante Produktion an Maschine 3",
    "planned_workers_1": "Geplante Mitarbeiterzahl an Maschine 1",
    "planned_workers_2": "Geplante Mitarbeiterzahl an Maschine 2",
    "planned_workers_3": "Geplante Mitarbeiterzahl an Maschine 3",
    "include_from_stock": "Entnahme aus Lager",
    "sales_planned": "Verkaufsstückzahl",
    "sales_bid": "Verkaufspreis",
    "tender_offer_price": "Verkaufspreis Ausschreibung",
    "research_invest": "Forschungsinvestment",
    "ad_invest": "Werbeinvestment",
    "take_credit": "Kreditaufnahme",
    "payback_credit": "Kreditrückzahlung",
    "new_employees": "Neueinstellungen",
    "let_go_employees": "Kündigungen",
    "buy_new_machine": "Maschinenneukauf"
}


def validate_cycle(cycle: CycleCreate, stock: Stock, scenario: Scenario) -> None: 
    
    if stock.insolvent:
        raise CycleValidationError(user_message="Dein Unternehmen ist insolvent. Du darfst keine Abgabe mehr machen. :(")
    
    validate_cycle_ltzero(cycle=cycle)
    validate_cycle_check_scenario(cycle=cycle, scenario=scenario)
    
    # TODO: following
    validate_cycle_misc(cycle=cycle, stock=stock)
    validate_cycle_production(cycle=cycle, stock=stock)
    validate_cycle_sales(cycle=cycle, stock=stock)
    
    return None


def validate_cycle_ltzero(cylce: CycleCreate) -> None:
    user_msg = ""
    for k, v in cylce.dict(exclude={"game_id", "current_cycle_index", "company_id"}, exclude_none=True).items():
        if v < 0:
            user_msg += f"{parameter_translation[k]} darf nicht < 0 sein.\n"
            #raise CycleValidationError(user_message=f"{parameter_translation[k]} darf nicht < 0 sein.") 
    if user_msg != "":
        raise CycleValidationError(user_message=user_msg)    

    return None

def validate_cycle_check_scenario(cycle: CycleCreate, scenario: Scenario) -> None:
    if (not scenario.employee_change_allowed) and (
        cycle.new_employees != 0
        or cycle.new_employees != None
        or cycle.let_go_employees != 0
        or cycle.let_go_employees != None
    ):
        raise CycleValidationError(
            user_message=f"Kündigungen und Neueinstellungen sind zum jetzigen Zeitpunkt nicht erlaubt."
        )
        
    if (not scenario.machine_purchase_allowed) and (cycle.buy_new_machine != 0 or cycle.buy_new_machine != None):
        raise CycleValidationError(user_message=f"Maschinenkauf ist zum jetzigen Zeitpunkt nicht erlaubt.")      

    if (not scenario.research_allowed) and (cycle.research_invest != 0 or cycle.research_invest != None):
        raise CycleValidationError(user_message=f"Forschungsinvestment ist zum jetzigen Zeitpunkt nicht erlaubt.")      
     
    if (not scenario.advertisement_allowed) and (cycle.ad_invest != 0 or cycle.ad_invest != None):
        raise CycleValidationError(user_message=f"Werbeinvestment ist zum jetzigen Zeitpunkt nicht erlaubt.")      

    
    return None


def validate_cycle_misc(cycle: CycleCreate, stock: Stock) -> None:
    # kreditaufnahme
    if (cycle.take_credit + stock.credit_taken) > 50_000.00:
        raise CycleValidationError(user_message=f"Kreditaufnahme nicht möglich. Kreditlimit liegt bei 50000.00 €")
    # kreditrückzahlung
    if (cycle.payback_credit > stock.credit_taken):
        raise CycleValidationError(user_message=f"Kreditrückzahlung nicht möglich. Du kannst nicht mehr zurückzahlen als du aufgenommen hast.")
    if (cycle.payback_credit < stock.account_balance):
        raise CycleValidationError(user_message=f"Kreditrückzahlung nicht möglich. Du hast nicht genügend Geld auf dem Konto.")
    
    if cycle.payback_credit > 0 and cycle.take_credit > 0:
        raise CycleValidationError(user_message=f"Gleichzeitige Aufnahme und Abzahlung eines Kredits nicht erlaubt.")
    if cycle.buy_new_machine not in [0, 1, 2, 3]:
        raise CycleValidationError(user_message=f"Unerlaubter Maschinentyp bei Kauf")
    
    # research stufen
    new_research_investment = stock.research_budget + cycle.research_invest
    research_steps = [2500, 5000, 7500, 10000, 12500]
    next_research_step = 12500
    for s in research_steps:
        if s >= stock.research_budget and s < next_research_step:
            next_research_step = s
            
    if new_research_investment > next_research_step:
        raise CycleValidationError(user_message=f"Das Forschungsinvestment ist begrenzt auf die nächste Forschungsstufe: {next_research_step} €")
    
    return None
    
    
def validate_cycle_production(cycle: CycleCreate, stock: Stock, scenario: Scenario) -> None:
    
    #resources check
    employees_consumtion = _get_employees_consumtion(cycle=cycle, scenario=scenario)

    if _are_resources_available(cycle=cycle, stock=stock, scenario=scenario):
        raise CycleValidationError(user_message=f"Es sind nicht genügend Ressourcen vorhanden.")
    if stock.employees_count < employees_consumtion:
        raise CycleValidationError(user_message=f"Es sind nicht genügend Mitarbeiter vorhanden.")

    #workers check
    if cycle.planned_production_1 / scenario.employee_production_capacity > cycle.planned_workers_1:
        raise CycleValidationError(user_message=f"Es wurden verfältschte Daten übermittelt.")
    if cycle.planned_production_2 / scenario.employee_production_capacity > cycle.planned_workers_2:
        raise CycleValidationError(user_message=f"Es wurden verfältschte Daten übermittelt.")
    if cycle.planned_production_3 / scenario.employee_production_capacity > cycle.planned_workers_3:
        raise CycleValidationError(user_message=f"Es wurden verfältschte Daten übermittelt.")

    #production check
    if stock.machine_1_space != 0:
        if scenario["machine_production_capacity"+stock.machine_1_space] < cycle.planned_production_1:
            raise CycleValidationError(user_message=f"Es können nicht mehr Schuhe produziert werden als die Maschine hergibt. Maschinenplatz 1")
    if stock.machine_2_space != 0:
        if scenario["machine_production_capacity"+stock.machine_2_space] < cycle.planned_production_2:
            raise CycleValidationError(user_message=f"Es können nicht mehr Schuhe produziert werden als die Maschine hergibt. Maschinenplatz 2")
    if stock.machine_3_space != 0:
        if scenario["machine_production_capacity"+stock.machine_3_space] < cycle.planned_production_3:
            raise CycleValidationError(user_message=f"Es können nicht mehr Schuhe produziert werden als die Maschine hergibt. Maschinenplatz 3")
    return None


def _are_resources_available(cycle: CycleCreate, stock: Stock, scenario: Scenario) -> bool:
    sneker = _get_sneaker(cycle=cycle, stock=stock)
    paint = _get_paint(cycle=cycle, stock=stock)

    sneker_consumtion = _get_sneaker_consumtion(cycle=cycle)
    paint_consumtion = _get_paint_consumtion(cycle=cycle, scenario=scenario)

    return sneker >= sneker_consumtion and paint >= paint_consumtion

def _get_employees_consumtion(cycle: CycleCreate, scenario: Scenario) -> int:
    return cycle.planned_workers_1 + cycle.planned_workers_2 + cycle.planned_workers_3

def _get_paint_consumtion(cycle: CycleCreate, scenario: Scenario) -> int:
    return (cycle.planned_production_1 + cycle.planned_production_2 + cycle.planned_production_3) * 2

def _get_sneaker_consumtion(cycle: CycleCreate) -> int:
    return cycle.planned_production_1 + cycle.planned_production_2 + cycle.planned_production_3

def _get_sneaker(cycle: CycleCreate, stock: Stock) -> int:
    return cycle.buy_sneaker + stock.sneaker_count

def _get_paint(cycle: CycleCreate, stock: Stock) -> int:
    return cycle.buy_paint + stock.paint_count


def validate_cycle_sales(cycle: CycleCreate, stock: Stock) -> None:
    if cycle.tender_offer_price > 300.00:
        raise CycleValidationError(user_message=f"Der Preis für Sneaker in der Ausschreibung darf nicht über 300.00€ betragen.")
    if cycle.sales_bid > 300.00:
        raise CycleValidationError(user_message=f"Der Preis für Sneaker darf nicht über 300.00€ betragen.")
    if cycle.sales_planned > (cycle.include_from_stock + _get_sneaker_consumtion(cycle=cycle)):
        raise CycleValidationError(user_message="Es dürfen nicht mehr Schuhe verkauft werden, als in der Summe produziert und aus dem Lager entnommen werden.") 
    
    return None


#deprecated
def validate_cycle_old(cycle: CycleCreate, stock: Stock, scenario: Scenario) -> None:
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
