import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Cookies from "js-cookie";

const RegisterPage = () => {
    let { id } = useParams()

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')


    const onSubmit = async (e) => {
        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                name: userName,
                unhashed_pw: password,
                is_active: false,
                game_id: id
            }),
            redirect: 'follow'
        };


        putData(requestOptions)
    }


    const putData = async (requestOptions) => {

        const res = await fetch("http://127.0.0.1:8008/user/create/student", requestOptions).then(async (element) => {
            if (element.status === 201) {
                await fetch("http://127.0.0.1:8008/user/login", requestOptions).then(async (element2) => {
                    const rawData2 = await element2.json()
                    console.log(rawData2)
                    Cookies.set("session", [rawData2.access_token])
                    window.location.href = "http://localhost:3000/dashboard"
                })
            }
        })
    }


    return (
        <div className="h-full w-full flex justify-center align-middle items-center">
            <div className="w-10/12 max-w-xl mr-[300px]">
                <div>
                    <h1 className="text-[#4fd1c5] text-4xl font-bold px-10 py-1">Register</h1>
                    <p className="text-[#a3b1c2] px-11 py-1 pb-10">Enter your Username and password to sign in</p>
                </div>
                <form className="" onSubmit={onSubmit}>
                    <div className="grid">
                        <p className="px-11 py-3" >Email</p>
                        <input className="text-[#a3b1c2] mb-3 mx-11 p-3 border-2 rounded-3xl border-[#cbd5e0] focus:outline-none focus:border-[#4fd1c5]" value={userName} placeholder="Your email adress" onChange={(e) => setUserName(e.target.value)} type="text" ></input>
                        <p className="px-11 py-3">Password</p>
                        <input autoComplete="password" className="text-[#a3b1c2] mb-2 mx-11 p-3 border-2 rounded-3xl border-[#cbd5e0] focus:outline-none focus:border-[#4fd1c5]" value={password} placeholder="Your password" onChange={(e) => setPassword(e.target.value)} type="password"></input>
                        <input className="bg-[#4fd1c5] p-3 mx-11 rounded-3xl mt-10 text-white" type="submit"></input>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage