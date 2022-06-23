import React from 'react'
import Beschaffung from './Beschaffung'
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import Swal from 'sweetalert2'

const Container = ({ ProductionRef, LagerBeschaffungRef, FinanzenRef, MarketingRef, PersonalRef, AbsatzRef }) => {

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
    const [SneakerEinkaufMenge, setSneakerEinkaufMenge] = useState(data.current_cycle.buy_sneaker)
    const [FarbenEinkaufMenge, setFarbenEinkaufMenge] = useState(data.current_cycle.buy_paint)
    const SneakerKosten = data.scenario.sneaker_price * SneakerEinkaufMenge
    const FarbenKosten = data.scenario.paint_price * FarbenEinkaufMenge
    const [GeplanteProduktion, setGeplanteProduktion] = useState(data.current_cycle.planned_production_1)
    const [ZugeteilteMitarbeiter, setZugeteilteMitarbeiter] = useState(data.current_cycle.planned_workers_1)
    const [GeplanteProduktion2, setGeplanteProduktion2] = useState(data.current_cycle.planned_production_2)
    const [ZugeteilteMitarbeiter2, setZugeteilteMitarbeiter2] = useState(data.current_cycle.planned_workers_2)
    const [GeplanteProduktion3, setGeplanteProduktion3] = useState(data.current_cycle.planned_production_3)
    const [ZugeteilteMitarbeiter3, setZugeteilteMitarbeiter3] = useState(data.current_cycle.planned_workers_3)
    const [Werbung, setWerbung] = useState(data.current_cycle.ad_invest)
    const [ForschungUndEntwickelung, setForschungUndEntwickelung] = useState(data.current_cycle.research_invest)
    const [EntnahmeAusDemLager, setEntnahmeAusDemLager] = useState(data.current_cycle.include_from_stock)
    const [MarktSoll, setMarktSoll] = useState(data.current_cycle.sales_planned)
    const [MarktSollPreis, setMarktSollPreis] = useState(0)
    const [MarktIst, setMarktIst] = useState(0)
    const [AusschreibungSoll, setAussetschreibungSoll] = useState(data.current_cycle.sales_bid)
    const [AusschreibungSollPreis, setAussetschreibungSollPreis] = useState(0)
    const [AusschreibungIst, setAusschreibungIst] = useState(0)
    const [GesamtSoll, setGesamtSoll] = useState(0)
    const [MaximaleEntnahmeAusLager, setMaximaleEntnahmeAusLager] = useState(0)
    const [Mitarbeiter, setMitarbeiter] = useState(8)
    const [Neueinstellungen, setNeueinstellungen] = useState(0)
    const [Kündigungen, setKündigungen] = useState(0)
    const [Personalnebenkosten, setPersonalnebenkosten] = useState(20)
    const [AufnahmeDarlehen, setAufnahmeDarlehen] = useState(0)
    const [RueckzahlungDarlehen, setRueckzahlungDarlehen] = useState(0)
    const [buy_new_machine_2, setBuy_new_machine_2] = useState(data.current_cycle.buy_new_machine_2)
    const [buy_new_machine_3, setBuy_new_machine_3] = useState(data.current_cycle.buy_new_machine_2)

    var Gesamtproduktion = parseInt(GeplanteProduktion) + parseInt(GeplanteProduktion2) + parseInt(GeplanteProduktion3)

    var PersonalnebenkostenInP = Personalnebenkosten / 100 + 1
    var ProduktionFarben = parseInt(FarbenEinkaufMenge / 2)
    var Produktionskapazität = 200;
    var FertigungskostenProStückFE = 60
    var Maschinenkosten = 4000;
    var MaximalproduzierbareAnzahl = SneakerEinkaufMenge > ProduktionFarben ? ProduktionFarben : SneakerEinkaufMenge
    var GesamtkostenProduktion = Maschinenkosten + FertigungskostenProStückFE * GeplanteProduktion;
    var UmsatzIst = 0;
    var UmsatzSoll = MarktSoll * MarktSollPreis + AusschreibungSoll * AusschreibungSollPreis;

    var AllMaschienenKosten = 0

    if (data.current_stock.machine_1_bought) {
        AllMaschienenKosten = 4000
    }
    if (data.current_stock.machine_2_bought) {
        AllMaschienenKosten = 8000
    }
    if (data.current_stock.machine_3_bought) {
        AllMaschienenKosten = 12000
    }

    //const [modal, setModal] = useState()

    const [modalBuyMaschine, setModalBuyMaschine] = useState()

    const [modalConfirm, setModalConfirm] = useState()

    const initData = (data) =>{
        setSneakerEinkaufMenge(data.current_cycle.buy_sneaker)
        setFarbenEinkaufMenge(data.current_cycle.buy_paint)
        setGeplanteProduktion(data.current_cycle.planned_production_1)
        setZugeteilteMitarbeiter(data.current_cycle.planned_workers_1)
        setGeplanteProduktion2(data.current_cycle.planned_production_2)
        setZugeteilteMitarbeiter2(data.current_cycle.planned_workers_2)
        setGeplanteProduktion3(data.current_cycle.planned_production_3)
        setZugeteilteMitarbeiter3(data.current_cycle.planned_workers_3)
        setWerbung(data.current_cycle.ad_invest)
        setForschungUndEntwickelung(data.current_cycle.research_invest)
        setEntnahmeAusDemLager(data.current_cycle.include_from_stock)
        setMarktSoll(data.current_cycle.sales_planned)
        setMarktSollPreis(0)
        setMarktIst(0)
        setAussetschreibungSollPreis(data.current_cycle.sales_bid)
        setAusschreibungIst(0)
        setGesamtSoll(0)
        setMaximaleEntnahmeAusLager(0)
        setMitarbeiter(8)
        setNeueinstellungen(0)
        setKündigungen(0)
        setPersonalnebenkosten(20)
        setAufnahmeDarlehen(0)
        setRueckzahlungDarlehen(0)
        setBuy_new_machine_2(data.current_cycle.buy_new_machine_2)
        setBuy_new_machine_3(data.current_cycle.buy_new_machine_3)
    }

    useEffect(async () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))
        myHeaders.append('Access-Control-Allow-Origin', '*')

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        fetch(process.env.REACT_APP_MY_API_URL + '/user/my_auth', requestOptions)
            .then(async (element) => {
                let body = await element.text();
                if (body.replaceAll("\"", "") === "base") {
                    const getData = async () => {
                        const dataFromServer = await fetchData(requestOptions)
                        setData(dataFromServer)
                        initData(dataFromServer)
                    }
                    getData()
                }
                return
            })
    }, [])

    const fetchData = async (requestOptions) => {
        const res = await fetch(process.env.REACT_APP_MY_API_URL + '/api/v1/game/student/my_summary', requestOptions)
        const data = await res.json()

        return data
    }

    const onSubmit = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))
        myHeaders.append('Access-Control-Allow-Origin', '*')

        var raw = JSON.stringify({
            "buy_sneaker": parseInt(SneakerEinkaufMenge),
            "buy_paint": parseInt(FarbenEinkaufMenge),
            "planned_production_1": GeplanteProduktion,
            "planned_production_2": GeplanteProduktion2,
            "planned_production_3": GeplanteProduktion3,
            "planned_workers_1": ZugeteilteMitarbeiter,
            "planned_workers_2": ZugeteilteMitarbeiter2,
            "planned_workers_3": ZugeteilteMitarbeiter3,
            "include_from_stock": EntnahmeAusDemLager,
            "sales_planned": MarktSoll,
            "sales_bid": AusschreibungSoll,
            "tender_offer_count": 0,
            "tender_offer_price": 0,
            "research_invest": ForschungUndEntwickelung,
            "ad_invest": Werbung,
            "take_credit": AufnahmeDarlehen,
            "payback_credit": RueckzahlungDarlehen,
            "new_employees": (Neueinstellungen - Kündigungen),
            "buy_new_machine_2": buy_new_machine_2,
            "buy_new_machine_3": buy_new_machine_3,
        });

        var requestOptions = {
            method: 'POST',
            body: raw,
            headers: myHeaders,
        };

        const res = await fetch(process.env.REACT_APP_MY_API_URL + '/api/v1/cycle/new_entry', requestOptions)
        if (res.status === 201) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Die Abgabe war Erfolgreich',
                showConfirmButton: false,
                timer: 1500
              })
            /*setModal(
                <>
                    <div className={"block"}>
                        <div
                            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
                            id="my-modal"
                        ></div>
                        <div
                            className="fixed text-gray-600 flex items-center justify-center overflow-auto z-50 bg-black bg-opacity-40 left-0 right-0 top-0 bottom-0">
                            <div
                                className="text-center bg-white rounded-xl shadow-2xl p-6 sm:w-8/12 mx-10 ">

                                <div className="hero container max-w-screen-lg mx-auto p-5">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        id="Capa_1" x="0px" y="0px" viewBox="0 0 507.506 507.506"
                                        fill="currentColor"
                                        class="mx-auto h-32 text-green-400"
                                        height="512">
                                        <g>
                                            <path d="M163.865,436.934c-14.406,0.006-28.222-5.72-38.4-15.915L9.369,304.966c-12.492-12.496-12.492-32.752,0-45.248l0,0   c12.496-12.492,32.752-12.492,45.248,0l109.248,109.248L452.889,79.942c12.496-12.492,32.752-12.492,45.248,0l0,0   c12.492,12.496,12.492,32.752,0,45.248L202.265,421.019C192.087,431.214,178.271,436.94,163.865,436.934z" />
                                        </g>
                                    </svg>
                                </div>
                                <span className="font-bold block text-xl mb-3">Erfolgreich</span>
                                <span className="block text-xl mb-3">Die Abgabe war Erfolgreich</span>
                                <div className="text-right space-x-5 mt-5">
                                    <button onClick={() => setModal(<></>)} className="px-4 py-2 text-sm bg-white rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-gray-50 focus:bg-indigo-50 focus:text-indigo">Schließen</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )*/
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Es ist ein Fehler aufgetreten',
                showConfirmButton: false,
                timer: 1500
              })
            /*setModal(
                <>
                    <div className={"block"}>
                        <div
                            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
                            id="my-modal"
                        ></div>
                        <div
                            className="fixed text-gray-600 flex items-center justify-center overflow-auto z-50 bg-black bg-opacity-40 left-0 right-0 top-0 bottom-0">
                            <div
                                className="text-center bg-white rounded-xl shadow-2xl p-6 sm:w-8/12 mx-10 ">

                                <div className="hero container max-w-screen-lg mx-auto p-5">
                                    <svg className="mx-auto h-32 text-red-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512"
                                        height="512">
                                        <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" />
                                        <path d="M12,5a1,1,0,0,0-1,1v8a1,1,0,0,0,2,0V6A1,1,0,0,0,12,5Z" />
                                        <rect x="11" y="17" width="2" height="2" rx="1" />
                                    </svg>
                                </div>
                                <span className="font-bold block text-xl mb-3">Fehler!</span>
                                <span className="block text-xl mb-3">Es gibt ein Fehler beim Abgeben</span>
                                <div className="text-right space-x-5 mt-5">
                                    <button onClick={() => setModal(<></>)} className="px-4 py-2 text-sm bg-white rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-gray-50 focus:bg-indigo-50 focus:text-indigo">Schließen</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )*/
        }
        const data = await res.json()



        return data
    }

    const [newMaschienPrize, setNewMaschienPrize] = useState(0)


    const onBuyM2 = async () => {

        BuymaschineModal()
    }


    const onBuyM3 = async () => {
        BuymaschineModal()
    }

    const [availableMachine, setAvailableMachine] = useState(
        [
            {
                name: "Sneakerbox 200",
                price: "3000"
            },
            {
                name: "Sneakerbox 300",
                price: "0.5"
            },
            {
                name: "Sneakerbox 300",
                price: "10000"
            }
        ])

    /*useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(process.env.REACT_APP_MY_API_URL + '/api/v1/game/machine')
            const data = await res.json()
    
            return data
        }
        fetchData()
    }, [])*/




    const BuymaschineModal = () => {
        setModalBuyMaschine(<>
            <div className="block">
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
                    id="my-modal"
                ></div>
                <div
                    className="fixed text-gray-600 flex items-center justify-center overflow-auto z-50 bg-black bg-opacity-40 left-0 right-0 top-0 bottom-0">
                    <div
                        className="text-center bg-white rounded-xl shadow-2xl p-6 sm:w-8/12 mx-10 ">

                        <div className='p-4 list-none xl:col-span-2 m-2 flex justify-center snap-start grid-cols-3 w-[90%]  mx-12 overflow-hidden'>
                            {availableMachine.map(({ name, price }) => {
                                return (
                                    <li className='p-3 mx-3 shadow-lg rounded-3xl m-auto my-4 justify-around bg-white w-[90%]' onClick={() => Confirm(name, price)}>
                                        <h1 className='block mb-2'>{name}</h1>
                                        <hr className='w-[50%] text-center mx-auto border-none h-[2px] rounded-xl bg-[#4fd1c5] opacity-50'/>
                                        <br/>
                                        <p></p>
                                        <br/>
                                        <hr className='w-[50%] text-center mx-auto border-none h-[2px] rounded-xl bg-[#4fd1c5] opacity-50'/>
                                        <h2 className='block mt-2'>{formatter.format(price)}</h2>

                                    </li>
                                )
                            })
                            }
                        </div>
                        <button onClick={() => setModalBuyMaschine(<></>)} className="px-4 py-2 text-sm bg-white rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-gray-50 focus:bg-indigo-50 focus:text-indigo">Schließen</button>
                    </div>
                </div>
            </div>
        </>

        )
    }

    const Confirm = (name, price) => {
        setModalConfirm(<></>)
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'bg-green-500 hove:bg-green-700 focus:bg-green-600 text-white px-4 py-2 mx-[10px] rounded',
              cancelButton: 'bg-red-500 hove:bg-red-700 focus:bg-red-600 text-white px-4 py-2 mx-[10px] rounded',
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Bist du dir Sicher?',
            text: "Möchtest du die Maschine \"" + name + "\" wirklich kaufen?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ja',
            cancelButtonText: 'Nein',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire(
                'Erfolgreich',
                'Du hast den kauf Erfolgreich Abgeschlossen!',
                'success'
              ).then(() => {
                doMagicToBuyMachine(name, price)
                setModalBuyMaschine(<></>)
              })
              
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Kauf Abgebrochen',
                'Du hast den Kauf von ' + name + ' Abgebrochen',
                'error'
              )
            }
          })
        /*setModalConfirm(
            <>
                <div className={"block"}>
                    <div
                        className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
                        id="my-modal"
                    ></div>
                    <div
                        className="fixed text-gray-600 flex items-center justify-center overflow-auto z-50 bg-black bg-opacity-40 left-0 right-0 top-0 bottom-0">
                        <div
                            className="text-center bg-white rounded-xl shadow-2xl p-6 sm:w-8/12 mx-10 ">

                            <div className="hero container max-w-screen-lg mx-auto p-5">
                                <h1>Möchtes du wirklich die Maschine {name} für {formatter.format(price)} Kaufen?</h1>
                                <div className='pt-4'>
                                <button onClick={() => doMagicToBuyMachine(name, price)} className="px-4 py-2 text-sm bg-green-500 text-white rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-green-700 focus:bg-green-600 focus:text-indigo">Ja</button>
                                <button onClick={() => setModalConfirm(<></>)} className="px-4 py-2 text-white text-sm bg-red-500 rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-red-700 focus:bg-red-600 focus:text-indigo">Nein</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )*/
    }
    const doMagicToBuyMachine = (name, preis) => {
        //TODO warten auf jost wegen api und dann einbinden
        if (buy_new_machine_2 == false) {
            setBuy_new_machine_2(true)
        } else {
            setBuy_new_machine_3(true)
        }
        setNewMaschienPrize(preis)
        setModalConfirm(<></>)
        setModalBuyMaschine(<></>)

    }

    const formatter = new Intl.NumberFormat('de-de', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
    })
    return (
        <>
            
            {modalBuyMaschine}
            {modalConfirm}
            <div className='grid grid-cols-1 xl:grid-cols-3 overflow-x-hidde scrollbar '>


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
                                <td>{formatter.format(data.scenario.sneaker_price)}</td>
                                <td>{formatter.format(data.scenario.paint_price)}</td>
                            </tr>
                            <tr>
                                <td>Einkauf (Menge)</td>
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setSneakerEinkaufMenge(e.target.value)} value={SneakerEinkaufMenge}></input></td>
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setFarbenEinkaufMenge(e.target.value)} value={FarbenEinkaufMenge}></input></td>
                            </tr>
                            <tr>
                                <td>Kosten pro Werkstoff</td>
                                <td>{formatter.format(SneakerKosten)}</td>
                                <td>{formatter.format(FarbenKosten)}</td>
                            </tr>
                            <tr>
                                <td>Gesamtkosten Werkstoffe</td>
                                <td>{formatter.format(SneakerKosten + FarbenKosten)}</td>
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
                                <td>{data.current_stock.sneaker_count} Stk.</td>
                                <td>{data.current_stock.paint_count} Stk.</td>
                                <td>{data.current_stock.finished_sneaker_count} Stk.</td>
                            </tr>
                            <tr>
                                <td>Aktuelle Beschaffung</td>
                                <td>{SneakerEinkaufMenge} Stk.</td>
                                <td>{FarbenEinkaufMenge} Stk.</td>
                                <td>{Gesamtproduktion} Stk.</td>
                            </tr>
                            <tr>
                                <td>Gesamte Verfügbarkeit</td>
                                <td>{data.current_stock.sneaker_count + parseInt(SneakerEinkaufMenge) + " Stk."}</td>
                                <td>{data.current_stock.paint_count + parseInt(FarbenEinkaufMenge) + " Stk."}</td>
                                <td>{data.current_stock.finished_sneaker_count + parseInt(Gesamtproduktion) + " Stk."}</td>
                            </tr>
                            <tr>
                                <td>Verbrauch Produktion (PLAN)</td>
                                <td>{Gesamtproduktion} Stk.</td>
                                <td>{Gesamtproduktion * 2} Stk.</td>
                                <td>{Math.round(parseInt(Gesamtproduktion) + parseInt(EntnahmeAusDemLager)) + " Stk."}</td>
                            </tr>
                            <tr>
                                <td>Lager Periodenende (PLAN)</td>
                                <td>{(data.current_stock.sneaker_count + parseInt(SneakerEinkaufMenge)) - Gesamtproduktion + " Stk."}</td>
                                <td>{(data.current_stock.sneaker_count + parseInt(FarbenEinkaufMenge)) - Gesamtproduktion * 2 + " Stk."}</td>
                                <td>{data.current_stock.finished_sneaker_count + parseInt(Gesamtproduktion) - Math.round(parseInt(MarktSoll) + parseInt(AusschreibungSoll)) + " Stk."}</td>
                            </tr>
                            <tr>
                                <td>Lagerkosten pro Stück</td>
                                <td>4,00€</td>
                                <td>1,00€</td>
                                <td>8,00€</td>
                            </tr>
                            <tr>
                                <td>Lagerkosten (PLAN)</td>
                                <td>{formatter.format(((data.current_stock.sneaker_count + parseInt(SneakerEinkaufMenge)) - Gesamtproduktion) * 4)}</td>
                                <td>{formatter.format(((data.current_stock.sneaker_count + parseInt(FarbenEinkaufMenge)) - Gesamtproduktion * 2) * 1)}</td>
                                <td>{formatter.format((data.current_stock.finished_sneaker_count + parseInt(Gesamtproduktion) - Math.round(parseInt(MarktSoll) + parseInt(AusschreibungSoll))) * 8)}</td>
                            </tr>
                            <tr>
                                <td>Verbrauch Produktion (IST)</td>
                                <td>{Gesamtproduktion} Stk.</td>
                                <td>{Gesamtproduktion * 2} Stk.</td>
                                <td>{MarktSoll} Stk.</td>
                            </tr>
                            <tr>
                                <td>Lager Periodenende (IST)</td>
                                <td>{data.current_stock.sneaker_count + parseInt(SneakerEinkaufMenge) - Gesamtproduktion} Stk.</td>
                                <td>{data.current_stock.paint_count + parseInt(FarbenEinkaufMenge) - Gesamtproduktion * 2} Stk.</td>
                                <td>{data.current_stock.finished_sneaker_count + parseInt(Gesamtproduktion) - Math.round(parseInt(MarktIst) + parseInt(AusschreibungIst))} Stk.</td>
                            </tr>
                            <tr>
                                <td>Lagerkosten (IST)</td>
                                <td>{formatter.format((data.current_stock.sneaker_count + parseInt(SneakerEinkaufMenge) - Gesamtproduktion) * 4)}</td>
                                <td>{formatter.format((data.current_stock.paint_count + parseInt(FarbenEinkaufMenge) - Gesamtproduktion * 2) * 1)}</td>
                                <td>{formatter.format((data.current_stock.finished_sneaker_count + parseInt(Gesamtproduktion) - Math.round(parseInt(MarktIst) + parseInt(AusschreibungIst))) * 8)}</td>
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
                                <td>{Mitarbeiter}</td>

                            </tr>
                            <tr>
                                <td>Grundkapazität Stück je MA</td>
                                <td>20</td>

                            </tr>
                            <tr>
                                <td>Verfügbare Kapazität (MA)</td>
                                <td>{Mitarbeiter - ZugeteilteMitarbeiter} Stk.</td>

                            </tr>
                            <tr>
                                <td>benötigte MA </td>
                                <td>{ZugeteilteMitarbeiter} Stk.</td>

                            </tr>
                            <tr>
                                <td>Auslastung </td>
                                <td>{Math.round((ZugeteilteMitarbeiter / 1) / Mitarbeiter * 100)} %</td>

                            </tr>
                            <tr>
                                <td>Neueinstellungen</td>
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setNeueinstellungen(e.target.value)} value={Neueinstellungen}></input> Stk.</td>

                            </tr>
                            <tr>
                                <td>Kosten Neueinstellung</td>
                                <td>100,00€</td>

                            </tr>
                            <tr>
                                <td>Kündigungen/Rente/ etc.</td>
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setKündigungen(e.target.value)} value={Kündigungen}></input> Stk.</td>

                            </tr>
                            <tr>
                                <td>Zugeteilte Mitarbeiter</td>
                                <td>{parseInt(ZugeteilteMitarbeiter) + parseInt(ZugeteilteMitarbeiter2) + parseInt(ZugeteilteMitarbeiter3)} Stk.</td>

                            </tr>
                            <tr>
                                <td>Mitarbeiter nächste Periode</td>
                                <td>{parseInt(Mitarbeiter) + parseInt(Neueinstellungen) - Kündigungen} Stk.</td>


                            </tr>
                            <tr>
                                <td>Kosten pro MA</td>
                                <td>500,00 €</td>

                            </tr>
                            <tr>
                                <td>Personalnebenkosten</td>
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setPersonalnebenkosten(e.target.value)} value={Personalnebenkosten}></input> €</td>

                            </tr>
                            <tr>
                                <td>Personalkosten akt. Periode</td>
                                <td>{formatter.format(Mitarbeiter * (500 * (PersonalnebenkostenInP)))}</td>

                            </tr>
                            <tr>
                                <td>Personalkosten folg. Periode</td>
                                <td>{formatter.format((parseInt(Mitarbeiter) + parseInt(Neueinstellungen) - Kündigungen) * (500 * (PersonalnebenkostenInP)))}</td>

                            </tr>

                        </tbody>
                    </table>
                    <img src="/img/personal.svg" className='h-96 w-64 xl:w-96 m-auto'></img>

                </div>

                {data.current_stock.machine_1_bought ? <div className="p-4  shadow-lg rounded-3xl m-2 bg-white  snap-start" ref={ProductionRef}>
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
                                <td>{Produktionskapazität} Stk.</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Maschinenkosten p. Per.</td>
                                <td>{formatter.format(Maschinenkosten)}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Fertigungskosten pro Stück</td>
                                <td>60,00€</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Fertigungskosten pro Stück (F&E)</td>
                                <td>{formatter.format(FertigungskostenProStückFE)}</td>
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
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setGeplanteProduktion(e.target.value)} value={GeplanteProduktion}></input> Stk.</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Produktionsprüfung (Werkstoffe)</td>
                                <td>{MaximalproduzierbareAnzahl >= GeplanteProduktion / 1 ? "ja" : "Keine ausreichenden Werkstoffe"}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Benötigte Mitarbeiter</td>
                                <td>{Math.ceil(GeplanteProduktion / 20)} Stk.</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Zugeteilte Mitarbeiter</td>
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setZugeteilteMitarbeiter(e.target.value)} value={ZugeteilteMitarbeiter}></input> Stk.</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Produktionsprüfung (Mitarbeiter)</td>
                                <td>{ZugeteilteMitarbeiter == Math.ceil(GeplanteProduktion / 20) ? "ja" : "Keine passende Mitarbeiteranzahl"}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Auslastung</td>
                                <td>{Math.round((GeplanteProduktion / 1) / Produktionskapazität * 100)} %</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Gesamtkosten Produktion</td>
                                <td>{formatter.format(Maschinenkosten + FertigungskostenProStückFE * GeplanteProduktion)}</td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </div> : <div className="p-4  shadow-lg rounded-3xl m-2 bg-white  snap-start" ref={ProductionRef}>
                    <img src="/img/add_maschine..svg" className='h-96 w-64 xl:w-96 my-auto'></img> //TODO mach plus hin
                </div>}

                {data.current_stock.machine_2_bought ? <div className="p-4  shadow-lg rounded-3xl m-2 bg-white  snap-start" ref={ProductionRef}>
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th className='text-[#4fd1c5]'>Sneakerbox 2000</th>
                                <th></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>Produktionskapazität</td>
                                <td>{Produktionskapazität} Stk.</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Maschinenkosten p. Per.</td>
                                <td>{formatter.format(Maschinenkosten)}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Fertigungskosten pro Stück</td>
                                <td>60,00€</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Fertigungskosten pro Stück (F&E)</td>
                                <td>{formatter.format(FertigungskostenProStückFE)}</td>
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
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setGeplanteProduktion2(e.target.value)} value={GeplanteProduktion2}></input> Stk.</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Produktionsprüfung (Werkstoffe)</td>
                                <td>{MaximalproduzierbareAnzahl >= GeplanteProduktion2 / 1 ? "ja" : "Keine ausreichenden Werkstoffe"}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Benötigte Mitarbeiter</td>
                                <td>{Math.ceil(GeplanteProduktion2 / 20)} Stk.</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Zugeteilte Mitarbeiter</td>
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setZugeteilteMitarbeiter2(e.target.value)} value={ZugeteilteMitarbeiter2}></input> Stk.</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Produktionsprüfung (Mitarbeiter)</td>
                                <td>{ZugeteilteMitarbeiter2 == Math.ceil(GeplanteProduktion2 / 20) ? "ja" : "Keine passende Mitarbeiteranzahl"}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Auslastung</td>
                                <td>{Math.round((GeplanteProduktion2 / 1) / Produktionskapazität * 100)} %</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Gesamtkosten Produktion</td>
                                <td>{formatter.format(Maschinenkosten + FertigungskostenProStückFE * GeplanteProduktion2)}</td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </div> : buy_new_machine_2 ? <div className="p-4  shadow-lg rounded-3xl m-2 bg-white  snap-start" ref={ProductionRef}>
                    <h1 className='text-[#4fd1c5]'>Neue Maschine wurde bestellt, sie wird im nächsten cycle Verfügbare sein</h1>
                    <img src="/img/workonprogress.svg" className='h-96 w-64 xl:w-96 my-auto'></img>
                </div> : <div className="p-4  shadow-lg rounded-3xl m-2 bg-white  snap-start" ref={ProductionRef}>
                    <h1 className='text-[#4fd1c5]'>Neue Maschine Kaufen</h1>
                    <img src="/img/add_maschine.svg" className='h-96 w-64 xl:w-96 my-auto' onClick={onBuyM2}></img>
                </div>}

                {data.current_stock.machine_3_bought ? <div className="p-4  shadow-lg rounded-3xl m-2 bg-white  snap-start" ref={ProductionRef}>
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th className='text-[#4fd1c5]'>Sneakerbox 300</th>
                                <th></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>Produktionskapazität</td>
                                <td>{Produktionskapazität} Stk.</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Maschinenkosten p. Per.</td>
                                <td>{formatter.format(Maschinenkosten)}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Fertigungskosten pro Stück</td>
                                <td>60,00€</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Fertigungskosten pro Stück (F&E)</td>
                                <td>{formatter.format(FertigungskostenProStückFE)}</td>
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
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setGeplanteProduktion3(e.target.value)} value={GeplanteProduktion3}></input> Stk.</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Produktionsprüfung (Werkstoffe)</td>
                                <td>{MaximalproduzierbareAnzahl >= GeplanteProduktion3 / 1 ? "ja" : "Keine ausreichenden Werkstoffe"}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Benötigte Mitarbeiter</td>
                                <td>{Math.ceil(GeplanteProduktion3 / 20)} Stk.</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Zugeteilte Mitarbeiter</td>
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setZugeteilteMitarbeiter3(e.target.value)} value={ZugeteilteMitarbeiter3}></input> Stk.</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Produktionsprüfung (Mitarbeiter)</td>
                                <td>{ZugeteilteMitarbeiter3 == Math.ceil(GeplanteProduktion3 / 20) ? "ja" : "Keine passende Mitarbeiteranzahl"}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Auslastung</td>
                                <td>{Math.round((GeplanteProduktion3 / 1) / Produktionskapazität * 100)} %</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Gesamtkosten Produktion</td>
                                <td>{formatter.format(Maschinenkosten + FertigungskostenProStückFE * GeplanteProduktion3)}</td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </div> : data.current_stock.machine_2_bought === false ? <></> : buy_new_machine_3 ? <div className="p-4  shadow-lg rounded-3xl m-2 bg-white  snap-start" ref={ProductionRef}>
                    <h1 className='text-[#4fd1c5]'>Neue Maschine wurde bestellt, sie wird im nächsten cycle Verfügbare sein</h1>
                    <img src="/img/workonprogress.svg" className='h-96 w-64 xl:w-96 my-auto'></img>
                </div> : <div className="p-4  shadow-lg rounded-3xl m-2 bg-white  snap-start" ref={ProductionRef}>
                    <h1 className='text-[#4fd1c5]'>Neue Maschine Kaufen</h1>
                    <img src="/img/add_maschine.svg" className='h-96 w-64 xl:w-96 my-auto' onClick={onBuyM3}></img> //TODO mach plus hin
                </div>}


                <div className=" p-4  xl:col-span-3 shadow-lg rounded-3xl m-2 bg-white flex justify-around snap-start " ref={MarketingRef}>
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th className='text-[#4fd1c5]'>Marketing</th>
                            </tr>
                            <tr>
                                <td>Werbung</td>
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setWerbung(e.target.value)} value={Werbung}></input> €</td>
                            </tr>
                            <tr>
                                <th></th>
                                <th className='text-[#4fd1c5]'>Forschung und Entwickelung</th>
                            </tr>
                            <tr>
                                <td>Verbesserung der Maschinen</td>
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setForschungUndEntwickelung(e.target.value)} value={ForschungUndEntwickelung}></input> €</td>
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
                                <td>{Gesamtproduktion} Stk.</td>
                            </tr>
                            <tr>
                                <td>Maximal Entnahme aus Lager</td>
                                <td>{data.current_stock.finished_sneaker_count} Stk.</td>
                            </tr>
                            <tr>
                                <td>Entnahme aus dem Lager</td>
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setEntnahmeAusDemLager(e.target.value)} value={EntnahmeAusDemLager}></input></td>
                            </tr>
                            <tr>
                                <td>Gesamtproduktion</td>
                                <td>{Math.round(parseInt(Gesamtproduktion) + parseInt(EntnahmeAusDemLager))} Stk.</td>
                            </tr>
                            <tr>
                                <td>Geplanteproduktion möglich</td>
                                <td>{EntnahmeAusDemLager > MaximaleEntnahmeAusLager / 1 ? "Nein" : "Ja"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className=" p-4 shadow-lg  xl:col-span-2  rounded-3xl m-2 bg-white flex justify-center  snap-start">
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th className='text-[#4fd1c5]'   >Verkauf (Soll)</th>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Geplante Stückzahl</td>
                                <td>Preis je Einheit (Angebot)</td>
                                <td>Geplanter Umsatz</td>
                            </tr>
                            <tr>
                                <td>Markt</td>
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setMarktSoll(e.target.value)} value={MarktSoll}></input> Stk.</td>
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setMarktSollPreis(e.target.value)} value={MarktSollPreis}></input> €</td>
                                <td>{formatter.format(MarktSoll * MarktSollPreis)}</td>
                            </tr>
                            <tr>
                                <td>Ausschreibung</td>
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setAussetschreibungSoll(e.target.value)} value={AusschreibungSoll}></input> Stk.</td>
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setAussetschreibungSollPreis(e.target.value)} value={AusschreibungSollPreis}></input> €</td>
                                <td>{formatter.format(AusschreibungSoll * AusschreibungSollPreis)}</td>
                            </tr>
                            <tr>
                                <td>Gesamt</td>
                                <td>{Math.round(parseInt(MarktSoll) + parseInt(AusschreibungSoll))} Stk.</td>
                            </tr>
                            <tr>
                                <td>Gesamtverkauf Möglich</td>
                                <td>{Math.round(parseInt(Gesamtproduktion) + parseInt(EntnahmeAusDemLager)) < (Math.round(parseInt(MarktSoll) + parseInt(AusschreibungSoll)) / 1) ? "Nein" : "Ja"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className=" p-4 shadow-lg rounded-3xl m-2 xl:col-span-3 bg-white flex justify-center snap-start ">
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th className='text-[#4fd1c5]'>Verkauf (Ist)</th>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Verkaufte Stück</td>
                                <td>Umsatz</td>
                            </tr>
                            <tr>
                                <td>Markt</td>
                                <td>{MarktIst} Stk.</td>
                                <td>{formatter.format(UmsatzIst)}</td>
                            </tr>
                            <tr>
                                <td>Ausschreibung</td>
                                <td>{AusschreibungIst} Stk.</td>
                                <td>{formatter.format(UmsatzIst)}</td>
                            </tr>
                            <tr>
                                <td>Gesamt</td>
                                <td>{Math.round(parseInt(MarktIst) + parseInt(AusschreibungIst))} Stk. </td>
                                <td>{formatter.format(UmsatzIst)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <img src="/img/data_reports.svg" className='h-96 w-64 xl:w-96 m-4'></img>
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
                                <td>{formatter.format(data.current_stock.account_balance)}</td>
                                <td>{formatter.format(data.current_stock.account_balance)}</td>
                            </tr>
                            <tr>
                                <td>Maximale Darlehenshöhe</td>
                                <td>50.000€</td>
                                <td>50.000€</td>
                            </tr>
                            <tr>
                                <td>Darlehensstand (Beginn Periode)</td>
                                <td>{formatter.format(data.current_stock.credit_taken)}</td>
                                <td>{formatter.format(data.current_stock.credit_taken)}</td>
                            </tr>
                            <tr>
                                <td>Aufnahme Darlehen</td>
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setAufnahmeDarlehen(e.target.value)} value={AufnahmeDarlehen}></input> €</td>
                                <td>{formatter.format(AufnahmeDarlehen)}</td>
                            </tr>
                            <tr>
                                <td>Darlehensstand (Ende Periode)</td>
                                <td>{formatter.format(data.current_stock.credit_taken + AufnahmeDarlehen - RueckzahlungDarlehen)}</td>
                                <td>{formatter.format(data.current_stock.credit_taken + AufnahmeDarlehen - RueckzahlungDarlehen)}</td>
                            </tr>
                            <tr>
                                <td>Einkauf Sneaker</td>
                                <td>{formatter.format(SneakerKosten)}</td>
                                <td>{formatter.format(SneakerKosten)}</td>
                            </tr>
                            <tr>
                                <td>Einkauf Farben</td>
                                <td>{formatter.format(FarbenKosten)}</td>
                                <td>{formatter.format(FarbenKosten)}</td>
                            </tr>
                            <tr>
                                <td>Lagerkosten Fertige Erz.</td>
                                <td>{formatter.format((data.current_stock.finished_sneaker_count + parseInt(Gesamtproduktion) - Math.round(parseInt(MarktSoll) + parseInt(AusschreibungSoll))) * 8)}</td>
                                <td>{formatter.format((data.current_stock.finished_sneaker_count + parseInt(Gesamtproduktion) - Math.round(parseInt(MarktIst) + parseInt(AusschreibungIst))) * 8)}</td>
                            </tr>
                            <tr>
                                <td>Lagerkosten Sneaker</td>
                                <td>{formatter.format((data.current_stock.sneaker_count + parseInt(SneakerEinkaufMenge) - Gesamtproduktion) * 4)}</td>
                                <td>{formatter.format((data.current_stock.sneaker_count + parseInt(SneakerEinkaufMenge) - Gesamtproduktion) * 4)}</td>
                            </tr>
                            <tr>
                                <td>Lagerkosten Farben</td>
                                <td>{formatter.format(((data.current_stock.sneaker_count + parseInt(FarbenEinkaufMenge)) - Gesamtproduktion * 2) * 1)}</td>
                                <td>{formatter.format(((data.current_stock.sneaker_count + parseInt(FarbenEinkaufMenge)) - Gesamtproduktion * 2) * 1)}</td>
                            </tr>
                            <tr>
                                <td>Maschinenkosten</td>
                                <td>{formatter.format(AllMaschienenKosten)}</td>
                                <td>{formatter.format(AllMaschienenKosten)}</td>
                            </tr>
                            <tr>
                                <td>Produktionskosten</td>
                                <td>{formatter.format(GesamtkostenProduktion - Maschinenkosten)}</td>
                                <td>{formatter.format(GesamtkostenProduktion - Maschinenkosten)}</td>
                            </tr>
                            <tr>
                                <td>Maschinenkauf</td>
                                <td>{formatter.format(newMaschienPrize)}</td>
                                <td>{formatter.format(newMaschienPrize)}</td>
                            </tr>
                            <tr>UmsatzSolGepl
                                <td>Kosten Neueinstellung</td>
                                <td>{formatter.format(Neueinstellungen * 100)}</td>
                                <td>{formatter.format(Neueinstellungen * 100)}</td>
                            </tr>
                            <tr>
                                <td>Löhne/Gehälter</td>
                                <td>{formatter.format(Mitarbeiter * (500 * (PersonalnebenkostenInP)))}</td>
                                <td>{formatter.format(Mitarbeiter * (500 * (PersonalnebenkostenInP)))}</td>
                            </tr>
                            <tr>
                                <td>Werbekosten</td>
                                <td>{formatter.format(Werbung)}</td>
                                <td>{formatter.format(Werbung)}</td>
                            </tr>
                            <tr>
                                <td>Rationalisierung</td>
                                <td>{<input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setForschungUndEntwickelung(e.target.value)} value={ForschungUndEntwickelung}></input>}</td>
                                <td>{<input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setForschungUndEntwickelung(e.target.value)} value={ForschungUndEntwickelung}></input>}</td>
                            </tr>
                            <tr>
                                <td>Zinsen (Darlehen)</td>
                                <td>{((data.current_stock.credit_taken + AufnahmeDarlehen - RueckzahlungDarlehen) * data.scenario.factor_interest_rate).toFixed(2) + "€"}</td>
                                <td>{((data.current_stock.credit_taken + AufnahmeDarlehen - RueckzahlungDarlehen) * data.scenario.factor_interest_rate).toFixed(2) + "€"}</td>
                            </tr>
                            <tr>
                                <td>Rückzahlung Darlehen</td>
                                <td>{<input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setRueckzahlungDarlehen(e.target.value)} value={RueckzahlungDarlehen}></input>}</td>
                                <td>{<input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setRueckzahlungDarlehen(e.target.value)} value={RueckzahlungDarlehen}></input>}</td>
                            </tr>
                            <tr>
                                <td>Umsatzerlöse</td>
                                <td>{formatter.format(UmsatzSoll)}</td>
                                <td>{formatter.format(Math.round(parseInt(MarktIst) + parseInt(AusschreibungIst)))}</td>
                            </tr>
                            <tr>
                                <td>Saldo</td>
                                <td>{formatter.format(data.current_stock.account_balance - (FarbenKosten + SneakerKosten + (((data.current_stock.finished_sneaker_count + parseInt(Gesamtproduktion) - Math.round(parseInt(MarktSoll) + parseInt(AusschreibungSoll))) * 8)) + (((data.current_stock.sneaker_count + parseInt(FarbenEinkaufMenge)) - Gesamtproduktion * 2) * 1) + (((data.current_stock.sneaker_count + parseInt(SneakerEinkaufMenge)) - Gesamtproduktion) * 4) + AllMaschienenKosten + (FertigungskostenProStückFE * GeplanteProduktion2) + (FertigungskostenProStückFE * GeplanteProduktion) + (FertigungskostenProStückFE * GeplanteProduktion3) + parseFloat(newMaschienPrize) + (Neueinstellungen * 100) + (Mitarbeiter * (500 * (PersonalnebenkostenInP))) + Werbung + ForschungUndEntwickelung + ((data.current_stock.credit_taken + AufnahmeDarlehen - RueckzahlungDarlehen) * data.scenario.factor_interest_rate)) + UmsatzSoll + (data.current_stock.credit_taken + AufnahmeDarlehen - RueckzahlungDarlehen))}</td>
                                <td>{formatter.format(data.current_stock.account_balance - (FarbenKosten + SneakerKosten + (((data.current_stock.finished_sneaker_count + parseInt(Gesamtproduktion) - Math.round(parseInt(MarktSoll) + parseInt(AusschreibungSoll))) * 8)) + (((data.current_stock.sneaker_count + parseInt(FarbenEinkaufMenge)) - Gesamtproduktion * 2) * 1) + (((data.current_stock.sneaker_count + parseInt(SneakerEinkaufMenge)) - Gesamtproduktion) * 4) + AllMaschienenKosten + (FertigungskostenProStückFE * GeplanteProduktion2) + (FertigungskostenProStückFE * GeplanteProduktion) + (FertigungskostenProStückFE * GeplanteProduktion3) + parseFloat(newMaschienPrize)+ (Neueinstellungen * 100) + (Mitarbeiter * (500 * (PersonalnebenkostenInP))) + Werbung + ForschungUndEntwickelung + ((data.current_stock.credit_taken + AufnahmeDarlehen - RueckzahlungDarlehen) * data.scenario.factor_interest_rate)) + UmsatzIst + (data.current_stock.credit_taken + AufnahmeDarlehen - RueckzahlungDarlehen))}</td>
                            </tr>
                            <tr>
                                <td>Höhe Kontokorrentkredit</td>
                                <td>{ }</td>
                                <td>{ }</td>
                            </tr>
                            <tr>
                                <td>Zinsen (Kontokorrentkredit)</td>
                                <td>{ }</td>
                                <td>{ }</td>
                            </tr>
                            <tr>
                                <td>Kontostand</td>
                                <td>{ }</td>
                                <td>{ }</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <button className="px-4 right-0 m-4 py-4 text-sm bg-[#4fd1c5] rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-white font-bold" onClick={onSubmit}>Abgeben/Speichern</button>
            </div>
        </>
    )
}

export default Container