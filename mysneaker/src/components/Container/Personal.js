import React from 'react'

const Personal = ({ PersonalRef, formatter,data,cycle,tempData, handleChange }) => {


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