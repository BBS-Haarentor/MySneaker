import {useState, useEffect} from "react";

const LoginPage = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (e) => {
        

    }

    return (
        <div className=" bg-gradient-to-tr from-blue-500 to-purple-600 w-screen h-screen">
            <div className="flex justify-center items-center">
                <form className="flex min-h-[80vh] w-10/12 bg-gradient-to-bl from-[#ffffff2a] to-[#ffffff91] rounded-3xl  backdrop-blur-xl" onSubmit={onSubmit}>
                    <div className="grid m-auto">
                        <input className="bg-transparent rounded-3xl border-white border-2 m-2" value={userName} onChange={(e)=> setUserName(e.target.value)} type="text" ></input>
                        <input className="bg-transparent rounded-3xl border-white border-2 m-2" value={password} onChange={(e)=> setPassword(e.target.value)} type="password"></input>
                        <input type="submit"></input>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage