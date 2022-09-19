import React from 'react'

const Beschaffung = ({
                         Gesamtproduktion,
                         EntnahmeAusDemLager,
                         MarktSoll,
                         AusschreibungSoll,
                         setMarktSoll,
                         setMarktSollPreis,
                         formatter,
                         MarktSollPreis,
                         scenario,
                         setAussetschreibungSoll,
                         setAussetschreibungSollPreis,
                         AusschreibungSollPreis
                     }) => {

    return (
        <div
            className={(Math.round(parseInt(Gesamtproduktion) + parseInt(EntnahmeAusDemLager)) < (Math.round(parseInt(MarktSoll) + parseInt(AusschreibungSoll)) / 1) ? " p-4 border-2 border-red-300 shadow-lg  xl:col-span-2  rounded-3xl m-2 bg-white flex justify-center  snap-start" : "p-4 shadow-lg  xl:col-span-2  rounded-3xl m-2 bg-white flex justify-center  snap-start") + " dark:bg-[#1f2733] dark:text-white"}>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th className='text-[#4fd1c5]'>Verkauf (Soll)</th>
                </tr>
                <tr>
                    <td></td>
                    <td>Geplante Stückzahl</td>
                    <td>Preis je Einheit (Angebot)</td>
                    <td>Geplanter Umsatz</td>
                </tr>
                <tr>
                    <td>Markt</td>
                    <td><input className="border-2 border-[#4fd1c5] w-[80%] rounded-lg dark:bg-[#1f2733]" min="0"
                               type="number" onChange={(e) => {
                        if (e.target.value !== "") {
                            e.target.value >= 0 ? e.target.value >= (Math.round(parseInt(Gesamtproduktion) + parseInt(EntnahmeAusDemLager))) ? setMarktSoll((Math.round(parseInt(Gesamtproduktion) + parseInt(EntnahmeAusDemLager))))  : setMarktSoll(e.target.value) : setMarktSoll(0)
                        } else {
                            setMarktSoll(0)
                        }
                    }} max={""+(Math.round(parseInt(Gesamtproduktion) + parseInt(EntnahmeAusDemLager)))} value={MarktSoll}></input> Stk.
                    </td>
                    <td><input className="border-2 border-[#4fd1c5] w-[90%] rounded-lg dark:bg-[#1f2733]" min="0"
                               max="300" type="number"
                               onChange={(e) => e.target.value <= 300 ? e.target.value >= 0 ? setMarktSollPreis(e.target.value) : setMarktSollPreis(0) : setMarktSollPreis(300)}
                               value={MarktSollPreis}></input> €
                    </td>
                    <td>{formatter.format(MarktSoll * MarktSollPreis)}</td>
                </tr>
                <tr>

                    <td>Ausschreibung</td>

                    {scenario.tender_offer_count === 0 ?
                        <>
                            <td><input className="border-2 border-[#1f273] w-[80%] rounded-lg dark:bg-[#252e3c]" min="0"
                                       type="number"
                                       onChange={(e) => e.target.value >= 0 ? setAussetschreibungSoll(e.target.value) : setAussetschreibungSoll(0)}
                                       value={AusschreibungSoll} disabled></input> Stk.
                            </td>
                            <td><input className="border-2 border-[#1f273] w-[90%] rounded-lg dark:bg-[#252e3c]" min="0"
                                       max="300" type="number"
                                       onChange={(e) => e.target.value <= 300 ? e.target.value >= 0 ? setAussetschreibungSollPreis(e.target.value) : setAussetschreibungSollPreis(0) : setAussetschreibungSollPreis(300)}
                                       value={AusschreibungSollPreis} disabled></input> €
                            </td>
                        </>
                        :
                        <>
                            <td><select id="tender_offer_count"
                                        className="border-2 border-[#4fd1c5] w-[80%] rounded-lg dark:bg-[#1f2733]"
                                        onChange={(e) => setAussetschreibungSoll(e.target.value)}>
                                <option value="0" selected>0</option>
                                <option value={scenario.tender_offer_count}
                                        >{scenario.tender_offer_count}</option>
                            </select>Stk.
                            </td>
                            <td><input className="border-2 border-[#4fd1c5] w-[90%] rounded-lg dark:bg-[#1f2733]"
                                       min="0" max="300" type="number"
                                       onChange={(e) => e.target.value <= 300 ? e.target.value >= 0 ? setAussetschreibungSollPreis(e.target.value) : setAussetschreibungSollPreis(0) : setAussetschreibungSollPreis(300)}
                                       value={AusschreibungSollPreis}></input> €
                            </td>
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