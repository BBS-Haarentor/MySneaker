import React from 'react'
import Beschaffung from './Beschaffung'
import {useState, useEffect,useRef} from "react";


const Container = ({ProductionRef,LagerBeschaffungRef,FinanzenRef,MarketingRef,PersonalRef,AbsatzRef}) => {
    
    const [data, setData] = useState(
        {
            "current_stock": {
              "creation_date": "2022-06-05T20:16:57.207679",
              "id": 1,
              "sneaker_count": 0,
              "finished_sneaker_count": 0,
              "research_budget": 0,
              "credit_taken": 0,
              "machine_2_bought": false,
              "real_sales": 0,
              "research_production_modifier": 0,
              "current_cycle_index": 0,
              "game_id": 1,
              "company_id": 2,
              "paint_count": 0,
              "employees_count": 8,
              "account_balance": 5000,
              "machine_1_bought": true,
              "machine_3_bought": false,
              "income_from_sales": 0
            },
            "scenario": {
              "sneaker_price": 60,
              "factor_interest_rate": 0.04,
              "factor_ad_take": 0.1,
              "paint_price": 10,
              "employee_salary": 400,
              "machine_production_capacity": 200,
              "storage_fee_sneaker": 4,
              "employee_signup_bonus": 100,
              "machine_maintainance_cost": 4000,
              "storage_fee_paint": 1,
              "employee_production_capacity": 10,
              "production_cost_per_sneaker": 60,
              "storage_fee_finished_sneaker": 8,
              "employee_cost_modfier": 0,
              "employee_count_modifier_temporary": 0,
              "machine_purchase_allowed": false,
              "char": "A",
              "employee_count_modifier_permanent": 0,
              "machine_purchase_cost": 1000,
              "id": 1,
              "sneaker_ask": 400
            },
            "current_cycle": {
              "id": 1,
              "buy_paint": 320,
              "sales_planned": 160,
              "new_employees": 0,
              "planned_production_1": 160,
              "sales_bid": 130,
              "buy_new_machine_2": false,
              "planned_production_2": 0,
              "tender_offer_count": 0,
              "buy_new_machine_3": false,
              "creation_date": null,
              "planned_production_3": 0,
              "tender_offer_price": 0,
              "game_id": 1,
              "planned_workers_1": 8,
              "research_invest": 2500,
              "entry_date": "2022-06-05T20:27:11.340557",
              "current_cycle_index": 0,
              "planned_workers_2": 0,
              "ad_invest": 0,
              "company_id": 2,
              "planned_workers_3": 0,
              "take_credit": 0,
              "buy_sneaker": 160,
              "include_from_stock": 0,
              "payback_credit": 0
            }
          }
      )
    const [SneakerEinkaufMenge, setSneakerEinkaufMenge] = useState(0)
    const [FarbenEinkaufMenge, setFarbenEinkaufMenge] = useState(0)
    const SneakerKosten = data.scenario.sneaker_price * SneakerEinkaufMenge
    const FarbenKosten = data.scenario.paint_price * FarbenEinkaufMenge
    const [GeplanteProduktion, setGeplanteProduktion] = useState(0)
    const [ZugeteilteMitarbeiter, setZugeteilteMitarbeiter] = useState(0)
    const [Werbung, setWerbung] = useState(0)
    const [ForschungUndEntwickelung, setForschungUndEntwickelung] = useState(0)
    const [EntnahmeAusDemLager, setEntnahmeAusDemLager] = useState(0)
    const [MarktSoll, setMarktSoll] = useState(0)
    const [MarktIst, setMarktIst] = useState(0)
    const [AusschreibungSoll, setAussetschreibungSoll] = useState(0)
    const [AusschreibungIst, setAusschreibungIst] = useState(0)
    const [GesamtSoll, setGesamtSoll] = useState(0)
    const [MaximaleEntnahmeAusLager, setMaximaleEntnahmeAusLager] = useState(0)
    const [Gesamtproduktion, setGesamtproduktion] = useState(0)
    const [Mitarbeiter, setMitarbeiter] = useState(8)
    const [Neueinstellungen, setNeueinstellungen] = useState(0)
    const [Kündigungen, setKündigungen] = useState(0)
    const [Personalnebenkosten, setPersonalnebenkosten] = useState(20)
    const [AufnahmeDarlehen, setAufnahmeDarlehen] = useState(0)
    const [RueckzahlungDarlehen, setRueckzahlungDarlehen] = useState(0)



    var PersonalnebenkostenInP = Personalnebenkosten/100 +1 
    var ProduktionFarben = parseInt(FarbenEinkaufMenge/2) 
    var Produktionskapazität = 200;
    var FertigungskostenProStückFE = 60;
    var Maschinenkosten = 4000;
    var MaximalproduzierbareAnzahl = SneakerEinkaufMenge > ProduktionFarben ? ProduktionFarben : SneakerEinkaufMenge
    var GesamtkostenProduktion = Maschinenkosten+ FertigungskostenProStückFE * GeplanteProduktion;

 
  
  
    
    useEffect(() => {
        const getData = async () => {
            const dataFromServer = await fetchData()
            setData(dataFromServer)
        }
        //getData()
        
    }, [])

const fetchData = async () => {
    const res = await fetch('http://127.0.0.1:8008/api/v1/game/my_summary')
    const data = await res.json()

    return data
}

return (
    <>
        <form className='grid grid-cols-1 xl:grid-cols-3 overflow-x-hidde scrollbar snap-y'>

       
        <div className=" p-4 xl:col-span-3 shadow-lg rounded-3xl m-2 bg-white flex justify-center snap-start " ref={LagerBeschaffungRef}>
             <table>
                <tbody>
                    <tr>
                        <th className='xl:w-72'></th>
                        <th className='text-[#4fd1c5]'>Sneaker</th>
                        <th className='text-[#4fd1c5]'>Farben</th>
                    </tr>
                    <tr>
                        <td>Einstandspreis</td>
                        <td>{data.scenario.sneaker_price}</td>
                        <td>{data.scenario.paint_price}</td>
                    </tr>
                    <tr>
                        <td>Einkauf (Menge)</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e)=> setSneakerEinkaufMenge(e.target.value)} value={SneakerEinkaufMenge}></input></td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e)=> setFarbenEinkaufMenge(e.target.value)} value={FarbenEinkaufMenge}></input></td>
                    </tr>
                    <tr>
                        <td>Kosten pro Werkstoff</td>
                        <td>{SneakerKosten + "€"}</td>
                        <td>{FarbenKosten + "€"}</td>
                    </tr>
                    <tr>
                        <td>Gesamtkosten Werkstoffe</td>
                        <td>{SneakerKosten + FarbenKosten +"€"}</td>
                    </tr>
                </tbody>
             </table>
             <img src="/img/undraw_empty_cart.svg" className='h-96 w-0 xl:w-96 m-4'></img>
        </div>
        <div className="p-4 shadow-lg rounded-3xl m-2 xl:col-span-3 flex justify-around bg-white  snap-start">
        <img src="/img/undraw_heavy_box.svg" className='h-96 w-0 xl:w-96 m-4'></img>
             <table>
                <tbody>
                    <tr>
                        <th className='text-[#4fd1c5] w-96'></th>
                        <th className='text-[#4fd1c5] w-40'>Sneaker</th>
                        <th className='text-[#4fd1c5] w-40'>Farben</th>
                        <th className='text-[#4fd1c5] w-40'>Fertige Sneaker</th>
                    </tr>
                    <tr>
                        <td>Lager (Vorperiode)</td>
                        <td>{data.current_stock.sneaker_count}</td>
                        <td>{data.current_stock.paint_count}</td>
                        <td>{data.current_stock.finished_sneaker_count}</td>
                    </tr>
                    <tr>
                        <td>Aktuelle Beschaffung</td>
                        <td>{SneakerEinkaufMenge}</td>
                        <td>{FarbenEinkaufMenge}</td>
                        <td>{GeplanteProduktion}</td>
                    </tr>
                    <tr>
                        <td>Gesamte Verfügbarkeit</td>
                        <td>{data.current_stock.sneaker_count + parseInt(SneakerEinkaufMenge)}</td>
                        <td>{data.current_stock.paint_count + parseInt(FarbenEinkaufMenge)}</td>
                        <td>{data.current_stock.finished_sneaker_count + parseInt(GeplanteProduktion)}</td>
                    </tr>
                    <tr>
                        <td>Verbrauch Produktion (PLAN)</td>
                        <td>{GeplanteProduktion}</td>
                        <td>{GeplanteProduktion *2}</td>
                        <td>{Math.round(parseInt(GeplanteProduktion )+ parseInt(EntnahmeAusDemLager))}</td>
                    </tr>
                    <tr>
                        <td>Lager Periodenende (PLAN)</td>
                        <td>{(data.current_stock.sneaker_count + parseInt(SneakerEinkaufMenge))-GeplanteProduktion}</td>
                        <td>{(data.current_stock.sneaker_count + parseInt(FarbenEinkaufMenge))-GeplanteProduktion*2}</td>
                        <td>{data.current_stock.finished_sneaker_count + parseInt(GeplanteProduktion)-Math.round(parseInt(MarktSoll)+parseInt(AusschreibungSoll))}</td>
                    </tr>
                    <tr>
                        <td>Lagerkosten pro Stück</td>
                        <td>4,00€</td>
                        <td>1,00€</td>
                        <td>8,00€</td>
                    </tr>
                    <tr>
                        <td>Lagerkosten (PLAN)</td>
                        <td>{((data.current_stock.sneaker_count + parseInt(SneakerEinkaufMenge))-GeplanteProduktion)*4 + "€"}</td>
                        <td>{((data.current_stock.sneaker_count + parseInt(FarbenEinkaufMenge))-GeplanteProduktion*2)*1 + "€"}</td>
                        <td>{(data.current_stock.finished_sneaker_count + parseInt(GeplanteProduktion)-Math.round(parseInt(MarktSoll)+parseInt(AusschreibungSoll)))*8 + "€"}</td>
                    </tr>
                    <tr>
                        <td>Verbrauch Produktion (IST)</td>
                        <td>{GeplanteProduktion}</td>
                        <td>{GeplanteProduktion*2}</td>
                        <td>{MarktSoll}</td>
                    </tr>
                    <tr>
                        <td>Lager Periodenende (IST)</td>
                        <td>{data.current_stock.sneaker_count + parseInt(SneakerEinkaufMenge)-GeplanteProduktion}</td>
                        <td>{data.current_stock.paint_count + parseInt(FarbenEinkaufMenge)-GeplanteProduktion*2}</td>
                        <td>{data.current_stock.finished_sneaker_count + parseInt(GeplanteProduktion)-Math.round(parseInt(MarktIst)+parseInt(AusschreibungIst))}</td>
                    </tr>
                    <tr>
                        <td>Lagerkosten (IST)</td>
                        <td>{(data.current_stock.sneaker_count + parseInt(SneakerEinkaufMenge)-GeplanteProduktion)*4 + "€"}</td>
                        <td>{(data.current_stock.paint_count + parseInt(FarbenEinkaufMenge)-GeplanteProduktion*2)*1  + "€"}</td>
                        <td>{(data.current_stock.finished_sneaker_count + parseInt(GeplanteProduktion)-Math.round(parseInt(MarktIst)+parseInt(AusschreibungIst)))*8  + "€"}</td>
                    </tr>
                    
                </tbody>
             </table>
             
        </div>
        <div className=" p-4 xl:col-span-3 shadow-lg rounded-3xl m-2 bg-white flex justify-center snap-start " ref={PersonalRef}>
             <table>
                <tbody>
                    <tr>
                        <th className='xl:w-96'></th>
                        <th className='text-[#4fd1c5] xl:w-96 '>Personal</th>
                    </tr>
                    <tr>
                        <td>Mitarbeiter</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e)=> setMitarbeiter(e.target.value)} value={Mitarbeiter}></input></td>

                    </tr>
                    <tr>
                        <td>Grundkapazität Stück je MA</td>
                        <td>20</td>

                    </tr>
                    <tr>
                        <td>Verfügbare Kapazität (MA)</td>
                        <td>{Mitarbeiter - ZugeteilteMitarbeiter}</td>

                    </tr>
                    <tr>
                        <td>benötigte MA </td>
                        <td>{ZugeteilteMitarbeiter}</td>

                    </tr>
                    <tr>
                        <td>Auslastung </td>
                        <td>{Math.round((ZugeteilteMitarbeiter/1)/Mitarbeiter * 100)}</td>

                    </tr>
                    <tr>
                        <td>Neueinstellungen</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e)=> setNeueinstellungen(e.target.value)} value={Neueinstellungen}></input></td>

                    </tr>
                    <tr>
                        <td>Kosten Neueinstellung</td>
                        <td>100,00€</td>

                    </tr>
                    <tr>
                        <td>Kündigungen/Rente/ etc.</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e)=> setKündigungen(e.target.value)} value={Kündigungen}></input></td>

                    </tr>
                    <tr>
                        <td>Zugeteilte Mitarbeiter</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e)=> setZugeteilteMitarbeiter(e.target.value)} value={ZugeteilteMitarbeiter}></input></td>

                    </tr>
                    <tr>
                        <td>Mitarbeiter nächste Periode</td>
                        <td>{parseInt(Mitarbeiter) + parseInt(Neueinstellungen) - Kündigungen}</td>


                    </tr>
                    <tr>
                        <td>Kosten pro MA</td>
                        <td>500</td>

                    </tr>
                    <tr>
                        <td>Personalnebenkosten</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e)=> setPersonalnebenkosten(e.target.value)} value={Personalnebenkosten}></input></td>

                    </tr>
                    <tr>
                        <td>Personalkosten akt. Periode</td>
                        <td>{Mitarbeiter * (500*(PersonalnebenkostenInP))}</td>

                    </tr>
                    <tr>
                        <td>Personalkosten folg. Periode</td>
                        <td>{(parseInt(Mitarbeiter) + parseInt(Neueinstellungen) - Kündigungen) * (500*(PersonalnebenkostenInP))}</td>

                    </tr>

                </tbody>
             </table>
             <img src="/img/personal.svg" className='h-96 w-64 xl:w-96 my-auto'></img>
           
        </div>
        {data.scenario.machine_1_bought ?  <div className="p-4  shadow-lg rounded-3xl m-2 bg-white  snap-start" ref={ProductionRef}>
             <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th className='text-[#4fd1c5]'>Sneakerbox 200</th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>Produktionskapazität</td>
                        <td>{Produktionskapazität}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Maschinenkosten p. Per.</td>
                        <td>{Maschinenkosten}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Fertigungskosten pro Stück</td>
                        <td>60€</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Fertigungskosten pro Stück (F&E)</td>
                        <td>{FertigungskostenProStückFE}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Rationalisierung</td>
                        <td>100%</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Geplante Produktion</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e)=> setGeplanteProduktion(e.target.value)} value={GeplanteProduktion}></input></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Produktionsprüfung (Werkstoffe)</td>
                        <td>{MaximalproduzierbareAnzahl >= GeplanteProduktion/1 ? "ja":"Keine ausreichenden Werkstoffe"}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Benötigte Mitarbeiter</td>
                        <td>{Math.ceil(GeplanteProduktion / 20)}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Zugeteilte Mitarbeiter</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e)=> setZugeteilteMitarbeiter(e.target.value)} value={ZugeteilteMitarbeiter}></input></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Produktionsprüfung (Mitarbeiter)</td>
                        <td>{ZugeteilteMitarbeiter == Math.ceil(GeplanteProduktion / 20) ? "ja":"Keine passende Mitarbeiteranzahl"}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Auslastung</td>
                        <td>{Math.round((GeplanteProduktion/1)/Produktionskapazität * 100)}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Gesamtkosten Produktion</td>
                        <td>{Maschinenkosten+ FertigungskostenProStückFE * GeplanteProduktion}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    
                </tbody>
             </table>
        </div>:<></>}
       
        <div className="p-4  shadow-lg rounded-3xl m-2 bg-white  snap-start">
             <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th className='text-[#4fd1c5]'>Sneakerbox 200</th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>Produktionskapazität</td>
                        <td>{Produktionskapazität}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Maschinenkosten p. Per.</td>
                        <td>{Maschinenkosten}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Fertigungskosten pro Stück</td>
                        <td>60€</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Fertigungskosten pro Stück (F&E)</td>
                        <td>{FertigungskostenProStückFE}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Rationalisierung</td>
                        <td>100%</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Geplante Produktion</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e)=> setGeplanteProduktion(e.target.value)} value={GeplanteProduktion}></input></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Produktionsprüfung (Werkstoffe)</td>
                        <td>{MaximalproduzierbareAnzahl >= GeplanteProduktion/1 ? "ja":"Keine ausreichenden Werkstoffe"}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Benötigte Mitarbeiter</td>
                        <td>{Math.ceil(GeplanteProduktion / 20)}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Zugeteilte Mitarbeiter</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e)=> setZugeteilteMitarbeiter(e.target.value)} value={ZugeteilteMitarbeiter}></input></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Produktionsprüfung (Mitarbeiter)</td>
                        <td>{ZugeteilteMitarbeiter == Math.ceil(GeplanteProduktion / 20) ? "ja":"Keine passende Mitarbeiteranzahl"}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Auslastung</td>
                        <td>{Math.round((GeplanteProduktion/1)/Produktionskapazität * 100)}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Gesamtkosten Produktion</td>
                        <td>{Maschinenkosten+ FertigungskostenProStückFE * GeplanteProduktion}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    
                </tbody>
             </table>
        </div>
        <div className="p-4  shadow-lg rounded-3xl m-2 bg-white  snap-start">
             <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th className='text-[#4fd1c5]'>Sneakerbox 200</th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>Produktionskapazität</td>
                        <td>{Produktionskapazität}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Maschinenkosten p. Per.</td>
                        <td>{Maschinenkosten}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Fertigungskosten pro Stück</td>
                        <td>60€</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Fertigungskosten pro Stück (F&E)</td>
                        <td>{FertigungskostenProStückFE}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Rationalisierung</td>
                        <td>100%</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Geplante Produktion</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e)=> setGeplanteProduktion(e.target.value)} value={GeplanteProduktion}></input></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Produktionsprüfung (Werkstoffe)</td>
                        <td>{MaximalproduzierbareAnzahl >= GeplanteProduktion/1 ? "ja":"Keine ausreichenden Werkstoffe"}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Benötigte Mitarbeiter</td>
                        <td>{Math.ceil(GeplanteProduktion / 20)}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Zugeteilte Mitarbeiter</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e)=> setZugeteilteMitarbeiter(e.target.value)} value={ZugeteilteMitarbeiter}></input></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Produktionsprüfung (Mitarbeiter)</td>
                        <td>{ZugeteilteMitarbeiter == Math.ceil(GeplanteProduktion / 20) ? "ja":"Keine passende Mitarbeiteranzahl"}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Auslastung</td>
                        <td>{Math.round((GeplanteProduktion/1)/Produktionskapazität * 100)}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Gesamtkosten Produktion</td>
                        <td>{Maschinenkosten+ FertigungskostenProStückFE * GeplanteProduktion}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    
                </tbody>
             </table>
        </div>
        <div className=" p-4  xl:col-span-3 shadow-lg rounded-3xl m-2 bg-white flex justify-around snap-start " ref={MarketingRef}>
             <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th className='text-[#4fd1c5]'>Marketing</th>
                    </tr>
                    <tr>
                        <td>Werbung</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e)=> setWerbung(e.target.value)} value={Werbung}></input></td>
                    </tr>
                    <tr>
                        <th></th>
                        <th className='text-[#4fd1c5]'>Forschung und Entwickelung</th>
                    </tr>
                    <tr>
                        <td>Verbesserung der Maschinen</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e)=> setForschungUndEntwickelung(e.target.value)} value={ForschungUndEntwickelung}></input></td>
                    </tr>
                </tbody>
             </table>
             <img src="/img/undraw_mobile_marketing.svg" className='h-96 w-64 xl:w-96 m-4'></img>
        </div>
        <div className="p-4 shadow-lg rounded-3xl m-2 bg-white flex justify-center snap-start" ref={AbsatzRef}>
             <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th className='text-[#4fd1c5]'>Planung Umsatzerlöse</th>
                    </tr>
                    <tr>
                        <td>Geplante Produktion</td>
                    </tr>
                    <tr>
                        <td>Maximal Entnahme aus Lager</td>
                    </tr>
                    <tr>
                        <td>Entnahme aus dem Lager</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e)=> setEntnahmeAusDemLager(e.target.value)} value={EntnahmeAusDemLager}></input></td>
                    </tr>
                    <tr>
                        <td>Gesamtproduktion</td>
                        <td>{Math.round(parseInt(GeplanteProduktion )+ parseInt(EntnahmeAusDemLager))}</td>
                    </tr>
                    <tr>
                        <td>Geplanteproduktion möglich</td>
                        <td>{EntnahmeAusDemLager > MaximaleEntnahmeAusLager/1? "Nein":"Ja"}</td>
                    </tr>
                </tbody>
             </table>
        </div>
        <div className=" p-4 shadow-lg rounded-3xl m-2 bg-white flex justify-center  snap-start">
             <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th className='text-[#4fd1c5]'   >Verkauf (Soll)</th>
                    </tr>
                    <tr>
                        <td>Markt</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e)=> setMarktSoll(e.target.value)} value={MarktSoll}></input></td>
                    </tr>
                    <tr>
                        <td>Ausschreibung</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e)=> setAussetschreibungSoll(e.target.value)} value={AusschreibungSoll}></input></td>
                    </tr>
                    <tr>
                        <td>Gesamt</td>
                        <td>{Math.round(parseInt(MarktSoll)+parseInt(AusschreibungSoll))}</td>
                    </tr>
                    <tr>
                        <td>Gesamtverkauf Möglich</td>
                        <td>{GesamtSoll > Gesamtproduktion/1? "Nein":"Ja"}</td>
                    </tr>
                </tbody>
             </table>
        </div>
        <div className=" p-4 shadow-lg rounded-3xl m-2 bg-white flex justify-center snap-start ">
             <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th className='text-[#4fd1c5]'>Verkauf (Ist)</th>
                    </tr>
                    <tr>
                        <td>Markt</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e)=> setMarktIst(e.target.value)} value={MarktIst}></input></td>
                    </tr>
                    <tr>
                        <td>Ausschreibung</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e)=> setAusschreibungIst(e.target.value)} value={AusschreibungIst}></input></td>
                    </tr>
                    <tr>
                        <td>Gesamt</td>
                        <td>{Math.round(parseInt(MarktIst)+parseInt(AusschreibungIst))}</td>
                    </tr>
                </tbody>
             </table>
        </div>
        <div className=" p-4 shadow-lg xl:col-span-3 rounded-3xl m-2 bg-white flex justify-center snap-start " ref={FinanzenRef}>
        <img src="/img/undraw_finance.svg" className='h-[500px] w-0 xl:w-[500px] m-auto'></img>
             <table>
                <tbody>
                    <tr>
                        <th ></th>
                        <th className='text-[#4fd1c5]'>Finanzen</th>
                        
                    </tr>
                    <tr>
                        <td className='w-80'></td>
                        <td className='text-[#4fd1c5] w-40' >PLAN</td>
                        <td className='text-[#4fd1c5] w-40'>IST</td>
                    </tr>
                    <tr>
                        <td>Kontostand</td>
                        <td>{data.current_stock.account_balance + "€"}</td>
                        <td>{data.current_stock.account_balance + "€"}</td>
                    </tr>
                    <tr>
                        <td>Maximale Darlehenshöhe</td>
                        <td>50.000€</td>
                        <td>50.000€</td>
                    </tr>
                    <tr>
                        <td>Darlehensstand (Beginn Periode)</td>
                        <td>{data.current_stock.credit_taken}</td>
                        <td>{data.current_stock.credit_taken}</td>
                    </tr>
                    <tr>
                        <td>Aufnahme Darlehen</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e)=> setAufnahmeDarlehen(e.target.value)} value={AufnahmeDarlehen}></input></td>
                        <td>{AufnahmeDarlehen}</td>
                    </tr>
                    <tr>
                        <td>Darlehensstand (Ende Periode)</td>
                        <td>{data.current_stock.credit_taken + AufnahmeDarlehen -RueckzahlungDarlehen}</td>
                        <td>{data.current_stock.credit_taken + AufnahmeDarlehen -RueckzahlungDarlehen}</td>
                    </tr>
                    <tr>
                        <td>Einkauf Sneaker</td>
                        <td>{SneakerKosten}</td>
                        <td>{SneakerKosten}</td>
                    </tr>
                    <tr>
                        <td>Einkauf Farben</td>
                        <td>{FarbenKosten}</td>
                        <td>{FarbenKosten}</td>
                    </tr>
                    <tr>
                        <td>Lagerkosten Fertige Erz.</td>
                        <td>{(data.current_stock.finished_sneaker_count + parseInt(GeplanteProduktion)-Math.round(parseInt(MarktSoll)+parseInt(AusschreibungSoll)))*8 + "€"}</td>
                        <td>{(data.current_stock.finished_sneaker_count + parseInt(GeplanteProduktion)-Math.round(parseInt(MarktIst)+parseInt(AusschreibungIst)))*8  + "€"}</td>
                    </tr>
                    <tr>
                        <td>Lagerkosten Sneaker</td>
                        <td>{(data.current_stock.sneaker_count + parseInt(SneakerEinkaufMenge)-GeplanteProduktion)*4 + "€"}</td>
                        <td>{(data.current_stock.sneaker_count + parseInt(SneakerEinkaufMenge)-GeplanteProduktion)*4 + "€"}</td>
                    </tr>
                    <tr>
                        <td>Lagerkosten Farben</td>
                        <td>{((data.current_stock.sneaker_count + parseInt(FarbenEinkaufMenge))-GeplanteProduktion*2)*1 + "€"}</td>
                        <td>{((data.current_stock.sneaker_count + parseInt(FarbenEinkaufMenge))-GeplanteProduktion*2)*1 + "€"}</td>
                    </tr>
                    <tr>
                        <td>Maschinenkosten</td>
                        <td>{Maschinenkosten}</td>
                        <td>{Maschinenkosten}</td>
                    </tr>
                    <tr>
                        <td>Produktionskosten</td>
                        <td>{GesamtkostenProduktion - Maschinenkosten}</td>
                        <td>{GesamtkostenProduktion - Maschinenkosten}</td>
                    </tr>
                    <tr>
                        <td>Maschinenkauf</td>
                        <td>{}</td>
                        <td>{}</td>
                    </tr>
                    <tr>
                        <td>Kosten Neueinstellung</td>
                        <td>{Neueinstellungen*100 + "€"}</td>
                        <td>{Neueinstellungen*100 + "€"}</td>
                    </tr>
                    <tr>
                        <td>Löhne/Gehälter</td>
                        <td>{Mitarbeiter * (500*(PersonalnebenkostenInP))}</td>
                        <td>{Mitarbeiter * (500*(PersonalnebenkostenInP))}</td>
                    </tr>
                    <tr>
                        <td>Werbekosten</td>
                        <td>{Werbung + "€"}</td>
                        <td>{Werbung + "€"}</td>
                    </tr>
                    <tr>
                        <td>Rationalisierung</td>
                        <td>{<input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e)=> setForschungUndEntwickelung(e.target.value)} value={ForschungUndEntwickelung}></input>}</td>
                        <td>{<input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e)=> setForschungUndEntwickelung(e.target.value)} value={ForschungUndEntwickelung}></input>}</td>
                    </tr>
                    <tr>
                        <td>Zinsen (Darlehen)</td>
                        <td>{((data.current_stock.credit_taken + AufnahmeDarlehen -RueckzahlungDarlehen)*data.scenario.factor_interest_rate).toFixed(2) + "€"}</td>                      
                        <td>{((data.current_stock.credit_taken + AufnahmeDarlehen -RueckzahlungDarlehen)*data.scenario.factor_interest_rate).toFixed(2) + "€"}</td>
                    </tr>
                    <tr>
                        <td>Rückzahlung Darlehen</td>
                        <td>{<input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e)=> setRueckzahlungDarlehen(e.target.value)} value={RueckzahlungDarlehen}></input>}</td>
                        <td>{<input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e)=> setRueckzahlungDarlehen(e.target.value)} value={RueckzahlungDarlehen}></input>}</td>
                    </tr>
                    <tr>
                        <td>Umsatzerlöse</td>
                        <td>{GesamtSoll}</td>
                        <td>{Math.round(parseInt(MarktIst)+parseInt(AusschreibungIst))}</td>
                    </tr>
                    <tr>
                        <td>Saldo</td>
                        <td>{}</td>
                        <td>{}</td>
                    </tr>
                    <tr>
                        <td>Höhe Kontokorrentkredit</td>
                        <td>{}</td>
                        <td>{}</td>
                    </tr>
                    <tr>
                        <td>Zinsen (Kontokorrentkredit)</td>
                        <td>{}</td>
                        <td>{}</td>
                    </tr>
                    <tr>
                        <td>Kontostand</td>
                        <td>{}</td>
                        <td>{}</td>
                    </tr>

                </tbody>
             </table>
        </div>
        <button className="px-4 right-0 m-4 py-4 text-sm bg-[#4fd1c5] rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-white font-bold">Abgeben/Speichern</button>
        </form>
    </>
)
}

export default Container