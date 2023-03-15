import React from 'react';
import NavBarButton from './Utils/NavBarComponents/NavBarButton';
import Spacer from './Utils/NavBarComponents/Spacer';
import {useState, useEffect} from "react";
import Cookies from 'js-cookie';


const SideNavBar = ({OnClick, state, refreshSidebar}) => {
    const [token, setToken] = useState();
    const [userAuth, setUserAuth] = useState({
        admin: false,
        teacher: false,
        base: false,
    })
    const handleChange = (type) => {
        setUserAuth((prev) => ({...prev, [type]: true}))
    }
    const [logo, setLogo] = useState("https://img.icons8.com/ios/50/000000/sneakers.png")
    const [sidebarInformation, setSidebarInformation] = useState({
        teacher: "",
        grade_name: "",
        scenario: "",
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
                            handleChange(body.replaceAll("\"", ""))
                            if (body.replaceAll("\"", "") === "base") {
                                fetch(process.env.REACT_APP_MY_API_URL + '/api/v1/game/student/my_game', requestOptions).then(async (element1) => {
                                    if (element1.status === 200) {
                                        let json = await element1.json()
                                        setSidebarInformation({
                                            teacher: json.teacher_name,
                                            grade_name: json.grade_name,
                                            scenario: new TextEncoder().encode(json.scenario_order[json.current_cycle_index]) - 64,
                                        })
                                    }
                                })
                            }
                        })

                } catch
                    (error) {
                }
            }
        }, [refreshSidebar]
    )

    const [sidebarToggle, setSidebarToggle] = useState(false);

    const updateSidebarToggle = () => {
        setSidebarToggle(!sidebarToggle);
    }

    return <>
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
        <SidebarToggle isToggleSidebar={sidebarToggle} toggleSidebar={updateSidebarToggle}/>
        <aside
            className={"h-screen absolute min-w-[300px] min-[900px]:hidden dark:bg-[#171c24] bg-[#f7fafc] z-2 overflow-y-scroll overflow-x-hidden" + (sidebarToggle ? "" : " hidden")}>
            <div className='flex py-4 mx-auto justify-center'>
                <img className='max-w-[20px] max-h-[20px]' alt='Logo' src={logo}/>
                <h1 className='text-black dark:text-white ml-2 font-bold '>MySneaker</h1>
            </div>
            <SidebarContent OnClick={OnClick} state={state} token={token} userAuth={userAuth}
                            sidebarInformation={sidebarInformation}/>
        </aside>
        <aside className='h-screen overflow-y-auto overflow-x-hidden min-w-[300px] max-[900px]:hidden'>
            <div className='flex py-4 mx-auto justify-center '>
                <img className='max-w-[20px] max-h-[20px]' alt='Logo' src={logo}/>
                <h1 className='text-black dark:text-white ml-2 font-bold '>MySneaker</h1>
            </div>
            <SidebarContent OnClick={OnClick} state={state} token={token} userAuth={userAuth}
                            sidebarInformation={sidebarInformation}/>
        </aside>
    </>;
};

const SidebarContent = ({userAuth, state, OnClick, token, sidebarInformation}) => {
    return (
        <>
            {userAuth.admin ? <>
                    <Spacer/>
                    <NavBarButton text="Lehrer Liste" state={state} onClick={OnClick}></NavBarButton>
                    <NavBarButton text="Perioden Liste" state={state} onClick={OnClick}></NavBarButton>
                    <Spacer/>
                    <NavBarButton text="Logout" state={state} onClick={OnClick}></NavBarButton>
                </> :
                userAuth.teacher ? <><Spacer/> <NavBarButton text="LehrerPage" state={state}
                                                             onClick={OnClick}></NavBarButton><Spacer/>
                        <NavBarButton
                            text="Logout" state={state} onClick={OnClick}></NavBarButton></> :
                    (token === undefined ?
                        <NavBarButton text="Login" state={state} onClick={OnClick}></NavBarButton> :
                        userAuth.base ? <>
                            <Spacer></Spacer>
                            <p className='mx-12 px-2 py-2 text-[#a0aec0]'>Lehrer: {sidebarInformation.teacher}</p><br/>
                            <p className='mx-12 px-2 text-[#a0aec0]'>Klasse: {sidebarInformation.grade_name}</p><br/>
                            <p className='mx-12 py-2 px-2 text-[#a0aec0] inline-block'>Szenario: {sidebarInformation.scenario}</p>
                            <Spacer></Spacer>
                            <NavBarButton text="Lager/Beschaffung" state={state} onClick={OnClick}></NavBarButton>
                            <NavBarButton text="Personal" state={state} onClick={OnClick}></NavBarButton>
                            <NavBarButton text="Produktion" state={state} onClick={OnClick}></NavBarButton>
                            <NavBarButton text="Marketing" state={state} onClick={OnClick}></NavBarButton>
                            <NavBarButton text="Absatz" state={state} onClick={OnClick}></NavBarButton>
                            <NavBarButton text="Finanzen" state={state} onClick={OnClick}></NavBarButton>
                            <Spacer></Spacer><NavBarButton text="Logout" state={state}
                                                           onClick={OnClick}></NavBarButton></> : <></>)}
        </>
    )
}

const SidebarToggle = ({isToggleSidebar, toggleSidebar}) => {
    return (
        <>
            <div className='absolute left-[10px] top-[10px] z-10 min-[900px]:hidden'>
                <button
                    id="sidebarToggle"
                    onClick={() => toggleSidebar()}
                    type="button"
                    className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                >
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className={"w-5 h-5" + (isToggleSidebar ? " hidden" : "")}
                         fill="currentColor"
                         viewBox="0 0 448 512">
                        <path
                            d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className={"w-5 h-5" + (isToggleSidebar ? "" : " hidden")}
                         fill="currentColor"
                         viewBox="0 0 384 512">
                        <path
                            d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
                    </svg>
                </button>
            </div>
        </>
    )
}

export default SideNavBar;
