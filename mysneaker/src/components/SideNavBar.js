import React from 'react';
import NavBarButton from './Utils/NavBarComponents/NavBarButton';
import Spacer from './Utils/NavBarComponents/Spacer';
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
                                    document.getElementById("teacher").innerHTML = json.teacher_name
                                    document.getElementById("grade_name").innerHTML = json.grade_name
                                    document.getElementById("scenario").innerHTML = json.scenario_order[json.current_cycle_index]
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

    return <>
        <div id="drawer-example" class="fixed z-40 h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-label">
            <h5 id="drawer-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"><svg class="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>Info</h5>
            <button type="button" data-drawer-dismiss="drawer-example" aria-controls="drawer-example" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close menu</span>
            </button>
            <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">Supercharge your hiring by taking advantage of our <a href="#" class="text-blue-600 underline dark:text-blue-500 hover:no-underline">limited-time sale</a> for Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked candidates and the #1 design job board.</p>
            <div class="grid grid-cols-2 gap-4">
                <a href="#" class="px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Learn more</a>
                <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Get access <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></a>
            </div>
        </div>
        <aside className=' h-screen overflow-y-auto overflow-x-hidden min-w-[300px] '>
            <div className='absolute right-[10px] top-[10px]'>
                <button
                    id="theme-toggle"
                    type="button"
                    className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                >
                    <svg
                        id="theme-toggle-dark-icon"
                        className="w-5 h-5 hidden"
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
                        className="w-5 h-5 hidden"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            fillRule="evenodd"
                            clipRule="evenodd"
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
                        <p className='mx-12 py-2 px-2 text-[#a0aec0] inline-block'>Scenario: <span id='scenario' />    <button data-drawer-target="drawer-example" data-drawer-show="drawer-example" aria-controls="drawer-example"><svg className="w-[20px] inline-block fill-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z" /></svg></button></p>
                        <Spacer></Spacer>
                        <NavBarButton text="Lager/Beschaffung" state={state} onClick={OnClick}></NavBarButton>
                        <NavBarButton text="Personal" state={state} onClick={OnClick}></NavBarButton>
                        <NavBarButton text="Produktion" state={state} onClick={OnClick}></NavBarButton>
                        <NavBarButton text="Marketing" state={state} onClick={OnClick}></NavBarButton>
                        <NavBarButton text="Absatz" state={state} onClick={OnClick}></NavBarButton>
                        <NavBarButton text="Finanzen" state={state} onClick={OnClick}></NavBarButton>
                        <Spacer></Spacer><NavBarButton text="Logout" state={state} onClick={OnClick}></NavBarButton></>)}

        </aside>
    </>;
};

export default SideNavBar;
