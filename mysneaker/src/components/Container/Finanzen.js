import React from 'react'

const Finanzen = ({ FinanzenRef, formatter, stock, scenario, handleChange,cycle,tempData ,newMaschienPrize, allMaschienenKosten ,machine_3_fertigungskostenpp , machine_2_fertigungskostenpp}) => {

    var SaldoSoll = stock.account_balance - (tempData.paint_cost + tempData.sneaker_cost + (((stock.finished_sneaker_count + tempData.overall_production - Math.round(cycle.sales_planned + cycle.tender_offer_count)) * 8)) + (((stock.sneaker_count + cycle.buy_paint) - tempData.overall_production * 2) * 1) + (((stock.sneaker_count + cycle.buy_sneaker) - tempData.overall_production) * 4) + allMaschienenKosten + (scenario.production_cost_per_sneaker2 * cycle.planned_production_2) + (scenario.production_cost_per_sneaker1 * cycle.planned_production_1) + (scenario.production_cost_per_sneaker3 * cycle.planned_production_3) + parseFloat(newMaschienPrize) + (cycle.new_employees * 100) + (cycle.employees_count * (500 * (scenario.employee_cost_modfier))) + cycle.ad_invest +  cycle.research_invest + ((stock.credit_taken + cycle.take_credit - cycle.payback_credit) * scenario.factor_interest_rate)) + tempData.real_money + (stock.credit_taken + cycle.take_credit - cycle.payback_credit)
    var SaldoIst = stock.account_balance - (tempData.paint_cost + tempData.sneaker_cost + (((stock.finished_sneaker_count + tempData.overall_production - Math.round(stock.real_sales)) * 8)) + (((stock.sneaker_count + cycle.buy_paint) - tempData.overall_production * 2) * 1) + (((stock.sneaker_count + cycle.buy_sneaker) - tempData.overall_production) * 4) + allMaschienenKosten + (scenario.production_cost_per_sneaker2 * cycle.planned_production_2) + (scenario.production_cost_per_sneaker1 * cycle.planned_production_1) + (scenario.production_cost_per_sneaker3 * cycle.planned_production_3) + parseFloat(newMaschienPrize) + (cycle.new_employees * 100) + (cycle.employees_count * (500 * (scenario.employee_cost_modfier))) + cycle.ad_invest +  cycle.research_invest  + ((stock.credit_taken + cycle.take_credit - cycle.payback_credit) * scenario.factor_interest_rate)) + stock.income_from_sales + (stock.credit_taken + cycle.take_credit - cycle.payback_credit)

   
    var HöheKontokorrentkreditSoll = SaldoSoll < 0 ? SaldoSoll : 0
    var HöheKontokorrentkreditIst = SaldoIst < 0 ? SaldoIst : 0
    
    return (
        <div className=" p-4 shadow-lg xl:col-span-3 dark:bg-[#1f2733] dark:text-white rounded-3xl m-2 bg-white flex justify-center snap-start " ref={FinanzenRef}>
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
                                <td>50.000,00€</td>
                                <td>50.000,00€</td>
                            </tr>
                            <tr>
                                <td>Darlehensstand (Beginn Periode)</td>
                                <td>{formatter.format(stock.credit_taken)}</td>
                                <td>{formatter.format(stock.credit_taken)}</td>
                            </tr>
                            <tr>
                                <td>Aufnahme Darlehen</td>
                                <td><input className="border-2 border-[#4fd1c5] rounded-lg w-[90%] dark:bg-[#1f2733]" min="0" name='take_credit' type="number" onChange={handleChange} value={cycle.take_credit}></input> €</td>
                                <td>{formatter.format(cycle.take_credit)}</td>
                            </tr>
                            <tr>
                                <td>Darlehensstand (Ende Periode)</td>
                                <td>{formatter.format(stock.credit_taken + cycle.take_credit - cycle.payback_credit)}</td>
                                <td>{formatter.format(stock.credit_taken + cycle.take_credit - cycle.payback_credit)}</td>
                            </tr>
                            <tr>
                                <td>Einkauf Sneaker</td>
                                <td>{formatter.format(tempData.sneaker_cost)}</td>
                                <td>{formatter.format(tempData.sneaker_cost)}</td>
                            </tr>
                            <tr>
                                <td>Einkauf Farben</td>
                                <td>{formatter.format(tempData.paint_cost)}</td>
                                <td>{formatter.format(tempData.paint_cost)}</td>
                            </tr>
                            <tr>
                                <td>Lagerkosten Fertige Erz.</td>
                                <td>{formatter.format(isNaN((stock.finished_sneaker_count + parseInt(tempData.overall_production) - Math.round(cycle.sales_planned + cycle.tender_offer_count)) * 8) ? 0 : (stock.finished_sneaker_count + parseInt(tempData.overall_production) - Math.round(cycle.sales_planned + cycle.tender_offer_count)) * 8)}</td>
                                <td>{formatter.format(tempData.overall_production !== 0 ? (stock.finished_sneaker_count + parseInt(tempData.overall_production) - Math.round(stock.real_sales + stock.tender_sales)) * 8 : 0)}</td>
                            </tr>
                            <tr>
                                <td>Lagerkosten Sneaker</td>
                                <td>{formatter.format((stock.sneaker_count + parseInt(cycle.buy_sneaker) - tempData.overall_production) * 4)}</td>
                                <td>{formatter.format((stock.sneaker_count + parseInt(cycle.buy_sneaker) - tempData.overall_production) * 4)}</td>
                            </tr>
                            <tr>
                                <td>Lagerkosten Farben</td>
                                <td>{formatter.format(((stock.sneaker_count + parseInt(cycle.buy_paint)) - tempData.overall_production * 2) * 1)}</td>
                                <td>{formatter.format(((stock.sneaker_count + parseInt(cycle.buy_paint)) - tempData.overall_production * 2) * 1)}</td>
                            </tr>
                            <tr>
                                <td>Maschinenkosten</td>
                                <td>{formatter.format(allMaschienenKosten)}</td>
                                <td>{formatter.format(allMaschienenKosten)}</td>
                            </tr>
                            <tr>
                                <td>Produktionskosten</td>
                                <td>{formatter.format(allMaschienenKosten + cycle.planned_production_1 * scenario.production_cost_per_sneaker1 +  cycle.planned_production_2 * machine_2_fertigungskostenpp + cycle.planned_production_3 *  machine_3_fertigungskostenpp)}</td>
                                <td>{formatter.format(allMaschienenKosten + cycle.planned_production_1 * scenario.production_cost_per_sneaker1 +  cycle.planned_production_2 * machine_2_fertigungskostenpp + cycle.planned_production_3 *  machine_3_fertigungskostenpp)}</td>
                            </tr>
                            <tr>
                                <td>Maschinenkauf</td>
                                <td>{formatter.format(newMaschienPrize)}</td>
                                <td>{formatter.format(newMaschienPrize)}</td>
                            </tr>
                            <tr>
                                <td>Kosten Neueinstellung</td>
                                <td>{formatter.format(cycle.new_employees * 100)}</td>
                                <td>{formatter.format(cycle.new_employees * 100)}</td>
                            </tr>
                            <tr>
                                <td>Löhne/Gehälter</td>
                                <td>{formatter.format(cycle.employees_count * (500 * (tempData.employees_cost_in_p)))}</td>
                                <td>{formatter.format(cycle.employees_count * (500 * (tempData.employees_cost_in_p)))}</td>
                            </tr>
                            <tr>
                                <td>Werbekosten</td>
                                <td>{formatter.format(cycle.ad_invest)}</td>
                                <td>{formatter.format(cycle.ad_invest)}</td>
                            </tr>
                            <tr>
                                <td>Rationalisierung</td>
                                <td>{formatter.format(cycle.research_invest)}</td>
                                <td>{formatter.format(cycle.research_invest)}</td>
                            </tr>
                            <tr>
                                <td>Zinsen (Darlehen)</td>
                                <td>{formatter.format((stock.credit_taken + cycle.take_credit - cycle.payback_credit) * scenario.factor_interest_rate)}</td>
                                <td>{formatter.format((stock.credit_taken + cycle.take_credit - cycle.payback_credit) * scenario.factor_interest_rate)}</td>
                            </tr>
                            <tr>
                                <td>Rückzahlung Darlehen</td>
                                <td>{<input className="border-2 border-[#4fd1c5] w-[90%] rounded-lg dark:bg-[#1f2733]" min="0" name='payback_credit' type="number" onChange={handleChange} value={cycle.payback_credit}></input>} €</td>
                                <td>{<input className="border-2 border-[#4fd1c5] w-[90%] rounded-lg dark:bg-[#1f2733]" min="0" name='payback_credit' type="number" onChange={handleChange} value={cycle.payback_credit}></input>} €</td>
                            </tr>
                            <tr>
                                <td>Umsatzerlöse</td>
                                <td>{formatter.format(isNaN(tempData.real_money) ? 0 : tempData.real_money)}</td>
                                <td>{formatter.format(stock.income_from_sales)}</td>
                            </tr>
                            <tr>
                                <td>Saldo</td>
                                <td>{formatter.format(isNaN(SaldoSoll) ? 0 : parseInt(SaldoSoll))}</td>
                                <td>{formatter.format(parseInt(SaldoIst))}</td>
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
                                <td>{formatter.format(isNaN(SaldoSoll) ? (parseInt(HöheKontokorrentkreditSoll) * 0.12) : parseInt(SaldoSoll) + (parseInt(HöheKontokorrentkreditSoll) * 0.12))}</td>
                                <td>{formatter.format(parseInt(SaldoIst) + (parseInt(HöheKontokorrentkreditIst) * 0.12)) }</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
    )
}

export default Finanzen