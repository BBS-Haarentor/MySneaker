import SideNavBar from "./Sidebar/SideNavBar"
import {useState, useEffect, useRef} from "react";
import LoginPage from "./Authentication/LoginPage";
import LehrerPage from "./LehrerPage/LehrerPage";
import Dashboard from "./StudentDashboard/Dashboard";
import Cookies from "js-cookie";
import AdminPage from "./AdminPage/AdminPage";
import {useNavigate} from 'react-router-dom';

const DashBoardPage = () => {
    const MarketingRef = useRef(null);
    const PersonalRef = useRef(null);
    const FinanzenRef = useRef(null);
    const LagerRef = useRef(null);
    const BeschaffungRef = useRef(null);
    const ProductionRef = useRef(null);
    const AbsatzRef = useRef(null);
    const navigate = useNavigate()
    const [refreshSidebar, setRefreshSidebar] = useState(false)

    const [state, setState] = useState((Cookies.get("session") === undefined || Cookies.get("session") === "" ? "Login" : "Beschaffung"))
    const OnClick = (text) => {
        setState(text)
        if (text === "Beschaffung") {
            BeschaffungRef.current?.scrollIntoView({behavior: 'smooth'});
        } else if (text === "Personal") {
            PersonalRef.current?.scrollIntoView({behavior: 'smooth'});
        } else if (text === "Produktion") {
            ProductionRef.current?.scrollIntoView({behavior: 'smooth'});
        } else if (text === "Marketing") {
            MarketingRef.current?.scrollIntoView({behavior: 'smooth'});
        } else if (text === "Absatz") {
            AbsatzRef.current?.scrollIntoView({behavior: 'smooth'});
        } else if (text === "Finanzen") {
            FinanzenRef.current?.scrollIntoView({behavior: 'smooth'});
        }else if (text === "Lager") {
                LagerRef.current?.scrollIntoView({behavior: 'smooth'});
        } else if (text === "Logout") {
            navigate("/logout")
        }

    }
    const [userAuth, setUserAuth] = useState({
        admin: false,
        teacher: false,
        base: false,
    })

    const handleChange = (type) => {
        setUserAuth((prev) => ({ ...prev, [type]: true }))
    }

    useEffect(() => {
        updateSidebar();
    }, [])

    const updateSidebar = () => {
        if (Cookies.get("session")) {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))
            myHeaders.append('Access-Control-Allow-Origin', '*')

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
            };
            try {
                fetch(process.env.REACT_APP_MY_API_URL + '/user/my_auth', requestOptions)
                    .then(async (element) => {
                        if (element.status === 401) {
                            navigate("/logout")
                        }
                        let body = await element.text();
                        handleChange(body.replaceAll("\"", ""))
                        setState("")
                        if(body === "\"admin\"") {
                            setState("Lehrer Liste")
                        }
                    })

            } catch (error) {
             
            }

        }
    }


    return (
        <div className="h-full w-full flex">
            <SideNavBar OnClick={OnClick} refreshSidebar={refreshSidebar} setRefreshSidebar={setRefreshSidebar} state={state}/>

            {state === "Login" ?
                <LoginPage updateSidebar={updateSidebar} setRefreshSidebar={setRefreshSidebar}/> :
                (userAuth.admin ? <AdminPage state={state} OnClick={OnClick}/> : userAuth.teacher ? <LehrerPage/> : userAuth.base ?
                    <Dashboard MarketingRef={MarketingRef} FinanzenRef={FinanzenRef} AbsatzRef={AbsatzRef}
                               BeschaffungRef={BeschaffungRef} ProductionRef={ProductionRef}
                               PersonalRef={PersonalRef} LagerRef={LagerRef}/> : <></>)}
        </div>
    )
}

export default DashBoardPage
