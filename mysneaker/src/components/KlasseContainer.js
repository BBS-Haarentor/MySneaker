import React, { useState } from 'react'
import KlassenDetailContainer from './KlassenDetailContainer';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2'

const KlasseContainer = ({ companyId, current_cycle_index }) => {

    const [select, setSelect] = useState("main");
    const [modal, setModal] = useState();

    let changePassword = ""
    let changePasswordRepeat = ""

    const deleteUser = () => {

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
                                    <input type='password' className="w-[100%] p-2 border-[#4fd1c5] border-solid border-2 rounded-2xl rounded" onChange={(e) => changePassword = e.target.value} placeholder="Neues Passwort" required />
                                </div>
                                <div className='my-6'>
                                    <label>Neues Passwort wiederholen</label>
                                    <input type='password' className="w-[100%] p-2 border-[#4fd1c5] border-solid border-2 rounded-2xl rounded" onChange={(e) => changePasswordRepeat = e.target.value} placeholder="Neues Passwort wiederholen" required />
                                </div>
                                <div className='my-6'>
                                    <button className="px-4 py-2 text-sm bg-green-400 rounded-xl border transition-colors duration-150 ease-linear border-gray-200 focus:outline-none focus:ring-0 font-bold text-white hover:bg-green-500 focus:bg-green-300 focus:text-indigo" onClick={() => submitChangePassword(companyId)}>Passwort ändern</button>
                                </div>
                            </div>
                            <div className="text-right space-x-5 mt-5">
                                <button className="px-4 py-2 text-sm bg-white rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-gray-50 focus:bg-indigo-50 focus:text-indigo" onClick={() => setModal(<></>)}>Schließen</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>)
        }

        const submitChangePassword = (companyId) => {
            if (changePassword === changePasswordRepeat) {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))
                myHeaders.append('Access-Control-Allow-Origin', '*')

                let raw = JSON.stringify({
                    id: companyId,
                    new_pw: changePassword
                })

                var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                };
                fetch(process.env.REACT_APP_MY_API_URL + '/user/teacher/modify', requestOptions).then((element) => {
                    if(element.status === 202) {
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
                        <div className='p-4 xl:col-span-2 m-2 flex justify-center snap-start grid-cols-3 w-[90%]  mx-12 overflow-hidden'>

                            <button className='inline-block shadow-lg rounded-3xl m-2 h-32 bg-white w-[82%] my-12' onClick={() => changePasswordModal(companyId)}>
                                Passwort ändern
                            </button>
                            <button className='inline-block shadow-lg rounded-3xl m-2 h-32 bg-white w-[82%] my-12' onClick={() => { setSelect("input"); menues(); }}>
                                Aktuelle Eingaben
                            </button>
                            <button className='inline-block shadow-lg rounded-3xl m-2 h-32 bg-white w-[82%] my-12' onClick={() => deleteUser()}>
                                Benutzer Löschen
                            </button>
                        </div>
                    </>)
                case "input":
                    return (<>
                        <button className='px-4 right-0 m-4 py-2 text-sm bg-red-500 hover:bg-red-700 rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-white font-bold' onClick={() => setSelect("main")}>Zurück</button>
                        <KlassenDetailContainer cycle_index={current_cycle_index} userId={companyId} />
                    </>)

            }
        }

        return (menues())
    } else {
        return (
            <>
                <img src="/img/teacher_empty.svg" className='h-96 w-96 m-4 mx-auto'></img>
                <h1 className='text-[#4fd1c5] text-center w-full text-xl font-bold'>No Data</h1>
            </>
        )
    }
}

export default KlasseContainer