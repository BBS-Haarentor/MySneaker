import React, {useEffect, useState} from 'react'
import Dashboard from '../../StudentDashboard/Dashboard';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2'
import Analytics from './Analytics';
import {useNavigate} from "react-router-dom";
import API from "../../../lib/API/src/API";

const KlasseContainer = ({
                             updateCompany,
                             select,
                             setSelect,
                             setSelectCompanie,
                             companyId,
                             game,
                             gameId,
                             updateGame,
                             companys
                         }) => {

    const [modal, setModal] = useState();
    const [selectCycleIndex, setSelectCycleIndex] = useState();
    const navigate = useNavigate();

    let changePassword = ""
    let changePasswordRepeat = ""

    const [myGame, setMyGame] = useState()

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))
    myHeaders.append('Access-Control-Allow-Origin', '*')

    useEffect(() => {
        updateGameData();
    }, [game])

    const updateGameData = () => {
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        fetch(process.env.REACT_APP_MY_API_URL + '/api/v1/game/get_by_id/' + gameId, requestOptions).then((element) => {
            if (element.status === 200) {
                element.json().then((element1) => {
                    setMyGame(element1)
                })
            }
        })
    }

    const deleteGame = () => {
        Swal.fire({
            title: 'Spiel Löschen?',
            text: "Wollen Sie wirklich das Spiel Löschen?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#7FFFD4',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ja, Löschen',
            cancelButtonText: "Nein"
        }).then((result) => {
            if (result.isConfirmed) {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))
                myHeaders.append('Access-Control-Allow-Origin', '*')

                if (myGame.is_active) {
                    var requestOptions1 = {
                        method: 'PUT',
                        headers: myHeaders
                    };

                    fetch(process.env.REACT_APP_MY_API_URL + '/api/v1/game/toggle_active/' + gameId, requestOptions1).then((element) => {
                        if (element.status === 200) {

                        }
                    }).then(() => {
                        deleteGameApiRequest(gameId)
                    });
                } else {
                    deleteGameApiRequest(gameId)
                }
            }
        });
    }

    const deleteGameApiRequest = (gameId) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))
        myHeaders.append('Access-Control-Allow-Origin', '*')

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders
        };

        fetch(process.env.REACT_APP_MY_API_URL + '/api/v1/game/delete/' + gameId, requestOptions).then((element) => {
            if (element.status === 202) {
                Swal.fire(
                    'Spiel Gelöscht!',
                    'Sie haben das Spiel Erfolgreich gelöscht',
                    'success'
                ).then(() => {
                    navigate('/dashboard');
                })
            } else {
                element.json().then((element1) => {
                    Swal.fire(
                        'Fehler!',
                        element1.user_message,
                        'error'
                    )
                })
            }
        })
    }

    const deleteUser = (companyId) => {
        Swal.fire({
            title: 'Benutzer Löschen?',
            text: "Wollen Sie es wirklich den Benutzer Löschen?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#7FFFD4',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ja, Löschen',
            cancelButtonText: "Nein"
        }).then((result) => {
            if (result.isConfirmed) {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))
                myHeaders.append('Access-Control-Allow-Origin', '*')

                var requestOptions1 = {
                    method: 'PUT',
                    headers: myHeaders
                };

                fetch(process.env.REACT_APP_MY_API_URL + '/user/toggle_active/' + companyId, requestOptions1).then((element) => {
                    if (element.status === 202) {

                    }
                }).then(() => {
                    var requestOptions = {
                        method: 'DELETE',
                        headers: myHeaders
                    };

                    fetch(process.env.REACT_APP_MY_API_URL + '/user/delete/' + companyId, requestOptions).then((element) => {
                        if (element.status === 200) {
                            updateCompany()
                            setSelectCompanie(null)
                            setSelect("main")
                            Swal.fire(
                                'Benutzer Gelöscht!',
                                'Sie haben den Benutzer Erfolgreich gelöscht',
                                'success'
                            )
                        } else {
                            element.json().then((element1) => {
                                Swal.fire(
                                    'Fehler!',
                                    element1.detail,
                                    'error'
                                )
                            })
                        }
                    })
                });
            }
        })
    }

    if (companyId !== null) {

        const changePasswordModal = async (companyId) => {
            setModal(<>
                <div className="block">
                    <div
                        className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
                        id="my-modal"
                    ></div>
                    <div
                        className="fixed text-gray-600 flex items-center justify-center overflow-auto z-50 bg-black bg-opacity-40 left-0 right-0 top-0 bottom-0">
                        <div
                            className="text-center bg-white rounded-xl shadow-2xl p-6 sm:w-8/12 mx-10 ">
                            <span className="font-bold block text-xl mb-3">Passwort ändern</span>
                            <div className='flex flex-col'>
                                <div className='my-6'>
                                    <label>Neues Passwort</label>
                                    <input type='password'
                                           className="w-[100%] p-2 border-[#4fd1c5] border-solid border-2 rounded-2xl "
                                           onChange={(e) => changePassword = e.target.value}
                                           placeholder="Neues Passwort" required/>
                                </div>
                                <div className='my-6'>
                                    <label>Neues Passwort wiederholen</label>
                                    <input type='password'
                                           className="w-[100%] p-2 border-[#4fd1c5] border-solid border-2 rounded-2xl "
                                           onChange={(e) => changePasswordRepeat = e.target.value}
                                           placeholder="Neues Passwort wiederholen" required/>
                                </div>
                                <div className='my-6'>
                                    <button
                                        className="px-4 py-2 text-sm bg-green-400 rounded-xl border transition-colors duration-150 ease-linear border-gray-200 focus:outline-none focus:ring-0 font-bold text-white hover:bg-green-500 focus:bg-green-300 focus:text-indigo"
                                        onClick={() => submitChangePassword(companyId)}>Passwort ändern
                                    </button>
                                </div>
                            </div>
                            <div className="text-right space-x-5 mt-5">
                                <button
                                    className="px-4 py-2 text-sm bg-white rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-gray-50 focus:bg-indigo-50 focus:text-indigo"
                                    onClick={() => setModal(<></>)}>Schließen
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>)
        }

        const submitChangePassword = (companyId) => {
            if (changePassword === changePasswordRepeat) {

                let raw = JSON.stringify({
                    id: companyId,
                    new_pw: changePassword
                })

                var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                };
                fetch(process.env.REACT_APP_MY_API_URL + '/user/teacher/modify/', requestOptions).then((element) => {
                    if (element.status === 202) {
                        setModal(<></>)
                        changePassword = ""
                        changePasswordRepeat = ""
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Das Passwort wurde geändert',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    } else {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Es ist ein Fehler aufgetreten',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })

            }
        }

        const menues = () => {
            switch (select) {
                case "main":
                    return (<>
                        {modal}
                        <div
                            className='p-4 xl:col-span-2 m-2 flex justify-center snap-start grid-cols-3 w-[90%]  mx-12 overflow-hidden'>

                            <button
                                className='inline-block shadow-lg rounded-3xl m-2 h-32 dark:bg-[#1f2733] dark:shadow-gray-700 dark:shadow-md bg-white w-[82%] my-12'
                                onClick={() => changePasswordModal(companyId)}>
                                Passwort ändern
                            </button>
                            <button
                                className='inline-block shadow-lg rounded-3xl m-2 h-32 bg-white dark:bg-[#1f2733] dark:shadow-gray-700 dark:shadow-md w-[82%] my-12'
                                onClick={() => {
                                    setSelect("input");
                                    menues();
                                }}>
                                Aktuelle Eingaben
                            </button>
                            <button
                                className='inline-block shadow-lg rounded-3xl m-2 h-32 bg-white dark:bg-[#1f2733] dark:shadow-gray-700 dark:shadow-md w-[82%] my-12'
                                onClick={() => deleteUser(companyId)}>
                                Benutzer Löschen
                            </button>
                        </div>
                    </>)

                case "input":
                    return (<div className="relative">
                        <button
                            className='px-4 left-0 m-4 py-2 text-sm bg-red-500 z-10 hover:bg-red-700 rounded-xl border absolute transition-colors duration-150 ease-linear border-gray-200 text-white font-bold'
                            onClick={() => {
                                setSelect("main");
                                menues();
                            }
                            }>Zurück
                        </button>
                        <Dashboard cycle_index={game.current_cycle_index} game_id={gameId} userId={companyId}/>
                    </div>)

                default:
                    break;

            }
        }

        return (menues())
    } else {

        const menues = () => {

            switch (select) {
                case "main":
                    if (myGame !== undefined) {
                        return (
                            <>
                                <div className='inline-block absolute'>
                                    {Array.from(Array(myGame.scenario_order.length)).map((e, i) => {
                                        i++;
                                        return (
                                            <p key={i}
                                               className={(myGame.current_cycle_index === (i - 1) ? 'hover:bg-gray-600 text-white hover:text-white bg-gray-500 cursor-pointer' : myGame.current_cycle_index < (i - 1) ? 'bg-slate-300 text-white cursor-not-allowed' : 'hover:bg-gray-300 bg-gray-200 cursor-pointer') + ' mr-2 inline-block p-1 w-8 text-center rounded-full'}
                                               onClick={() => {
                                                   if (myGame.current_cycle_index >= (i - 1)) {
                                                       setSelect("cycle_index");
                                                       setSelectCycleIndex((i - 1));
                                                   }
                                               }}>{i}</p>
                                        )
                                    })}
                                </div>
                                <div onClick={deleteGame} className="w-7 right inline-block float-right">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 448 512" fill="red">
                                        <path
                                            d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/>
                                    </svg>
                                </div>
                                {myGame.scenario_order.length === myGame.current_cycle_index ? <>
                                    <Leaderboard gameId={gameId} companys={companys}/>
                                </> : <>
                                    <img src="/img/teacher_empty.svg" className='h-96 w-96 m-4 mx-auto'
                                         alt="No Data"></img>
                                    <h1 className='text-[#4fd1c5] text-center w-full text-xl font-bold'>No Data</h1>
                                </>}
                            </>
                        )
                    } else {
                        return (<></>)
                    }

                case "cycle_index":
                    return (<>
                        <button
                            className='px-4 right-0 m-4 py-2 text-sm bg-red-500 hover:bg-red-700 rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-white font-bold'
                            onClick={() => setSelect("main")}>Zurück
                        </button>
                        <Analytics myHeaders={myHeaders} gameId={gameId} cycle_index={selectCycleIndex}
                                   current_cycle_index={game.current_cycle_index} updateGame={updateGame}/>
                    </>)

                default:
                    break;

            }
        }

        return (menues())
    }
}

const Leaderboard = ({gameId, companys}) => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        new API(true).game.getLeaderboard(gameId).then(value => {
            if (!value.error) {
                setLeaderboard(value.data)
            }
        })
    }, [])

    const formatter = new Intl.NumberFormat('de-de', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
    })

    if(leaderboard.length === 0) {
        return (<></>)
    }

    return (
        <>
            <div className="flex w-full h-full justify-center items-center flex-col">
                <div className="bg-[#4fd1c5] h-64 rounded-t-2xl xl:w-[50%] max-xl:w-[90%]">
                    <div className="flex flex-row flex-nowrap justify-between w-full h-full">
                        <div className="h-full flex flex-col justify-end mx-5 w-1/4">
                            <div className="h-[40%] relative justify-center w-full">
                                <div className="bg-[#bf8970] w-8 h-8 text-center absolute top-[-1rem] right-0 left-0 mx-auto rounded-full text-2xl">3</div>
                                <div className="dark:bg-[#1a202c] bg-[#f7fafc] h-[100%] rounded-t-2xl w-full b-0">
                                    <h1 className="text-center pt-5 text-xl">{leaderboard[2] !== undefined ? companys.filter(value1 => value1.id === leaderboard[2].company_id)[0].name : ""}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="h-full flex flex-col justify-end mx-5 w-1/4">
                            <div className="h-[60%] relative justify-center w-full">
                                <p className="bg-[#ffd700] text-black w-8 h-8 text-center absolute top-[-1rem] right-0 left-0 mx-auto rounded-full text-2xl">1</p>
                                <div className="dark:bg-[#1a202c] bg-[#f7fafc] h-[100%] rounded-t-2xl w-full b-0">
                                    <h1 className="text-center pt-5  text-xl">{leaderboard[0] !== undefined ? companys.filter(value1 => value1.id === leaderboard[0].company_id)[0].name : ""}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="h-full flex flex-col justify-end mx-5 w-1/4">
                            <div className="h-[50%] relative justify-center w-full">
                                <p className="bg-[#c0c0c0] w-8 h-8 text-center absolute top-[-1rem] right-0 left-0 mx-auto rounded-full text-2xl">2</p>
                                <div className="dark:bg-[#1a202c] bg-[#f7fafc] h-[100%] rounded-t-2xl w-full b-0">
                                    <h1 className="text-center pt-5 text-xl">{leaderboard[1] !== undefined ? companys.filter(value1 => value1.id === leaderboard[1].company_id)[0].name : ""}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dark:bg-[#28303c]  h-12 xl:w-[50%] max-xl:w-[90%] ">
                    <h1 className="dark:text-white text-center text-2xl my-3 font-bold">Leaderboard</h1>
                </div>
                {leaderboard.map((value, index) => {
                    return (
                        <>
                            <div
                                className="dark:bg-[#28303c] flex flex-row justify-between items-center py-4 px-5 xl:w-[50%] max-xl:w-[90%]">
                                <div className="flex flex-row justify-center">
                                    <div className="w-8 h-8 rounded-full flex bg-indigo-500">
                                        <h1 className="mx-auto text-white my-auto text-lg">{index + 1}</h1>
                                    </div>
                                    <h2 className="mt-1 px-5">{companys.filter(value1 => value1.id === value.company_id)[0].name}</h2>
                                </div>
                                <p>{formatter.format(value.account_balance)}</p>
                            </div>
                        </>
                    )
                })}
                <div className="dark:bg-[#28303c] shadow-lg h-8 rounded-b-2xl xl:w-[50%] max-xl:w-[90%]"/>
            </div>
        </>
    )
}

export default KlasseContainer