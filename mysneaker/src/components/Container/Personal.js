import React from 'react'

const Personal = ({ PersonalRef, Mitarbeiter, ZugeteilteMitarbeiter, setNeueinstellungen, Neueinstellungen, setKündigungen, Kündigungen, ZugeteilteMitarbeiter2, ZugeteilteMitarbeiter3, formatter, PersonalnebenkostenInP, setPersonalnebenkosten, Personalnebenkosten,data }) => {


    return (
        <div className="p-4 xl:col-span-3 shadow-lg rounded-3xl m-2 bg-white flex justify-center snap-start" ref={PersonalRef}>
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
                        <td>{Mitarbeiter - ZugeteilteMitarbeiter} MA</td>

                    </tr>
                    <tr>
                        <td>benötigte MA </td>
                        <td>{ZugeteilteMitarbeiter} MA</td>

                    </tr>
                    <tr>
                        <td>Auslastung </td>
                        <td>{Math.round((ZugeteilteMitarbeiter / 1) / Mitarbeiter * 100)} %</td>

                    </tr>
                    <tr>
                        <td>Neueinstellungen</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setNeueinstellungen(e.target.value)} value={Neueinstellungen}></input> MA</td>

                    </tr>
                    <tr>
                        <td>Kosten Neueinstellung</td>
                        <td>100,00€</td>

                    </tr>
                    <tr>
                        <td>Kündigungen/Rente/ etc.</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setKündigungen(e.target.value)} value={Kündigungen}></input> MA</td>

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
                        <td>500,00 €</td>

                    </tr>
                    <tr>
                        <td>Personalnebenkosten</td>
                        <td>{data.scenario.employee_cost_modfier * 100}%</td>

                    </tr>
                    <tr>
                        <td>Personalkosten akt. Periode</td>
                        <td>{formatter.format(Mitarbeiter * (500 * (PersonalnebenkostenInP)))}</td>

                    </tr>
                    <tr>
                        <td>Personalkosten folg. Periode</td>
                        <td>{formatter.format((parseInt(Mitarbeiter) + parseInt(Neueinstellungen) - Kündigungen) * (500 * (PersonalnebenkostenInP)))}</td>

                    </tr>

                </tbody>
            </table>
            <img src="/img/personal.svg" className='h-96 w-64 xl:w-96 m-auto'></img>

        </div>
    )

}

export default Personal