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
    VerkaufDurchWerbungMax = NachfrageAufdemMarkt / 100 * cycle_list[i].Verkauf_Durch_werbung_in_procenten
    NachfrageAufdemMarkt = NachfrageAufdemMarkt - VerkaufDurchWerbungMax  

#for i = 1 in UnternehmenAnzahl:
    #
    StückzahlMarkt = dict["Market_Planned_quantity"]                     #Vertrieb und Absatz!D19
    PreisMarkt = dict["Market_Price_Pro_Unit_Offer"]                     #Vertrieb und Absatz!E19
    StückzahlAusschreibung = dict["Tennned_quantity"]             #Vertrieb und Absatz!D20
    PreisAusschreibung = dict["Tender_Price_Pro_Unit_der_PlaOffer"]             #Vertrieb und Absatz!E20

    Rationalisierung = stock_list[i].         #'Marketing  F&E'!E12
    Werbung = stock_list[i].                         #Statistik & Finanzen'!D42

    lAenderungenderMA =  - dict["Workers"]                               #Personal!D18-Personal!D10         bis heir weiter gegeben

    Darlehenstand = dict["Next_Period_Workers"]                          #Statistik & Finanzen'!E30
    #Verkauf
    UnternehmenGeboteneStückzahl = dict["Consern_Quantity_offered"]
    UnternehmenPreise = dict["Consern_price"]
    #werbung
    UnternehmenGebotenWerbung = dict["Werbung_Bezalt"]

    Werbeanteil = round(100/VerkaufDurchWerbungMax*dict["Werbung_Bezalt"])
    VerkaufDurchWerbung = round(VerkaufDurchWerbungMax/100*Werbeanteil, 0)
    StückzahlNachWerbeverkauf = UnternehmenGeboteneStückzahl - VerkaufDurchWerbung
    #Verkauf der Firma
    if NachfrageAufdemMarkt < VerkaufDurchWerbung
        UnternehmenVerkaufOhneWerbung = NachfrageAufdemMarkt
    else
        UnternehmenVerkaufOhneWerbung = StückzahlNachWerbeverkauf
    GesamterVerkauf = UnternehmenVerkaufOhneWerbung + VerkaufDurchWerbung
    NachfrageAufdemMarkt = NachfrageAufdemMarkt - UnternehmenVerkaufOhneWerbung
    Umsatz = UnternehmenPreise * GesamterVerkauf

    #Entwickelung
    Buget(Kumuliert) = dict["Paid_Entwickelung"]                                            #int SpilereEingabe
    if Buget(Kumuliert) >= 2500
        StuffeEinsEntwickelung = true                                                       #Warhetiswert
    if Buget(Kumuliert) >= 5000
        StuffeZweiEntwickelung = true
    if Buget(Kumuliert) >= 7500
        StuffeDreiEntwickelung = true
    if Buget(Kumuliert) >= 10000
        StuffeFierEntwickelung = true
    #if Buget(Kumuliert) >= 12500
    #    StuffeFeunfEntwickelung = true