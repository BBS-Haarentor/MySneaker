import React, {useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import MarketShare from './charts/MarketShare'
import ExpendituresAdvertising from "./charts/ExpendituresAdvertising";
import ResearchInvest from "./charts/ResearchInvest";
import API from "../API/API";

const Analytics = ({myHeaders, gameId, cycle_index, current_cycle_index, updateGame}) => {

    const [companyInfo, setCompanyInfo] = useState([]);
    const [companyData, setCompanyData] = useState([]);
    const [turnOverSim, setTurnOverSim] = useState([])
    const [turnOverSimUser, setTurnOverSimUser] = useState([]);
    const [turnover_check, setTurnOverCheck] = useState(false);

    const formatter = new Intl.NumberFormat('de-de', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
    })

    useEffect(() => {
        new API(true).game.turnover_sim(gameId, cycle_index).then(value => {
            setTurnOverSim(value)
            return value;
        }).then((value) => {
            const list = [...turnOverSimUser]
            value.forEach(value1 => {
                new API(true).user.get_user_by_id(value1.company_id).then(value2 => value2.json().then(value3 => {
                    list.push({...value3})
                }));
            })
            setTurnOverSimUser(list)
        })
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        fetch(process.env.REACT_APP_MY_API_URL + '/api/v1/game/info/' + gameId + '/index/' + cycle_index, requestOptions).then((element) => {
            if (element.status === 200) {
                return element.json().then(element1 => {
                    setCompanyInfo(element1)
                    return element1
                });
            }
        }).then((element2) => {
            element2.forEach(element => {
                fetch('https://api.mysneaker.my-system.live/api/v1/game/teacher/summary/user/' + element.company_id + '/index/' + cycle_index, requestOptions)
                    .then(value => {
                        if (value.status === 200) {
                            value.json().then(element1 => {
                                setCompanyData([...companyData, element1])
                            });
                        }
                    })
            })
        })
    }, [])

    useEffect(() => {
        companyInfo.map((value) => {
            companyData.forEach(value1 => {
                if (value1.cycle !== null) {
                    if (value.company_id === value1.cycle.company_id) {
                        setTempCompanyData((prev) => ({...prev, [value.name]: value1}))
                    }
                }
            })
        })
    }, [companyInfo, companyData])

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
                        updateGame()
                    }
                })
            }
        })
    }

    const [tempCompanyData, setTempCompanyData] = useState(companyInfo.map(value => value.name));
    const [showTurnOverUser, setShowTurnOverUser] = useState(undefined);
    if (turnover_check) {
        if(showTurnOverUser === undefined) {
            return (
                <>
                    <h1 className="text-center pb-10 text-[#4fd1c5] text-2xl font-bold">Aktuelle Rechnung in
                        Spiel {gameId} im Cycle {cycle_index + 1}</h1>
                    <div className="flex w-full justify-center">
                        {turnOverSim.map((value, index) => {
                            const user = turnOverSimUser.filter(value1 => value.company_id === value1.id);
                            return (
                                <>
                                    <div className="w-72 dark:bg-[#28303c] mx-5 rounded-xl shadow-lg cursor-pointer"
                                         onClick={() => setShowTurnOverUser(value.company_id)}>
                                        <h1 className="text-center py-5 text-xl">{user.length === 0 ? "" : user[0].name}</h1>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </>
            )
        } else {
            const user = turnOverSimUser.filter(value1 => showTurnOverUser === value1.id);
            const turnOverUser = turnOverSim.filter(value => value.company_id === showTurnOverUser)[0];
            return (
                <>
                    <h1 className="text-2xl text-center text-[#4fd1c5] font-bold">{user.length === 0 ? "" : user[0].name}</h1>
                    <div className="flex justify-center py-5 items-center">
                        <div className="w-72 dark:bg-[#28303c] mx-5 rounded-xl shadow-lg text-center py-5">
                            <h1 className="text-center text-xl my-2 font-bold">Informationen</h1>
                            <p className="my-2">{turnOverUser.stock.sneaker_count} Sneaker Anzahl</p>
                            <p className="my-2">{turnOverUser.stock.finished_sneaker_count} Fertige Sneaker Anzahl</p>
                            <p className="my-2">{turnOverUser.stock.paint_count} Farben Anzahl</p>
                            <p className="my-2">{turnOverUser.stock.employees_count} Mitarbeiter</p>
                            <p className="my-2">{turnOverUser.stock.tender_sales === null ? "Keine" : turnOverUser.stock.tender_sales} Auschreibungssneaker</p>
                            <p className="my-2">{turnOverUser.stock.tender_price === null ? "0,00 €" : turnOverUser.stock.tender_price} Auschreibungspreis</p>
                            <p className="my-2">Ist Insolvent? {turnOverUser.stock.insolvent ? <span className="text-red-500">Ja</span>: <span className="text-green-500">Nein</span>}</p>
                        </div>
                        <div className="w-72 dark:bg-[#28303c] mx-5 rounded-xl shadow-lg text-center py-5">
                            <h1 className="text-center text-xl my-2 font-bold">Kosten/Preise</h1>
                            <p className="my-2">{formatter.format(turnOverUser.stock.research_budget)} Forschungsbudget</p>
                            <p className="my-2">{formatter.format(turnOverUser.stock.account_balance)} Kontostand</p>
                            <p className="my-2">{formatter.format(turnOverUser.stock.credit_taken)} Kredit Aufgenommen</p>
                            <p className="my-2">{turnOverUser.stock.real_sales} Sneaker Verkauft</p>
                            <p className="my-2">{formatter.format(turnOverUser.stock.income_from_sales)} Umsatz</p>
                        </div>
                        <div className="w-72 dark:bg-[#28303c] mx-5 rounded-xl shadow-lg text-center py-5">
                            <h1 className="text-center text-xl my-2 font-bold">Maschinen</h1>
                            <p className="my-2">Maschine 1: {turnOverUser.stock.machine_1_space}</p>
                            <p className="my-2">Maschine 2: {turnOverUser.stock.machine_2_space}</p>
                            <p className="my-2">Maschine 3: {turnOverUser.stock.machine_3_space}</p>
                        </div>
                    </div>
                    <h1 className="text-xl text-center text-[#4fd1c5] font-bold">Berechnungen</h1>
                    <div className="flex w-full flex-wrap justify-center">
                        {turnOverUser.ledger.map(value => {
                            return(
                                <>
                                    <div className="w-72 dark:bg-[#28303c] m-5 p-5 rounded-xl shadow-lg text-center">
                                        <h1 className="text-lg font-bold">{value.issuer}</h1>
                                        <h2 className="font-medium my-2">Anzahl: {value.amount}</h2>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </>
            )
        }
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
                        {current_cycle_index > cycle_index ? <>
                            <td>Forschung und Entwickelung</td>
                            <td>Werbung</td>
                        </> : <></>}
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
                        {current_cycle_index > cycle_index ? <>
                            <td>
                                <hr/>
                            </td>
                            <td>
                                <hr/>
                            </td>
                        </> : <></>}
                    </tr>
                    {companyInfo.map((value) => {
                        if (tempCompanyData === null) {
                            return <></>
                        }

                        return (
                            <>
                                <tr>
                                    <td>{value.name}</td>
                                    <td>{value.real_sales === null ? 0 : value.real_sales} Stk.</td>
                                    <td>{formatter.format(value.sales_bid)}</td>
                                    <td>{formatter.format(value.income_from_sales)}</td>
                                    {current_cycle_index > cycle_index ?
                                        <td>{formatter.format(tempCompanyData[value.name] !== undefined ? tempCompanyData[value.name].cycle.research_invest : 0)}</td> : <></>}
                                    {current_cycle_index > cycle_index ?
                                        <td>{formatter.format(tempCompanyData[value.name] !== undefined ? tempCompanyData[value.name].cycle.ad_invest : 0)}</td> : <></>}
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
                        <ExpendituresAdvertising current_cycle_index={cycle_index}
                                                 companys={companyInfo.filter(value => value.index === cycle_index)}
                                                 companyDataTest={tempCompanyData}/>
                        <ResearchInvest companys={companyInfo.filter(value => value.index === cycle_index)}
                                        companyDataTest={tempCompanyData}/>
                    </div>
                    <div className="flex flex-row justify-center">
                        <a className='my-6 w-1/4 mx-5 text-center bg-blue-400 font-bold text-white rounded-3xl shadow-lg p-3'
                           href={'/ler/analytic/' + gameId + '/' + cycle_index} target={"_blank"}>PDF Erzeugen
                        </a>
                        <button onClick={() => setTurnOverCheck(true)}
                                className='my-6 mx-5 text-center w-1/4 bg-orange-400 font-bold text-white rounded-3xl shadow-lg p-3'>
                            Rechnungen Überprüfen
                        </button>
                        <button className='my-6 w-1/4 mx-5 bg-red-400 text-white font-bold rounded-3xl shadow-lg p-3'
                                onClick={() => setBackGame()}>Zu dieser Periode zurückspringen
                        </button>
                    </div>
                </>
                :
                <></>
            }
        </>
    )
}

export default Analytics