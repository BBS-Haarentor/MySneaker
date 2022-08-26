import React from 'react';
import NavBarButton from './Utils/NavBarComponents/NavBarButton';
import Spacer from './Utils/NavBarComponents/Spacer';
import {useState, useEffect} from "react";
import Cookies from 'js-cookie';


const SideNavBar = ({OnClick, state}) => {
        const [token, setToken] = useState();
        var [isLehe, setIsLehe] = useState(false);
        const [isAdmin, setIsAdmin] = useState(false)
        const [infoToggle, setInfoToggle] = useState(false)
        const [logo, setLogo] = useState("https://img.icons8.com/ios/50/000000/sneakers.png")
        const [scenario, setScenario] = useState({
            "id": 4,
            "creation_date": 1661115128.466921,
            "last_edit": 1661115128.466942,
            "sneaker_price": 70,
            "paint_price": 12,
            "storage_fee_sneaker": 4,
            "storage_fee_paint": 1,
            "storage_fee_finished_sneaker": 8,
            "employee_count_modifier_temporary": 0,
            "employee_count_modifier_permanent": 0,
            "factor_interest_rate": 0.04,
            "employee_salary": 440,
            "employee_signup_bonus": 200,
            "employee_production_capacity": 10,
            "employee_cost_modfier": 0.18,
            "sneaker_ask": 1000,
            "factor_ad_take": 0.1,
            "tender_offer_count": 200,
            "machine_purchase_allowed": true,
            "machine_purchase_cost1": 12000,
            "machine_purchase_cost2": 25000,
            "machine_purchase_cost3": 45000,
            "machine_production_capacity1": 200,
            "machine_production_capacity2": 500,
            "machine_production_capacity3": 1000,
            "machine_employee_max": 10,
            "machine_maintainance_cost1": 4000,
            "machine_maintainance_cost2": 6000,
            "machine_maintainance_cost3": 8000,
            "production_cost_per_sneaker1": 60,
            "production_cost_per_sneaker2": 50,
            "production_cost_per_sneaker3": 40,
            "char": "D",
            "description": "Politik  Aufgrund gesetzlicher Neuerungen bei der Dokumentation des Bewerbungsprozesses verteuert dieser sich von 100,00 € auf 200,00 €.  Markteinschätzung  Weiterhin kann ein kräftiges Wachstum auf dem Markt für Sneaker erwartet werden, dass mittelfristig anhalten wird."
        })

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
                                                    fetch(process.env.REACT_APP_MY_API_URL + '/api/v1/scenario/get_by_char/' + json.scenario_order[json.current_cycle_index], requestOptions).then(async (element2) => {
                                                        if(element2.status === 200) {
                                                            element2.json().then((element3) => {
                                                                setScenario(element3)
                                                            })
                                                        }
                                                    });

                                                }
                                            }
                                        )
                                    }
                                    return
                                }
                            )

                    } catch
                        (error) {
                        setIsLehe(false)
                    }
                }
            }, []
        )

        return <>
            <div id="drawer-example"
                 className={"fixed z-40 h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800 " + (infoToggle ? "" : "hidden")}
                 tabIndex="-1" aria-labelledby="drawer-label">
                <h3 id="drawer-label"
                    className="inline-flex items-center mb-4 text-lg font-semibold text-gray-500 dark:text-gray-400">
                    <svg className="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"></path>
                    </svg>
                    Info
                </h3>
                <button onClick={() => setInfoToggle(false)}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"></path>
                    </svg>
                    <span className="sr-only">Close menu</span>
                </button>
                <p className="mb-6 text-md text-gray-500 dark:text-gray-400">{scenario.description}
                </p>
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
                    <img className='max-w-[20px] max-h-[20px]' alt='Logo' src={logo}/>
                    <h1 className='text-black dark:text-white ml-2 font-bold '>MySneaker</h1>
                </div>
                {isAdmin ? <>
                        <Spacer/>
                        <NavBarButton text="Lehrer Liste" state={state} onClick={OnClick}></NavBarButton>
                        <NavBarButton text="Perioden Liste" state={state} onClick={OnClick}></NavBarButton>
                        <Spacer/>
                        <NavBarButton text="Logout" state={state} onClick={OnClick}></NavBarButton>
                    </> :
                    isLehe ? <><Spacer/> <NavBarButton text="LehrerPage" state={state}
                                                       onClick={OnClick}></NavBarButton><Spacer/> <NavBarButton
                            text="Logout" state={state} onClick={OnClick}></NavBarButton></> :
                        (token === undefined ?
                            <NavBarButton text="Login" state={state} onClick={OnClick}></NavBarButton> : <>
                                <Spacer></Spacer>
                                <p className='mx-12 px-2 py-2 text-[#a0aec0]'>Lehrer: <span id='teacher'/></p><br/>
                                <p className='mx-12 px-2 text-[#a0aec0]'>Klasse: <span id='grade_name'/></p><br/>
                                <p className='mx-12 py-2 px-2 text-[#a0aec0] inline-block'>Szenario: <span id='scenario'/>
                                    <button onClick={() => setInfoToggle(true)}>
                                        <svg className="w-[20px] ml-2 inline-block fill-gray-300"
                                             xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 512 512">
                                            <path
                                                d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z"/>
                                        </svg>
                                    </button>
                                </p>
                                <Spacer></Spacer>
                                <NavBarButton text="Lager/Beschaffung" state={state} onClick={OnClick}></NavBarButton>
                                <NavBarButton text="Personal" state={state} onClick={OnClick}></NavBarButton>
                                <NavBarButton text="Produktion" state={state} onClick={OnClick}></NavBarButton>
                                <NavBarButton text="Marketing" state={state} onClick={OnClick}></NavBarButton>
                                <NavBarButton text="Absatz" state={state} onClick={OnClick}></NavBarButton>
                                <NavBarButton text="Finanzen" state={state} onClick={OnClick}></NavBarButton>
                                <Spacer></Spacer><NavBarButton text="Logout" state={state}
                                                               onClick={OnClick}></NavBarButton></>)}

            </aside>
        </>;
    }
;

export default SideNavBar;
