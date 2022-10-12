import {Pie} from 'react-chartjs-2'
import {ArcElement} from "chart.js";
import Chart1 from "chart.js/auto";
import react, {useEffect, useState} from 'react'

Chart1.register(ArcElement);


const MarketShare = ({companys}) => {

    const [companyNames, setCompanyNames] = useState([""])
    const [companyData, setCompanyData] = useState([0])
    const [sneakerVerkauft, setSneakerVerkauft] = useState()

    useEffect(() => {
        let sneakerVerkauft = 0;
        companys.map(value => {
            sneakerVerkauft += value.real_sales
        })

        let companyName = []
        let companyDatas = []

        setCompanyNames([])
        setCompanyData([])

        companys.map(value => {
            companyName.push(value.name)
            companyDatas.push((value.real_sales / sneakerVerkauft) * 100)
        })

        setCompanyData(companyDatas)
        setCompanyNames(companyName)
    }, [companys])

    return (
        <>
            <div
                className="p-4 shadow-lg rounded-3xl m-2 bg-white dark:bg-[#1f2733] dark:text-white flex justify-center snap-start ">
                <Pie
                    data={{
                        labels: companyNames,
                        datasets: [
                            {
                                label: '# Marktanteil von Verkaufen Produkten',
                                data: companyData,
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
                    height={400}
                    width={600}
                    options={{
                        maintainAspectRatio: false,
                        scales: {},
                        legend: {
                            labels: {
                                fontSize: 10,
                            },
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: 'Marktanteile von Verkaufen Sneakern',
                            }
                        }
                    }}
                />
            </div>
        </>
    )
}

export default MarketShare;
