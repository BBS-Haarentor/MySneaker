import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import Swal from 'sweetalert2'
import toast, {Toaster} from 'react-hot-toast';

const TeacherList = () => {

    const [teachers, setTeachers] = useState([]);
    const [modal, setModal] = useState(<></>)

    let newTeacher = ""
    let newTeacherPassword = ""

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))
    myHeaders.append('Access-Control-Allow-Origin', '*')
    myHeaders.append("accept", "application/json")

    const updateTeacherList = () => {
        const requestOptions1 = {
            method: 'GET',
            headers: myHeaders,
        };
        fetch(process.env.REACT_APP_MY_API_URL + "/user/teacher_list", requestOptions1).then((element) => {
            if (element.status === 200) {
                element.json().then((element1) => {
                    element1.sort(function (a, b) {
                        return a.name.localeCompare(b.name);
                    })
                    setTeachers(element1)
                })
            }
        })
    }

    useEffect(() => {
        updateTeacherList();
    }, [])

    const deleteTeacher = async (id) => {
        Swal.fire({
            title: 'Lehrer Löschen?',
            text: "Wollen Sie es wirklich den Lehrer Löschen?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#7FFFD4',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ja, Löschen',
            cancelButtonText: "Nein"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))
                myHeaders.append('Access-Control-Allow-Origin', '*')

                const requestOptions = {
                    method: 'DELETE',
                    headers: myHeaders,
                };
                await fetch(process.env.REACT_APP_MY_API_URL + "/user/delete/" + id, requestOptions).then((element) => {
                    if (element.status === 202) {
                        element.json().then(() => {
                            Swal.fire(
                                'Lehrer Gelöscht!',
                                'Der Lehrer wurde erfolgreich gelöscht!',
                                'success'
                            )
                        })
                    } else if (element.status === 403) {
                        element.json().then(data => {
                            Swal.fire(
                                'Lehrer nicht Gelöscht!',
                                data.detail,
                                'error'
                            )
                        })
                    } else if(element.status === 500) {
                        Swal.fire(
                            'Lehrer nicht Gelöscht!',
                            'Beachten Sie, dass der Lehrer keine Spieler mehr haben darf!',
                            'error'
                        )
                    }
                })
                updateTeacherList()
            }
        });
    }

    const toggleTeacher = async (id) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))
        myHeaders.append('Access-Control-Allow-Origin', '*')

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
        };
        await fetch(process.env.REACT_APP_MY_API_URL + "/user/toggle_active/" + id, requestOptions).then((element) => {
            if(element.status === 202) {
                updateTeacherList()
            }
            element.json().then(value1 => {
                if (element.status !== 202) {
                    toast.error(value1.user_message,
                        {
                            className: "dark:bg-[#1a202c] bg-white dark:text-white",
                            style: {
                                borderRadius: '10px',
                            },
                        }
                    );
                } else {
                    toast.success("Lehrer wurde erfolgreich aktualisiert",
                        {
                            className: "dark:bg-[#1a202c] bg-white dark:text-white",
                            style: {
                                borderRadius: '10px',
                            },
                        }
                    );
                }
            })
        });

    }

    const createTeacherSubmit = async () => {
        const raw = JSON.stringify({
            "name": newTeacher,
            "unhashed_pw": newTeacherPassword,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch(process.env.REACT_APP_MY_API_URL + "/user/create/teacher", requestOptions).then((element) => {
            if (element.status === 201) {
                setModal(<></>)
                updateTeacherList()
                toast.success("Lehrer wurde erfolgreich Erstellt",
                    {
                        className: "dark:bg-[#1a202c] bg-white dark:text-white",
                        style: {
                            borderRadius: '10px',
                        },
                    }
                );
            } else if(element.status === 500) {
                toast.error("Es gibt einen Fehler bei der Erstellung des Lehrers!",
                    {
                        className: "dark:bg-[#1a202c] bg-white dark:text-white",
                        style: {
                            borderRadius: '10px',
                        },
                    }
                );
            } else if(element.status === 403) {
                toast.error("Bitte geben Sie ein Name und ein Passwort an!",
                    {
                        className: "dark:bg-[#1a202c] bg-white dark:text-white",
                        style: {
                            borderRadius: '10px',
                        },
                    }
                );
            } else {
                element.json().then(value => {
                    toast.error(value.user_message,
                        {
                            className: "dark:bg-[#1a202c] bg-white dark:text-white",
                            style: {
                                borderRadius: '10px',
                            },
                        }
                    );
                })
            }
        })
    }

    const createTeacher = async () => {
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
                        <span className="font-bold block text-xl mb-3">Lehrer Erstellen</span>
                        <div className='flex flex-col'>
                            <div className='my-6'>
                                <label>Lehrer Name</label>
                                <input type='text'
                                    className="w-[100%] p-2 border-[#4fd1c5] border-solid border-2 rounded-2xl "
                                    onChange={(e) => newTeacher = e.target.value} placeholder="Name" required />
                            </div>
                            <div className='my-6'>
                                <label>Passwort</label>
                                <input type='password'
                                    className="w-[100%] p-2 border-[#4fd1c5] border-solid border-2 rounded-2xl "
                                    onChange={(e) => newTeacherPassword = e.target.value} placeholder="Passwort"
                                    required />
                            </div>
                            <div className='my-6'>
                                <button
                                    className="px-4 py-2 text-sm bg-green-400 rounded-xl border transition-colors duration-150 ease-linear border-gray-200 focus:outline-none focus:ring-0 font-bold text-white hover:bg-green-500 focus:bg-green-300 focus:text-indigo"
                                    onClick={() => createTeacherSubmit()}>Lehrer Erstellen
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


    return (
        <>
            <Toaster position={"bottom-center"}/>
            {modal}
            <div className='h-screen w-full overflow-hidden'>
                <div
                    className='mt-12 p-4 xl:col-span-2 shadow-lg rounded-3xl m-2 dark:bg-[#1f2733] dark:text-white bg-white overflow-y-auto justify-center snap-start grid-cols-1 w-[90%] h-[60%] mx-12'>
                    <table className='w-full text-center'>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>Letzter Login</td>
                                <td>Aktionen</td>
                            </tr>
                            <tr className='mb-12'>
                                <td>
                                    <hr />
                                </td>
                                <td>
                                    <hr />
                                </td>
                                <td>
                                    <hr />
                                </td>
                            </tr>
                            {teachers.map(({ id, last_login, is_active, name }) => {
                                let date = new Date(last_login)
                                return (
                                    <tr>
                                        <td>{name}</td>
                                        <td>{("0" + (date.getHours())).slice(-2)}:{("0" + date.getMinutes()).slice(-2)} {("0" + date.getDate()).slice(-2)}.{("0" + (date.getMonth() + 1)).slice(-2)}.{date.getFullYear()}</td>
                                        <td>
                                            <button className='p-2' onClick={() => deleteTeacher(id)}>
                                                <svg className='fill-red-500 hover:fill-red-600 h-5 w-5'
                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path
                                                        d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                                                </svg>
                                            </button>
                                            {is_active ?
                                                <button className='p-2' onClick={() => toggleTeacher(id)}>
                                                    <svg className='fill-gray-500 hover:fill-gray-600 h-5 w-5'
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                        <path
                                                            d="M144 192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80V144C80 64.47 144.5 0 224 0C281.5 0 331 33.69 354.1 82.27C361.7 98.23 354.9 117.3 338.1 124.9C322.1 132.5 303.9 125.7 296.3 109.7C283.4 82.63 255.9 64 224 64C179.8 64 144 99.82 144 144L144 192z"
                                                        /></svg>
                                                </button> : <button className='p-2' onClick={() => toggleTeacher(id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className='fill-gray-500 hover:fill-gray-600 h-5 w-5' viewBox="0 0 448 512">
                                                        <path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z" />
                                                    </svg>
                                                </button>}

                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div
                    className='p-4 xl:col-span-2 m-2 flex justify-center snap-start grid-cols-3 w-[90%] h-[30%] mx-12 overflow-hidden'>
                    <button
                        className='inline-block dark:bg-[#1f2733] dark:text-white shadow-lg rounded-3xl m-2 h-32 bg-white w-[82%] my-12'
                        onClick={() => createTeacher()}>
                        Lehrer Hinzufügen
                    </button>
                </div>
            </div>
        </>
    )
}

export default TeacherList