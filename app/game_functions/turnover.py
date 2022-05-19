
# Market_Planned_quantity, Market_Price_Pro_Unit_Offer, Tender_Planned_quantity, Tender_Price_Pro_Unit_Offer, Research_and_development_costs, Plan_Publicity_expenditure
# Workers, Next_Period_Workers, Consern_Quantity_offered, Consern_advertisement_payed, Consern_share_of_adventisement, Demand_in_the_market, sale_through_advertising_
# Werbung_Bezalt
#

#def turnover_simple(value_dict: dict) -> dict:
    #SneakerKostenProWerkstoffe = dict["sneaker_price"] * dict["sneaker_quantities"]
    #FarbenKostenProWerkstoffe = dict["Paint_price"] * dict["paint_quantities"]
    #GesamtkostenWerkstoffe = SneakerKostenProWerkstoffe + FarbenKostenProWerkstoffe

#def turnover_simple(value_dict: dict) -> dict:
    #SneakerLager_Vorperiode = dict["sneaker_Values_Bearing_periode"]
    #FarbenLager_Vorperiode = dict["paint_Values_Bearing_Periode"]
    #FertigeSneaker_Vorperiode = dict["Finished_sneaker_Bearing_Periode"]

    #SneakerAktuelleBeschaffung = dict["sneaker_quantities"]
    #FarbenAktuelleBeschaffung = dict["paint_quantities"]
    #FertigeSneakerAktuelleBeschaffung = #Produktion!D24 

    #SneakerGesamteVerfügbarkeit = SneakerLager_Vorperiode + SneakerAktuelleBeschaffung
    #FarbenGesamteVerfügbarkeit = FarbeLager_Vorperiode + FarbeAktuelleBeschaffung
    #FertigeSneakerGesamteVerfügbarkeit = FertigeSneaker_Vorperiode + FertigeSneakerAktuelleBeschaffung

    #SneakerVerbrauchProduktion_Plan = #Produktion!D24
    #FarbenVerbrauchProduktion_Plan = #Produktion!D24 * 2
    #FertigeSneakerVerbrauchProduktion_Plan = #Vertrieb und Absatz!d13

    #SneakerLagerPeriodenende_Plan = SneakerGesamteVerfügbarkeit + SneakerVerbrauchProduktion_Plan
    #FarbenLagerPeriodenende_Plan = FarbeGesamteVerfügbarkeit + FarbeVerbrauchProduktion_Plan
    #FertigeSneakerLagerPeriodenende_Plan = FertigeSneakerGesamteVerfügbarkeit - #Vertrieb und Absatz!D21

    #SneakerLargerkostenProStück = 4
    #FarbenLagerKostenProStück = 1
    #FartigeSneakerLagerKostenProStück = 8

    #SneakerLagerKosten_Plan = SneakerLagerPeriodenende_Plan * SneakerLargerkostenProStück
    #FarbenLagerKosten_Plan = 
    #FertigeSneakerLagerKosten_Plan =

#mySneaker_Spieledatein Daten für Lehrkraft
def turnover_simple() -> int:
UnternehmenAnzahl = 
#Sortieren nach Preise(nitrigster zu erst).
for i = 0 to UnternehmenAnzahl do:
    def turnover_simple(value_dict: dict) -> dict:
        StückzahlMarkt = dict["Market_Planned_quantity"]            #Vertrieb und Absatz!D19
        PreisMarkt = dict["Market_Price_Pro_Unit_Offer"]            #Vertrieb und Absatz!E19
        StückzahlAusschreibung = dict["Tender_Planned_quantity"]    #Vertrieb und Absatz!D20
        PreisAusschreibung = dict["Tender_Price_Pro_Unit_Offer"]    #Vertrieb und Absatz!E20

        Rationalisierung = dict["Research_and_development_costs"]   #'Marketing  F&E'!E12
        Werbung = dict["Plan_Publicity_expenditure"]                #Statistik & Finanzen'!D42

        lAenderungenderMA =  - dict["Workers"]                      #Personal!D18-Personal!D10

        Darlehenstand = dict["Next_Period_Workers"]                 #Statistik & Finanzen'!E30


    def turnover_simple(value_dict : dict) ->dict:
        
        UnternehmenGeboteneStückzahl = dict["Consern_Quantity_offered"]
        UnternehmenPreise = dict["Consern_price"]

    def turnover_simple(value_dict : dict) ->dict:
        UnternehmenGebotenWerbung = dict["Consern_advertisement_payed"]
        UnternehmenWerbeanteil = dict["Consern_share_of_adventisement"]

        NachfrageAufdemMarkt = dict["Demand_in_the_market"]
        VerkaufDurchWerbungMax = NachfrageAufdemMarkt / 100 * Dict["sale_through_advertising_%"]
        Werbeanteil = round(100/VerkaufDurchWerbungMax*dict["Werbung_Bezalt"])
        VerkaufDurchWerbung = round(VerkaufDurchWerbungMax/100*Werbeanteil, 0)

    def turnover_simple(value_dict : dict) ->dict:
        UnternehmenVerkaufOhneWerbung = 
 