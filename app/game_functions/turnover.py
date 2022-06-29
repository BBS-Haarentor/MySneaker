import logging
from app.models.scenario import Scenario
from app.models.stock import Stock
from app.models.cycle import Cycle
# Market_Planned_quantity, Market_Price_Pro_Unit_Offer, Tender_Planned_quantity, Tender_Price_Pro_Unit_Offer, Research_and_development_costs, Plan_Publicity_expenditure
# Workers, Next_Period_Workers
#
#

async def mock_turnover(scenario: Scenario, stock_list: list[Stock], cycle_list: list[Cycle]) -> list[Stock]:
    logging.warning(f"Starting turnover\n\n\n\n\n\n\n\n")
    # prepare output stock_list
    stock_output: list[Stock] = []
    # for x in stock_list:
    #     stock_output.append(Stock())

    for stock in stock_list:
        stock_output.append(Stock(company_id=stock.company_id, game_id=stock.game_id, current_cycle_index=stock.current_cycle_index + 1))

    _NachfrageAufdemMarkt = scenario.sneaker_ask
    logging.warning(f"{_NachfrageAufdemMarkt=}")
    _VerkaufDurchWerbungMax: int = round(_NachfrageAufdemMarkt * scenario.factor_ad_take, None)
    logging.warning(f"{_VerkaufDurchWerbungMax=}")
    _NachfrageAufdemMarkt -= _VerkaufDurchWerbungMax 
    logging.warning(f"{_NachfrageAufdemMarkt=}")


    _UnternemensNummer=-1
    _PreisAusschreibung=5_000
    for i in range(0, len(stock_output)):
        if _PreisAusschreibung > cycle_list[i].tender_offer_price:
            _UnternemensNummer=i
            logging.warning(f"{_PreisAusschreibung=}")


    
    for i in range(0, len(stock_output)):
        _Kontostand= stock_list[i].account_balance
        logging.warning(f"\n\nNEW COMPANY\n\nStartKonto: {_Kontostand=}\n\n")
    
        _StückzahlMarkt = cycle_list[i].planned_production_1 + cycle_list[i].planned_production_2 + cycle_list[i].planned_production_3 + stock_list[i].finished_sneaker_count
        logging.warning(f"{_StückzahlMarkt=}")

        _MaschienenKostenProPeriode=0.00
        _Maschiene1ProduktionskostenSneaker=0.00
        _Maschiene2ProduktionskostenSneaker=0.00
        _Maschiene3ProduktionskostenSneaker=0.00
        _VorherigeEntwicklungsStufe = stock_list[i].research_production_modifier
        logging.warning(f"{_VorherigeEntwicklungsStufe=}")

        if stock.machine_1_space==1:
            _Maschiene1ProduktionskostenSneaker=round(cycle_list[i].planned_production_1*scenario.production_cost_per_sneaker1*_VorherigeEntwicklungsStufe, 2)
            _MaschienenKostenProPeriode1+=scenario.machine_maintainance_cost1
        if stock.machine_1_space==2:
            _Maschiene1ProduktionskostenSneaker=round(cycle_list[i].planned_production_1*scenario.production_cost_per_sneaker2*_VorherigeEntwicklungsStufe, 2)
            _MaschienenKostenProPeriode1+=scenario.machine_maintainance_cost2
        if stock.machine_1_space==3:
            _Maschiene1ProduktionskostenSneaker=round(cycle_list[i].planned_production_1*scenario.production_cost_per_sneaker3*_VorherigeEntwicklungsStufe, 2)
            _MaschienenKostenProPeriode1+=scenario.machine_maintainance_cost3

        if stock.machine_2_space==1:
            _Maschiene2ProduktionskostenSneaker=round(cycle_list[i].planned_production_2*scenario.production_cost_per_sneaker1*_VorherigeEntwicklungsStufe, 2)
            _MaschienenKostenProPeriode2+=scenario.machine_maintainance_cost1
        if stock.machine_2_space==2:
            _Maschiene2ProduktionskostenSneaker=round(cycle_list[i].planned_production_2*scenario.production_cost_per_sneaker2*_VorherigeEntwicklungsStufe, 2)
            _MaschienenKostenProPeriode2+=scenario.machine_maintainance_cost2
        if stock.machine_2_space==3:
            _Maschiene2ProduktionskostenSneaker=round(cycle_list[i].planned_production_2*scenario.production_cost_per_sneaker3*_VorherigeEntwicklungsStufe, 2)
            _MaschienenKostenProPeriode2+=scenario.machine_maintainance_cost3
        
        if stock.machine_3_space==1:
            _Maschiene3ProduktionskostenSneaker=round(cycle_list[i].planned_production_3*scenario.production_cost_per_sneaker1*_VorherigeEntwicklungsStufe, 2)
            _MaschienenKostenProPeriode3+=scenario.machine_maintainance_cost1
        if stock.machine_3_space==2:
            _Maschiene3ProduktionskostenSneaker=round(cycle_list[i].planned_production_3*scenario.production_cost_per_sneaker2*_VorherigeEntwicklungsStufe, 2)
            _MaschienenKostenProPeriode3+=scenario.machine_maintainance_cost2
        if stock.machine_3_space==3:
            _Maschiene3ProduktionskostenSneaker=round(cycle_list[i].planned_production_3*scenario.production_cost_per_sneaker3*_VorherigeEntwicklungsStufe, 2)
            _MaschienenKostenProPeriode3+=scenario.machine_maintainance_cost3
        
        logging.warning(f"{_MaschienenKostenProPeriode=}")


        _KostenSneakerProduktion=_Maschiene1ProduktionskostenSneaker+_Maschiene2ProduktionskostenSneaker+_Maschiene3ProduktionskostenSneaker
        logging.warning(f"{_KostenSneakerProduktion=}")

        _Kontostand-=_KostenSneakerProduktion
        logging.warning(f"{_Kontostand=}")

        _Kontostand-=_MaschienenKostenProPeriode1+_MaschienenKostenProPeriode2+_MaschienenKostenProPeriode3
        logging.warning(f"{_Kontostand=}")
        
        stock_output[i].sneaker_count = stock_list[i].sneaker_count + cycle_list[i].buy_sneaker - _StückzahlMarkt
        stock_output[i].paint_count = stock_list[i].paint_count + cycle_list[i].buy_paint - _StückzahlMarkt*2
        logging.warning(f"{stock_output[i].sneaker_count=}")
        logging.warning(f"{stock_output[i].paint_count=}")

        logging.warning(f"\n\n--------- Checkpoint 1 ----------\n\n")


        _AufgenommenerKreditVorperiode = stock_list[i].credit_taken
        logging.warning(f"{_AufgenommenerKreditVorperiode=}")

        _Darlehenstand = cycle_list[i].take_credit + _AufgenommenerKreditVorperiode
        logging.warning(f"{_Darlehenstand=}")

        #Abbezahlt / Aufgenommen
        _Abbezahlt = cycle_list[i].payback_credit
        logging.warning(f"{_Abbezahlt=}")

        _Darlehenstand -= _Abbezahlt
        logging.warning(f"{_Darlehenstand=}")
        stock_output[i].credit_taken = _Darlehenstand
            #credit aufgenommen

        _Kontostand += cycle_list[i].take_credit
        logging.warning(f"{_Kontostand=}")
        
        logging.warning(f"\n\n--------- Checkpoint 2 ----------\n\n")
        
        _UnternehmenGeboteneStückzahl = cycle_list[i].sales_planned
        logging.warning(f"{_UnternehmenGeboteneStückzahl=}")  
        _UnternehmenPreise = cycle_list[i].sales_bid
        logging.warning(f"{_UnternehmenPreise=}")  
        _EinkommenAuschreibung = 0.0
        if _UnternemensNummer == i:
            logging.warning(f"TENDER OFFER GOES TO {_UnternemensNummer=}")  
            _StückzahlAusschreibung=scenario.tender_offer_count
            logging.warning(f"{_StückzahlAusschreibung=}")  
            _PreisAusschreibung=cycle_list[i].tender_offer_price
            logging.warning(f"{_PreisAusschreibung=}")  
            _EinkommenAuschreibung=round(_StückzahlAusschreibung*_PreisAusschreibung, 2)
            logging.warning(f"{_EinkommenAuschreibung=}")  

        _Kontostand+=_EinkommenAuschreibung
        logging.warning(f"{_Kontostand=}")  
        
        
        _Werbeanteil = round(_VerkaufDurchWerbungMax/100*cycle_list[i].ad_invest)
        _VerkaufDurchWerbung = round(_VerkaufDurchWerbungMax/100 * _Werbeanteil, 0)              #Mximal?
        _StückzahlNachWerbeverkauf = _UnternehmenGeboteneStückzahl - _VerkaufDurchWerbung


        if _NachfrageAufdemMarkt < _StückzahlNachWerbeverkauf:
            _Übrig = _StückzahlNachWerbeverkauf - _NachfrageAufdemMarkt
            _GesamterVerkauf = _StückzahlNachWerbeverkauf - _Übrig
            _NachfrageAufdemMarkt = 0
        else:
            _NachfrageAufdemMarkt = _NachfrageAufdemMarkt - _StückzahlNachWerbeverkauf
            _Übrig = 0
            _GesamterVerkauf = _StückzahlNachWerbeverkauf
        _GesamterVerkauf = _GesamterVerkauf + _VerkaufDurchWerbung
        _Umsatz = _UnternehmenPreise * _GesamterVerkauf

        stock_output[i].real_sales = _GesamterVerkauf
        stock_output[i].income_from_sales = _Umsatz
        _Kontostand += _Umsatz
        stock_output[i].finished_sneaker_count = _Übrig

        _MitarbeiterTotal = stock_list[i].employees_count + cycle_list[i].new_employees - cycle_list[i].let_go_employees
        

        _Kontostand -= (_MitarbeiterTotal * scenario.employee_salary) * 1 + scenario.employee_cost_modfier
        stock_output[i].employees_count = _MitarbeiterTotal - scenario.employee_count_modifier_permanent


        #Entwickelung
        StuffeEntwickelung = _VorherigeEntwicklungsStufe
        _Buget_Kumuliert = stock_list[i].research_budget + cycle_list[i].research_invest  
        
        if _Buget_Kumuliert >= 2_500:                                                       
            StuffeEntwickelung = 0.90                                                     
        if _Buget_Kumuliert >= 5_000:                                                        
            StuffeEntwickelung = 0.82
        if _Buget_Kumuliert >= 7_500:                                                      
            StuffeEntwickelung = 0.76
        if _Buget_Kumuliert >= 10_000:                                                     
            StuffeEntwickelung = 0.72
        if _Buget_Kumuliert >= 12_500:                                                      
            StuffeEntwickelung = 0.70


        _Kontostand -= cycle_list[i].research_invest
        stock_output[i].research_budget = _Buget_Kumuliert
        stock_output[i].research_production_modifier = StuffeEntwickelung
        
        

        if cycle_list[i].buy_new_machine != 0:
            if stock_list[i].machine_2_space == 0:
                stock_output[i].machine_2_space = cycle_list[i].buy_new_machine
            else:
                stock_output[i].machine_3_space = cycle_list[i].buy_new_machine

        
        
        if cycle_list[i].buy_new_machine == 1:
            _Kontostand -= scenario.machine_purchase_cost1
        elif cycle_list[i].buy_new_machine == 2:
            _Kontostand -= scenario.machine_purchase_cost2
        elif cycle_list[i].buy_new_machine == 3:
            _Kontostand -= scenario.machine_purchase_cost3

        
        
        stock_output[i].account_balance = _Kontostand

    #for stock in stock_list: #ersezten mit Logik
    #    stock_output.append(Stock(company_id=stock.company_id, game_id=stock.game_id, current_cycle_index=stock.current_cycle_index + 1))

    
    logging.warning(f"\n\n\n\n-------- END TURNOVER --------\n\n\n\n")
        # mock
    return stock_output
  
# Market_Planned_quantity, Market_Price_Pro_Unit_Offer, Tender_Planned_quantity, Tender_Price_Pro_Unit_Offer, Research_and_development_costs, Plan_Publicity_expenditure
# Workers, 
# Next_Period_Workers, Consern_Quantity_offered, Consern_advertisement_payed, Consern_share_of_adventisement, Demand_in_the_market, sale_through_advertising_
# Werbung_Bezalt

#def mock_turnover(scenario: Scenario, stock_list: list[Stock], cycle_list: list[Cycle]) -> list[Stock]:
#    stock_output = []
#    sneaker_price = scenario.sneaker_price
#    sneaker_count = stock_list[0].sneaker_count
#    return stock_output

#mySneaker_Spieledatein Daten für Lehrkraft

#Sortieren nach Preise(nitrigster zu erst).
'''
async def turnover_Rechnungen(scenario: Scenario, stock_list: list[Stock], cycle_list: list[Cycle]) -> list[Stock]:



    _NachfrageAufdemMarkt = cycle_list[i].Nachfrage_auf_dem_Markt
    _VerkaufDurchWerbungMax = _NachfrageAufdemMarkt / 100 * cycle_list[i].Verkauf_Durch_werbung_in_procenten
    _NachfrageAufdemMarkt = _VerkaufDurchWerbungMax - _NachfrageAufdemMarkt                                    #Nachfrage wenn keienr werbung beinflust?




    for i in range(0, UnternehmenAnzahl -1):                                 #bekomme sotierte unternehmen
        cycle_list[i].planned_production_1
        _StückzahlMarkt = cycle_list[i].planned_production_1 + cycle_list[i].planned_production_2 + cycle_list[i].planned_production_3                   #Vertrieb und Absatz!D19
        _StückzahlAusschreibung = cycle_list[i].tender_offer_count             #Vertrieb und Absatz!D20
        #stock_output[i].tender_offer_count = StückzahlAusschreibung          HILFE!!
        _PreisAusschreibung = cycle_list[i].tender_offer_price                 #Vertrieb und Absatz!E20

        #Rationalisierung = stock_list[i].                                     #'Marketing  F&E'!E12
        #Werbungskosten = stock_list[i].           #cycle_list[i].ad_invest----enthalten unten                                    #Statistik & Finanzen'!D42

        #lAenderungenderMA =  - dict["Workers"]                               #Personal!D18-Personal!D10         bis heir weiter gegeben

        _Darlehenstand = cycle_list[i].take_credit   
                                                                            #Statistik & Finanzen'!E30

        #Verkauf
        _UnternehmenGeboteneStückzahl = cycle_list[i].sales_planned
        _UnternehmenPreise = cycle_list[i].sales_bid


        #werbung
        #_UnternehmenGebotenWerbung = cycle_list[i].ad_invest

        _Werbeanteil = round(100/_VerkaufDurchWerbungMax*cycle_list[i].ad_invest)
        _VerkaufDurchWerbung = round(_VerkaufDurchWerbungMax/100*Werbeanteil, 0)              #Mximal?
        _StückzahlNachWerbeverkauf = _UnternehmenGeboteneStückzahl - _VerkaufDurchWerbung


        #Verkauf der Firma
        if _NachfrageAufdemMarkt < _VerkaufDurchWerbung:                                      #Globale g variable zum runterzählen //Verkauf
            _UnternehmenVerkaufOhneWerbung = _NachfrageAufdemMarkt
        else:
            _UnternehmenVerkaufOhneWerbung = _StückzahlNachWerbeverkauf
        _GesamterVerkauf = _UnternehmenVerkaufOhneWerbung + _VerkaufDurchWerbung
        _NachfrageAufdemMarkt = _NachfrageAufdemMarkt - _UnternehmenVerkaufOhneWerbung
        _Umsatz = _UnternehmenPreise * _GesamterVerkauf

#def turnover_simple(value_dict : dict) ->dict:
#    UnternehmenVerkaufOhneWerbung = 
 

        #Entwickelung
        Buget(Kumuliert) = cycle_list[i].research_invest                                        #int SpilereEingabe
        if Buget(Kumuliert) >= 2500:                                                        #10%
            StuffeEinsEntwickelung = true                                                       #Warhetiswert
        if Buget(Kumuliert) >= 5000:                                                        #18%
            StuffeZweiEntwickelung = true
        if Buget(Kumuliert) >= 7500:                                                        #24%
            StuffeDreiEntwickelung = true
        if Buget(Kumuliert) >= 10000:                                                       #28%
            StuffeFierEntwickelung = true
        if Buget(Kumuliert) >= 12500:                                                       #30%
            StuffeFeunfEntwickelung = true
                                                                                            #Rückgabe: % output_Geld
                                                                                            
                                                                                            
'''