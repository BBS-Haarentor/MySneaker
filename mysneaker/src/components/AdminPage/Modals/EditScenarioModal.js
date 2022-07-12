import React, {useEffect, useState} from 'react';

const EditScenarioModal = ({setModal, char, myHeaders}) => {

    const [scenario, setScenario] = useState({
        "id": 0,
        "char": "string",
        "description": "string",
        "sneaker_price": 20,
        "paint_price": 10,
        "storage_fee_sneaker": 4,
        "storage_fee_paint": 1,
        "storage_fee_finished_sneaker": 8,
        "employee_count_modifier_temporary": 0,
        "employee_count_modifier_permanent": 0,
        "factor_interest_rate": 0.04,
        "employee_salary": 400,
        "employee_signup_bonus": 100,
        "employee_production_capacity": 10,
        "employee_cost_modfier": 0,
        "sneaker_ask": 400,
        "factor_ad_take": 0.1,
        "tender_offer_count": 0,
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

    useEffect(async () => {
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        await fetch(process.env.REACT_APP_MY_API_URL + "/api/v1/scenario/get_by_char/" + char, requestOptions).then((element) => {
            if (element.status === 200) {
                element.json().then((element1) => {
                    setScenario(element1)
                })
            }
        })
    })

    return (
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

                        <div className="bg-gray-100 rounded-lg">
                            <span className="font-bold block text-xl pt-3 mb-3">Periode ändern</span>
                            <div className='flex flex-col py-5'>
                                <div className="px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="reference-price"
                                                   className="block text-sm font-medium text-gray-700">Bezugspreis</label>
                                            <input type="number" name="reference-price" id="reference-price"
                                                   className="text-center mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md py-2 sm:text-sm border-gray-700 rounded-md"/>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="total-amount"
                                                   className="block text-sm font-medium text-gray-700">Nachgefragte
                                                Gesamtmenge</label>
                                            <input type="number" value={scenario.sneaker_ask} name="total-amount" id="total-amount"
                                                   className="text-center mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 shadow-md sm:text-sm border-gray-300 rounded-md"/>
                                        </div>

                                        <div className="col-span-4 sm:col-span-4">
                                            <label htmlFor="buymachine"
                                                   className="block text-sm font-medium text-gray-700">Maschinen
                                                Kaufen</label>
                                            <input type="checkbox" checked={scenario.machine_purchase_allowed} name="buymachine" id="buymachine"
                                                   className="mt-1 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"/>
                                        </div>

                                    </div>
                                </div>
                                <div className='my-6'>
                                    <button
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