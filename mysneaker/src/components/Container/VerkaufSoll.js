import React from 'react'

const Beschaffung = ({ Gesamtproduktion, EntnahmeAusDemLager, MarktSoll, AusschreibungSoll, setMarktSoll, setMarktSollPreis, formatter, MarktSollPreis, scenario, setAussetschreibungSoll, setAussetschreibungSollPreis, AusschreibungSollPreis }) => {

    return (
        <div className={(Math.round(parseInt(Gesamtproduktion) + parseInt(EntnahmeAusDemLager)) < (Math.round(parseInt(MarktSoll) + parseInt(AusschreibungSoll)) / 1) ? " p-4 border-2 border-red-300 shadow-lg  xl:col-span-2  rounded-3xl m-2 bg-white flex justify-center  snap-start":"p-4 shadow-lg  xl:col-span-2  rounded-3xl m-2 bg-white flex justify-center  snap-start") + " dark:bg-[#1f2733] dark:text-white"}>
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th className='text-[#4fd1c5]'   >Verkauf (Soll)</th>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Geplante Stückzahl</td>
                                <td>Preis je Einheit (Angebot)</td>
                                <td>Geplanter Umsatz</td>
                            </tr>
                            <tr>
                                <td>Markt</td>
                                <td><input className="border-2 border-[#4fd1c5] w-[80%] rounded-lg dark:bg-[#1f2733]" min="0" type="number" onChange={(e) => setMarktSoll(e.target.value)} value={MarktSoll}></input> Stk.</td>
                                <td><input className="border-2 border-[#4fd1c5] w-[90%] rounded-lg dark:bg-[#1f2733]" min="0" max="300" type="number" onChange={(e) => e.target.value <= 300 ? e.target.value >= 0 ? setMarktSollPreis(e.target.value) : setMarktSollPreis(0) : setMarktSoll(300) } value={MarktSollPreis}></input> €</td>
                                <td>{formatter.format(MarktSoll * MarktSollPreis)}</td>
                            </tr>
                            <tr>
                           
                                <td>Ausschreibung</td>
                              
                                {scenario.tender_offer_count === 0 ? 
                                <>
                                    <td><input className="border-2 border-gray-300 w-[80%] rounded-lg text-gray-300 dark:bg-[#1f2733]" min="0" type="number" onChange={(e) => setAussetschreibungSoll(e.target.value)} value={AusschreibungSoll} disabled></input> Stk.</td>
                                    <td><input className="border-2 border-gray-300 w-[90%] rounded-lg text-gray-300 dark:bg-[#1f2733]" min="0" type="number" onChange={(e) => setAussetschreibungSollPreis(e.target.value)} value={AusschreibungSollPreis} disabled></input> €</td>
                                </>
                                :
                                <>
                                    <td><input className="border-2 border-[#4fd1c5] w-[80%] rounded-lg dark:bg-[#1f2733]" min="0" type="number" onChange={(e) => setAussetschreibungSoll(e.target.value)} value={AusschreibungSoll}></input> Stk.</td>
                                    <td><input className="border-2 border-[#4fd1c5] w-[90%] rounded-lg dark:bg-[#1f2733]" min="0" max="300" type="number" onChange={(e) => e.target.value <= 300 ? e.target.value >= 0 ? setAussetschreibungSollPreis(e.target.value) : setAussetschreibungSollPreis(0) : setAussetschreibungSollPreis(300)} value={AusschreibungSollPreis}></input> €</td>
                                </>
                                }
                                <td>{formatter.format(AusschreibungSoll * AusschreibungSollPreis)}</td>
                            </tr>
                            <tr>
                                <td>Gesamt</td>
                                <td>{Math.round(parseInt(MarktSoll) + parseInt(AusschreibungSoll))} Stk.</td>
                            </tr>
                            <tr>
                                <td>Gesamtverkauf möglich</td>
                                <td>{Math.round(parseInt(Gesamtproduktion) + parseInt(EntnahmeAusDemLager)) < (Math.round(parseInt(MarktSoll) + parseInt(AusschreibungSoll)) / 1) ? "Nein" : "Ja"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
    )
}

export default Beschaffung