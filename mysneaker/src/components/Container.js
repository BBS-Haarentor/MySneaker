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
import Statistik from './Container/Statistik'
import Finanzen from './Container/Finanzen';
import DataTemplate from './data.json'

const Container = ({ ProductionRef, LagerBeschaffungRef, FinanzenRef, MarketingRef, PersonalRef, AbsatzRef, userId, cycle_index, game_id }) => {

    const [data, setData] = useState(DataTemplate)
    const [isTeacher, setIsTeacher] = useState(false);

    const [cycle, setCycle] = useState({
        "ad_invest": 0,
        "buy_new_machine": 0,
        "buy_paint": 0,
        "buy_sneaker": 0,
        "creation_date": 1663912682.844666,
        "current_cycle_index": 4,
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
        "tender_offer_count": 0,
        "tender_offer_price": 0,
        "employees_count": 8,
    })

    const [newMaschienPrize, setNewMaschienPrize] = useState(0)
    const [tempData, setTempData] = useState({})

    const handleChange = (e) => {
        setCycle((prev) => ({ ...prev, [e.target.name]: parseInt(e.target.value) }))
    }
    let AllMaschienenKosten = 0;
    const machines = [{
        name:"",
        kapazität:0,
        costpp:0,
        fertigungskostenpp:0,
    },
    {
        name:"",
        kapazität:0,
        costpp:0,
        fertigungskostenpp:0,
    },
    {
        name:"",
        kapazität:0,
        costpp:0,
        fertigungskostenpp:0,
    }]
    const machineNames = ["Sneakerbox 200","Sneakerdream 500","Sneakergigant 1000"]
    machines.forEach((machine,index)=>{
        for (let i = 1; i < 4; i++) {
            if (data.stock["machine_" + (index + 1)  + "_space"] === i) {
                AllMaschienenKosten += data.scenario["machine_maintainance_cost" + i]
                machines[index].name = machineNames[++i]
                machines[index].kapazität = data.scenario["machine_production_capacity"+i]
                machines[index].costpp = data.scenario["machine_maintainance_cost" + i]
                machines[index].fertigungskostenpp = data.scenario["production_cost_per_sneaker1"+i]
            }
        }
    })
    
    useEffect(() => {
        setTempData({
            "sneaker_cost": data.scenario.sneaker_price * cycle.buy_sneaker,
            "paint_cost": data.scenario.paint_price * cycle.buy_paint,
            "overall_production": cycle.planned_production_1 + cycle.planned_production_2 + cycle.planned_production_3,
            "employees_cost_in_p": data.scenario.employee_cost_modfier + 1,
            "overall_workers": cycle.planned_workers_1 + cycle.planned_workers_2 + cycle.planned_workers_3,
            "max_production": (data.stock.sneaker_count + cycle.buy_sneaker) > parseInt((data.stock.paint_count + cycle.buy_paint) / 2) ? parseInt((data.stock.paint_count + cycle.buy_paint) / 2) : (data.stock.sneaker_count + cycle.buy_sneaker),
            "real_money": cycle.sales_planned * cycle.sales_bid + cycle.tender_offer_count * cycle.tender_offer_price,
            "overall_cost_production": (data.scenario.machine_maintainance_cost1 + data.scenario.production_cost_per_sneaker1 * cycle.planned_production_1) + (machines[1].costpp + machines[1].fertigungskostenpp * cycle.planned_production_2) + (machines[2].costpp + machines[2].fertigungskostenpp * cycle.planned_production_3)
        })
    }, [data, cycle])


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
                if(element.status === 200) {
                    let body = await element.text();
                    const getData = async () => {
                        setIsTeacher(body.replaceAll("\"", "").toLowerCase() === "teacher")
                        const dataFromServer = await fetchData(requestOptions, body.replaceAll("\"", "").toLowerCase() === "teacher")
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
                                "let_go_employees": 0,
                                "real_sales": 0
                            }
                        }

                        setData(dataFromServer)
                        delete dataFromServer.cycle.id
                        delete dataFromServer.cycle.game_id
                        delete dataFromServer.cycle.company_id
                        dataFromServer.cycle.employees_count = dataFromServer.stock.employees_count
                        dataFromServer.cycle.tender_offer_count = 0
                        dataFromServer.cycle.tender_offer_price = 0
                        setCycle(dataFromServer.cycle)
                    }
                    getData()
                }
                return
            })
    }, [])

    const fetchData = async (requestOptions, isTeacherBoolean) => {
        const res = await fetch(process.env.REACT_APP_MY_API_URL + "/api/v1/game/" + (isTeacherBoolean ? "teacher/summary/user/" + userId + "/index/" + cycle_index : 'student/my_summary'), requestOptions)
        const data = await res.json()

        return data
    }

    const onSubmit = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))
        myHeaders.append('Access-Control-Allow-Origin', '*')

        let raw="";
        if(isTeacher) {
            raw = JSON.stringify({...cycle, current_cycle_index: cycle_index, company_id: userId, game_id: game_id})
        } else {
            raw = JSON.stringify(cycle)
        }

        var requestOptions = {
            method: 'POST',
            body: raw,
            headers: myHeaders,
        };

        const res = await fetch(process.env.REACT_APP_MY_API_URL + '/api/v1/cycle/' + (isTeacher ? "teacher/new_entry" : "new_entry"), requestOptions)
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
    }
    const doMagicToBuyMachine = (name, preis, id) => {

        setCycle((prev) => ({ ...prev, buy_new_machine: id }))
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

                <Beschaffung scenario={data.scenario} formatter={formatter} tempData={tempData} cycle={cycle} handleChange={handleChange} LagerBeschaffungRef={LagerBeschaffungRef} />

                <Lager data={data.stock} cycle={cycle} formatter={formatter} tempData={tempData} handleChange={handleChange} />

                <Personal PersonalRef={PersonalRef} cycle={cycle} formatter={formatter} tempData={tempData} handleChange={handleChange} data={data} />


                {data.stock.machine_1_space != 0 ? <div className={cycle.planned_workers_1 == Math.ceil(cycle.planned_production_1 / 20) && tempData.max_production >= cycle.planned_production_1 && cycle.employees_count >= tempData.overall_workers ? "p-4 dark:bg-[#1f2733] dark:text-white shadow-lg rounded-3xl m-2 bg-white  snap-start " : "p-4  shadow-lg dark:bg-[#1f2733] dark:text-white rounded-3xl m-2 bg-white  snap-start border-red-300 border-2"} ref={ProductionRef}>
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
                                <td>{cycle.planned_workers_1 == parseInt(Math.ceil(cycle.planned_production_1 / 20)) && cycle.employees_count >= tempData.overall_workers ? "ja" : "Keine passende Mitarbeiteranzahl"}</td>
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

                {data.stock.machine_2_space != 0 ? <div className={cycle.planned_workers_2 == Math.ceil(cycle.planned_production_2 / 20) && tempData.max_production >= tempData.overall_production && cycle.employees_count >= tempData.overall_workers ? "p-4 dark:bg-[#1f2733] dark:text-white  shadow-lg rounded-3xl m-2 bg-white  snap-start " : "p-4  shadow-lg dark:bg-[#1f2733] dark:text-white rounded-3xl m-2 bg-white  snap-start border-red-300 border-2"} ref={ProductionRef}>
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th className='text-[#4fd1c5]'>{machines[1].name}</th>
                                <th></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>Produktionskapazität</td>
                                <td>{machines[1].kapazität} Stk.</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Maschinenkosten p. Per.</td>
                                <td>{formatter.format(machines[1].costpp)}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Fertigungskosten pro Stück</td>
                                <td>{formatter.format(machines[1].fertigungskostenpp)}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Fertigungskosten pro Stück (F&E)</td>
                                <td>{formatter.format(machines[1].fertigungskostenpp * data.stock.research_production_modifier)}</td>
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
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg dark:bg-[#1f2733]" min="0" name='planned_production_2' type="number" onChange={handleChange} value={cycle.planned_production_2}></input> Stk.</td>
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
                                <td>{Math.round((cycle.planned_production_2 / 1) / machines[1].kapazität * 100)} %</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Gesamtkosten Produktion</td>
                                <td>{formatter.format(machines[1]._costpp + machines[1].fertigungskostenpp * cycle.planned_production_2)}</td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </div> : cycle.buy_new_machine != 0 ? <div className="p-4 dark:bg-[#1f2733] shadow-lg rounded-3xl m-2 bg-white  snap-start" ref={ProductionRef}>
                    <h1 className='text-[#4fd1c5]'>Neue Maschine wurde bestellt, sie wird im nächsten cycle Verfügbare sein</h1>
                    <img src="/img/speed_test.svg" className='h-96 w-64 xl:w-96 my-auto'></img>
                </div> : data.scenario.machine_purchase_allowed ? <div className="p-4 dark:bg-[#1f2733] shadow-lg rounded-3xl m-2 bg-white  snap-start" ref={ProductionRef}>
                    <h1 className='text-[#4fd1c5]'>Neue Maschine Kaufen</h1>
                    <img src="/img/add_maschine.svg" className='h-96 w-64 xl:w-96 my-auto' onClick={onBuyM2}></img>
                </div> : <div className="p-4 dark:bg-[#1f2733] shadow-lg rounded-3xl m-2 bg-white  snap-start" ref={ProductionRef}>
                    <h1 className='text-[#4fd1c5] pl-4 w-fit m-auto'>In dieser Periode ist der Kauf einer Maschine nicht möglich</h1>
                    <img src="/img/access_denied.svg" className='h-96 w-96 m-auto'></img>
                </div>}

                {data.stock.machine_3_space != 0 ? <div className={cycle.planned_workers_3 == Math.ceil(cycle.planned_production_3 / 20) && tempData.max_production >= tempData.overall_production && cycle.employees_count >= tempData.overall_workers ? "p-4 dark:bg-[#1f2733] dark:text-white  shadow-lg rounded-3xl m-2 bg-white  snap-start " : "p-4 dark:bg-[#1f2733] dark:text-white shadow-lg rounded-3xl m-2 bg-white snap-start border-red-300 border-2"} ref={ProductionRef}>
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th className='text-[#4fd1c5]'>{machines[2].name}</th>
                                <th></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>Produktionskapazität</td>
                                <td>{machines[2].kapazität} Stk.</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Maschinenkosten p. Per.</td>
                                <td>{formatter.format(machines[2].costpp)}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Fertigungskosten pro Stück</td>
                                <td>{formatter.format(machines[2].fertigungskostenpp)}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Fertigungskosten pro Stück (F&E)</td>
                                <td>{formatter.format(machines[2].fertigungskostenpp * data.stock.research_production_modifier)}</td>
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
                                <td>{parseInt(cycle.planned_workers_3) == Math.ceil(cycle.planned_production_3 / 20) && cycle.employees_count >= tempData.overall_workers ? "ja" : "Keine passende Mitarbeiteranzahl"}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Auslastung</td>
                                <td>{Math.round((cycle.planned_production_3 / 1) / machines[2].kapazität * 100)} %</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Gesamtkosten Produktion</td>
                                <td>{formatter.format(machines[2].costpp + machines[2].fertigungskostenpp * cycle.planned_production_3)}</td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                    : data.stock.machine_2_space == 0 ?
                        <></>
                        :
                        cycle.buy_new_machine != 0 ?
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

                <Planung AbsatzRef={AbsatzRef} tempData={tempData} data={data} cycle={cycle} handleChange={handleChange} />


                <VerkaufSoll
                    formatter={formatter}
                    data={data}
                    cycle={cycle}
                    tempData={tempData}
                    handleChange={handleChange} />

                <VerkaufIst formatter={formatter} data={data} />

                <Statistik formatter={formatter} cycle={cycle} tempData={tempData} data={data} AllMaschienenKosten={AllMaschienenKosten} />

                <Finanzen FinanzenRef={FinanzenRef} formatter={formatter}
                    newMaschienPrize={newMaschienPrize} scenario={data.scenario}
                    stock={data.stock} allMaschienenKosten={AllMaschienenKosten} tempData={tempData} cycle={cycle} machine_2_fertigungskostenpp={machines[1].fertigungskostenpp} machine_3_fertigungskostenpp={machines[2].fertigungskostenpp} />
                <button className="px-4 right-0 m-4 py-4 text-sm bg-[#4fd1c5] rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-white font-bold" onClick={onSubmit}>Abgeben/Speichern</button>
            </div>
        </>
    )
}

export default Container