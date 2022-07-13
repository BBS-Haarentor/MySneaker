import React from 'react'

const Beschaffung = ({ formatter, MarktSollPreis, MarktSoll, SneakerKosten, FarbenKosten, Gesamtproduktion, FertigungskostenProStückFE, AllMaschienenKosten, Mitarbeiter, PersonalnebenkostenInP }) => {

    return (
        <div className=" p-4 shadow-lg rounded-3xl m-2 xl:col-span-3 bg-white flex justify-center snap-start ">
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th className='text-[#4fd1c5]'>Statistik  (Produktion Plan)</th>
                            </tr>
                            <tr>
                                <td></td>
                                <td>pro Stück</td>
                                <td>Gesamt</td>
                            </tr>
                            <tr>
                                <td>Umsatz</td>
                                <td>{formatter.format(MarktSollPreis)}</td>
                                <td>{formatter.format((MarktSoll*MarktSollPreis))}</td>
                            </tr>
                            <tr>
                                <td>Werkstoffkosten</td>
                                <td>{formatter.format((SneakerKosten+FarbenKosten) /Gesamtproduktion)}</td>
                                <td>{formatter.format((SneakerKosten+FarbenKosten))}</td>
                            </tr>
                            <tr>
                                <td>Fertigungskosten</td>
                                <td>{formatter.format(FertigungskostenProStückFE)}</td>
                                <td>{formatter.format(FertigungskostenProStückFE * Gesamtproduktion)}</td>
                            </tr>
                            <tr>
                                <td>Maschinenkosten</td>
                                <td>{formatter.format(AllMaschienenKosten / Gesamtproduktion)} Stk. </td>
                                <td>{formatter.format(AllMaschienenKosten)}</td>
                            </tr>
                            <tr>
                                <td>Personalkosten</td>
                                <td>{formatter.format(Mitarbeiter * (500 * (PersonalnebenkostenInP))/Gesamtproduktion)} Stk. </td>
                                <td>{formatter.format(Mitarbeiter * (500 * (PersonalnebenkostenInP)))}</td>
                            </tr>
                            <tr>
                                <td>Gesamtkosten</td>
                                <td>{formatter.format(((Mitarbeiter * (500 * (PersonalnebenkostenInP)) + (SneakerKosten+FarbenKosten) + AllMaschienenKosten) /Gesamtproduktion) + FertigungskostenProStückFE)} Stk. </td>
                                <td>{formatter.format((Mitarbeiter * (500 * (PersonalnebenkostenInP)) + AllMaschienenKosten + (SneakerKosten+FarbenKosten)) + FertigungskostenProStückFE * Gesamtproduktion)}</td>
                            </tr>
                            <tr>
                                <td>Gewinn</td>
                                <td>{formatter.format( MarktSollPreis - (((Mitarbeiter * (500 * (PersonalnebenkostenInP)) + (SneakerKosten+FarbenKosten) + AllMaschienenKosten) /Gesamtproduktion) + FertigungskostenProStückFE))} Stk. </td>
                                <td>{formatter.format((MarktSoll*MarktSollPreis) - ((Mitarbeiter * (500 * (PersonalnebenkostenInP)) + AllMaschienenKosten + (SneakerKosten+FarbenKosten)) + FertigungskostenProStückFE * Gesamtproduktion))}</td>
                            </tr>
                        </tbody>
                    </table>
                    <img src="/img/undraw_finance.svg" className='h-96 w-64 xl:w-96 m-4'></img>
                </div>
    )
}

export default Beschaffung