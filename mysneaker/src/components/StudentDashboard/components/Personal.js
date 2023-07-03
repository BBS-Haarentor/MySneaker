import React from 'react'
import PersonalImage from '../../../assets/img/container/personal.svg';

const Personal = ({PersonalRef, formatter, data, cycle, tempData, handleChange}) => {

    return (
        <>
            <div className="w-full" ref={PersonalRef}>
                <h1 className="my-5 text-3xl w-full text-center text-[#4fd1c5] font-bold">Personal</h1>
                <div className="flex min-[1250px]:justify-center space-x-8 flex-nowrap overflow-x-auto">
                    <div
                        className="dark:bg-[#1f2733] flex-shrink-0 w-72 min-h-60 rounded-xl max-[1250px]:mx-5 drop-shadow-xl bg-white mb-5">
                        <img src={PersonalImage} alt="Paint" className="w-40 h-36 mx-auto my-5"/>
                        <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">Übersicht</h1>
                        <p className="my-2 dark:text-white text-xl text-center">{cycle.employees_count} Mitarbeiter</p>
                        <p className="my-2 dark:text-white text-xl text-center">{(parseInt(cycle.planned_workers_1) + parseInt(cycle.planned_workers_2) + parseInt(cycle.planned_workers_3))} Zugeteilte
                            MA</p>
                        <p className="my-2 dark:text-white text-xl text-center">{parseInt(cycle.employees_count) + (isNaN(cycle.new_employees) ? 0 : cycle.new_employees) - (isNaN(cycle.let_go_employees) ? 0 : cycle.let_go_employees)} MA
                            nächste Periode</p>
                        <p className="my-2 dark:text-white text-xl text-center">20 Sneaker Grundkapazität je MA</p>
                        <div className="w-[90%] h-[2px] rounded-full dark:bg-white bg-black m-auto my-2"></div>
                        <p className="my-2 dark:text-white text-xl text-center">{cycle.employees_count - (parseInt(cycle.planned_workers_1) + parseInt(cycle.planned_workers_2) + parseInt(cycle.planned_workers_3))} MA
                            Verfügbar</p>
                    </div>
                    <div
                        className="dark:bg-[#1f2733] flex-shrink-0 w-72 min-h-60 rounded-xl max-[620px]:mr-5 drop-shadow-xl bg-white mb-5">
                        <img src={PersonalImage} alt="Paint" className="w-40 h-36 mx-auto my-5"/>
                        <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">Personal</h1>
                        <p className="my-2 dark:text-white text-xl text-center">Neueinstellungen</p>
                        <p className="my-2 dark:text-white text-xl text-center">100,00 € pro Mitarbeiter</p>
                        <div className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 onClick={() => {
                                     if (data.scenario.employee_change_allowed) {
                                         handleChange({
                                             target: {
                                                 name: "new_employees",
                                                 value: cycle.new_employees + 1
                                             }
                                         })
                                     }
                                 }
                                 }
                                 className={"w-8 cursor-pointer" + (data.scenario.employee_change_allowed ? " fill-[#4fd1c5]" : " fill-gray-500")}
                                 viewBox="0 0 448 512">
                                <path
                                    d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                            </svg>
                            <input
                                className={"border-2 mx-5 text-center dark:text-white rounded-full w-16 dark:bg-[#1f2733]" + (data.scenario.employee_change_allowed ? " border-[#4fd1c5]" : " border-[#1f273] dark:bg-[#252e3c]")}
                                min="0" name='new_employees' type="number" onChange={handleChange}
                                disabled={!data.scenario.employee_change_allowed}
                                value={cycle.new_employees}/>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 onClick={() => {
                                     if (data.scenario.employee_change_allowed) {
                                         handleChange({
                                             target: {
                                                 name: "new_employees",
                                                 value: cycle.new_employees - 1 >= 0 ? cycle.new_employees - 1 : 0
                                             }
                                         })
                                     }
                                 }
                                 }
                                 className={"w-8 cursor-pointer" + (data.scenario.employee_change_allowed ? " fill-[#4fd1c5]" : " fill-gray-500")}
                                 viewBox="0 0 448 512">
                                <path
                                    d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                            </svg>
                        </div>
                        <div className="w-[90%] h-[2px] rounded-full dark:bg-white bg-black m-auto my-2"></div>
                        <p className="my-2 dark:text-white text-xl text-center">Kündigungen/Rente/ etc.</p>
                        <div className="flex items-center justify-center mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 onClick={() => {
                                     if (data.scenario.employee_change_allowed) {
                                        if(cycle.employees_count > cycle.let_go_employees+1) {
                                            handleChange({
                                                target: {
                                                    name: "let_go_employees",
                                                    value: cycle.let_go_employees + 1
                                                }
                                            })                                        
                                        } else {
                                            handleChange({
                                                target: {
                                                    name: "let_go_employees",
                                                    value: cycle.employees_count
                                                }
                                            })
                                        }
                                     }
                                 }
                                 }
                                 className={"w-8 cursor-pointer" + (data.scenario.employee_change_allowed ? " fill-[#4fd1c5]" : " fill-gray-500")}
                                 viewBox="0 0 448 512">
                                <path
                                    d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                            </svg>
                            <input
                                className={"border-2 mx-5 text-center dark:text-white rounded-full w-16 dark:bg-[#1f2733]" + (data.scenario.employee_change_allowed ? " border-[#4fd1c5]" : " border-[#1f273] dark:bg-[#252e3c]")}
                                min="0" name='let_go_employees' type="number" onChange={value => {
                                    if(cycle.employees_count > value.target.value) {
                                        handleChange(value)
                                    } else {
                                        handleChange({
                                            target: {
                                                name: "let_go_employees",
                                                value: cycle.employees_count
                                            }
                                        })
                                    }
                                }} max={cycle.employees_count}
                                value={cycle.let_go_employees} disabled={!data.scenario.employee_change_allowed}/>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 onClick={() => {
                                     if (data.scenario.employee_change_allowed) {
                                         handleChange({
                                             target: {
                                                 name: "let_go_employees",
                                                 value: cycle.let_go_employees - 1 >= 0 ? cycle.let_go_employees - 1 : 0
                                             }
                                         })
                                     }
                                 }
                                 }
                                 className={"w-8 cursor-pointer" + (data.scenario.employee_change_allowed ? " fill-[#4fd1c5]" : " fill-gray-500")}
                                 viewBox="0 0 448 512">
                                <path
                                    d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                            </svg>
                        </div>
                    </div>
                    <div
                        className="dark:bg-[#1f2733] flex-shrink-0 w-72 min-h-60 rounded-xl max-[620px]:mr-5 drop-shadow-xl bg-white mb-5">
                        <img src={PersonalImage} alt="Paint" className="w-40 h-36 mx-auto my-5"/>
                        <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">Kosten</h1>
                        <p className="my-3 dark:text-white text-xl text-center">{formatter.format(data.scenario.employee_salary)} pro
                            MA</p>
                        <p className="my-3 dark:text-white text-xl text-center">{data.scenario.employee_cost_modfier * 100}%
                            Personalnebenkosten</p>
                        <div className="w-[90%] h-[2px] rounded-full dark:bg-white bg-black m-auto my-2"></div>
                        <p className="my-3 dark:text-white text-xl text-center">{formatter.format(cycle.employees_count * (data.scenario.employee_salary * (tempData.employees_cost_in_p)))} akt.
                            Personalkosten</p>
                        <p className="my-3 dark:text-white text-xl text-center">{formatter.format((parseInt(cycle.employees_count) + (isNaN(cycle.new_employees) ? 0 : cycle.new_employees) - (isNaN(cycle.let_go_employees) ? 0 : cycle.let_go_employees)) * (data.scenario.employee_salary * (tempData.employees_cost_in_p)))} folg.
                            Personalkosten</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Personal