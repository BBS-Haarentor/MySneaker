import {ArcElement} from "chart.js";
import Chart1 from "chart.js/auto";
import {Line} from "react-chartjs-2";
import {useEffect, useState} from "react";
import API from "../../../lib/API/src/API";

Chart1.register(ArcElement);

const options = {
    scales: {},
    responsive: true,
    legend: {
        labels: {
            display: true
        }
    },
    plugins: {
        title: {
            display: false,
        },
        legend: {
            display: false
        }
    }
};

const PeriodeOverview = () => {
    const [finishedData, setFinishedData] = useState({
        stocks: [{
            "paint_count": 0,
            "research_production_modifier": 0,
            "company_id": 0,
            "finished_sneaker_count": 0,
            "machine_1_space": 0,
            "employees_count": 8,
            "machine_2_space": 0,
            "research_budget": 0,
            "machine_3_space": 0,
            "account_balance": 0,
            "insolvent": false,
            "credit_taken": 0,
            "tender_sales": 0,
            "current_cycle_index": 0,
            "real_sales": 0,
            "tender_price": 0,
            "sneaker_count": 0,
            "income_from_sales": 0
        }],
        place: 0,
    });

    useEffect(() => {
        new API(true).game.getFinishedDataForStudent().then(value => {
            console.log(value)
            if (!value.error) {
                console.log(value.data)
                setFinishedData(value.data)
            }
        });
    }, [])

    return (
        <>
            <h1 className="text-center w-full relative font-black text-3xl dark:text-white my-5">Du bist Platz {finishedData.place} geworden</h1>

            <div className="w-full block">
                <div className="flex flex-row flex-wrap justify-center w-[90%] h-full mx-auto">
                    <div
                        className="xl:w-[30%] m-5 lg:w-[75%] py-1 w-1/2 block shadow-lg rounded-xl max-sm:w-full min-h-[0rem] max-h-[25rem] dark:bg-[#1f2733]">
                        <h1 className="text-center dark:text-white font-bold text-2xl my-2">Kontostand</h1>
                        <div className="h-auto mx-auto">
                            <AccountBalanceChart finishedData={finishedData}/>
                        </div>
                    </div>
                    <div
                        className="xl:w-[30%] m-5 lg:w-[75%] py-1 w-1/2 block shadow-lg rounded-xl max-sm:w-full min-h-[0rem] max-h-[25rem] dark:bg-[#1f2733]">
                        <h1 className="text-center dark:text-white font-bold text-2xl my-2">Sneaker Produktion</h1>
                        <div className="h-auto mx-auto">
                            <SneakerProductionChart finishedData={finishedData}/>
                        </div>
                    </div>
                    <div
                        className="xl:w-[30%] m-5 lg:w-[75%] py-1 w-1/2 block shadow-lg rounded-xl max-sm:w-full min-h-[0rem] max-h-[25rem] dark:bg-[#1f2733]">
                        <h1 className="text-center dark:text-white font-bold text-2xl my-2">Forschung Budget</h1>
                        <div className="h-auto mx-auto">
                            <ResearchBudgetChart finishedData={finishedData}/>
                        </div>
                    </div>
                    <div
                        className="xl:w-[30%] m-5 lg:w-[75%] py-1 w-1/2 block shadow-lg rounded-xl max-sm:w-full min-h-[0rem] max-h-[25rem] dark:bg-[#1f2733]">
                        <h1 className="text-center dark:text-white font-bold text-2xl my-2">Mitarbeiter</h1>
                        <div className="h-auto mx-auto">
                            <EmployeesChart finishedData={finishedData}/>
                        </div>
                    </div>
                    <div
                        className="xl:w-[30%] m-5 lg:w-[75%] py-1 w-1/2 block shadow-lg rounded-xl max-sm:w-full min-h-[0rem] max-h-[25rem] dark:bg-[#1f2733]">
                        <h1 className="text-center dark:text-white font-bold text-2xl my-2">Kredit</h1>
                        <div className="h-auto mx-auto">
                            <CreditChart finishedData={finishedData}/>
                        </div>
                    </div>
                    <div
                        className="xl:w-[30%] m-5 lg:w-[75%] py-1 w-1/2 block shadow-lg rounded-xl max-sm:w-full min-h-[0rem] max-h-[25rem] dark:bg-[#1f2733]">
                        <h1 className="text-center dark:text-white font-bold text-2xl my-2">Umsatz von verkauften Sneakern</h1>
                        <div className="h-auto mx-auto">
                            <IncomeFromSalesChart finishedData={finishedData}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const AccountBalanceChart = ({finishedData}) => {
    return (
        <>
            <Line className="mx-auto w-[80%] h-auto"
                  data={{
                      labels: finishedData.stocks.map(value => value.current_cycle_index + 1),
                      datasets: [
                          {
                              label: 'In Euro',
                              data: finishedData.stocks.map(value => value.account_balance),
                              borderColor: [
                                  'rgba(54, 162, 235, 1)',
                              ],
                              borderWidth: 1,
                          },
                      ],
                  }}
                  options={options}/>
        </>
    )
}

const SneakerProductionChart = ({finishedData}) => {
    return (
        <>
            <Line className="mx-auto w-[80%] h-auto"
                  data={{
                      labels: finishedData.stocks.map(value => value.current_cycle_index + 1),
                      datasets: [
                          {
                              label: 'In Euro',
                              data: finishedData.stocks.map(value => value.finished_sneaker_count),
                              borderColor: [
                                  'rgba(54, 162, 235, 1)',
                              ],
                              borderWidth: 1,
                          },
                      ],
                  }}
                  options={options}/>
        </>
    )
}

const ResearchBudgetChart = ({finishedData}) => {
    return (
        <>
            <Line className="mx-auto w-[80%] h-auto"
                  data={{
                      labels: finishedData.stocks.map(value => value.current_cycle_index + 1),
                      datasets: [
                          {
                              label: 'In Euro',
                              data: finishedData.stocks.map(value => value.research_budget),
                              borderColor: [
                                  'rgba(54, 162, 235, 1)',
                              ],
                              borderWidth: 1,
                          },
                      ],
                  }}
                  options={options}/>
        </>
    )
}

const EmployeesChart = ({finishedData}) => {
    return (
        <>
            <Line className="mx-auto w-[80%] h-auto"
                  data={{
                      labels: finishedData.stocks.map(value => value.current_cycle_index + 1),
                      datasets: [
                          {
                              label: 'In Euro',
                              data: finishedData.stocks.map(value => value.employees_count),
                              borderColor: [
                                  'rgba(54, 162, 235, 1)',
                              ],
                              borderWidth: 1,
                          },
                      ],
                  }}
                  options={options}/>
        </>
    )
}

const CreditChart = ({finishedData}) => {
    return (
        <>
            <Line className="mx-auto w-[80%] h-auto"
                  data={{
                      labels: finishedData.stocks.map(value => value.current_cycle_index + 1),
                      datasets: [
                          {
                              label: 'In Euro',
                              data: finishedData.stocks.map(value => value.credit_taken),
                              borderColor: [
                                  'rgba(54, 162, 235, 1)',
                              ],
                              borderWidth: 1,
                          },
                      ],
                  }}
                  options={options}/>
        </>
    )
}

const IncomeFromSalesChart = ({finishedData}) => {
    return (
        <>
            <Line className="mx-auto w-[80%] h-auto"
                  data={{
                      labels: finishedData.stocks.map(value => value.current_cycle_index + 1),
                      datasets: [
                          {
                              label: 'In Euro',
                              data: finishedData.stocks.map(value => value.income_from_sales),
                              borderColor: [
                                  'rgba(54, 162, 235, 1)',
                              ],
                              borderWidth: 1,
                          },
                      ],
                  }}
                  options={options}/>
        </>
    )
}

export default PeriodeOverview;