import React from 'react'

const Personal = ({ PersonalRef, Mitarbeiter, ZugeteilteMitarbeiter, setNeueinstellungen, Neueinstellungen, setKündigungen, Kündigungen, ZugeteilteMitarbeiter2, ZugeteilteMitarbeiter3, formatter, PersonalnebenkostenInP, setPersonalnebenkosten, Personalnebenkosten,employee_signup_bonus,data }) => {


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
                        <td>{Mitarbeiter}</td>

                    </tr>
                    <tr>
                        <td>Grundkapazität Stück je MA</td>
                        <td>20</td>

                    </tr>
                    <tr>
                        <td>Verfügbare Kapazität (MA)</td>
                        <td>{Mitarbeiter - (parseInt(ZugeteilteMitarbeiter)  + parseInt(ZugeteilteMitarbeiter2)  + parseInt(ZugeteilteMitarbeiter3) )} MA</td>

                    </tr>
                    <tr>
                        <td>benötigte MA </td>
                        <td>{(parseInt(ZugeteilteMitarbeiter)  + parseInt(ZugeteilteMitarbeiter2)  + parseInt(ZugeteilteMitarbeiter3) )} MA</td>

                    </tr>
                    <tr>
                        <td>Auslastung </td>
                        <td>{Math.round((ZugeteilteMitarbeiter / 1) / Mitarbeiter * 100)} %</td>

                    </tr>
                    <tr>
                        <td>Neueinstellungen</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg dark:bg-[#1f2733]" min="0" type="number" onChange={(e) => e.target.value >= 0 ? setNeueinstellungen(e.target.value) : setNeueinstellungen(0)} value={Neueinstellungen}></input> MA</td>

                    </tr>
                    <tr>
                        <td>Kosten Neueinstellung</td>
                        <td>{formatter.format(data.scenario.employee_signup_bonus)}</td>

                    </tr>
                    <tr>
                        <td>Kündigungen/Rente/ etc.</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg dark:bg-[#1f2733]" min="0" type="number" onChange={(e) => e.target.value >= 0 ? setKündigungen(e.target.value) : setKündigungen(0)} value={Kündigungen}></input> MA</td>

                    </tr>
                    <tr>
                        <td>Zugeteilte Mitarbeiter</td>
                        <td>{parseInt(ZugeteilteMitarbeiter) + parseInt(ZugeteilteMitarbeiter2) + parseInt(ZugeteilteMitarbeiter3)} MA</td>

                    </tr>
                    <tr>
                        <td>Mitarbeiter nächste Periode</td>
                        <td>{parseInt(Mitarbeiter) + parseInt(Neueinstellungen) - Kündigungen} MA</td>


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
                        <td>{formatter.format(Mitarbeiter * (data.scenario.employee_salary * (PersonalnebenkostenInP)))}</td>

                    </tr>
                    <tr>
                        <td>Personalkosten folg. Periode</td>
                        <td>{formatter.format((parseInt(Mitarbeiter) + parseInt(Neueinstellungen) - Kündigungen) * (data.scenario.employee_salary * (PersonalnebenkostenInP)))}</td>

                    </tr>

                </tbody>
            </table>
            <img src="/img/personal.svg" alt='' className='h-96 w-64 xl:w-96 m-auto'></img>

        </div>
    )

}

export default Personal