import React, {useEffect, useState} from "react";
import ProductionPlan from "../charts/ProductionPlan";

const InformationContainer = ({formatter, data, cycle, tempData, AllMaschienenKosten}) => {
    const [chartData, setChartData] = useState([]);
    const [overallCosts, setOverallCosts] = useState(0);

    useEffect(() => {
        setOverallCosts(((cycle.employees_count * (data.scenario.employee_salary * (tempData.employees_cost_in_p)) + AllMaschienenKosten + ((isNaN(tempData.sneaker_cost) ? 0 : tempData.sneaker_cost) + (isNaN(tempData.paint_cost) ? 0 : tempData.paint_cost))) + data.scenario.production_cost_per_sneaker1 * tempData.overall_production) + (((data.stock.sneaker_count + (isNaN(cycle.buy_sneaker) ? 0 : cycle.buy_sneaker)) - tempData.overall_production) * 4) + ((data.stock.finished_sneaker_count + tempData.overall_production - Math.round((cycle.sales_planned + cycle.tender_offer_count)))* 8) + (((data.stock.paint_count + (isNaN(cycle.buy_paint) ? 0 : cycle.buy_paint)) - tempData.overall_production * 2)))
        setChartData([
            {
                name: "Werkstoffkosten",
                value: tempData.sneaker_cost + tempData.paint_cost
            },
            {
                name: "Fertigungskosten",
                value: data.scenario.production_cost_per_sneaker1 * tempData.overall_production
            },
            {
                name: "Maschinenkosten",
                value: AllMaschienenKosten
            },
            {
                name: "Personalkosten",
                value: cycle.employees_count * (data.scenario.employee_salary * (tempData.employees_cost_in_p))
            },
            {
                name: "Lagerkosten",
                value: (((data.stock.sneaker_count + (isNaN(cycle.buy_sneaker) ? 0 : cycle.buy_sneaker)) - tempData.overall_production) * 4) + ((data.stock.finished_sneaker_count + tempData.overall_production - Math.round((cycle.sales_planned + cycle.tender_offer_count)))* 8) + (((data.stock.paint_count + (isNaN(cycle.buy_paint) ? 0 : cycle.buy_paint)) - tempData.overall_production * 2))
            }
        ])
    }, [tempData, cycle, data])

    return (
        <>
            <div className="w-full">
                <h1 className="my-5 text-3xl w-full text-center text-[#4fd1c5] font-bold">Informationen</h1>
                <div
                    className="flex min-[620px]:justify-center space-x-4 flex-wrap">
                    <div
                        className={"dark:bg-[#1f2733] mx-2 xl:w-96 w-full min-h-60 rounded-xl drop-shadow-xl bg-white mb-5"}>
                        <h1 className="my-5 text-center text-[#4fd1c5] text-2xl font-bold">Verkauf letzte Periode</h1>
                        <h2 className="text-center text-xl text-[#4fd1c5] font-bold">Markt</h2>
                        <p className="text-lg dark:text-white text-center my-2">{data.stock.real_sales} Stück
                            Verkauft</p>
                        <p className="text-lg dark:text-white text-center my-2">{formatter.format(data.stock.income_from_sales - (data.stock.tender_price * data.stock.tender_sales))} Umsatz</p>
                        <div className="w-[90%] mx-auto dark:bg-white h-[1px] my-5 rounded-full"/>
                        <h2 className="text-center text-xl text-[#4fd1c5] font-bold">Ausschreibung</h2>
                        <p className="text-lg dark:text-white text-center my-2">{data.stock.tender_sales} Stück
                            Verkauft</p>
                        <p className="text-lg dark:text-white text-center mt-2 mb-5">{formatter.format(data.stock.tender_price * data.stock.tender_sales)} Umsatz</p>
                    </div>
                    <div
                        className={"dark:bg-[#1f2733] mx-2 xl:w-96 w-full min-h-60 rounded-xl drop-shadow-xl bg-white mb-5"}>
                        <h1 className="my-5 text-center text-[#4fd1c5] text-2xl font-bold">Produktions Plan</h1>
                        <h2 className="text-center text-xl font-medium dark:text-white mb-2">Umsatz</h2>
                        <p className="text-center text-lg font-medium dark:text-white mb-5">{formatter.format((cycle.sales_planned * cycle.sales_bid))}</p>
                        <h2 className="text-center text-xl font-medium dark:text-white mb-2">Gesamtkosten</h2>
                        <p className="text-center text-lg font-medium dark:text-white mb-5">{formatter.format(overallCosts)}</p>
                        <div className="h-[2px] rounded-full dark:bg-white bg-gray-400 w-[90%] mx-auto my-5"/>
                        <h2 className="text-center text-xl font-medium dark:text-white mb-2">Gesamt Gewinn</h2>
                        <p className="text-center text-lg font-medium dark:text-white mb-5">{formatter.format((cycle.sales_planned * cycle.sales_bid) - overallCosts)}</p>
                        <h2 className="text-center text-xl font-medium dark:text-white mb-2">Gewinn pro Sneaker</h2>
                        <p className="text-center text-lg font-medium dark:text-white mb-5">{formatter.format(tempData.overall_production !== 0 ? (cycle.sales_bid - overallCosts) / tempData.overall_production : 0)}</p>
                    </div>
                    <div
                        className={"dark:bg-[#1f2733] mx-2 xl:w-96 w-full min-h-60 rounded-xl drop-shadow-xl bg-white mb-5"}>
                        <h1 className="my-5 text-center text-[#4fd1c5] text-2xl font-bold">Plan: Kostenbereiche</h1>
                        <div className="max-h-[50vh] mx-auto">
                            <ProductionPlan list={chartData}/>
                        </div>
                        <p className="text-center text-xl font-bold my-5 dark:text-white">{formatter.format(overallCosts)}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InformationContainer;