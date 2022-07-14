import React from 'react'

const Finanzen = ({ FinanzenRef, formatter, stock, scenario, setAufnahmeDarlehen, AufnahmeDarlehen, RueckzahlungDarlehen, SneakerKosten, FarbenKosten, Gesamtproduktion, MarktSoll, 
    AusschreibungSoll, MarktIst, AusschreibungIst, SneakerEinkaufMenge, FarbenEinkaufMenge, AllMaschienenKosten, GesamtkostenProduktion, Maschinenkosten, 
    newMaschienPrize, Neueinstellungen, Mitarbeiter, PersonalnebenkostenInP, Werbung, ForschungUndEntwickelung, setRueckzahlungDarlehen, UmsatzSoll, SaldoIst, 
    SaldoSoll, HöheKontokorrentkreditIst, HöheKontokorrentkreditSoll, UmsatzIst }) => {

        console.log(UmsatzIst)
    return (
        <div className=" p-4 shadow-lg xl:col-span-3 rounded-3xl m-2 bg-white flex justify-center snap-start " ref={FinanzenRef}>
                    <img src="/img/projections.svg" className='h-[500px] w-0 xl:w-[500px] m-auto p-10'></img>
                    <table>
                        <tbody>
                            <tr>
                                <th ></th>
                                <th className='text-[#4fd1c5]'>Finanzen</th>

                            </tr>
                            <tr>
                                <td className='w-80'></td>
                                <td className='text-[#4fd1c5] w-40' >PLAN</td>
                                <td className='text-[#4fd1c5] w-40'>IST</td>
                            </tr>
                            <tr>
                                <td>Kontostand</td>
                                <td>{formatter.format(stock.account_balance)}</td>
                                <td>{formatter.format(stock.account_balance)}</td>
                            </tr>
                            <tr>
                                <td>Maximale Darlehenshöhe</td>
                                <td>50.000€</td>
                                <td>50.000€</td>
                            </tr>
                            <tr>
                                <td>Darlehensstand (Beginn Periode)</td>
                                <td>{formatter.format(stock.credit_taken)}</td>
                                <td>{formatter.format(stock.credit_taken)}</td>
                            </tr>
                            <tr>
                                <td>Aufnahme Darlehen</td>
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg w-[90%]" min="0" type="number" onChange={(e) => setAufnahmeDarlehen(e.target.value)} value={AufnahmeDarlehen}></input> €</td>
                                <td>{formatter.format(AufnahmeDarlehen)}</td>
                            </tr>
                            <tr>
                                <td>Darlehensstand (Ende Periode)</td>
                                <td>{formatter.format(stock.credit_taken + AufnahmeDarlehen - RueckzahlungDarlehen)}</td>
                                <td>{formatter.format(stock.credit_taken + AufnahmeDarlehen - RueckzahlungDarlehen)}</td>
                            </tr>
                            <tr>
                                <td>Einkauf Sneaker</td>
                                <td>{formatter.format(SneakerKosten)}</td>
                                <td>{formatter.format(SneakerKosten)}</td>
                            </tr>
                            <tr>
                                <td>Einkauf Farben</td>
                                <td>{formatter.format(FarbenKosten)}</td>
                                <td>{formatter.format(FarbenKosten)}</td>
                            </tr>
                            <tr>
                                <td>Lagerkosten Fertige Erz.</td>
                                <td>{formatter.format((stock.finished_sneaker_count + parseInt(Gesamtproduktion) - Math.round(parseInt(MarktSoll) + parseInt(AusschreibungSoll))) * 8)}</td>
                                <td>{formatter.format((stock.finished_sneaker_count + parseInt(Gesamtproduktion) - Math.round(parseInt(MarktIst) + parseInt(AusschreibungIst))) * 8)}</td>
                            </tr>
                            <tr>
                                <td>Lagerkosten Sneaker</td>
                                <td>{formatter.format((stock.sneaker_count + parseInt(SneakerEinkaufMenge) - Gesamtproduktion) * 4)}</td>
                                <td>{formatter.format((stock.sneaker_count + parseInt(SneakerEinkaufMenge) - Gesamtproduktion) * 4)}</td>
                            </tr>
                            <tr>
                                <td>Lagerkosten Farben</td>
                                <td>{formatter.format(((stock.sneaker_count + parseInt(FarbenEinkaufMenge)) - Gesamtproduktion * 2) * 1)}</td>
                                <td>{formatter.format(((stock.sneaker_count + parseInt(FarbenEinkaufMenge)) - Gesamtproduktion * 2) * 1)}</td>
                            </tr>
                            <tr>
                                <td>Maschinenkosten</td>
                                <td>{formatter.format(AllMaschienenKosten)}</td>
                                <td>{formatter.format(AllMaschienenKosten)}</td>
                            </tr>
                            <tr>
                                <td>Produktionskosten</td>
                                <td>{formatter.format(GesamtkostenProduktion - Maschinenkosten)}</td>
                                <td>{formatter.format(GesamtkostenProduktion - Maschinenkosten)}</td>
                            </tr>
                            <tr>
                                <td>Maschinenkauf</td>
                                <td>{formatter.format(newMaschienPrize)}</td>
                                <td>{formatter.format(newMaschienPrize)}</td>
                            </tr>
                            <tr>
                                <td>Kosten Neueinstellung</td>
                                <td>{formatter.format(Neueinstellungen * 100)}</td>
                                <td>{formatter.format(Neueinstellungen * 100)}</td>
                            </tr>
                            <tr>
                                <td>Löhne/Gehälter</td>
                                <td>{formatter.format(Mitarbeiter * (500 * (PersonalnebenkostenInP)))}</td>
                                <td>{formatter.format(Mitarbeiter * (500 * (PersonalnebenkostenInP)))}</td>
                            </tr>
                            <tr>
                                <td>Werbekosten</td>
                                <td>{formatter.format(Werbung)}</td>
                                <td>{formatter.format(Werbung)}</td>
                            </tr>
                            <tr>
                                <td>Rationalisierung</td>
                                <td>{formatter.format(ForschungUndEntwickelung)}</td>
                                <td>{formatter.format(ForschungUndEntwickelung)}</td>
                            </tr>
                            <tr>
                                <td>Zinsen (Darlehen)</td>
                                <td>{((stock.credit_taken + AufnahmeDarlehen - RueckzahlungDarlehen) * scenario.factor_interest_rate).toFixed(2) + "€"}</td>
                                <td>{((stock.credit_taken + AufnahmeDarlehen - RueckzahlungDarlehen) * scenario.factor_interest_rate).toFixed(2) + "€"}</td>
                            </tr>
                            <tr>
                                <td>Rückzahlung Darlehen</td>
                                <td>{<input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setRueckzahlungDarlehen(e.target.value)} value={RueckzahlungDarlehen}></input>}</td>
                                <td>{<input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setRueckzahlungDarlehen(e.target.value)} value={RueckzahlungDarlehen}></input>}</td>
                            </tr>
                            <tr>
                                <td>Umsatzerlöse</td>
                                <td>{formatter.format(UmsatzSoll)}</td>
                                <td>{formatter.format(UmsatzIst)}</td>
                            </tr>
                            <tr>
                                <td>Saldo</td>
                                <td>{formatter.format(SaldoSoll)}</td>
                                <td>{formatter.format(SaldoIst)}</td>
                            </tr>
                            <tr>
                                <td>Höhe Kontokorrentkredit</td>
                                <td>{formatter.format(HöheKontokorrentkreditSoll)}</td>
                                <td>{formatter.format(HöheKontokorrentkreditIst) }</td>
                            </tr>
                            <tr>
                                <td>Zinsen (Kontokorrentkredit)</td>
                                <td>{formatter.format(HöheKontokorrentkreditSoll * 0.12)}</td>
                                <td>{formatter.format(HöheKontokorrentkreditIst * 0.12)}</td>
                            </tr>
                            <tr>
                                <td>Kontostand</td>
                                <td>{formatter.format(SaldoSoll + (HöheKontokorrentkreditSoll * 0.12))}</td>
                                <td>{formatter.format(SaldoIst + (HöheKontokorrentkreditIst * 0.12)) }</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
    )
}

export default Finanzen