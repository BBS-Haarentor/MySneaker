import React from 'react'

const Finanzen = ({
                      FinanzenRef,
                      formatter,
                      stock,
                      scenario,
                      handleChange,
                      cycle,
                      tempData,
                      newMaschienPrize,
                      allMaschienenKosten,
                      machine_3_fertigungskostenpp,
                      machine_2_fertigungskostenpp
                  }) => {

    var SaldoSoll = stock.account_balance - (tempData.paint_cost + tempData.sneaker_cost + (((stock.finished_sneaker_count + tempData.overall_production - Math.round(cycle.sales_planned + cycle.tender_offer_count)) * 8)) + (((stock.sneaker_count + cycle.buy_paint) - tempData.overall_production * 2) * 1) + (((stock.sneaker_count + cycle.buy_sneaker) - tempData.overall_production) * 4) + allMaschienenKosten + (scenario.production_cost_per_sneaker2 * cycle.planned_production_2) + (scenario.production_cost_per_sneaker1 * cycle.planned_production_1) + (scenario.production_cost_per_sneaker3 * cycle.planned_production_3) + parseFloat(newMaschienPrize) + (cycle.new_employees * 100) + (cycle.employees_count * (500 * (scenario.employee_cost_modfier))) + cycle.ad_invest + cycle.research_invest + ((stock.credit_taken + cycle.take_credit - cycle.payback_credit) * scenario.factor_interest_rate)) + tempData.real_money + (stock.credit_taken + cycle.take_credit - cycle.payback_credit)
    var SaldoIst = stock.account_balance - (tempData.paint_cost + tempData.sneaker_cost + (((stock.finished_sneaker_count + tempData.overall_production - Math.round(stock.real_sales)) * 8)) + (((stock.sneaker_count + cycle.buy_paint) - tempData.overall_production * 2) * 1) + (((stock.sneaker_count + cycle.buy_sneaker) - tempData.overall_production) * 4) + allMaschienenKosten + (scenario.production_cost_per_sneaker2 * cycle.planned_production_2) + (scenario.production_cost_per_sneaker1 * cycle.planned_production_1) + (scenario.production_cost_per_sneaker3 * cycle.planned_production_3) + parseFloat(newMaschienPrize) + (cycle.new_employees * 100) + (cycle.employees_count * (500 * (scenario.employee_cost_modfier))) + cycle.ad_invest + cycle.research_invest + ((stock.credit_taken + cycle.take_credit - cycle.payback_credit) * scenario.factor_interest_rate)) + stock.income_from_sales + (stock.credit_taken + cycle.take_credit - cycle.payback_credit)


    var HöheKontokorrentkreditSoll = SaldoSoll < 0 ? SaldoSoll : 0
    var HöheKontokorrentkreditIst = SaldoIst < 0 ? SaldoIst : 0


    return (
        <>
            <div className="w-full">
                <h1 className="my-5 text-3xl w-full text-center text-[#4fd1c5] font-bold">Finanzen</h1>
                <div className="flex justify-center m-2">
                    <div
                        className="dark:bg-[#1f2733] flex-shrink-0 xl:w-96 w-full min-h-60 rounded-xl max-[1250px]:mx-5 drop-shadow-xl bg-white mb-5">
                        <h2 className="text-[#4fd1c5] text-center text-xl pt-5 font-bold">Aktueller Kontostand</h2>
                        <p className="text-center pt-2 pb-5 dark:text-white text-lg font-bold">{formatter.format(stock.account_balance)}</p>
                    </div>
                </div>
                <div className="flex justify-center flex-row flex-wrap w-full items-center overflow-x-hidden">
                    <div
                        className="dark:bg-[#1f2733] mx-2 xl:w-[35em] w-full min-h-60 rounded-xl drop-shadow-xl bg-white mb-5">
                        <svg viewBox="0 0 1358 1358" fill="none"
                             className="w-32 h-32 mx-auto my-5">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M593.076 155.145C757.193 132.791 920.501 202.597 1034.69 322.512C1163.2 457.469 1262.8 636.196 1224.83 818.594C1186.21 1004.13 1020.54 1124.87 850.306 1208.32C678.123 1292.72 472.016 1365.93 306.794 1268.61C149.564 1176.01 130.878 963.528 125.167 781.219C120.904 645.112 198.838 534.355 280.375 425.256C367.116 309.194 449.456 174.707 593.076 155.145Z"
                                  fill="#4FD1C5"/>
                            <rect x="286.979" width="1108.8" height="1108.8" transform="rotate(15 286.979 0)"
                                  fill="url(#pattern0)"/>
                            <defs>
                                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlinkHref="#image0_0_1" transform="scale(0.00195312)"/>
                                </pattern>
                                <image id="image0_0_1" width="512" height="512"
                                       xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAA
                                       gAElEQVR4nOzdd3xUVdoH8N+Znt5DepmZJBAgdKnSBATEhhQFlVUsWFDsIuqiYnd3WXtXhFVX7IWmCBYU
                                       AaXXFEISSALpIXXKef8Y3BeQmnvO3DuZ5/v5+Hn3DclzTiYz9z73lOcAhBBCCCGEEEIIIYQQQgghhBBCC
                                       CGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCC
                                       GEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCG
                                       EEEIIIYQQQgghhBBCCCGEEELI6TG1O0D8h91uD+WcX8IYuwhAZ7fbnQwAOp2uGMB2AF8A+CIvL69OzX62
                                       V/T6q4tef6I1lAAQ6YYOHWooKiq6lTE2B0D0ab79EIB5+fn5LwFwye9d+0evv7ro9SdaRQkAkerIU8/7A
                                       C44m5/jnK9wOp2XFxUVVUvqml+g119d9PoTLaMEgEiTnZ0d3Nzc/BNjrHsbQ2wMCgo6d8uWLQ1CO+Yn6P
                                       VXF73+ROt0aneAtF8tLS0LFFz8AKBHQ0PDO8I65Gfo9VcXvf5E62gEgEhhtVrHMsa+ERGLMXZ+Xl7eChG
                                       x/AW9/uqi15/4AhoBIFIwxh4VFYtzPk9ULH9Br7+66PUnvoBGAIhwdrvdxjnPExlTp9PZcnNzC0TGbK/o
                                       9VcXvf7EV9AIABGOcz5GQszRomO2V/T6q4tef+IrKAEgwnHO030hZntFr7+66PUnvoISACKcTqeLEx2TM
                                       RYvOmZ7Ra+/uuj1J76CEgAiHOfcKCGmSXTM9opef3XR6098BSUAhBBCiB+iBIAQQgjxQ5QAEEIIIX6IEg
                                       BCCCHED1ECQAghhPghSgAIIYQQP0QJACGEEOKHKAEghBBC/BAlAIQQQogfogSAEEII8UOUABBCCCF+iBI
                                       AQgghxA9RAkAIIYT4IUoACCGEED9ECQAhhBDihygBIIQQQvwQJQCEEEKIH6IEgBBCCPFDlAAQQgghfogS
                                       AEIIIcQPGdTuACFaZLPZ7JzzCYyx0QBsAGIBVHPOSxljPwH4PD8/fxUArmpHCbNarcMZY5cwxs7lnMcBi
                                       ABwEEAe53wZY+yT/Pz8PJX7SYjmUAJAyFGysrISXC7XPM751Ywx/XH/3IEx1gFAdwAz7Xb7OsbYPbm5uT
                                       +q0FW/Z7fbh3DOnwPQGwA4PyYXSwKQxBgbCuBxq9X6rsvlemjfvn2lKnSVEE2iKQBCjrDb7f2cTufvnPN
                                       rABx/8/8Lzvk5brd7td1un+uF7pGjWK3W2znn3+PIzf809Iyx6QaD4feMjIy+svtGiK+gBIAQAHa7vT/n
                                       fBWAuLP8UcY5/7vNZpsno1/kr2w22+OMsfk4++tXvNvtXkVJACEelAAQv5eVlZXAOf8UgEVBmAfsdvskU
                                       X0iJ2az2SYDmK0gRIDb7f4sLS3tbBM9QtodSgCI33O5XPNw9k/+x2Oc8xeysrJCRPSJ/FVOTk4QgPkAmM
                                       JQ8Xq9/jEBXSLEp1ECQPzakdX+VwsKF+t0OmcIikWO09DQcAuUJ2p/usZut9sExSLEJ1ECQPwaY2wizmD
                                       B31mgaQB5LhcYS885v0xgPEJ8DiUAxK+53e7RgkP2stlssYJj+r309PQ/t1+KNEZwPEJ8CiUAxK8xxtJF
                                       h3S73WmCY/o9vV6fDuVz/8cT/bcnxKdQAkD8XQfRAfV6fbzomET83wkA/Z2IX6MEgPg7k4/E9Hf0dyJEM
                                       EoACCGEED9ECQAhhBDihygBIIQQQvwQJQCEEEKIH6IEgBBCCPFDlAAQQgghfogSAEIIIcQPUQJACCGE+C
                                       FKAAghhBA/RAkAIe3Ihm9vCAsJNkaLjhsSZOzw9X+mRIiOSwhRj0HtDhBCzs5PX98UsX1H+ajqmuahVTU
                                       tncsrmlPLKxqjK2taLJfftFLHufg26xscg++Yu65qYN8u7tjogIaoCEtFaLCpJDTQuMdo0q01WoK+vnfu
                                       4jLxLRNCZKEEgBAN++3TW6LWbC2+srS84YKS8obsg4eaYq6781uT0yXhLn8abjdHWUWTrqyiKQRACDyn6
                                       Z0LYLpOxzBiSPfW1KTg0sS44G3REaZl2dnhH4wY/16l1ztKCDkjlAAQoiGfvDzFWniw/oaS0sbzCkvqO1
                                       774LfBzS0utbt1Wm43x96SetPekvpUAKkALjAZdS9cMLJnY0JcUF5aYsjy7l3jX7pg6lv71O4rIcSDEgB
                                       CVMT5RP2Lj7eM31NYPz13b+3A2fPXBbtUeLqXodXhxq6C2sBdBbU5AHLMX+TdM+nivnVZ1vD1XTIiF046
                                       J+R91vt1h9r9JMRfUQJAiJdt2HCD8delB2/OL6679rwhuZ337a/Xq90nb2hpdeH3bRWhv2+rOA/Aea8kB
                                       L81Y9rg3fExAe9FpOjm33bb0ha1+0iIP6EEgBAv4Hyubv6jG27akVt78y0z1nSsqG72+x04xQcO64sPHM
                                       4G8FRkuPmJG68evMOWFvpqWpeAVydNWqz9eQ9CfBwlAIRI9OnrkzM37qx5cszILy7I3VtnVrs/WlVV06L
                                       7bs3+Lt+t2f9icnzw/HtvHbHGZgu988Y7Pv1D7b4R0l5RAkCIYHq9ns1/7KK7tu6svv3hf29Kbmp2qt0l
                                       n1JcethQXHp4iEHPfp8yvv+BXjnR/3r9g51FTnoZCRGKEgBCBIsINS564d3tRrX74eucLo7fNh9M+G3zw
                                       WeT44McxaUNaneJkHbF7+chCRHtUFUT3fwFKy5toNeUEMEoASCEEEL8ECUAhBBCiB+iBIAQQgjxQ5QAEE
                                       IIIX6IEgBCCCHED1ECQAghhPghSgAIIYQQP0QJACGEEOKHKAEghBBC/BAlAIQQQogforMAiN968YlLM//
                                       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"/>
                            </defs>
                        </svg>
                        <h1 className="text-center text-[#4fd1c5] text-xl font-bold">Darlehen</h1>
                        <div className="rounded-full dark:bg-gray-50 bg-gray-500 h-1 w-[90%] mx-auto mt-5 mb-3"/>
                        <h2 className="text-center text-2xl dark:text-white font-bold">{formatter.format(stock.credit_taken)}</h2>
                        <h3 className="text-center dark:text-white pt-5 text-xl font-medium">{formatter.format(cycle.take_credit)}</h3>
                        <div className="flex flex-row flex-nowrap">
                            <p className="w-1/5 text-center dark:text-white font-medium text-lg">0,00 €</p>
                            <input type="range" name='take_credit' onChange={handleChange} value={cycle.take_credit}
                                   max={50000}
                                   className="w-3/5 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-3"/>
                            <p className="w-1/5 text-center dark:text-white font-medium text-lg">50.000,00 €</p>
                        </div>
                        <h3 className="text-center dark:text-white pt-5 text-xl font-medium">{formatter.format(cycle.payback_credit)}</h3>
                        <div className="flex flex-row flex-nowrap">
                            <p className="w-1/5 text-center dark:text-white font-medium text-lg">0,00 €</p>
                            <input type="range" name='payback_credit' onChange={handleChange}
                                   value={cycle.payback_credit} max={stock.credit_taken}
                                   className="w-3/5 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-3"/>
                            <p className="w-1/5 text-center dark:text-white font-medium text-lg">{formatter.format(stock.credit_taken)}</p>
                        </div>
                        <p className="text-center dark:text-white text-xl my-5 font-bold">{formatter.format((stock.credit_taken + cycle.take_credit - cycle.payback_credit) * scenario.factor_interest_rate)} Zinsen
                            (Darlehn)</p>
                    </div>
                </div>
                <div className="flex justify-center m2 items-center flex-wrap">
                    <div
                        className="dark:bg-[#1f2733] mx-2 xl:w-[25em] w-full min-h-60 rounded-xl drop-shadow-xl bg-white mb-5">
                        <h1 className="text-center text-[#4fd1c5] text-2xl font-bold py-5">Produktion</h1>
                        <div className="rounded-full dark:bg-gray-50 bg-gray-500 h-1 w-[90%] mx-auto"/>
                        <p className="text-xl dark:text-white text-center font-bold pt-5">{formatter.format(allMaschienenKosten)} Maschinenkosten</p>
                        <p className="text-xl dark:text-white text-center font-bold pt-5">{formatter.format(allMaschienenKosten + (isNaN(cycle.planned_production_1) ? 0 : cycle.planned_production_1) * (isNaN(scenario.production_cost_per_sneaker1) ? 0 : scenario.production_cost_per_sneaker1) + cycle.planned_production_2 * machine_2_fertigungskostenpp + cycle.planned_production_3 * machine_3_fertigungskostenpp)} Produktionskosten</p>
                        <p className="text-xl dark:text-white text-center font-bold py-5">{formatter.format(newMaschienPrize)} Maschinenkauf</p>
                    </div>
                    <div
                        className="dark:bg-[#1f2733] mx-2 xl:w-[25em] w-full min-h-60 rounded-xl drop-shadow-xl bg-white mb-5">
                        <h1 className="text-center text-[#4fd1c5] text-2xl font-bold py-5">Einkauf</h1>
                        <div className="rounded-full dark:bg-gray-50 bg-gray-500 h-1 w-[90%] mx-auto"/>
                        <p className="text-xl dark:text-white text-center font-bold pt-5">{formatter.format(isNaN(tempData.sneaker_cost) ? 0 : tempData.sneaker_cost)} Einkauf
                            Sneaker</p>
                        <p className="text-xl dark:text-white text-center font-bold pt-5">{formatter.format(isNaN(tempData.paint_cost) ? 0 : tempData.paint_cost)} Einkauf
                            Farben</p>
                        <p className="text-xl dark:text-white text-center font-bold pt-5">{formatter.format(isNaN(tempData.paint_cost) ? 0 : tempData.paint_cost)} Lagerkosten
                            Fertige Erz.</p>
                        <p className="text-xl dark:text-white text-center py-5 font-bold">{formatter.format((stock.sneaker_count + (isNaN(parseInt(cycle.buy_sneaker)) ? 0 : parseInt(cycle.buy_sneaker)) - tempData.overall_production) * 4)} Lagerkosten
                            Sneaker</p>
                    </div>
                    <div
                        className="dark:bg-[#1f2733] mx-2 xl:w-[25em] w-full min-h-60 rounded-xl drop-shadow-xl bg-white mb-5">
                        <h1 className="text-center text-[#4fd1c5] text-2xl font-bold py-5">Sonstige Kosten</h1>
                        <div className="rounded-full dark:bg-gray-50 bg-gray-500 h-1 w-[90%] mx-auto"/>
                        <p className="text-xl dark:text-white text-center font-bold pt-5">{formatter.format(isNaN(cycle.ad_invest) ? 0 : cycle.ad_invest)} Werbekosten</p>
                        <p className="text-xl dark:text-white text-center font-bold pt-5">{formatter.format(isNaN(cycle.research_invest) ? 0 : cycle.research_invest)} Rationalisierung</p>
                        <p className="text-xl dark:text-white text-center font-bold py-5">{formatter.format(newMaschienPrize)} Umsatze</p>
                    </div>
                </div>
                <div className="dark:text-white flex justify-center">
                    <div
                        className="dark:bg-[#1f2733] mx-2 p-3 xl:w-[25em] w-full min-h-60 rounded-xl drop-shadow-xl bg-white mb-5">
                        <table>
                            <thead>
                            <tr>
                                <td className='w-80'></td>
                                <td className='text-[#4fd1c5] w-40'>PLAN</td>
                                <td className='text-[#4fd1c5] text-right w-40'>IST</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Umsatzerlöse</td>
                                <td>{formatter.format(isNaN(tempData.real_money) ? 0 : tempData.real_money)}</td>
                                <td className="text-right">{formatter.format(stock.income_from_sales)}</td>
                            </tr>
                            <tr>
                                <td>Saldo</td>
                                <td>{formatter.format(isNaN(SaldoSoll) ? 0 : parseInt(SaldoSoll))}</td>
                                <td className="text-right">{formatter.format(isNaN(parseInt(SaldoIst)) ? 0 : parseInt(SaldoIst))}</td>
                            </tr>
                            <tr>
                                <td>Höhe Kontokorrentkredit</td>
                                <td>{formatter.format(HöheKontokorrentkreditSoll)}</td>
                                <td className="text-right">{formatter.format(HöheKontokorrentkreditIst)}</td>
                            </tr>
                            <tr>
                                <td>Zinsen (Kontokorrentkredit)</td>
                                <td>{formatter.format(HöheKontokorrentkreditSoll * 0.12)}</td>
                                <td  className="text-right">{formatter.format(HöheKontokorrentkreditIst * 0.12)}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-center m-2 ">
                    <div
                        className="dark:bg-[#1f2733] flex-shrink-0 xl:w-96 w-full min-h-60 rounded-xl max-[1250px]:mx-5 drop-shadow-xl bg-white mb-5">
                        <h2 className="text-[#4fd1c5] text-center text-xl pt-5 font-bold">Plan Kontostand</h2>
                        <p className="text-center pt-2 pb-5 dark:text-white text-lg font-bold">{formatter.format(isNaN(SaldoSoll) ? (parseInt(HöheKontokorrentkreditSoll) * 0.12) : parseInt(SaldoSoll) + (parseInt(HöheKontokorrentkreditSoll) * 0.12))}</p>
                    </div>
                </div>
            </div>
        </>
    )


    return (
        <div
            className="w-full p-4 shadow-lg xl:col-span-3 dark:bg-[#1f2733] dark:text-white rounded-3xl m-2 bg-white flex justify-center snap-start "
            ref={FinanzenRef}>
            <img src="/img/projections.svg" className='h-[500px] w-0 xl:w-[500px] m-auto p-10'></img>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th className='text-[#4fd1c5]'>Finanzen</th>

                </tr>
                <tr>
                    <td className='w-80'></td>
                    <td className='text-[#4fd1c5] w-40'>PLAN</td>
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
                    <td><input className="border-2 border-[#4fd1c5] rounded-lg w-[90%] dark:bg-[#1f2733]" min="0"
                               name='take_credit' type="number" onChange={handleChange}
                               value={cycle.take_credit}></input> €
                    </td>
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
                    <td>{formatter.format(allMaschienenKosten + cycle.planned_production_1 * scenario.production_cost_per_sneaker1 + cycle.planned_production_2 * machine_2_fertigungskostenpp + cycle.planned_production_3 * machine_3_fertigungskostenpp)}</td>
                    <td>{formatter.format(allMaschienenKosten + cycle.planned_production_1 * scenario.production_cost_per_sneaker1 + cycle.planned_production_2 * machine_2_fertigungskostenpp + cycle.planned_production_3 * machine_3_fertigungskostenpp)}</td>
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
                    <td>{<input className="border-2 border-[#4fd1c5] w-[90%] rounded-lg dark:bg-[#1f2733]" min="0"
                                name='payback_credit' type="number" onChange={handleChange}
                                value={cycle.payback_credit}></input>} €
                    </td>
                    <td>{<input className="border-2 border-[#4fd1c5] w-[90%] rounded-lg dark:bg-[#1f2733]" min="0"
                                name='payback_credit' type="number" onChange={handleChange}
                                value={cycle.payback_credit}></input>} €
                    </td>
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
                    <td>{formatter.format(HöheKontokorrentkreditIst)}</td>
                </tr>
                <tr>
                    <td>Zinsen (Kontokorrentkredit)</td>
                    <td>{formatter.format(HöheKontokorrentkreditSoll * 0.12)}</td>
                    <td>{formatter.format(HöheKontokorrentkreditIst * 0.12)}</td>
                </tr>
                <tr>
                    <td>Kontostand</td>
                    <td>{formatter.format(isNaN(SaldoSoll) ? (parseInt(HöheKontokorrentkreditSoll) * 0.12) : parseInt(SaldoSoll) + (parseInt(HöheKontokorrentkreditSoll) * 0.12))}</td>
                    <td>{formatter.format(parseInt(SaldoIst) + (parseInt(HöheKontokorrentkreditIst) * 0.12))}</td>
                </tr>

                </tbody>
            </table>
        </div>
    )
}

export default Finanzen