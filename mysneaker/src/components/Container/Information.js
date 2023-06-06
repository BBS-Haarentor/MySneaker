import React, {useEffect, useState} from "react";
import ProductionPlan from "./charts/ProductionPlan";

const InformationContainer = ({formatter, data, cycle, tempData, AllMaschienenKosten}) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
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
                value: cycle.employees_count * (500 * (data.scenario.employee_cost_modfier))
            }
        ])
    }, [tempData])

    return (
        <>
            <div className="w-full">
                <h1 className="my-5 text-3xl w-full text-center text-[#4fd1c5] font-bold">Informationen</h1>
                <div
                    className="flex min-[620px]:justify-center flex-wrap">
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
                        <p className="text-center text-lg font-medium dark:text-white mb-5">{formatter.format((cycle.employees_count * (500 * (data.scenario.employee_cost_modfier)) + AllMaschienenKosten + ((isNaN(tempData.sneaker_cost) ? 0 : tempData.sneaker_cost) + (isNaN(tempData.paint_cost) ? 0 : tempData.paint_cost))) + data.scenario.production_cost_per_sneaker1 * tempData.overall_production)}</p>
                        <div className="h-[2px] rounded-full dark:bg-white bg-gray-400 w-[90%] mx-auto my-5"/>
                        <h2 className="text-center text-xl font-medium dark:text-white mb-2">Gesamt Gewinn</h2>
                        <p className="text-center text-lg font-medium dark:text-white mb-5">{formatter.format((cycle.sales_planned * cycle.sales_bid) - ((cycle.employees_count * (500 * (data.scenario.employee_cost_modfier)) + AllMaschienenKosten + ((isNaN(tempData.sneaker_cost) ? 0 : tempData.sneaker_cost) + (isNaN(tempData.paint_cost) ? 0 : tempData.paint_cost))) + data.scenario.production_cost_per_sneaker1 * tempData.overall_production))}</p>
                        <h2 className="text-center text-xl font-medium dark:text-white mb-2">Gewinn pro Sneaker</h2>
                        <p className="text-center text-lg font-medium dark:text-white mb-5">{formatter.format(tempData.overall_production !== 0 ? cycle.sales_bid - (((cycle.employees_count * (500 * (data.scenario.employee_cost_modfier)) + (tempData.sneaker_cost + tempData.paint_cost) + AllMaschienenKosten) / tempData.overall_production) + data.scenario.production_cost_per_sneaker1) : 0)}</p>
                    </div>
                    <div
                        className={"dark:bg-[#1f2733] mx-2 xl:w-96 w-full min-h-60 rounded-xl drop-shadow-xl bg-white mb-5"}>
                        <h1 className="my-5 text-center text-[#4fd1c5] text-2xl font-bold">Produktions Plan Kosten</h1>
                        <div className="max-h-[50vh] mx-auto">
                            <ProductionPlan list={chartData}/>
                        </div>
                        <p className="text-center text-xl font-bold my-5 dark:text-white">{formatter.format(((isNaN(cycle.employees_count) ? 0 : cycle.employees_count) * (500 * (data.scenario.employee_cost_modfier)) + AllMaschienenKosten + ((isNaN(tempData.sneaker_cost) ? 0 : tempData.sneaker_cost) + (isNaN(tempData.paint_cost) ? 0 : tempData.paint_cost))) + data.scenario.production_cost_per_sneaker1 * tempData.overall_production)}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InformationContainer;