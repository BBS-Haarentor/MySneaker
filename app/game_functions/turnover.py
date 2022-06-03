from app.models.scenario import Scenario
from app.models.stock import Stock
from app.models.cycle import Cycle
# Market_Planned_quantity, Market_Price_Pro_Unit_Offer, Tender_Planned_quantity, Tender_Price_Pro_Unit_Offer, Research_and_development_costs, Plan_Publicity_expenditure
# Workers, Next_Period_Workers
#
#
async def mock_turnover(scenario: Scenario, stock_list: list[Stock], cycle_list: list[Cycle]) -> list[Stock]:
    stock_output = []
    for stock in stock_list:
        stock_output.append(Stock(company_id=stock.company_id, game_id=stock.game_id, current_cycle_index=stock.current_cycle_index + 1))
    # mock
    return stock_output
  
# Market_Planned_quantity, Market_Price_Pro_Unit_Offer, Tender_Planned_quantity, Tender_Price_Pro_Unit_Offer, Research_and_development_costs, Plan_Publicity_expenditure
# Workers, 
# Next_Period_Workers, Consern_Quantity_offered, Consern_advertisement_payed, Consern_share_of_adventisement, Demand_in_the_market, sale_through_advertising_
# Werbung_Bezalt

from app.models.scenario import Scenario
from app.models.stock import Stock
from app.models.cycle import Cycle

#def mock_turnover(scenario: Scenario, stock_list: list[Stock], cycle_list: list[Cycle]) -> list[Stock]:
#    stock_output = []
#    sneaker_price = scenario.sneaker_price
#    sneaker_count = stock_list[0].sneaker_count
#    return stock_output

#mySneaker_Spieledatein Daten für Lehrkraft

#Sortieren nach Preise(nitrigster zu erst).

def turnover_Rechnungen(scenario: Scenario, stock_list: list[Stock], cycle_list: list[Cycle]) -> list[Stock]:

    NachfrageAufdemMarkt = cycle_list[i].Nachfrage_auf_dem_Markt
    if #Start der verechnugn
        VerkaufDurchWerbungMax = NachfrageAufdemMarkt / 100 * cycle_list[i].Verkauf_Durch_werbung_in_procenten
    NachfrageAufdemMarkt = VerkaufDurchWerbungMax - NachfrageAufdemMarkt  

    for i = 0 in UnternehmenAnzahl:            #bekomme sotierte unternehmen
        cycle_list[i].planned_production_1
        StückzahlMarkt = cycle_list[i].planned_production_1+cycle_list[i].planned_production_2cycle_list[i].planned_production_3                   #Vertrieb und Absatz!D19
        StückzahlAusschreibung = cycle_list[i].tender_offer_count             #Vertrieb und Absatz!D20
        PreisAusschreibung = cycle_list[i].tender_offer_price                 #Vertrieb und Absatz!E20

        #Rationalisierung = stock_list[i].                                     #'Marketing  F&E'!E12
        #Werbungskosten = stock_list[i].           #cycle_list[i].ad_invest----enthalten unten                                    #Statistik & Finanzen'!D42

        #lAenderungenderMA =  - dict["Workers"]                               #Personal!D18-Personal!D10         bis heir weiter gegeben

        Darlehenstand =  cycle_list[i].take_credit                            #Statistik & Finanzen'!E30
        #Verkauf
        UnternehmenGeboteneStückzahl = #cycle_list[i].tender_offer_count
        UnternehmenPreise = scenario[i].sneaker_price
        #werbung
        UnternehmenGebotenWerbung = cycle_list[i].ad_invest

        Werbeanteil = round(100/VerkaufDurchWerbungMax*cycle_list[i].ad_invest)
        VerkaufDurchWerbung = round(VerkaufDurchWerbungMax/100*Werbeanteil, 0)             #Mximal?
        StückzahlNachWerbeverkauf = UnternehmenGeboteneStückzahl - VerkaufDurchWerbung
        #Verkauf der Firma
        if NachfrageAufdemMarkt < VerkaufDurchWerbung
            UnternehmenVerkaufOhneWerbung = NachfrageAufdemMarkt
        else
            UnternehmenVerkaufOhneWerbung = StückzahlNachWerbeverkauf
        GesamterVerkauf = UnternehmenVerkaufOhneWerbung + VerkaufDurchWerbung
        NachfrageAufdemMarkt = NachfrageAufdemMarkt - UnternehmenVerkaufOhneWerbung
        Umsatz = UnternehmenPreise * GesamterVerkauf

#def turnover_simple(value_dict : dict) ->dict:
#    UnternehmenVerkaufOhneWerbung = 
 
 

        #Entwickelung
        Buget(Kumuliert) = cycle_list[i].research_invest                                        #int SpilereEingabe
        if Buget(Kumuliert) >= 2500
            StuffeEinsEntwickelung = true                                                       #Warhetiswert
        if Buget(Kumuliert) >= 5000
            StuffeZweiEntwickelung = true
        if Buget(Kumuliert) >= 7500
            StuffeDreiEntwickelung = true
        if Buget(Kumuliert) >= 10000
            StuffeFierEntwickelung = true
        if Buget(Kumuliert) >= 12500
            StuffeFeunfEntwickelung = true
