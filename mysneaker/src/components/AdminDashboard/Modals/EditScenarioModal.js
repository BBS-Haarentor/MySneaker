import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'

const EditScenarioModal = ({ setModal, updateScenarioList, char, myHeaders }) => {

    const [scenario, setScenario] = useState({})

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        fetch(process.env.REACT_APP_MY_API_URL + "/api/v1/scenario/get_by_char/" + char, requestOptions).then((element) => {
            if (element.status === 200) {
                element.json().then((element1) => {
                    setScenario(element1)
 
                })
            }
        })
    }, [])
    const isNumber = (n) =>  { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
    const handleChange = (e) => {
        setScenario((prev) => ({...prev, [e.target.name]: !isNaN(e.target.checked) ? e.target.checked : isNumber(e.target.value) ? parseInt(e.target.value) : e.target.value}))
    }
    const handleChangePercent = (e) => {
        setScenario((prev) => ({...prev, [e.target.name]: parseInt(e.target.value)/100}))
    }
    const saveScenario = () => {

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(scenario)
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
                                        value={scenario.description} onChange={handleChange} name='description'
                                        ></textarea>
                                    <div
                                        className='h-[1px] my-3 bg-gradient-to-r from-transparent via-gray-400 to-transparent w-full m-1'></div>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                className="block text-sm font-medium mt-2 text-gray-700 dark:text-gray-100">Neueinstellungsbonus</label>
                                            <input type="number" value={scenario.employee_signup_bonus}
                                                onChange={handleChange} name='employee_signup_bonus'
                                                id="reference-price"
                                                className="dark:bg-[#1f2733] dark:border-2 text-center mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md py-2 sm:text-sm border-gray-700 rounded-md" />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                className="block text-sm font-medium mt-2 text-gray-700 dark:text-gray-100">Personalbestand</label>
                                            <input type="number" value={scenario.employee_count_modifier_permanent}
                                                onChange={handleChange} name='employee_count_modifier_permanent'
                                                id="reference-price"
                                                className="text-center dark:bg-[#1f2733] dark:border-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md py-2 sm:text-sm border-gray-700 rounded-md" />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                className="block text-sm font-medium mt-2 text-gray-700 dark:text-gray-100">Gehalt</label>
                                            <input type="number" value={scenario.employee_salary}
                                                onChange={handleChange} name='employee_salary'
                                                id="reference-price"
                                                className="text-center mt-1 dark:bg-[#1f2733] dark:border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md py-2 sm:text-sm border-gray-700 rounded-md" />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                className="block text-sm font-medium mt-2 text-gray-700 dark:text-gray-100">Nebenkosten</label>
                                            <p>
                                                <input type="number" value={scenario.employee_cost_modfier * 100}
                                                   onChange={handleChangePercent} name='employee_cost_modfier'
                                                    id="reference-price"
                                                    className="w-[90%] text-center dark:bg-[#1f2733] dark:border-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 shadow-md py-2 sm:text-sm border-gray-700 rounded-md" /> %
                                            </p>
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                className="block text-sm font-medium mt-2 text-gray-700 dark:text-gray-100">Grundkapazität je MA</label>
                                            <p>
                                                <input type="number" value={scenario.employee_production_capacity}
                                                    onChange={handleChange} name='employee_production_capacity'
                                                    id="reference-price"
                                                    className="text-center mt-1 dark:bg-[#1f2733] dark:border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md py-2 sm:text-sm border-gray-700 rounded-md" />
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
                                            <input type="number" value={scenario.sneaker_price}
                                                onChange={handleChange} name='sneaker_price'
                                                id="reference-price"
                                                className="text-center mt-1 dark:bg-[#1f2733] dark:border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md py-2 sm:text-sm border-gray-700 rounded-md" />
                                            <label
                                                className="block text-sm font-medium mt-2 text-gray-700 dark:text-gray-100">Farbe</label>
                                            <input type="number" value={scenario.paint_price}
                                                onChange={handleChange} name='paint_price'
                                                id="reference-price"
                                                className="text-center mt-1 dark:bg-[#1f2733] dark:border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md py-2 sm:text-sm border-gray-700 rounded-md" />

                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                className="block text-sm font-medium text-lg text-gray-700 dark:text-gray-100">Gesamtmenge</label>
                                            <label htmlFor="total-amount"
                                                className="block text-sm font-medium mt-2 text-gray-700 dark:text-gray-100">Nachgefragt</label>
                                            <input type="number" value={scenario.sneaker_ask}
                                                onChange={handleChange} name='sneaker_ask'
                                                id="total-amount"
                                                className="text-center mt-1 dark:bg-[#1f2733] dark:border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 shadow-md sm:text-sm border-gray-300 rounded-md" />
                                            <label htmlFor="total-amount"
                                                className="block text-sm font-medium mt-2 text-gray-700 dark:text-gray-100">Ausschreibung</label>
                                            <input type="number" value={scenario.tender_offer_count}
                                                onChange={handleChange} name='tender_offer_count'
                                                id="total-amount-auction"
                                                className="text-center mt-1 dark:bg-[#1f2733] dark:border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 shadow-md sm:text-sm border-gray-300 rounded-md" />
                                        </div>


                                        <div className="col-span-3 sm:col-span-3">
                                            <label htmlFor="buymachine"
                                                className="block text-sm font-medium text-gray-700 dark:text-gray-100">Maschinen
                                                Kaufen</label>
                                            <input type="checkbox" checked={scenario.machine_purchase_allowed}
                                                 onChange={handleChange} name='machine_purchase_allowed'
                                                id="buymachine"
                                                className="mt-1 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                        </div>

                                        <div className="col-span-3 sm:col-span-3">
                                            <label htmlFor="buymachine"
                                                   className="block text-sm font-medium text-gray-700 dark:text-gray-100">Personal Verwaltung</label>
                                            <input type="checkbox" checked={scenario.employee_change_allowed}
                                                    onChange={handleChange} name='employee_change_allowed'
                                                    id="buymachine"
                                                   className="mt-1 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                        </div>

                                        <div className="col-span-3 sm:col-span-3">
                                            <label htmlFor="buymachine"
                                                   className="block text-sm font-medium text-gray-700 dark:text-gray-100">Forschung</label>
                                            <input type="checkbox" checked={scenario.research_allowed}
                                                    onChange={handleChange} name='research_allowed'
                                                    id="buymachine"
                                                   className="mt-1 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                        </div>

                                        <div className="col-span-3 sm:col-span-3">
                                            <label htmlFor="buymachine"
                                                   className="block text-sm font-medium text-gray-700 dark:text-gray-100">Werbung</label>
                                            <input type="checkbox" checked={scenario.advertisement_allowed}
                                                    onChange={handleChange} name='advertisement_allowed'
                                                    id="buymachine"
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