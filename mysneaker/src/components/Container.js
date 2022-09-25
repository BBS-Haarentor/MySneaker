import React from 'react'
import Beschaffung from './Container/Beschaffung'
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import Swal from 'sweetalert2'
import Lager from './Container/Lager';
import Personal from './Container/Personal';
import Marketing from './Container/Marketing'
import Planung from './Container/Planung'
import VerkaufSoll from './Container/VerkaufSoll'
import VerkaufIst from './Container/VerkaufIst'
import Statistik from  './Container/Statistik'
import Finanzen from './Container/Finanzen';
import DataTemplate from './data.json'

const Container = ({ ProductionRef, LagerBeschaffungRef, FinanzenRef, MarketingRef, PersonalRef, AbsatzRef }) => {

    const [data, setData] = useState(DataTemplate)

    const [cycle,setCycle] = useState({
        "ad_invest": 0,
        "buy_new_machine": 0,
        "buy_paint": 0,
        "buy_sneaker": 0,
        "company_id": 89,
        "creation_date": 1663912682.844666,
        "current_cycle_index": 4,
        "game_id": 33,
        "id": 162,
        "include_from_stock": 1,
        "last_edit": 1663912682.844679,
        "let_go_employees": 0,
        "new_employees": 0,
        "payback_credit": 0,
        "planned_production_1": 0,
        "planned_production_2": 0,
        "planned_production_3": 0,
        "planned_workers_1": 0,
        "planned_workers_2": 0,
        "planned_workers_3": 0,
        "research_invest": 0,
        "sales_bid": 0,
        "sales_planned": 0,
        "take_credit": 0,
        "tender_offer_count":0,
        "tender_offer_price": 0,
        "employees_count":8
    })
    const [tempData,setTempData] = useState({
        "sneaker_cost":data.scenario.sneaker_count * cycle.buy_sneaker,
        "paint_cost":data.scenario.paint_count * cycle.buy_paint,
        "overall_production":cycle.planned_production_1 + cycle.planned_production_2 + cycle.planned_production_3,
        "employees_cost_in_p":data.scenario.employee_cost_modfier + 1,
        "overall_workers":cycle.planned_workers_1 + cycle.planned_workers_2 + cycle.planned_workers_3,
        "max_production":(data.stock.sneaker_count + cycle.buy_sneaker) > parseInt((data.stock.paint_count + cycle.buy_paint) / 2) ? parseInt((data.stock.paint_count + cycle.buy_paint) / 2) : (data.stock.sneaker_count + cycle.buy_sneaker),
        "real_money":cycle.sales_planned * cycle.sales_bid + cycle.tender_offer_count * cycle.tender_offer_price,
    })
   
    const [newMaschienPrize, setNewMaschienPrize] = useState(0)

    const handleChange = (e)=>{
        setCycle((prev)=>({...prev,[e.target.name]:parseInt(e.target.value)}))
    }


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
    }else if(data.stock.machine_1_space == 2){
        AllMaschienenKosten += data.scenario.machine_maintainance_cost2
    }else if(data.stock.machine_1_space == 3){
        AllMaschienenKosten += data.scenario.machine_maintainance_cost3
    }
    if (data.stock.machine_2_space == 1) {
        AllMaschienenKosten += data.scenario.machine_maintainance_cost1
        machine_2_name = "Sneakerbox 200"
        machine_2_kapazität = data.scenario.machine_production_capacity1
        machine_2_costpp = data.scenario.machine_maintainance_cost1
        machine_2_fertigungskostenpp = data.scenario.production_cost_per_sneaker1
    }else if(data.stock.machine_2_space == 2){
        AllMaschienenKosten += data.scenario.machine_maintainance_cost2
        machine_2_name = "Sneakerdream 500"
        machine_2_kapazität = data.scenario.machine_production_capacity2
        machine_2_costpp = data.scenario.machine_maintainance_cost2
        machine_2_fertigungskostenpp = data.scenario.production_cost_per_sneaker2
    }else if(data.stock.machine_2_space == 3){
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
    }else if(data.stock.machine_3_space == 2){
        AllMaschienenKosten += data.scenario.machine_maintainance_cost2
        machine_3_name = "Sneakerdream 500"
        machine_3_kapazität = data.scenario.machine_production_capacity2
        machine_3_costpp = data.scenario.machine_maintainance_cost2
        machine_3_fertigungskostenpp = data.scenario.production_cost_per_sneaker2
    }else if(data.stock.machine_3_space == 3){
        AllMaschienenKosten += data.scenario.machine_maintainance_cost3
        machine_3_name = "Sneakergigant 1000"
        machine_3_kapazität = data.scenario.machine_production_capacity3
        machine_3_costpp = data.scenario.machine_maintainance_cost3
        machine_3_fertigungskostenpp = data.scenario.production_cost_per_sneaker3
    }
   

    const [modalBuyMaschine, setModalBuyMaschine] = useState()

    const [modalConfirm, setModalConfirm] = useState()

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
                        if (dataFromServer.cycle === null) {
                            dataFromServer.cycle = {
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
                                "let_go_employees":0,
                                "real_sales":0
                            }
                        }

                        setData(dataFromServer)
                        //TODO init Data setCycle(dataFromServer.cycle) oder so 
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

        // var raw = JSON.stringify({
        //     "buy_sneaker": parseInt(SneakerEinkaufMenge),
        //     "buy_paint": parseInt(FarbenEinkaufMenge),
        //     "planned_production_1": parseFloat(GeplanteProduktion),
        //     "planned_production_2":  parseFloat(GeplanteProduktion2),
        //     "planned_production_3":  parseFloat(GeplanteProduktion3),
        //     "planned_workers_1":  parseFloat(ZugeteilteMitarbeiter),
        //     "planned_workers_2":  parseFloat(ZugeteilteMitarbeiter2),
        //     "planned_workers_3":  parseInt(ZugeteilteMitarbeiter3),
        //     "include_from_stock": EntnahmeAusDemLager,
        //     "sales_planned":  parseFloat(MarktSoll),
        //     "sales_bid":  parseFloat(MarktSollPreis),
        //     "tender_offer_count":  parseFloat(AusschreibungSoll),
        //     "tender_offer_price":  parseFloat(AusschreibungSollPreis),
        //     "research_invest":  parseFloat(ForschungUndEntwickelung),
        //     "ad_invest":  parseFloat(Werbung),
        //     "take_credit": parseFloat( AufnahmeDarlehen),
        //     "payback_credit":  parseFloat(RueckzahlungDarlehen),
        //     "new_employees":parseInt(Neueinstellungen),
        //     "let_go_employees":parseInt(Kündigungen),
        //     "buy_new_machine": buy_new_machine, 
        //     "machine_1_space":1,
        //     "machine_2_space":machine_2_space,
        //     "machine_3_space":machine_3_space,
        // });
        var raw =  JSON.stringify({})

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
                title: 'Die Abgabe war erfolgreich',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            res.json().then(value => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Es ist ein Fehler aufgetreten',
                    text: value.user_message,
                    showConfirmButton: false,
                    timer: 3000
                })
            })
        }
        const data = await res.json()



        return data
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
                id:1,
                name: "Sneakerbox 200",
                price: "12000",
                capacity:200,
                price_per_Periode:4000,
                price_per_unit:60
            },
            {
                id:2,
                name: "Sneakerdream 500",
                price: "25000",
                capacity:500,
                price_per_Periode:6000,
                price_per_unit:50
            },
            {
                id:3,
                name: "Sneakergigant 1000",
                price: "45000",
                capacity:1000,
                price_per_Periode:8000,
                price_per_unit:40
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
    // let TempWerbung = 0
    // let TempForschungUndEntwickelung = 0
    // if (Werbung !== ""){
    //     TempWerbung = Werbung
    // }
    // if (ForschungUndEntwickelung !== ""){
    //     TempForschungUndEntwickelung = ForschungUndEntwickelung
    // }

    //var SaldoSoll = data.stock.account_balance - (FarbenKosten + SneakerKosten + (((data.stock.finished_sneaker_count + parseInt(Gesamtproduktion) - Math.round(parseInt(MarktSoll) + parseInt(AusschreibungSoll))) * 8)) + (((data.stock.sneaker_count + parseInt(FarbenEinkaufMenge)) - Gesamtproduktion * 2) * 1) + (((data.stock.sneaker_count + parseInt(SneakerEinkaufMenge)) - Gesamtproduktion) * 4) + AllMaschienenKosten + (FertigungskostenProStückFE * GeplanteProduktion2) + (FertigungskostenProStückFE * GeplanteProduktion) + (FertigungskostenProStückFE * GeplanteProduktion3) + parseFloat(newMaschienPrize) + (Neueinstellungen * 100) + (Mitarbeiter * (500 * (PersonalnebenkostenInP))) + parseFloat(TempWerbung) +  parseFloat(TempForschungUndEntwickelung) + ((data.stock.credit_taken + AufnahmeDarlehen - RueckzahlungDarlehen) * data.scenario.factor_interest_rate)) + UmsatzSoll + (data.stock.credit_taken + AufnahmeDarlehen - RueckzahlungDarlehen)
    //var SaldoIst = data.stock.account_balance - (FarbenKosten + SneakerKosten + (((data.stock.finished_sneaker_count + parseInt(Gesamtproduktion) - Math.round(data.stock.real_sales)) * 8)) + (((data.stock.sneaker_count + parseInt(FarbenEinkaufMenge)) - Gesamtproduktion * 2) * 1) + (((data.stock.sneaker_count + parseInt(SneakerEinkaufMenge)) - Gesamtproduktion) * 4) + AllMaschienenKosten + (FertigungskostenProStückFE * GeplanteProduktion2) + (FertigungskostenProStückFE * GeplanteProduktion) + (FertigungskostenProStückFE * GeplanteProduktion3) + parseFloat(newMaschienPrize) + (Neueinstellungen * 100) + (Mitarbeiter * (500 * (PersonalnebenkostenInP))) + parseFloat(TempWerbung) +  parseFloat(TempForschungUndEntwickelung)  + ((data.stock.credit_taken + AufnahmeDarlehen - RueckzahlungDarlehen) * data.scenario.factor_interest_rate)) + UmsatzIst + (data.stock.credit_taken + AufnahmeDarlehen - RueckzahlungDarlehen)

   
    //var HöheKontokorrentkreditSoll = SaldoSoll < 0 ? SaldoSoll : 0
    //var HöheKontokorrentkreditIst = SaldoIst < 0 ? SaldoIst : 0

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
                            {availableMachine.map(({ name, price, id, capacity, price_per_Periode,  price_per_unit}) => {
                                return (
                                    <li className='p-3 mx-3 shadow-lg rounded-3xl m-auto my-4 justify-around bg-white w-[90%]' onClick={() => Confirm(name, price , id)}>
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

    const Confirm = (name, price ,id) => {
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
                    doMagicToBuyMachine(name, price , id)
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

                <Beschaffung scenario={data.scenario} formatter={formatter} tempData={tempData} cycle={cycle} handleChange={handleChange} LagerBeschaffungRef={LagerBeschaffungRef}/>

                <Lager data={data.stock} cycle={cycle} formatter={formatter} tempData={tempData} handleChange={handleChange}/>
                
                <Personal PersonalRef={PersonalRef} cycle={cycle} formatter={formatter} tempData={tempData} handleChange={handleChange} data={data} />


                {data.stock.machine_1_space != 0 ? <div className={cycle.planned_workers_1  == Math.ceil(cycle.planned_production_1 / 20)  && tempData.max_production >= cycle.planned_production_1  && cycle.employees_count >= tempData.overall_workers ? "p-4 dark:bg-[#1f2733] dark:text-white shadow-lg rounded-3xl m-2 bg-white  snap-start " : "p-4  shadow-lg dark:bg-[#1f2733] dark:text-white rounded-3xl m-2 bg-white  snap-start border-red-300 border-2"} ref={ProductionRef}>
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
                                <td>{data.scenario.machine_production_capacity1} Stk.</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Maschinenkosten p. Per.</td>
                                <td>{formatter.format(data.scenario.machine_maintainance_cost1)}</td>
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
                                <td>{formatter.format(60 * data.stock.research_production_modifier)}</td>
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
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg dark:bg-[#1f2733]" min="0" name='planned_production_1' type="number" onChange={handleChange} value={cycle.planned_production_1}></input> Stk.</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Produktionsprüfung (Werkstoffe)</td>
                                <td>{tempData.max_production >= tempData.overall_production / 1 ? "ja" : "Keine ausreichenden Werkstoffe"}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Benötigte Mitarbeiter</td>
                                <td>{Math.ceil(cycle.planned_production_1 / 20)} Stk.</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Zugeteilte Mitarbeiter</td>
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg dark:bg-[#1f2733]" min="0" name='planned_workers_1' type="number" onChange={handleChange} value={cycle.planned_workers_1}></input> Stk.</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Produktionsprüfung (Mitarbeiter)</td>
                                <td>{cycle.planned_workers_1 == parseInt(Math.ceil(cycle.planned_production_1 / 20)) && cycle.employees_count >= tempData.overall_workers? "ja" : "Keine passende Mitarbeiteranzahl"}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Auslastung</td>
                                <td>{Math.round((cycle.planned_production_1 / 1) / data.scenario.machine_production_capacity1 * 100)} %</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Gesamtkosten Produktion</td>
                                <td>{formatter.format(data.scenario.machine_maintainance_cost1 + data.scenario.production_cost_per_sneaker1 * cycle.planned_production_1)}</td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </div> : <div className="p-4 dark:bg-[#1f2733] shadow-lg rounded-3xl m-2 bg-white  snap-start" ref={ProductionRef}>
                    <img src="/img/add_maschine..svg" className='h-96 w-64 xl:w-96 my-auto'></img> //TODO mach plus hin
                </div>}

                {data.stock.machine_2_space != 0 ? <div className={cycle.planned_workers_2 == Math.ceil(cycle.planned_production_2 / 20)  && tempData.max_production >= Gesamtproduktion && Mitarbeiter >= tempData.overall_workers ? "p-4 dark:bg-[#1f2733] dark:text-white  shadow-lg rounded-3xl m-2 bg-white  snap-start " : "p-4  shadow-lg dark:bg-[#1f2733] dark:text-white rounded-3xl m-2 bg-white  snap-start border-red-300 border-2"} ref={ProductionRef}>
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
                                <td>{formatter.format(machine_2_fertigungskostenpp)}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Fertigungskosten pro Stück (F&E)</td>
                                <td>{formatter.format(machine_2_fertigungskostenpp * data.stock.research_production_modifier)}</td>
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
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg dark:bg-[#1f2733]"  min="0" name='planned_production_2' type="number" onChange={handleChange} value={cycle.planned_production_2}></input> Stk.</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Produktionsprüfung (Werkstoffe)</td>
                                <td>{tempData.max_production >= tempData.overall_production / 1 ? "ja" : "Keine ausreichenden Werkstoffe"}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Benötigte Mitarbeiter</td>
                                <td>{Math.ceil(cycle.planned_production_2 / 20)} Stk.</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Zugeteilte Mitarbeiter</td>
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg dark:bg-[#1f2733]" min="0" name='planned_workers_2' type="number" onChange={handleChange} value={cycle.planned_workers_2}></input> Stk.</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Produktionsprüfung (Mitarbeiter)</td>
                                <td>{parseInt(cycle.planned_workers_2) == Math.ceil(cycle.planned_production_2 / 20) && cycle.employees_count >= tempData.overall_workers ? "ja" : "Keine passende Mitarbeiteranzahl"}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Auslastung</td>
                                <td>{Math.round((cycle.planned_production_2 / 1) / machine_2_kapazität * 100)} %</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Gesamtkosten Produktion</td>
                                <td>{formatter.format(machine_2_costpp + machine_2_fertigungskostenpp * cycle.planned_production_2)}</td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </div> : buy_new_machine != 0 ? <div className="p-4 dark:bg-[#1f2733] shadow-lg rounded-3xl m-2 bg-white  snap-start" ref={ProductionRef}>
                    <h1 className='text-[#4fd1c5]'>Neue Maschine wurde bestellt, sie wird im nächsten cycle Verfügbare sein</h1>
                    <img src="/img/speed_test.svg" className='h-96 w-64 xl:w-96 my-auto'></img>
                </div> : data.scenario.machine_purchase_allowed ?  <div className="p-4 dark:bg-[#1f2733] shadow-lg rounded-3xl m-2 bg-white  snap-start" ref={ProductionRef}>
                    <h1 className='text-[#4fd1c5]'>Neue Maschine Kaufen</h1>
                    <img src="/img/add_maschine.svg" className='h-96 w-64 xl:w-96 my-auto' onClick={onBuyM2}></img>
                </div> : <div className="p-4 dark:bg-[#1f2733] shadow-lg rounded-3xl m-2 bg-white  snap-start" ref={ProductionRef}>
                    <h1 className='text-[#4fd1c5] pl-4 w-fit m-auto'>In dieser Periode ist der Kauf einer Maschine nicht möglich</h1>
                    <img src="/img/access_denied.svg" className='h-96 w-96 m-auto'></img>
                </div>}

                {data.stock.machine_3_space != 0 ? <div className={cycle.planned_workers_3 == Math.ceil(cycle.planned_production_3/ 20)  && tempData.max_production >= Gesamtproduktion && Mitarbeiter >= tempData.overall_workers ? "p-4 dark:bg-[#1f2733] dark:text-white  shadow-lg rounded-3xl m-2 bg-white  snap-start " : "p-4 dark:bg-[#1f2733] dark:text-white shadow-lg rounded-3xl m-2 bg-white snap-start border-red-300 border-2"} ref={ProductionRef}>
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
                                <td>{formatter.format(machine_3_fertigungskostenpp)}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Fertigungskosten pro Stück (F&E)</td>
                                <td>{formatter.format(machine_3_fertigungskostenpp * data.stock.research_production_modifier)}</td>
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
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg dark:bg-[#1f2733]" min="0" name='planned_production_3' type="number" onChange={handleChange} value={cycle.planned_production_3}></input> Stk.</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Produktionsprüfung (Werkstoffe)</td>
                                <td>{tempData.max_production >= tempData.overall_production / 1 ? "ja" : "Keine ausreichenden Werkstoffe"}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Benötigte Mitarbeiter</td>
                                <td>{Math.ceil(cycle.planned_production_3 / 20)} Stk.</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Zugeteilte Mitarbeiter</td>
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg dark:bg-[#1f2733]" min="0" name='planned_workers_3' type="number" onChange={handleChange} value={cycle.planned_workers_3}></input> Stk.</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Produktionsprüfung (Mitarbeiter)</td>
                                <td>{parseInt(cycle.planned_workers_3) == Math.ceil(cycle.planned_production_3 / 20) && Mitarbeiter >= tempData.overall_workers ? "ja" : "Keine passende Mitarbeiteranzahl"}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Auslastung</td>
                                <td>{Math.round((cycle.planned_production_3 / 1) / machine_3_kapazität * 100)} %</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Gesamtkosten Produktion</td>
                                <td>{formatter.format(machine_3_costpp + machine_3_fertigungskostenpp * cycle.planned_production_3)}</td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </div> 
                :data.stock.machine_2_space == 0 ? 
                <></>
                :
                 buy_new_machine != 0? 
                    <div className="p-4 dark:bg-[#1f2733] shadow-lg rounded-3xl m-2 bg-white  snap-start" ref={ProductionRef}>
                        <h1 className='text-[#4fd1c5]'>Neue Maschine wurde bestellt, sie wird im nächsten cycle Verfügbare sein</h1>
                        <img src="/img/speed_test.svg" className='h-96 w-64 xl:w-96 my-auto'></img>
                </div> 
                : data.stock.machine_2_space == 0 ? 
                <></> 
                : data.scenario.machine_purchase_allowed ?  
                <div className="p-4 dark:bg-[#1f2733] shadow-lg rounded-3xl m-2 bg-white  snap-start" ref={ProductionRef}>
                    <h1 className='text-[#4fd1c5]'>Neue Maschine Kaufen</h1>
                    <img src="/img/add_maschine.svg" className='h-96 w-64 xl:w-96 my-auto' onClick={onBuyM3}></img>
                </div> 
                : 
                <div className="p-4 dark:bg-[#1f2733] shadow-lg rounded-3xl m-2 bg-white  snap-start" ref={ProductionRef}>
                    <h1 className='text-[#4fd1c5] pl-4 w-fit m-auto'>In dieser Periode ist der Kauf einer machine nicht möglich</h1>
                    <img src="/img/access_denied.svg" className='h-96 w-96 m-auto'></img>
                </div>
                }

                <Marketing MarketingRef={MarketingRef} cycle={cycle} handleChange={handleChange} />

                <Planung AbsatzRef={AbsatzRef} stock={data.stock} /> //TODO NOCH machen


                <VerkaufSoll
                formatter={formatter} 
                scenario={data.scenario}/>

                <VerkaufIst  formatter={formatter} />

                <Statistik formatter={formatter} />

                <Finanzen  FinanzenRef={FinanzenRef} formatter={formatter}
                newMaschienPrize={newMaschienPrize} scenario={data.scenario}
                stock={data.stock} />
                <button className="px-4 right-0 m-4 py-4 text-sm bg-[#4fd1c5] rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-white font-bold" onClick={onSubmit}>Abgeben/Speichern</button>
            </div>
        </>
    )
}

export default Container