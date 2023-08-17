import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'

const EditScenarioModal = ({ setModal, updateScenarioList, char, myHeaders }) => {

    const [scenario, setScenario] = useState({
        "char": "string",
        "advertisement_allowed": false,
        "research_allowed": false,
        "description": "string",
        "sneaker_price": 20,
        "paint_price": 10,
        "storage_fee_sneaker": 4,
        "storage_fee_paint": 1,
        "storage_fee_finished_sneaker": 8,
        "employee_change_allowed": false,
        "employee_count_modifier_temporary": 0, // Ist Krank etc.
        "employee_count_modifier_permanent": 0, // Ist wieder zurück
        "factor_interest_rate": 0.04,
        "employee_salary": 400,
        "employee_signup_bonus": 100,
        "employee_production_capacity": 10,
        "employee_cost_modfier": 0,
        "sneaker_ask": 400,
        "factor_ad_take": 0.1,
        "tender_offer_count": 1,
        "machine_purchase_allowed": false,
        "machine_purchase_cost1": 12000,
        "machine_purchase_cost2": 25000,
        "machine_purchase_cost3": 45000,
        "machine_production_capacity1": 200,
        "machine_production_capacity2": 500,
        "machine_production_capacity3": 1000,
        "machine_employee_max": 10,
        "machine_maintainance_cost1": 4000,
        "machine_maintainance_cost2": 6000,
        "machine_maintainance_cost3": 8000,
        "production_cost_per_sneaker1": 60,
        "production_cost_per_sneaker2": 50,
        "production_cost_per_sneaker3": 40
    });
    const [sneaker_ask, setSneaker_Ask] = useState(0);
    const [machine_purchase_allowed, setMachine_purchase_allowed] = useState(scenario.machine_purchase_allowed);
    const [advertisement_allowed, setAdvertisement_allowed] = useState(scenario.advertisement_allowed);
    const [research_allowed, setResearch_allowed] = useState(scenario.research_allowed);
    const [employee_change_allowed, setEmployee_change_allowed] = useState(scenario.employee_change_allowed);
    const [sneakerBezugspreis, setSneakerBezugspreis] = useState(scenario.sneaker_price);
    const [colorBezugspreis, setColorBezugspreis] = useState(scenario.paint_price);
    const [sneaker_ask_auction, setSneaker_ask_auction] = useState(scenario.tender_offer_count);
    const [description, setDescription] = useState(scenario.description);
    const [employee_signup_bonus, setEmployee_signup_bonus] = useState(scenario.employee_signup_bonus);
    const [employee_cost_modfier, setEmployee_cost_modfier] = useState(scenario.employee_cost_modfier * 100);
    const [employee_salary, setEmployee_salary] = useState(scenario.employee_salary);
    const [employee_count_modifier_permanent, setEmployee_count_modifier_permanent] = useState(scenario.employee_count_modifier_permanent);

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        fetch(process.env.REACT_APP_MY_API_URL + "/api/v1/scenario/get_by_char/" + char, requestOptions).then((element) => {
            if (element.status === 200) {
                element.json().then((element1) => {
                    setScenario(element1)
                    setSneaker_Ask(element1.sneaker_ask)
                    setMachine_purchase_allowed(element1.machine_purchase_allowed)
                    setAdvertisement_allowed(element1.advertisement_allowed)
                    setResearch_allowed(element1.research_allowed)
                    setSneaker_ask_auction(element1.tender_offer_count)
                    setSneakerBezugspreis(element1.sneaker_price)
                    setColorBezugspreis(element1.paint_price)
                    setDescription(element1.description)
                    setEmployee_signup_bonus(element1.employee_signup_bonus)
                    setEmployee_cost_modfier(element1.employee_cost_modfier * 100)
                    setEmployee_salary(element1.employee_salary)
                    setEmployee_count_modifier_permanent(element1.employee_count_modifier_permanent)
                    setEmployee_change_allowed(element1.employee_change_allowed)
                    
                })
            }
        })
    }, [])

    const saveScenario = () => {

        scenario.sneaker_ask = parseInt(sneaker_ask);
        scenario.machine_purchase_allowed = machine_purchase_allowed;
        scenario.sneaker_price = parseInt(sneakerBezugspreis)
        scenario.paint_price = parseInt(colorBezugspreis)
        scenario.tender_offer_count = parseInt(sneaker_ask_auction)
        scenario.employee_signup_bonus = parseInt(employee_signup_bonus)
        scenario.employee_cost_modfier = parseFloat(employee_cost_modfier / 100)
        scenario.employee_salary = parseInt(employee_salary)
        scenario.description = description;
        scenario.employee_count_modifier_permanent = parseInt(employee_count_modifier_permanent)
        scenario.employee_change_allowed = employee_change_allowed;
        scenario.advertisement_allowed = advertisement_allowed;
        scenario.research_allowed = research_allowed;


        var raw = JSON.stringify(scenario);

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw
        };
        fetch(process.env.REACT_APP_MY_API_URL + "/api/v1/scenario/edit", requestOptions).then((element) => {
            if (element.status === 202) {
                element.json().then(() => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Die Änderungen wurden Erfolgreich Übermittelt',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    updateScenarioList()
                    setModal(<></>)
                })
            } else {
                element.json().then((element1) => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Es ist ein Fehler aufgetreten',
                        text: element1.detail,
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
            }
        })
    }

    return (
        <>
            <div className={"block"}>
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
                    id="my-modal"
                ></div>
                <div
                    className="fixed text-gray-600 dark:text-white flex items-center justify-center overflow-auto z-50 bg-black bg-opacity-40 left-0 right-0 top-0 bottom-0">
                    <div
                        className="text-center bg-white dark:bg-[#1f2733] rounded-xl shadow-2xl p-6 sm:w-8/12 mx-10 ">

                        <div className="">
                            <span className="font-bold block text-xl pt-3 mb-3">Periode ändern</span>
                            <div className='flex flex-col py-5'>
                                <div className="px-4 py-5 sm:p-6">
                                    <label
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-100">Beschreibung</label>
                                    <textarea
                                        className="dark:bg-[#1f2733] max-h-72 min-h-[4rem] dark:border-2 text-center mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md py-2 sm:text-sm border-gray-700 rounded-md"
                                        value={description} onChange={event => setDescription(event.target.value)}></textarea>
                                    <div
                                        className='h-[1px] my-3 bg-gradient-to-r from-transparent via-gray-400 to-transparent w-full m-1'></div>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                className="block text-sm font-medium mt-2 text-gray-700 dark:text-gray-100">Neueinstellungsbonus</label>
                                            <input type="number" name="reference-price" value={employee_signup_bonus}
                                                onChange={(e) => setEmployee_signup_bonus(e.target.value)}
                                                id="reference-price"
                                                className="dark:bg-[#1f2733] dark:border-2 text-center mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md py-2 sm:text-sm border-gray-700 rounded-md" />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                className="block text-sm font-medium mt-2 text-gray-700 dark:text-gray-100">Personalbestand</label>
                                            <input type="number" name="reference-price" value={employee_count_modifier_permanent}
                                                onChange={(e) => setEmployee_count_modifier_permanent(e.target.value)}
                                                id="reference-price"
                                                className="text-center dark:bg-[#1f2733] dark:border-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md py-2 sm:text-sm border-gray-700 rounded-md" />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                className="block text-sm font-medium mt-2 text-gray-700 dark:text-gray-100">Gehalt</label>
                                            <input type="number" name="reference-price" value={employee_salary}
                                                onChange={(e) => setEmployee_salary(e.target.value)}
                                                id="reference-price"
                                                className="text-center mt-1 dark:bg-[#1f2733] dark:border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md py-2 sm:text-sm border-gray-700 rounded-md" />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                className="block text-sm font-medium mt-2 text-gray-700 dark:text-gray-100">Nebenkosten</label>
                                            <p>
                                                <input type="number" name="reference-price" value={employee_cost_modfier}
                                                    onChange={(e) => setEmployee_cost_modfier(e.target.value)}
                                                    id="reference-price"
                                                    className="w-[90%] text-center dark:bg-[#1f2733] dark:border-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 shadow-md py-2 sm:text-sm border-gray-700 rounded-md" /> %
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className='h-[1px] my-3 bg-gradient-to-r from-transparent via-gray-400 to-transparent w-full m-1'></div>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                className="block text-sm font-medium text-lg text-gray-700 dark:text-gray-100">Bezugspreis</label>
                                            <label
                                                className="block text-sm font-medium mt-2 text-gray-700 dark:text-gray-100">Sneaker</label>
                                            <input type="number" name="reference-price" value={sneakerBezugspreis}
                                                onChange={(e) => setSneakerBezugspreis(e.target.value)}
                                                id="reference-price"
                                                className="text-center mt-1 dark:bg-[#1f2733] dark:border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md py-2 sm:text-sm border-gray-700 rounded-md" />
                                            <label
                                                className="block text-sm font-medium mt-2 text-gray-700 dark:text-gray-100">Farbe</label>
                                            <input type="number" name="reference-price" value={colorBezugspreis}
                                                onChange={(e) => setColorBezugspreis(e.target.value)}
                                                id="reference-price"
                                                className="text-center mt-1 dark:bg-[#1f2733] dark:border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md py-2 sm:text-sm border-gray-700 rounded-md" />

                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                className="block text-sm font-medium text-lg text-gray-700 dark:text-gray-100">Gesamtmenge</label>
                                            <label htmlFor="total-amount"
                                                className="block text-sm font-medium mt-2 text-gray-700 dark:text-gray-100">Nachgefragt</label>
                                            <input type="number" value={sneaker_ask}
                                                onChange={(e) => setSneaker_Ask(e.target.value)} name="total-amount"
                                                id="total-amount"
                                                className="text-center mt-1 dark:bg-[#1f2733] dark:border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 shadow-md sm:text-sm border-gray-300 rounded-md" />
                                            <label htmlFor="total-amount"
                                                className="block text-sm font-medium mt-2 text-gray-700 dark:text-gray-100">Ausschreibung</label>
                                            <input type="number" value={sneaker_ask_auction}
                                                onChange={(e) => setSneaker_ask_auction(e.target.value)}
                                                name="total-amount-auction" id="total-amount-auction"
                                                className="text-center mt-1 dark:bg-[#1f2733] dark:border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 shadow-md sm:text-sm border-gray-300 rounded-md" />
                                        </div>


                                        <div className="col-span-3 sm:col-span-3">
                                            <label htmlFor="buymachine"
                                                className="block text-sm font-medium text-gray-700 dark:text-gray-100">Maschinen
                                                Kaufen</label>
                                            <input type="checkbox" checked={machine_purchase_allowed}
                                                onClick={(e) => setMachine_purchase_allowed(e.target.checked)}
                                                name="buymachine" id="buymachine"
                                                className="mt-1 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                        </div>

                                        <div className="col-span-3 sm:col-span-3">
                                            <label htmlFor="buymachine"
                                                   className="block text-sm font-medium text-gray-700 dark:text-gray-100">Personal Verwaltung</label>
                                            <input type="checkbox" checked={employee_change_allowed}
                                                   onClick={(e) => setEmployee_change_allowed(e.target.checked)}
                                                   name="buymachine" id="buymachine"
                                                   className="mt-1 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                        </div>

                                        <div className="col-span-3 sm:col-span-3">
                                            <label htmlFor="buymachine"
                                                   className="block text-sm font-medium text-gray-700 dark:text-gray-100">Forschung</label>
                                            <input type="checkbox" checked={research_allowed}
                                                   onClick={(e) => setResearch_allowed(e.target.checked)}
                                                   name="buymachine" id="buymachine"
                                                   className="mt-1 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                        </div>

                                        <div className="col-span-3 sm:col-span-3">
                                            <label htmlFor="buymachine"
                                                   className="block text-sm font-medium text-gray-700 dark:text-gray-100">Werbung</label>
                                            <input type="checkbox" checked={advertisement_allowed}
                                                   onClick={(e) => setAdvertisement_allowed(e.target.checked)}
                                                   name="buymachine" id="buymachine"
                                                   className="mt-1 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                        </div>

                                    </div>
                                </div>
                                <div className='my-6'>
                                    <button
                                        onClick={() => saveScenario()}
                                        className="px-4 py-2 text-sm bg-green-400 rounded-xl border transition-colors duration-150 ease-linear border-gray-200 focus:outline-none focus:ring-0 font-bold text-white hover:bg-green-500 focus:bg-green-300 focus:text-indigo">Periode
                                        Speichern
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="text-right space-x-5 mt-5">
                            <button
                                className="px-4 py-2 text-sm bg-white rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-gray-50 focus:bg-indigo-50 focus:text-indigo"
                                onClick={() => setModal(<></>)}>Schließen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default EditScenarioModal