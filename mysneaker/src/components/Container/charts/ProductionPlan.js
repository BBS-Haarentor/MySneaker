import {Pie} from 'react-chartjs-2'
import {ArcElement} from "chart.js";
import Chart1 from "chart.js/auto";
import {valueOrDefault} from "chart.js/helpers";
import {useEffect} from "react";

Chart1.register(ArcElement);

const ProductionPlan = ({list}) => {
    useEffect(() => {
        console.log(list.map(value => value.value))
    }, [])
    return (
        <>
            <Pie
                className="mx-auto"
                data={{
                    labels: list.map(value => value.name),
                    datasets: [
                        {
                            label: 'Kosten in Euro',
                            data: list.map(value => value.value),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                            ],
                            borderWidth: 1,
                        },
                        // {
                        //   label: 'Quantity',
                        //   data: [47, 52, 67, 58, 9, 50],
                        //   backgroundColor: 'orange',
                        //   borderColor: 'red',
                        // },
                    ],
                }}
                options={{
                    scales: {},
                    responsive: true,
                    legend: {
                        labels: {
                            fontSize: 10,
                        },
                    },
                    plugins: {
                        title: {
                            display: false,
                        }
                    }
                }}
            />
        </>
    )
}

export default ProductionPlan;