import React, {useEffect, useState} from "react";
import ProductionPlan from "./charts/ProductionPlan";
import BaseContainer from '../BaseComponents/BaseContainer'
import Spacer from '../BaseComponents/Spacer'
import TextOutput from '../BaseComponents/TextOutput'

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
                    <BaseContainer title={"Verkauf letzte Periode"} >
                        <h2 className="text-center text-xl text-[#4fd1c5] font-bold mt-6">Markt</h2>
                        <TextOutput value={data.stock.real_sales} text="Stück Verkauft"></TextOutput>
                        <TextOutput value={formatter.format(data.stock.income_from_sales - (data.stock.tender_price * data.stock.tender_sales))} text="Umsatz"></TextOutput>
                        <Spacer/>
                        <h2 className="text-center text-xl text-[#4fd1c5] font-bold mt-6">Ausschreibung</h2>
                        <TextOutput value={data.stock.tender_sales} text="Stück Verkauft"></TextOutput>
                        <TextOutput value={formatter.format(data.stock.tender_price * data.stock.tender_sales)} text="Umsatz"></TextOutput>
                    </BaseContainer>
                    <BaseContainer title={"Produktions Plan"} >
                        <h2 className="text-center text-xl text-[#4fd1c5] font-bold mt-6">Umsatz</h2>
                        <TextOutput value={formatter.format((cycle.sales_planned * cycle.sales_bid))} text="Umsatz"></TextOutput>
                        <TextOutput value={formatter.format((cycle.employees_count * (500 * (data.scenario.employee_cost_modfier)) + AllMaschienenKosten + ((isNaN(tempData.sneaker_cost) ? 0 : tempData.sneaker_cost) + (isNaN(tempData.paint_cost) ? 0 : tempData.paint_cost))) + data.scenario.production_cost_per_sneaker1 * tempData.overall_production)} text="Gesamtkosten"></TextOutput>
                        <Spacer/>
                        <h2 className="text-center text-xl text-[#4fd1c5] font-bold mt-6">Gewinn</h2>
                        <TextOutput value={formatter.format((cycle.sales_planned * cycle.sales_bid) - ((cycle.employees_count * (500 * (data.scenario.employee_cost_modfier)) + AllMaschienenKosten + ((isNaN(tempData.sneaker_cost) ? 0 : tempData.sneaker_cost) + (isNaN(tempData.paint_cost) ? 0 : tempData.paint_cost))) + data.scenario.production_cost_per_sneaker1 * tempData.overall_production))} text="Gesamt Gewinn"></TextOutput>
                        <TextOutput value={formatter.format(tempData.overall_production !== 0 ? cycle.sales_bid - (((cycle.employees_count * (500 * (data.scenario.employee_cost_modfier)) + (tempData.sneaker_cost + tempData.paint_cost) + AllMaschienenKosten) / tempData.overall_production) + data.scenario.production_cost_per_sneaker1) : 0)} text="Gewinn pro Sneaker"></TextOutput>
                    </BaseContainer>
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