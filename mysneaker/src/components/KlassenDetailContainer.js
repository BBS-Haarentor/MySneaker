import React from 'react'
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Swal from 'sweetalert2'
import Beschaffung from './Container/Beschaffung'
import Lager from './Container/Lager';
import Personal from './Container/Personal';
import Marketing from './Container/Marketing'
import Planung from './Container/Planung'
import VerkaufSoll from './Container/VerkaufSoll'
import VerkaufIst from './Container/VerkaufIst'
import Statistik from  './Container/Statistik'
import Finanzen from './Container/Finanzen';

const KlassenDetailContainer = ({ userId, cycle_index }) => {



    const [data, setData] = useState(
        {
            "stock": {
                "company_id": 5,
                "id": 1,
                "current_cycle_index": 0,
                "paint_count": 0,
                "employees_count": 8,
                "account_balance": 5000.0,
                "real_sales": 0,
                "research_production_modifier": 0.0,
                "machine_2_space": 0,
                "creation_date": "2022-06-28T14:15:24.174701",
                "game_id": 1,
                "sneaker_count": 0,
                "finished_sneaker_count": 0,
                "research_budget": 0.0,
                "credit_taken": 0.0,
                "income_from_sales": 0.0,
                "machine_1_space": 1,
                "machine_3_space": 0
            },
            "scenario": {
                "employee_count_modifier_temporary": 0,
                "factor_ad_take": 0.1,
                "machine_production_capacity3": 1000,
                "production_cost_per_sneaker3": 40.0,
                "char": "A",
                "employee_count_modifier_permanent": 0,
                "tender_offer_count": 0,
                "description": "LOREM IPSUM",
                "factor_interest_rate": 0.04,
                "machine_purchase_allowed": false,
                "machine_employee_max": 10,
                "sneaker_price": 60.0,
                "employee_salary": 400.0,
                "machine_purchase_cost1": 12000.0,
                "machine_maintainance_cost1": 4000.0,
                "paint_price": 10.0,
                "employee_signup_bonus": 100.0,
                "machine_purchase_cost2": 25000.0,
                "machine_maintainance_cost2": 6000.0,
                "storage_fee_sneaker": 4.0,
                "employee_production_capacity": 10,
                "machine_purchase_cost3": 45000.0,
                "machine_maintainance_cost3": 8000.0,
                "storage_fee_paint": 1.0,
                "employee_cost_modfier": 0.2,
                "machine_production_capacity1": 200,
                "production_cost_per_sneaker1": 60.0,
                "id": 1,
                "storage_fee_finished_sneaker": 8.0,
                "sneaker_ask": 400,
                "machine_production_capacity2": 500,
                "production_cost_per_sneaker2": 50.0
            },
            "cycle": {
                "id": 1,
                "buy_paint": 320,
                "sales_planned": 160,
                "new_employees": 0,
                "planned_production_1": 160,
                "sales_bid": 0,
                "buy_new_machine": 0,
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

    const [SneakerEinkaufMenge, setSneakerEinkaufMenge] = useState(data.cycle.buy_sneaker)
    const [FarbenEinkaufMenge, setFarbenEinkaufMenge] = useState(data.cycle.buy_paint)
    const SneakerKosten = data.scenario.sneaker_price * SneakerEinkaufMenge
    const FarbenKosten = data.scenario.paint_price * FarbenEinkaufMenge
    const [GeplanteProduktion, setGeplanteProduktion] = useState(data.cycle.planned_production_1)
    const [ZugeteilteMitarbeiter, setZugeteilteMitarbeiter] = useState(data.cycle.planned_workers_1)
    const [GeplanteProduktion2, setGeplanteProduktion2] = useState(data.cycle.planned_production_2)
    const [ZugeteilteMitarbeiter2, setZugeteilteMitarbeiter2] = useState(data.cycle.planned_workers_2)
    const [GeplanteProduktion3, setGeplanteProduktion3] = useState(data.cycle.planned_production_3)
    const [ZugeteilteMitarbeiter3, setZugeteilteMitarbeiter3] = useState(data.cycle.planned_workers_3)
    const [Werbung, setWerbung] = useState(data.cycle.ad_invest)
    const [ForschungUndEntwickelung, setForschungUndEntwickelung] = useState(data.cycle.research_invest)
    const [EntnahmeAusDemLager, setEntnahmeAusDemLager] = useState(data.cycle.include_from_stock)
    const [MarktSoll, setMarktSoll] = useState(data.cycle.sales_planned)
    const [MarktSollPreis, setMarktSollPreis] = useState(data.cycle.sales_bid)
    const [MarktIst, setMarktIst] = useState(data.cycle.real_sales)
    const [AusschreibungSoll, setAussetschreibungSoll] = useState(data.cycle.tender_offer_count)
    const [AusschreibungSollPreis, setAussetschreibungSollPreis] = useState(data.cycle.tender_offer_price)
    const [AusschreibungIst, setAusschreibungIst] = useState(0)
    const [GesamtSoll, setGesamtSoll] = useState(0)
    const [MaximaleEntnahmeAusLager, setMaximaleEntnahmeAusLager] = useState(0)
    const [Mitarbeiter, setMitarbeiter] = useState(8)
    const [Neueinstellungen, setNeueinstellungen] = useState(data.cycle.new_employees)
    const [Kündigungen, setKündigungen] = useState(data.cycle.let_go_employeess)
    const [Personalnebenkosten, setPersonalnebenkosten] = useState(20)
    const [AufnahmeDarlehen, setAufnahmeDarlehen] = useState(0)
    const [RueckzahlungDarlehen, setRueckzahlungDarlehen] = useState(0)
    const [buy_new_machine, setBuy_new_machine] = useState(data.cycle.buy_new_machine)
    const [machine_2_space, set_machine_2_space] = useState(data.stock.machine_2_space)
    const [machine_3_space, set_machine_3_space] = useState(data.stock.machine_3_space)
    const [newMaschienPrize, setNewMaschienPrize] = useState(0)

    var Gesamtproduktion = parseInt(GeplanteProduktion) + parseInt(GeplanteProduktion2) + parseInt(GeplanteProduktion3)

    var PersonalnebenkostenInP = Personalnebenkosten / 100 + 1
    var ProduktionFarben = parseInt(FarbenEinkaufMenge / 2)
    var Produktionskapazität = 200;
    var FertigungskostenProStückFE = 60
    var Maschinenkosten = 4000;
    var MaximalproduzierbareAnzahl = SneakerEinkaufMenge > ProduktionFarben ? ProduktionFarben : SneakerEinkaufMenge
    var GesamtkostenProduktion = Maschinenkosten + FertigungskostenProStückFE * GeplanteProduktion;
    var UmsatzIst = data.stock.income_from_sales;
    var UmsatzSoll = MarktSoll * MarktSollPreis + AusschreibungSoll * AusschreibungSollPreis;



    var AllMaschienenKosten = 0
    var machine_2_name = ""
    var machine_2_kapazität = 0
    var machine_2_costpp = 0
    var machine_2_fertigungskostenpp = 0
    var machine_3_name = ""
    var machine_3_kapazität = 0
    var machine_3_costpp = 0
    var machine_3_fertigungskostenpp = 0

    if (data.stock.machine_1_space == 1) {
        AllMaschienenKosten += data.scenario.machine_maintainance_cost1
    } else if (data.stock.machine_1_space == 2) {
        AllMaschienenKosten += data.scenario.machine_maintainance_cost2
    } else if (data.stock.machine_1_space == 3) {
        AllMaschienenKosten += data.scenario.machine_maintainance_cost3
    }
    if (data.stock.machine_2_space == 1) {
        AllMaschienenKosten += data.scenario.machine_maintainance_cost1
        machine_2_name = "Sneakerbox 200"
        machine_2_kapazität = data.scenario.machine_production_capacity1
        machine_2_costpp = data.scenario.machine_maintainance_cost1
        machine_2_fertigungskostenpp = data.scenario.production_cost_per_sneaker1
    } else if (data.stock.machine_2_space == 2) {
        AllMaschienenKosten += data.scenario.machine_maintainance_cost2
        machine_2_name = "Sneakerdream 500"
        machine_2_kapazität = data.scenario.machine_production_capacity2
        machine_2_costpp = data.scenario.machine_maintainance_cost2
        machine_2_fertigungskostenpp = data.scenario.production_cost_per_sneaker2
    } else if (data.stock.machine_2_space == 3) {
        AllMaschienenKosten += data.scenario.machine_maintainance_cost3
        machine_2_name = "Sneakergigant 1000"
        machine_2_kapazität = data.scenario.machine_production_capacity3
        machine_2_costpp = data.scenario.machine_maintainance_cost3
        machine_2_fertigungskostenpp = data.scenario.production_cost_per_sneaker3
    }
    if (data.stock.machine_3_space == 1) {
        AllMaschienenKosten += data.scenario.machine_maintainance_cost1
        machine_3_name = "Sneakerbox 200"
        machine_3_kapazität = data.scenario.machine_production_capacity1
        machine_3_costpp = data.scenario.machine_maintainance_cost1
        machine_3_fertigungskostenpp = data.scenario.production_cost_per_sneaker1
    } else if (data.stock.machine_3_space == 2) {
        AllMaschienenKosten += data.scenario.machine_maintainance_cost2
        machine_3_name = "Sneakerdream 500"
        machine_3_kapazität = data.scenario.machine_production_capacity2
        machine_3_costpp = data.scenario.machine_maintainance_cost2
        machine_3_fertigungskostenpp = data.scenario.production_cost_per_sneaker2
    } else if (data.stock.machine_3_space == 3) {
        AllMaschienenKosten += data.scenario.machine_maintainance_cost3
        machine_3_name = "Sneakergigant 1000"
        machine_3_kapazität = data.scenario.machine_production_capacity3
        machine_3_costpp = data.scenario.machine_maintainance_cost3
        machine_3_fertigungskostenpp = data.scenario.production_cost_per_sneaker3
    }


    //const [modal, setModal] = useState()

    const [modalBuyMaschine, setModalBuyMaschine] = useState()

    const [modalConfirm, setModalConfirm] = useState()

    const initData = (data) => {
        setSneakerEinkaufMenge(data.cycle.buy_sneaker)
        setFarbenEinkaufMenge(data.cycle.buy_paint)
        setGeplanteProduktion(data.cycle.planned_production_1)
        setZugeteilteMitarbeiter(data.cycle.planned_workers_1)
        setGeplanteProduktion2(data.cycle.planned_production_2)
        setZugeteilteMitarbeiter2(data.cycle.planned_workers_2)
        setGeplanteProduktion3(data.cycle.planned_production_3)
        setZugeteilteMitarbeiter3(data.cycle.planned_workers_3)
        setWerbung(data.cycle.ad_invest)
        setForschungUndEntwickelung(data.cycle.research_invest)
        setEntnahmeAusDemLager(data.cycle.include_from_stock)
        setMarktSoll(data.cycle.sales_planned)
        setMarktSollPreis(data.cycle.sales_bid)
        setMarktIst(data.cycle.real_sales)
        setAussetschreibungSoll(data.cycle.tender_offer_count)
        setAusschreibungIst(0)
        setGesamtSoll(0)
        setMaximaleEntnahmeAusLager(0)
        setMitarbeiter(data.stock.employees_count)
        setNeueinstellungen(data.cycle.new_employees)
        setKündigungen(data.cycle.let_go_employees)
        setPersonalnebenkosten(20)
        setAufnahmeDarlehen(0)
        setRueckzahlungDarlehen(0)
        setBuy_new_machine(data.cycle.buy_new_machine)
        set_machine_2_space(data.stock.machine_2_space)
        set_machine_3_space(data.stock.machine_3_space)
        setAussetschreibungSollPreis(data.cycle.tender_offer_price)

    }
    useEffect(() => {

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
                if (body.replaceAll("\"", "") === "teacher") {
                    const getData = async () => {
                        const dataFromServer = await fetchData()
                        if (dataFromServer.cycle === null) {
                            dataFromServer.cycle = {
                                "current_cycle_index": cycle_index,
                                "buy_paint": 0,
                                "sales_planned": 0,
                                "new_employees": 0,
                                "planned_production_1": 0,
                                "sales_bid": 0,
                                "buy_new_machine": 0,
                                "planned_production_2": 0,
                                "tender_offer_count": 0,
                                "buy_new_machine_3": false,
                                "planned_production_3": 0,
                                "tender_offer_price": 0,
                                "planned_workers_1": 0,
                                "research_invest": 0,
                                "current_cycle_index": 0,
                                "planned_workers_2": 0,
                                "ad_invest": 0,
                                "planned_workers_3": 0,
                                "take_credit": 0,
                                "buy_sneaker": 0,
                                "include_from_stock": 0,
                                "payback_credit": 0,
                                "let_go_employees": 0
                            }
                        }
                        setData(dataFromServer)
                        initData(dataFromServer)
                    }
                    getData()
                }
                return
            })
    }, [])




    const fetchData = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))
        myHeaders.append('Access-Control-Allow-Origin', '*')

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        const res = await fetch(process.env.REACT_APP_MY_API_URL + '/api/v1/game/teacher/summary/user/' + userId + '/index/' + cycle_index, requestOptions)
        const data = await res.json()

        return data
    }

    const onSubmit = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))
        myHeaders.append('Access-Control-Allow-Origin', '*')

        var raw = JSON.stringify({
            "current_cycle_index": cycle_index,
            "buy_sneaker": parseInt(SneakerEinkaufMenge),
            "buy_paint": parseInt(FarbenEinkaufMenge),
            "planned_production_1": parseFloat(GeplanteProduktion),
            "planned_production_2": parseFloat(GeplanteProduktion2),
            "planned_production_3": parseFloat(GeplanteProduktion3),
            "planned_workers_1": parseFloat(ZugeteilteMitarbeiter),
            "planned_workers_2": parseFloat(ZugeteilteMitarbeiter2),
            "planned_workers_3": parseInt(ZugeteilteMitarbeiter3),
            "include_from_stock": EntnahmeAusDemLager,
            "sales_planned": parseFloat(MarktSoll),
            "sales_bid": parseFloat(MarktSollPreis),
            "tender_offer_count": parseFloat(AusschreibungSoll),
            "tender_offer_price": parseFloat(AusschreibungSollPreis),
            "research_invest": parseFloat(ForschungUndEntwickelung),
            "ad_invest": parseFloat(Werbung),
            "take_credit": parseFloat(AufnahmeDarlehen),
            "payback_credit": parseFloat(RueckzahlungDarlehen),
            "new_employees": parseInt(Neueinstellungen),
            "let_go_employees": parseInt(Kündigungen),
            "buy_new_machine": buy_new_machine,
            "machine_1_space": 1,
            "machine_2_space": machine_2_space,
            "machine_3_space": machine_3_space,
        });

        var requestOptions = {
            method: 'POST',
            body: raw,
            headers: myHeaders,
        };

        try {
            const res = await fetch(process.env.REACT_APP_MY_API_URL + '/api/v1/cycle/teacher/new_entry', requestOptions)
            if (res.status === 201) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Die Änderungen wurden Erfolgreich Übermittelt',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Es ist ein Fehler aufgetreten',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Es ist ein Fehler aufgetreten',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }



    const onBuyM2 = async () => {

        BuymaschineModal()
    }


    const onBuyM3 = async () => {
        BuymaschineModal()
    }

    const [availableMachine, setAvailableMachine] = useState(
        [
            {
                id: 1,
                name: "Sneakerbox 200",
                price: "12000",
                capacity: 200,
                price_per_Periode: 4000,
                price_per_unit: 60
            },
            {
                id: 2,
                name: "Sneakerdream 500",
                price: "25000",
                capacity: 500,
                price_per_Periode: 6000,
                price_per_unit: 50
            },
            {
                id: 3,
                name: "Sneakergigant 1000",
                price: "45000",
                capacity: 1000,
                price_per_Periode: 8000,
                price_per_unit: 40
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


    var SaldoSoll = data.stock.account_balance - (FarbenKosten + SneakerKosten + (((data.stock.finished_sneaker_count + parseInt(Gesamtproduktion) - Math.round(parseInt(MarktSoll) + parseInt(AusschreibungSoll))) * 8)) + (((data.stock.sneaker_count + parseInt(FarbenEinkaufMenge)) - Gesamtproduktion * 2) * 1) + (((data.stock.sneaker_count + parseInt(SneakerEinkaufMenge)) - Gesamtproduktion) * 4) + AllMaschienenKosten + (FertigungskostenProStückFE * GeplanteProduktion2) + (FertigungskostenProStückFE * GeplanteProduktion) + (FertigungskostenProStückFE * GeplanteProduktion3) + parseFloat(newMaschienPrize) + (Neueinstellungen * 100) + (Mitarbeiter * (500 * (PersonalnebenkostenInP))) + parseFloat(Werbung) + parseFloat(ForschungUndEntwickelung) + ((data.stock.credit_taken + AufnahmeDarlehen - RueckzahlungDarlehen) * data.scenario.factor_interest_rate)) + UmsatzSoll + (data.stock.credit_taken + AufnahmeDarlehen - RueckzahlungDarlehen)
    var SaldoIst = data.stock.account_balance - (FarbenKosten + SneakerKosten + (((data.stock.finished_sneaker_count + parseInt(Gesamtproduktion) - Math.round(parseInt(MarktIst) + parseInt(AusschreibungIst))) * 8)) + (((data.stock.sneaker_count + parseInt(FarbenEinkaufMenge)) - Gesamtproduktion * 2) * 1) + (((data.stock.sneaker_count + parseInt(SneakerEinkaufMenge)) - Gesamtproduktion) * 4) + AllMaschienenKosten + (FertigungskostenProStückFE * GeplanteProduktion2) + (FertigungskostenProStückFE * GeplanteProduktion) + (FertigungskostenProStückFE * GeplanteProduktion3) + parseFloat(newMaschienPrize) + (Neueinstellungen * 100) + (Mitarbeiter * (500 * (PersonalnebenkostenInP))) + parseFloat(Werbung) + parseFloat(ForschungUndEntwickelung) + ((data.stock.credit_taken + AufnahmeDarlehen - RueckzahlungDarlehen) * data.scenario.factor_interest_rate)) + UmsatzIst + (data.stock.credit_taken + AufnahmeDarlehen - RueckzahlungDarlehen)


    var HöheKontokorrentkreditSoll = SaldoSoll < 0 ? SaldoSoll : 0
    var HöheKontokorrentkreditIst = SaldoIst < 0 ? SaldoIst : 0

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
                            {availableMachine.map(({ name, price, id, capacity, price_per_Periode, price_per_unit }) => {
                                return (
                                    <li className='p-3 mx-3 shadow-lg rounded-3xl m-auto my-4 justify-around bg-white w-[90%]' onClick={() => Confirm(name, price, id)}>
                                        <h1 className='block mb-2'>{name}</h1>
                                        <hr className='w-[50%] text-center mx-auto border-none h-[2px] rounded-xl bg-[#4fd1c5] opacity-50' />
                                        <br />
                                        <p>Kapazität pro Periode {capacity}</p>
                                        <p>Maschinenkosten pro Periode {formatter.format(price_per_Periode)}</p>
                                        <p>Fertigungskosten pro Stück {formatter.format(price_per_unit)}</p>
                                        <br />
                                        <hr className='w-[50%] text-center mx-auto border-none h-[2px] rounded-xl bg-[#4fd1c5] opacity-50' />
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

    const Confirm = (name, price, id) => {
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
                    doMagicToBuyMachine(name, price, id)
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
                                <button onClick={() => doMagicToBuyMachine(name, price)} className="px-4 py-2 text-sm bg-green-500  rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-green-700 focus:bg-green-600 focus:text-indigo">Ja</button>
                                <button onClick={() => setModalConfirm(<></>)} className="px-4 py-2  text-sm bg-red-500 rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-red-700 focus:bg-red-600 focus:text-indigo">Nein</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )*/
    }
    const doMagicToBuyMachine = (name, preis, id) => {

        setBuy_new_machine(id)
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

                <Beschaffung  scenario={data.scenario} setSneakerEinkaufMenge={setSneakerEinkaufMenge}
                    setFarbenEinkaufMenge={setFarbenEinkaufMenge} SneakerEinkaufMenge={SneakerEinkaufMenge} FarbenEinkaufMenge={FarbenEinkaufMenge}
                    formatter={formatter} FarbenKosten={FarbenKosten} SneakerKosten={SneakerKosten} />

                <Lager data={data.stock} Gesamtproduktion={Gesamtproduktion} EntnahmeAusDemLager={EntnahmeAusDemLager} MarktSoll={MarktSoll} formatter={formatter}
                    AusschreibungSoll={AusschreibungSoll} SneakerEinkaufMenge={SneakerEinkaufMenge} FarbenEinkaufMenge={FarbenEinkaufMenge} MarktIst={MarktIst}
                    AusschreibungIst={AusschreibungIst} />

                <Personal Mitarbeiter={Mitarbeiter} ZugeteilteMitarbeiter={ZugeteilteMitarbeiter} setNeueinstellungen={setNeueinstellungen}
                    Neueinstellungen={Neueinstellungen} setKündigungen={setKündigungen} Kündigungen={Kündigungen} ZugeteilteMitarbeiter2={ZugeteilteMitarbeiter2}
                    ZugeteilteMitarbeiter3={ZugeteilteMitarbeiter3} formatter={formatter} PersonalnebenkostenInP={PersonalnebenkostenInP} setPersonalnebenkosten={setPersonalnebenkosten}
                    Personalnebenkosten={Personalnebenkosten} data={data} />


                {data.stock.machine_1_space != 0 ? <div className={ZugeteilteMitarbeiter == Math.ceil(GeplanteProduktion / 20) && MaximalproduzierbareAnzahl >= GeplanteProduktion / 1 ? "p-4  shadow-lg rounded-3xl m-2 bg-white  snap-start " : "p-4  shadow-lg rounded-3xl m-2 bg-white  snap-start border-red-300 border-2"}>
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
                </div> : <div className="p-4  shadow-lg rounded-3xl m-2 bg-white  snap-start" >
                    <img src="/img/add_maschine..svg" className='h-96 w-64 xl:w-96 my-auto'></img> //TODO mach plus hin
                </div>}

                {data.stock.machine_2_space != 0 ? <div className={ZugeteilteMitarbeiter2 == Math.ceil(GeplanteProduktion2 / 20) && MaximalproduzierbareAnzahl >= GeplanteProduktion2 / 1 ? "p-4  shadow-lg rounded-3xl m-2 bg-white  snap-start " : "p-4  shadow-lg rounded-3xl m-2 bg-white  snap-start border-red-300 border-2"}>
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th className='text-[#4fd1c5]'>{machine_2_name}</th>
                                <th></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>Produktionskapazität</td>
                                <td>{machine_2_kapazität} Stk.</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Maschinenkosten p. Per.</td>
                                <td>{formatter.format(machine_2_costpp)}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Fertigungskosten pro Stück</td>
                                <td>{machine_2_fertigungskostenpp}</td>
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
                </div> : buy_new_machine != 0 ? <div className="p-4  shadow-lg rounded-3xl m-2 bg-white  snap-start" >
                    <h1 className='text-[#4fd1c5]'>Neue Maschine wurde bestellt, sie wird im nächsten cycle Verfügbare sein</h1>
                    <img src="/img/speed_test.svg" className='h-96 w-64 xl:w-96 my-auto'></img>
                </div> : data.scenario.machine_purchase_allowed ? <div className="p-4  shadow-lg rounded-3xl m-2 bg-white  snap-start" >
                    <h1 className='text-[#4fd1c5]'>Neue Maschine Kaufen</h1>
                    <img src="/img/add_maschine.svg" className='h-96 w-64 xl:w-96 my-auto' onClick={onBuyM2}></img>
                </div> : <div className="p-4  shadow-lg rounded-3xl m-2 bg-white  snap-start" >
                    <h1 className='text-[#4fd1c5] pl-4 w-fit m-auto'>In dieser Periode ist der Kauf einer Maschine nicht möglich</h1>
                    <img src="/img/access_denied.svg" className='h-96 w-96 m-auto'></img>
                </div>}

                {data.stock.machine_3_space != 0 ? <div className={ZugeteilteMitarbeiter3 == Math.ceil(GeplanteProduktion3 / 20) && MaximalproduzierbareAnzahl >= GeplanteProduktion3 / 1 ? "p-4  shadow-lg rounded-3xl m-2 bg-white  snap-start " : "p-4  shadow-lg rounded-3xl m-2 bg-white  snap-start border-red-300 border-2"} >
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th className='text-[#4fd1c5]'>{machine_3_name}</th>
                                <th></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>Produktionskapazität</td>
                                <td>{machine_3_kapazität} Stk.</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Maschinenkosten p. Per.</td>
                                <td>{formatter.format(machine_3_costpp)}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Fertigungskosten pro Stück</td>
                                <td>{machine_3_fertigungskostenpp}</td>
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
                </div>
                    : data.stock.machine_2_space == 0 ?
                        <></>
                        :
                        buy_new_machine != 0 ?
                            <div className="p-4  shadow-lg rounded-3xl m-2 bg-white  snap-start" >
                                <h1 className='text-[#4fd1c5]'>Neue Maschine wurde bestellt, sie wird im nächsten cycle Verfügbare sein</h1>
                                <img src="/img/speed_test.svg" className='h-96 w-64 xl:w-96 my-auto'></img>
                            </div>
                            : data.stock.machine_2_space == 0 ?
                                <></>
                                : data.scenario.machine_purchase_allowed ?
                                    <div className="p-4  shadow-lg rounded-3xl m-2 bg-white  snap-start" >
                                        <h1 className='text-[#4fd1c5]'>Neue Maschine Kaufen</h1>
                                        <img src="/img/add_maschine.svg" className='h-96 w-64 xl:w-96 my-auto' onClick={onBuyM3}></img>
                                    </div>
                                    :
                                    <div className="p-4  shadow-lg rounded-3xl m-2 bg-white  snap-start" >
                                        <h1 className='text-[#4fd1c5] pl-4 w-fit m-auto'>In dieser Periode ist der Kauf einer machine nicht möglich</h1>
                                        <img src="/img/access_denied.svg" className='h-96 w-96 m-auto'></img>
                                    </div>
                }

                <Marketing setWerbung={setWerbung} Werbung={Werbung} setForschungUndEntwickelung={setForschungUndEntwickelung}
                    ForschungUndEntwickelung={ForschungUndEntwickelung} />

                <Planung Gesamtproduktion={Gesamtproduktion} setEntnahmeAusDemLager={setEntnahmeAusDemLager} EntnahmeAusDemLager={EntnahmeAusDemLager}
                    MaximaleEntnahmeAusLager={MaximaleEntnahmeAusLager} stock={data.stock} />

                <VerkaufSoll Gesamtproduktion={Gesamtproduktion} EntnahmeAusDemLager={EntnahmeAusDemLager} MarktSoll={MarktSoll} AusschreibungSoll={AusschreibungSoll}
                    formatter={formatter} AusschreibungSollPreis={AusschreibungSollPreis} MarktSollPreis={MarktSollPreis} setAussetschreibungSoll={setAussetschreibungSoll}
                    setAussetschreibungSollPreis={setAussetschreibungSollPreis} setMarktSoll={setMarktSoll} scenario={data.scenario} setMarktSollPreis={setMarktSollPreis} />

                <VerkaufIst AusschreibungIst={AusschreibungIst} MarktIst={MarktIst} UmsatzIst={UmsatzIst} formatter={formatter} />

                <Statistik AllMaschienenKosten={AllMaschienenKosten} FarbenKosten={FarbenKosten} FertigungskostenProStückFE={FertigungskostenProStückFE} Gesamtproduktion={GeplanteProduktion}
                    MarktSoll={MarktSoll} MarktSollPreis={MarktSollPreis} Mitarbeiter={Mitarbeiter} PersonalnebenkostenInP={PersonalnebenkostenInP} SneakerKosten={SneakerKosten} formatter={formatter} />

                <Finanzen AllMaschienenKosten={AllMaschienenKosten} AufnahmeDarlehen={AufnahmeDarlehen} AusschreibungIst={AusschreibungIst} AusschreibungSoll={AusschreibungSoll}
                    FarbenEinkaufMenge={FarbenEinkaufMenge} FarbenKosten={FarbenKosten} ForschungUndEntwickelung={ForschungUndEntwickelung}
                    GesamtkostenProduktion={GesamtkostenProduktion} Gesamtproduktion={Gesamtproduktion} HöheKontokorrentkreditIst={HöheKontokorrentkreditIst}
                    HöheKontokorrentkreditSoll={HöheKontokorrentkreditSoll} MarktIst={MarktIst} MarktSoll={MarktSoll} Maschinenkosten={Maschinenkosten} Mitarbeiter={Mitarbeiter}
                    Neueinstellungen={Neueinstellungen} PersonalnebenkostenInP={PersonalnebenkostenInP} RueckzahlungDarlehen={RueckzahlungDarlehen} SaldoIst={SaldoIst}
                    SaldoSoll={SaldoSoll} SneakerEinkaufMenge={SneakerEinkaufMenge} SneakerKosten={SneakerKosten} UmsatzSoll={UmsatzSoll} Werbung={Werbung} formatter={formatter}
                    newMaschienPrize={newMaschienPrize} scenario={data.scenario} setAufnahmeDarlehen={setAufnahmeDarlehen} setRueckzahlungDarlehen={setRueckzahlungDarlehen}
                    stock={data.stock} UmsatzIst={UmsatzIst} />
                <button className="px-4 right-0 m-4 py-4 text-sm bg-[#4fd1c5] rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-white font-bold" onClick={onSubmit}>Abgeben/Speichern</button>
            </div>
        </>
    )
}

export default KlassenDetailContainer