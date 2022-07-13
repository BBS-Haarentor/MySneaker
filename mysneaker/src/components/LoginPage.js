import { useState } from "react";
import Cookies from "js-cookie";

const LoginPage = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const [alert, setAlert] = useState('')


    const onSubmit = async (e) => {
        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append('Access-Control-Allow-Origin', '*')

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", userName);
        urlencoded.append("password", password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };


        putData(requestOptions)
    }

    if (Cookies.get("session") === undefined) {
        Cookies.set("session", [])
    }

    const putData = async (requestOptions) => {
        setAlert("")
        try {
            const res = await fetch(process.env.REACT_APP_MY_API_URL + "/user/login", requestOptions)
            const rawData = await res.json()
            if (res.status === 200) {
                Cookies.set("session", [rawData.access_token])
                window.location.href = "/dashboard"
            } else {
                setAlert(
                    <>
                        <div className="bg-red-100 border border-red-600 text-red-700 px-4 mx-11 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Login Fehlgeschlagen!</strong>
                            <span className="block sm:inline"> {rawData.detail}</span>
                        </div>
                    </>
                )
            }
        } catch (error) {
            setAlert(
                <>
                    <div className="bg-red-100 border border-red-600 text-red-700 px-4 mx-11 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Login Fehlgeschlagen!</strong>
                        <span className="block sm:inline"> Unbekannter fehler</span>
                    </div>
                </>
            )
        }
    }


    return (
        <div className="h-full w-full flex justify-center align-middle items-center">
            <div className="w-10/12 max-w-xl mr-[300px]">
                <div>
                    <h1 className="text-[#4fd1c5] text-4xl font-bold px-10 py-1">Welcome Back</h1>
                    <p className="text-[#a3b1c2] px-11 py-1 pb-10">Bitte gebe dein Benutzername und dein Passwort an, um dich Anzumelden</p>
                </div>
                <div className="" id="alert">
                    {alert}
                </div>
                <form className="" onSubmit={onSubmit}>
                    <div className="grid">
                        <p className="px-11 py-3" >Benutzername</p>
                        <input className="text-[#a3b1c2] mb-3 mx-11 p-3 border-2 rounded-3xl border-[#cbd5e0] focus:outline-none focus:border-[#4fd1c5]" value={userName} placeholder="Dein Benutzername" onChange={(e) => setUserName(e.target.value)} type="text" ></input>
                        <p className="px-11 py-3">Passwort</p>
                        <input autoComplete="password" className="text-[#a3b1c2] mb-2 mx-11 p-3 border-2 rounded-3xl border-[#cbd5e0] focus:outline-none focus:border-[#4fd1c5]" value={password} placeholder="Dein Passwort" onChange={(e) => setPassword(e.target.value)} type="password"></input>
                        <input className="bg-[#4fd1c5] p-3 mx-11 rounded-3xl mt-10 text-white" type="submit"></input>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage