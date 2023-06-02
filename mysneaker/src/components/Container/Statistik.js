import React from 'react'

const Beschaffung = ({formatter, cycle, tempData, data, AllMaschienenKosten}) => {

    return (
        <div
            className="max-[1899px]:w-full p-4 shadow-lg dark:bg-[#1f2733] dark:text-white rounded-3xl m-2 xl:col-span-3 bg-white flex justify-center snap-start ">
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th className='text-[#4fd1c5]'>Statistik (Produktion Plan)</th>
                </tr>
                <tr>
                    <td></td>
                    <td>pro Stück</td>
                    <td>Gesamt</td>
                </tr>
                <tr>
                    <td>Umsatz</td>
                    <td>{formatter.format(cycle.sales_bid)}</td>
                    <td>{formatter.format((cycle.sales_planned * cycle.sales_bid))}</td>
                </tr>
                <tr>
                    <td>Werkstoffkosten</td>
                    <td>{formatter.format(tempData.overall_production === 0 ? 0 : (tempData.sneaker_cost + tempData.paint_cost) / tempData.overall_production)}</td>
                    <td>{formatter.format((tempData.sneaker_cost + tempData.paint_cost))}</td>
                </tr>
                <tr>
                    <td>Fertigungskosten</td>
                    <td>{formatter.format(tempData.overall_production === 0 ? 0 : data.scenario.production_cost_per_sneaker1)}</td>
                    <td>{formatter.format(data.scenario.production_cost_per_sneaker1 * tempData.overall_production)}</td>
                </tr>
                <tr>
                    <td>Maschinenkosten</td>
                    <td>{formatter.format(tempData.overall_production !== 0 ? AllMaschienenKosten / tempData.overall_production : 0)}</td>
                    <td>{formatter.format(AllMaschienenKosten)}</td>
                </tr>
                <tr>
                    <td>Personalkosten</td>
                    <td>{formatter.format(tempData.overall_production !== 0 ? cycle.employees_count * (500 * (data.scenario.employee_cost_modfier)) / tempData.overall_production : 0)}</td>
                    <td>{formatter.format(cycle.employees_count * (500 * (data.scenario.employee_cost_modfier)))}</td>
                </tr>
                <tr>
                    <td>Gesamtkosten</td>
                    <td>{formatter.format(tempData.overall_production !== 0 ? ((cycle.employees_count * (500 * (data.scenario.employee_cost_modfier)) + (tempData.sneaker_cost + tempData.paint_cost) + AllMaschienenKosten) / tempData.overall_production) + data.scenario.production_cost_per_sneaker1 : 0)}</td>
                    <td>{formatter.format((cycle.employees_count * (500 * (data.scenario.employee_cost_modfier)) + AllMaschienenKosten + (tempData.sneaker_cost + tempData.paint_cost)) + data.scenario.production_cost_per_sneaker1 * tempData.overall_production)}</td>
                </tr>
                <tr>
                    <td>Gewinn</td>
                    <td>{formatter.format(tempData.overall_production !== 0 ? cycle.sales_bid - (((cycle.employees_count * (500 * (data.scenario.employee_cost_modfier)) + (tempData.sneaker_cost + tempData.paint_cost) + AllMaschienenKosten) / tempData.overall_production) + data.scenario.production_cost_per_sneaker1) : 0)}</td>
                    <td>{formatter.format((cycle.sales_planned * cycle.sales_bid) - ((cycle.employees_count * (500 * (data.scenario.employee_cost_modfier)) + AllMaschienenKosten + (tempData.sneaker_cost + tempData.paint_cost)) + data.scenario.production_cost_per_sneaker1 * tempData.overall_production))}</td>
                </tr>
                </tbody>
            </table>
            <img alt="statistik image" src="/img/undraw_finance.svg"
                 className='h-96 w-64 xl:w-96 m-4 max-[615px]:hidden'></img>
        </div>
    )
}

export default Beschaffung