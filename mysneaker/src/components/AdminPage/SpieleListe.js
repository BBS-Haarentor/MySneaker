import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";

const SpieleListe = () => {
    const [games, setGames] = useState([]);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))
    myHeaders.append('Access-Control-Allow-Origin', '*')
    myHeaders.append("accept", "application/json")

    const updateTeacherList = async () => {
        const requestOptions1 = {
            method: 'GET',
            headers: myHeaders,
        };
        return await fetch(process.env.REACT_APP_MY_API_URL + "/user/teacher_list", requestOptions1).then((element) => {
            if (element.status === 200) {
                return element.json().then((element1) => element1)
            }
        })
    }

    const updateGameFromTeacher = async (teacherId) => {
        const requestOptions1 = {
            method: 'GET',
            headers: myHeaders,
        };
        return await fetch(process.env.REACT_APP_MY_API_URL + "/api/v1/game/all_games_by_teacher/" + teacherId, requestOptions1).then((element) => {
            if (element.status === 200) {
                return element.json().then((element1) => element1)
            }
        })
    }

    useEffect(() => {
        updateTeacherList().then((value) => {
            let gameList = [];
            value.forEach(value1 => {
                updateGameFromTeacher(value1.id).then((value2) => {
                    value2.map(value3 => {
                        gameList.push(value3);
                        setGames([...gameList, value3])
                    })
                })
            })
        })
    }, [])

    return (
        <>
            <div className='h-screen w-screen overflow-x-hidden'>
                {games.map((element, index) => {
                    return (
                        <>
                            <div
                                className="mt-12 p-4 dark:bg-[#1f2733] dark:text-white xl:col-span-2 inline-block shadow-lg rounded-3xl m-2 bg-white overflow-y-auto justify-center relative snap-start grid-cols-1 w-96 h-128 mx-12" key={index}>
                                <div
                                    className={"h-[25px] w-[25px] absolute rounded-full" + (element.is_active ? " bg-lime-400" : " bg-red-400")}></div>
                                <div className='text-4xl text-center m-auto text-[#4fd1c5]'>
                                    <p>{element.grade_name}</p>
                                    <p className='text-2xl m-auto text-[#a3b1c2]'>Erstellt
                                        am: {("0" + new Date(element.creation_date * 1000).getDate()).slice(-2) + '.' + ("0" + (new Date(element.creation_date * 1000).getMonth() + 1)).slice(-2) + '.' + new Date(element.creation_date * 1000).getFullYear()}</p>
                                </div>
                                <div className="h-[2px] bg-white my-5 rounded"/>
                                <div className={"flex"}>
                                    <div className="w-[33%] mx-auto">
                                        {!element.is_active ?
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 className='fill-green-500 hover:fill-green-600 h-7 w-7 mx-auto'
                                                 viewBox="0 0 384 512">
                                                <path
                                                    d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
                                            </svg>
                                            :
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     className='fill-red-500 hover:fill-red-600 h-7 w-7 cursor-pointer mx-auto'
                                                     viewBox="0 0 320 512">
                                                    <path
                                                        d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/>
                                                </svg>
                                            </>
                                        }
                                    </div>
                                    <div className="w-[33%] mx-auto">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className='fill-orange-500 hover:fill-orange-600 h-7 w-7 cursor-pointer mx-auto'
                                             viewBox="0 0 640 512">
                                            <path
                                                d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z"/>
                                        </svg>
                                    </div>
                                    <div className="w-[33%] mx-auto">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className='fill-orange-500 hover:fill-orange-600 h-7 w-7 cursor-pointer mx-auto'
                                             viewBox="0 0 384 512">
                                            <path
                                                d="M128 64c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32s-14.3 32-32 32H293.3L160 416h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H90.7L224 96H160c-17.7 0-32-14.3-32-32z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </>)
                })}
            </div>
        </>
    )
}

export default SpieleListe;