import { useState } from "react";
import { useParams } from 'react-router-dom';
import SideNavBar from "../Sidebar/SideNavBar";

const RegisterPage = () => {
    let { id } = useParams()

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const [alert, setAlert] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append('Access-Control-Allow-Origin', '*')

        if (userName && password) {
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
        } else {
            setAlert(<>
                <div className="bg-red-100 border border-red-600 text-red-700 px-4 mx-11 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Regestrierung Fehlgeschlagen!</strong>
                    <span className="block sm:inline"> Grund: Bitte geben Sie Daten ein!</span>
                </div>
            </>)
        }
    }


    const putData = async (requestOptions) => {
        document.getElementById('submit').disabled = true;
        await fetch(process.env.REACT_APP_MY_API_URL + "/user/create/student", requestOptions).then(async (element) => {
            if (element.status === 201) {
                setAlert(<>
                    <div className="bg-green-100 border border-green-600 text-green-600 px-4 mx-11 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Regestrierung Erfolgreich!</strong>
                        <span className="block sm:inline"> Sie werden in 5 Sekunden zum Login weitergeleitet</span>
                    </div>
                </>)
                setTimeout(() => {
                    window.location.href = "/dashboard"
                }, 5000)
            } else {
                let json = await element.json();
                document.getElementById('submit').disabled = false;
                setAlert(<>
                    <div className="bg-red-100 border border-red-600 text-red-700 px-4 mx-11 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Regestrierung Fehlgeschlagen!</strong>
                        <span className="block sm:inline"> Grund: {json.user_message}</span>
                    </div>
                </>)
            }
        })
    }

    const OnClick = (text) => {
        if (text === "Login") {
            window.location.href = "/dashboard"
        }
    }


    return (
        <div className='h-screen w-screen dark:bg-[#1a202c] bg-[#f7fafc] flex'>
            <SideNavBar OnClick={OnClick} state={"Register"} />
            <div className="h-full w-full flex justify-center align-middle items-center">
                <div className="w-10/12 max-[900px]:mx-auto max-w-xl mr-[300px]">
                    <div>
                        <h1 className="text-[#4fd1c5] text-4xl font-bold px-10 py-1">Registrieren</h1>
                        <p className="text-[#a3b1c2] px-11 py-1 pb-10">Bitte gebe ein Benutzername und ein Passwort ein, um dich zu Registrieren</p>
                    </div>
                    <div className="" id="alert">
                        {alert}
                    </div>
                    <form className="" onSubmit={onSubmit}>
                        <div className="grid">
                            <p className="px-11 py-3 dark:text-white" >Benutzername</p>
                            <input className="text-[#a3b1c2] mb-3 mx-11 p-3 border-2 dark:bg-[#1f2733] dark:border-[#282d3c] rounded-3xl border-[#cbd5e0] focus:outline-none focus:border-[#4fd1c5]" value={userName} placeholder="Dein Benutzername" onChange={(e) => setUserName(e.target.value)} type="text" ></input>
                            <p className="px-11 py-3 dark:text-white">Passwort</p>
                            <input autoComplete="password" className="text-[#a3b1c2] dark:bg-[#1f2733] dark:border-[#282d3c] mb-2 mx-11 p-3 border-2 rounded-3xl border-[#cbd5e0] focus:outline-none focus:border-[#4fd1c5]" value={password} placeholder="Dein Passwort" onChange={(e) => setPassword(e.target.value)} type="password"></input>
                            <input className="bg-[#4fd1c5] p-3 mx-11 rounded-3xl mt-10 text-white disabled:opacity-75" id="submit" type="submit"></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage