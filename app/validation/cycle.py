from fastapi import HTTPException
from starlette import status

from app.models.cycle import Cycle
from app.models.scenario import Scenario
from app.models.stock import Stock

async def cycle_validation( cycle:Cycle, stock:Stock, scenario:Scenario) -> bool:
    if cycle.buy_sneaker<0:
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Es können nicht weniger als 0 sneaker gekauft werden.")
    if cycle.buy_sneaker>500: #nachfragen 
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Es können nicht mehr als 500 sneaker gekauft werden.")

    if cycle.buy_paint<0:
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Es können nicht weniger als 0 farben gekauft werden.")
    if cycle.buy_sneaker>500: #nachfragen 
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Es können nicht mehr als 1000 Faben gekauft werden.")


    if cycle.planned_production_1>( cycle.planned_workers_1*scenario.machine_employee_max):
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Es können nur " + cycle.planned_workers_1*scenario.machine_employee_max + " arbeiter an der Maschiene arbeiten.")
    if cycle.planned_production_1>0:
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Es können nicht weniger als 0 arbeiter an der Maschiene arbeiten.")

    if cycle.planned_production_2>( cycle.planned_workers_2*scenario.machine_employee_max):
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Es können nur " + cycle.planned_workers_2*scenario.machine_employee_max + " arbeiter an der Maschiene arbeiten.")
    if cycle.planned_production_2>0:
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Es können nicht weniger als 0 arbeiter an der Maschiene arbeiten.")
    
    if cycle.planned_production_3>( cycle.planned_workers_3*scenario.machine_employee_max):
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Es können nur " + cycle.planned_workers_3*scenario.machine_employee_max + " arbeiter an der Maschiene arbeiten.")
    if cycle.planned_production_3>0:
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Es können nicht weniger als 0 arbeiter an der Maschiene arbeiten.")

    if cycle.planned_workers_1>scenario.machine_employee_max:
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Es können nur " + scenario.machine_employee_max + " arbeiter an der Maschiene arbeiten.")
    if cycle.planned_workers_1<0:
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Es können nicht weniger als 0 Arbeiter an der Maschiene arbeiten.")
    
    if cycle.planned_workers_2>scenario.machine_employee_max:
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Es können nur " + scenario.machine_employee_max + " arbeiter an der Maschiene arbeiten.")
    if cycle.planned_workers_2<0:
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Es können nicht weniger als 0 Arbeiter an der Maschiene arbeiten.")

    if cycle.planned_workers_3>scenario.machine_employee_max:
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Es können nur " + scenario.machine_employee_max + " arbeiter an der Maschiene arbeiten.")
    if cycle.planned_workers_3<0:
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Es können nicht weniger als 0 Arbeiter an der Maschiene arbeiten.")


    if cycle.include_from_stock<0:
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Es kann nicht mehr aus dem Lager entnommen werden als enthalten sind.")

    if cycle.sales_planned<0:
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Es können nicht mehr schuhe verkauft werden als vorhanden sind")

    if cycle.sales_bid<0:
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Es können nicht mehr schuhe verkauft werden als vorhanden sind")
    if cycle.sales_bid>(cycle.planned_production_1+cycle.planned_production_2+cycle.planned_production_3+cycle.include_from_stock):
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Es können nicht mehr schuhe verkauft werden als peoduktiert wurden und auf lager sind")

    # if sycle.tender_offer_count<0:
    #     raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Es können nicht weniger als 0 ")
    if cycle.tender_offer_price>300:
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Es darf nicht mehr geld für sneakers verlankt werden als 300€")
    if cycle.tender_offer_price<0: #Klärungs bedarf
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Dein Unternehmen Bezahlt geld um sneaker zu verkaufen.")

    if cycle.research_invest<0:
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Dein Unternehmen kann nicht weniger als 0€ in die entwickelung stecken")
    if cycle.research_invest<0:
         raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Dein Unternehmen kann kein Geld aus der entwickelung nehmen.")
    if cycle.research_invest<2_500:
        if stock.research_budget + cycle.research_invest>2_500:
            raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Dein Unternehmen kann nur eine entwickelungsstuffe pro Periode ereichen. Diese stuffe geht bis zu 2.500.00€")
    if cycle.research_invest<5_000:
        if stock.research_budget + cycle.research_invest>5_000:
            raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Dein Unternehmen kann nur eine entwickelungsstuffe pro Periode ereichen. Diese stuffe geht bis zu 5.000.00€")
    if cycle.research_invest<7_500:
        if stock.research_budget + cycle.research_invest>7_500:
            raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Dein Unternehmen kann nur eine entwickelungsstuffe pro Periode ereichen. Diese stuffe geht bis zu 7.500.00€")
    if cycle.research_invest<10_000:
        if stock.research_budget + cycle.research_invest>10_000:
            raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Dein Unternehmen kann nur eine entwickelungsstuffe pro Periode ereichen. Diese stuffe geht bis zu 10.000.00€")
    if cycle.research_invest<12_500:
        if stock.research_budget + cycle.research_invest>12_500:
            raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Dein Unternehmen kann nur eine entwickelungsstuffe pro Periode ereichen. Diese stuffe geht bis zu 12.500.00€")

    if cycle.ad_invest<0:
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Es kann nicht weniger als 0€ in Werbung investiert werden.")

    if cycle.take_credit<cycle.payback_credit:
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Dein augenommener Credit Beträgt: " + cycle.take_credit + " und du möchtest " + cycle.payback_credit +" ab Bezahlen.")
    if cycle.payback_credit>50_000: #wie Hohen Credit darf amnn maximal aufnehmen
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Dein unternahmen Darf nicht mehr als 50.000.00€ Credit aufnehemn.")

    if cycle.new_employees>stock.employees_count:
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Es können nicht weniger als " + stock.employees_count + " Arbeiter enlassen werden werden.")

    if scenario.machine_purchase_allowed == False:
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="In dieser periode kann keine Maschiene gekauft werden.")
    
    
    
    return True