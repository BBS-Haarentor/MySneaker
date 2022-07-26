import React from 'react';
import NavBarButton from './NavBarComponents/NavBarButton';
import Spacer from './NavBarComponents/Spacer';
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';


const SideNavBar = ({ OnClick, state }) => {
    const [token, setToken] = useState();
    var [isLehe, setIsLehe] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false)
    const [logo, setLogo] = useState("https://img.icons8.com/ios/50/000000/sneakers.png")

    useEffect(() => {
        if (localStorage.getItem('color-theme') === "dark") {
            setLogo("https://img.icons8.com/ios/50/ffffff/sneakers.png")
        }

        var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
        var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

        // Change the icons inside the button based on previous settings
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            themeToggleLightIcon.classList.remove('hidden');
        } else {
            themeToggleDarkIcon.classList.remove('hidden');
        }

        var themeToggleBtn = document.getElementById('theme-toggle');

        themeToggleBtn.addEventListener('click', function () {

            // toggle icons inside button
            themeToggleDarkIcon.classList.toggle('hidden');
            themeToggleLightIcon.classList.toggle('hidden');

            // if set via local storage previously
            if (localStorage.getItem('color-theme')) {
                if (localStorage.getItem('color-theme') === 'light') {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                }

                // if NOT set via local storage previously
            } else {
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                }
            }

        });

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
        <div className='absolute right-[10px] top-[10px]'>
            <button
                id="theme-toggle"
                type="button"
                class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
            >
                <svg
                    id="theme-toggle-dark-icon"
                    class="w-5 h-5 hidden"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                    ></path>
                </svg>
                <svg
                    id="theme-toggle-light-icon"
                    class="w-5 h-5 hidden"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                    ></path>
                </svg>
            </button>
        </div>
        <div className='flex py-4 mx-auto justify-center '>
            <img className='max-w-[20px] max-h-[20px]' alt='Logo' src={logo} />
            <h1 className='text-black dark:text-white ml-2 font-bold '>MySneaker</h1>
        </div>
        {isAdmin ? <>
            <Spacer />
            <NavBarButton text="Lehrer Liste" state={state} onClick={OnClick}></NavBarButton>
            <NavBarButton text="Perioden Liste" state={state} onClick={OnClick}></NavBarButton>
            <Spacer />
            <NavBarButton text="Logout" state={state} onClick={OnClick}></NavBarButton>
        </> :
            isLehe ? <><Spacer /> <NavBarButton text="LehrerPage" state={state} onClick={OnClick}></NavBarButton><Spacer /> <NavBarButton
                text="Logout" state={state} onClick={OnClick}></NavBarButton></> :
                (token === undefined ? <NavBarButton text="Login" state={state} onClick={OnClick}></NavBarButton> : <>
                    <Spacer></Spacer>
                    <p className='mx-12 px-2 py-2 text-[#a0aec0]'>Lehrer: <span id='teacher' /></p><br />
                    <p className='mx-12 px-2 text-[#a0aec0]'>Klasse: <span id='grade_name' /></p><br />
                    <p className='mx-12 py-2 px-2 text-[#a0aec0]'>Scenario: <span id='scenario' /></p>
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
