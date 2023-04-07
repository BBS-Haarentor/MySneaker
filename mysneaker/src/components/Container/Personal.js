import React from 'react'

const Personal = ({ PersonalRef, formatter,data,cycle,tempData, handleChange }) => {

    return (
        <>
            <div className="w-full" ref={PersonalRef}>
                <h1 className="my-5 text-3xl w-full text-center text-[#4fd1c5] font-bold">Personal</h1>
                <div className="flex overflow-x-auto min-[1250px]:justify-center space-x-8 flex-nowrap overflow-x-auto">
                    <div className="dark:bg-[#1f2733] flex-shrink-0 w-72 min-h-60 rounded-xl max-[1250px]:mx-5 drop-shadow-xl bg-white mb-5">
                        <img src="/img/img/personal.svg" alt="Paint" className="w-40 h-36 mx-auto my-5"/>
                        <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">Übersicht</h1>
                        <p className="my-2 dark:text-white text-xl text-center">{cycle.employees_count} Mitarbeiter</p>
                        <p className="my-2 dark:text-white text-xl text-center">{(parseInt(cycle.planned_workers_1)  + parseInt(cycle.planned_workers_2)  + parseInt(cycle.planned_workers_3) )} Zugeteilte MA</p>
                        <p className="my-2 dark:text-white text-xl text-center">{parseInt(cycle.employees_count) + cycle.new_employees - cycle.let_go_employees} MA nächste Periode</p>
                        <p className="my-2 dark:text-white text-xl text-center">20 Sneaker Grundkapazität je MA</p>
                        <div className="w-[90%] h-[2px] rounded-full dark:bg-white bg-black m-auto my-2"></div>
                        <p className="my-2 dark:text-white text-xl text-center">{cycle.employees_count - (parseInt(cycle.planned_workers_1)  + parseInt(cycle.planned_workers_2)  + parseInt(cycle.planned_workers_3) )} MA Verfügbar</p>
                    </div>
                    <div className="dark:bg-[#1f2733] flex-shrink-0 w-72 min-h-60 rounded-xl max-[620px]:mr-5 drop-shadow-xl bg-white mb-5">
                        <img src="/img/img/personal.svg" alt="Paint" className="w-40 h-36 mx-auto my-5"/>
                        <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">Personal Verwaltung</h1>
                        <p className="my-2 dark:text-white text-xl text-center">Neueinstellungen</p>
                        <p className="my-2 dark:text-white text-xl text-center">100,00 € pro Mitarbeiter</p>
                        <div className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 onClick={() => handleChange({
                                     target: {
                                         name: "new_employees",
                                         value: cycle.new_employees+1
                                     }
                                 })}
                                 className="fill-[#4fd1c5] w-8 cursor-pointer"
                                 viewBox="0 0 448 512">
                                <path
                                    d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                            </svg>
                            <input className="border-2 mx-5 text-center border-[#4fd1c5] dark:text-white rounded-full w-16 dark:bg-[#1f2733]"
                                   min="0" name='new_employees' type="number" onChange={handleChange} value={cycle.new_employees}/>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 onClick={() => handleChange({
                                     target: {
                                         name: "new_employees",
                                         value: cycle.new_employees-1 >= 0 ? cycle.new_employees-1 : 0
                                     }
                                 })}
                                 className="fill-[#4fd1c5] w-8 cursor-pointer"
                                 viewBox="0 0 448 512">
                                <path
                                    d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                            </svg>
                        </div>
                        <div className="w-[90%] h-[2px] rounded-full dark:bg-white bg-black m-auto my-2"></div>
                        <p className="my-2 dark:text-white text-xl text-center">Kündigungen/Rente/ etc.</p>
                        <div className="flex items-center justify-center mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 onClick={() => handleChange({
                                     target: {
                                         name: "let_go_employees",
                                         value: cycle.let_go_employees+1
                                     }
                                 })}
                                 className="fill-[#4fd1c5] w-8 cursor-pointer"
                                 viewBox="0 0 448 512">
                                <path
                                    d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                            </svg>
                            <input className="border-2 mx-5 text-center border-[#4fd1c5] dark:text-white rounded-full w-16 dark:bg-[#1f2733]"
                                   min="0" name='new_employees' type="number" onChange={handleChange} value={cycle.let_go_employees}/>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 onClick={() => handleChange({
                                     target: {
                                         name: "let_go_employees",
                                         value: cycle.let_go_employees-1 >= 0 ? cycle.let_go_employees-1 : 0
                                     }
                                 })}
                                 className="fill-[#4fd1c5] w-8 cursor-pointer"
                                 viewBox="0 0 448 512">
                                <path
                                    d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="dark:bg-[#1f2733] flex-shrink-0 w-72 min-h-60 rounded-xl max-[620px]:mr-5 drop-shadow-xl bg-white mb-5">
                        <img src="/img/img/personal.svg" alt="Paint" className="w-40 h-36 mx-auto my-5"/>
                        <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">Kosten</h1>
                        <p className="my-3 dark:text-white text-xl text-center">{formatter.format(data.scenario.employee_salary)} pro MA</p>
                        <p className="my-3 dark:text-white text-xl text-center">{data.scenario.employee_cost_modfier * 100}% Personalnebenkosten</p>
                        <div className="w-[90%] h-[2px] rounded-full dark:bg-white bg-black m-auto my-2"></div>
                        <p className="my-3 dark:text-white text-xl text-center">{formatter.format(cycle.employees_count * (data.scenario.employee_salary * (tempData.employees_cost_in_p)))} akt. Personalkosten</p>
                        <p className="my-3 dark:text-white text-xl text-center">{formatter.format((parseInt(cycle.employees_count) + cycle.new_employees - cycle.let_go_employees) * (data.scenario.employee_salary * (tempData.employees_cost_in_p)))} folg. Personalkosten</p>
                    </div>
                </div>
            </div>
        </>
    )

    return (
        <div className="p-4 xl:col-span-3 shadow-lg rounded-3xl dark:bg-[#1f2733] dark:text-white m-2 bg-white flex justify-center snap-start" ref={PersonalRef}>
            <table>
                <tbody>
                    <tr>
                        <th className='xl:w-96'></th>
                        <th className='text-[#4fd1c5] xl:w-96 '>Personal</th>
                    </tr>
                    <tr>
                        <td>Mitarbeiter</td>
                        <td>{cycle.employees_count}</td>

                    </tr>
                    <tr>
                        <td>Grundkapazität Stück je MA</td>
                        <td>20</td>

                    </tr>
                    <tr>
                        <td>Verfügbare Kapazität (MA)</td>
                        <td>{cycle.employees_count - (parseInt(cycle.planned_workers_1)  + parseInt(cycle.planned_workers_2)  + parseInt(cycle.planned_workers_3) )} MA</td>

                    </tr>
                    <tr>
                        <td>benötigte MA </td>
                        <td>{(parseInt(cycle.planned_workers_1)  + parseInt(cycle.planned_workers_2)  + parseInt(cycle.planned_workers_3) )} MA</td>

                    </tr>
                    <tr>
                        <td>Auslastung </td>
                        <td>{Math.round((cycle.planned_workers_1 / 1) / cycle.employees_count * 100)} %</td>

                    </tr>
                    <tr>
                        <td>Neueinstellungen</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg dark:bg-[#1f2733]" min="0" name='new_employees' type="number" onChange={handleChange} value={cycle.new_employees}></input> MA</td>

                    </tr>
                    <tr>
                        <td>Kosten Neueinstellung</td>
                        <td>{formatter.format(data.scenario.employee_signup_bonus)}</td>

                    </tr>
                    <tr>
                        <td>Kündigungen/Rente/ etc.</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg dark:bg-[#1f2733]" min="0" type="number" onChange={handleChange} value={cycle.let_go_employees}></input> MA</td>

                    </tr>
                    <tr>
                        <td>Zugeteilte Mitarbeiter</td>
                        <td>{parseInt(cycle.planned_workers_1) + parseInt(cycle.planned_workers_2) + parseInt(cycle.planned_workers_3)} MA</td>

                    </tr>
                    <tr>
                        <td>Mitarbeiter nächste Periode</td>
                        <td>{parseInt(cycle.employees_count) + cycle.new_employees - cycle.let_go_employees} MA</td>


                    </tr>
                    <tr>
                        <td>Kosten pro MA</td>
                        <td>{formatter.format(data.scenario.employee_salary)}</td>

                    </tr>
                    <tr>
                        <td>Personalnebenkosten</td>
                        <td>{data.scenario.employee_cost_modfier * 100}%</td>

                    </tr>
                    <tr>
                        <td>Personalkosten akt. Periode</td>
                        <td>{formatter.format(cycle.employees_count * (data.scenario.employee_salary * (tempData.employees_cost_in_p)))}</td>

                    </tr>
                    <tr>
                        <td>Personalkosten folg. Periode</td>
                        <td>{formatter.format((parseInt(cycle.employees_count) + cycle.new_employees - cycle.let_go_employees) * (data.scenario.employee_salary * (tempData.employees_cost_in_p)))}</td>

                    </tr>

                </tbody>
            </table>
            <img src="/img/personal.svg" alt='' className='h-96 w-64 xl:w-96 m-auto max-[800px]:hidden'></img>

        </div>
    )

}

export default Personal