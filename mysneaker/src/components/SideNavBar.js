import React from 'react';
import NavBarButton from './NavBarComponents/NavBarButton';
import Spacer from './NavBarComponents/Spacer';
import {useState, useEffect} from "react";
import Cookies from 'js-cookie';


const SideNavBar = ({OnClick, state}) => {
    const [token, setToken] = useState();
    var [isLehe, setIsLehe] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if (Cookies.get("session")) {
            setToken(Cookies.get("session"))
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
            };
            try {
                fetch(process.env.REACT_APP_MY_API_URL + '/user/my_auth', requestOptions)
                    .then(async (element) => {
                        if (element.status === 401) {
                            window.location.href = "/logout"
                        }
                        let body = await element.text();
                        if (body.replaceAll("\"", "") === "teacher") {
                            setIsLehe(true)
                        } else if (body.replaceAll("\"", "") === "admin") {
                            setIsAdmin(true)
                        } else {
                            fetch(process.env.REACT_APP_MY_API_URL + '/api/v1/game/student/my_game', requestOptions).then(async (element1) => {
                                if (element1.status === 200) {
                                    let json = await element1.json()
                                    document.getElementById("teacher").innerHTML = json.owner_id
                                    document.getElementById("grade_name").innerHTML = json.grade_name
                                    document.getElementById("scenario").innerHTML = json.current_cycle_index
                                }
                            })
                        }
                        return
                    })

            } catch (error) {
                setIsLehe(false)
            }

        }
    }, [])

    return <div className=' h-screen overflow-y-auto overflow-x-hidden min-w-[300px] '>
        <div className='flex py-4 mx-auto justify-center '>
            <img className='max-w-[20px] max-h-[20px]' alt='Logo' src="https://img.icons8.com/ios/50/000000/sneakers.png"/>
            <h1 className='text-black ml-2 font-bold '>MySneaker</h1>
        </div>
        {isAdmin ? <>
                <Spacer/>
                <NavBarButton text="Lehrer Liste" state={state} onClick={OnClick}></NavBarButton>
                <NavBarButton text="Perioden Liste" state={state} onClick={OnClick}></NavBarButton>
                <Spacer/>
                <NavBarButton text="Logout" state={state} onClick={OnClick}></NavBarButton>
            </> :
            isLehe ? <> <NavBarButton text="LehrerPage" state={state} onClick={OnClick}></NavBarButton> <NavBarButton
                    text="Logout" state={state} onClick={OnClick}></NavBarButton></> :
                (token === undefined ? <NavBarButton text="Login" state={state} onClick={OnClick}></NavBarButton> : <>
                    <Spacer></Spacer>
                    <p className='mx-12 px-2 py-2 text-[#a0aec0]'>Lehrer: <span id='teacher'/></p><br/>
                    <p className='mx-12 px-2 text-[#a0aec0]'>Klasse: <span id='grade_name'/></p><br/>
                    <p className='mx-12 py-2 px-2 text-[#a0aec0]'>Scenario: <span id='scenario'/></p>
                    <Spacer></Spacer>
                    <NavBarButton text="Lager/Beschaffung" state={state} onClick={OnClick}></NavBarButton>
                    <NavBarButton text="Personal" state={state} onClick={OnClick}></NavBarButton>
                    <NavBarButton text="Produktion" state={state} onClick={OnClick}></NavBarButton>
                    <NavBarButton text="Marketing" state={state} onClick={OnClick}></NavBarButton>
                    <NavBarButton text="Absatz" state={state} onClick={OnClick}></NavBarButton>
                    <NavBarButton text="Finanzen" state={state} onClick={OnClick}></NavBarButton>
                    <Spacer></Spacer><NavBarButton text="Logout" state={state} onClick={OnClick}></NavBarButton></>)}

    </div>;
};

export default SideNavBar;
