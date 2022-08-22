import React, {useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import MarketShare from './charts/MarketShare'

const Analytics = ({myHeaders, gameId, cycle_index, current_cycle_index}) => {

    const [companyInfo, setCompanyInfo] = useState([])

    const formatter = new Intl.NumberFormat('de-de', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
    })

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        fetch(process.env.REACT_APP_MY_API_URL + '/api/v1/game/info/' + gameId + '/index/' + cycle_index, requestOptions).then((element) => {
            if (element.status === 200) {
                element.json().then(element1 => {
                    setCompanyInfo(element1)
                });
            }
        })
    }, [])

    const setBackGame = () => {
        Swal.fire({
            title: 'Möchten Sie wirklich zurück Springen?',
            text: "Wollen Sie es wirklich?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#7FFFD4',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ja, zurückspringen',
            cancelButtonText: "Nein"
        }).then((result) => {
            if (result.isConfirmed) {
                var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                };
                fetch(process.env.REACT_APP_MY_API_URL + '/api/v1/game/setback_game/' + gameId + '/index/' + cycle_index, requestOptions).then((element) => {
                    if (element.status === 202) {
                        Swal.fire(
                            'Zurück gesprungen!',
                            'Sie sind jetzt in der Periode',
                            'success'
                        )
                    }
                })

            }
        })
    }

    return (
        <>
            <div
                className='mt-12 mx-auto p-4 xl:col-span-2 shadow-lg rounded-3xl dark:bg-[#28303c] m-2 bg-white overflow-y-auto justify-center snap-start grid-cols-1 w-[90%] h-[60%] mx-12'>
                <table className='w-full text-center'>
                    <tbody>
                    <tr>
                        <td>Unternehmen</td>
                        <td>Verkauft</td>
                        <td>Preis</td>
                        <td>Umsatz</td>
                        <td>Status</td>
                    </tr>
                    <tr className='mb-12'>
                        <td>
                            <hr/>
                        </td>
                        <td>
                            <hr/>
                        </td>
                        <td>
                            <hr/>
                        </td>
                        <td>
                            <hr/>
                        </td>
                        <td>
                            <hr/>
                        </td>
                    </tr>
                    {companyInfo.map(value => {
                        return (
                            <>
                                <tr>
                                    <td>{value.name}</td>
                                    <td>{value.real_sales} Stk.</td>
                                    <td>{formatter.format(value.sales_bid)}</td>
                                    <td>{formatter.format(value.income_from_sales)}</td>
                                    <td>{value.turnover_ready ? <>
                                        <svg className='fill-green-500 hover:fill-green-600 w-6 h-6 m-auto'
                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path
                                                d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/>
                                        </svg>
                                    </> : <>
                                        <svg className='fill-red-500 hover:fill-red-600 w-6 h-6 m-auto'
                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                            <path
                                                d="M376.6 427.5c11.31 13.58 9.484 33.75-4.094 45.06c-5.984 4.984-13.25 7.422-20.47 7.422c-9.172 0-18.27-3.922-24.59-11.52L192 305.1l-135.4 162.5c-6.328 7.594-15.42 11.52-24.59 11.52c-7.219 0-14.48-2.438-20.47-7.422c-13.58-11.31-15.41-31.48-4.094-45.06l142.9-171.5L7.422 84.5C-3.891 70.92-2.063 50.75 11.52 39.44c13.56-11.34 33.73-9.516 45.06 4.094L192 206l135.4-162.5c11.3-13.58 31.48-15.42 45.06-4.094c13.58 11.31 15.41 31.48 4.094 45.06l-142.9 171.5L376.6 427.5z"/>
                                        </svg>
                                    </>}</td>
                                </tr>
                            </>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            {current_cycle_index > cycle_index ?
                <>
                    <div className='grid grid-cols-1 xl:grid-cols-3 overflow-x-hidde scrollbar my-12 w-[90%] mx-auto'>
                        <MarketShare companys={companyInfo.filter(value => value.index === cycle_index)}/>
                    </div>
                    <button className='my-6 w-[100%]  bg-red-400 text-white rounded-3xl shadow-lg p-3'
                            onClick={() => setBackGame()}>Zu dieser Periode zurückspringen
                    </button>
                </>
                :
                <></>
            }
        </>
    )
}

export default Analytics