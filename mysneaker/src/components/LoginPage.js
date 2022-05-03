import {useState, useEffect} from "react";
import sha256 from 'crypto-js/sha256';
import Cookies from "js-cookie";

const LoginPage = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')


    const onSubmit = async (e) => {
        e.preventDefault();
        const msgUint8 = new TextEncoder().encode(password);                           // encode as (utf-8) Uint8Array
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
        const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string

        var json = {
            "username": userName,
            "hashed_password":hashHex
        }
        
        putData(json)
       

    }

    if(Cookies.get("session") === undefined){
        Cookies.set("session",[])
    }

    const putData = async (json) => {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(json)
      };
    
      /* fetch('http://localhost:8000/validate/', requestOptions) 
       .then(response => response.json())
       .then(data => setPlayFieldData(data.moves));*/
    
        const res = await fetch("localhost:8000/user/login", requestOptions)
        const rawData = await res.json()
    
    }


    return (
       <div className="h-full w-full flex justify-center align-middle items-center">
            <div className="w-10/12 max-w-xl mr-[300px]">
                <div>
                    <h1 className="text-[#4fd1c5] text-4xl font-bold px-10 py-1">Welcome Back</h1>
                    <p className="text-[#a3b1c2] px-11 py-1 pb-10">Enter your email and password to sign in</p>
                </div>
                <form className="" onSubmit={onSubmit}>
                    <div className="grid">
                        <p className="px-11 py-3" >Email</p>
                        <input className="text-[#a3b1c2] mb-3 mx-11 p-3 border-2 rounded-3xl border-[#cbd5e0] focus:outline-none focus:border-[#4fd1c5]" value={userName} placeholder="Your email adress" onChange={(e)=> setUserName(e.target.value)} type="email" ></input>
                        <p className="px-11 py-3">Password</p>
                        <input autoComplete="password" className="text-[#a3b1c2] mb-2 mx-11 p-3 border-2 rounded-3xl border-[#cbd5e0] focus:outline-none focus:border-[#4fd1c5]" value={password} placeholder="Your password"onChange={(e)=> setPassword(e.target.value)} type="password"></input>
                        <input className="bg-[#4fd1c5] p-3 mx-11 rounded-3xl mt-10 text-white" type="submit"></input>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage