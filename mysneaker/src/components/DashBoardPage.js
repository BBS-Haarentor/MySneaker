import SideNavBar from "./SideNavBar"
import {useState, useEffect, useRef} from "react";
import LoginPage from "./LoginPage";
import LehrerPage from "./LehrerPage/LehrerPage";
import Container from "./Container";
import Cookies from "js-cookie";
import AdminPage from "./AdminPage/AdminPage";

const DashBoardPage = () => {
    const MarketingRef = useRef(null);
    const PersonalRef = useRef(null);
    const FinanzenRef = useRef(null);
    const LagerBeschaffungRef = useRef(null);
    const ProductionRef = useRef(null);
    const AbsatzRef = useRef(null);

    const [state, setState] = useState((Cookies.get("session") === undefined || Cookies.get("session") === "" ? "Login" : "Lager/Beschaffung"))
    const [isAdmin, setIsAdmin] = useState(false);

    const OnClick = (text) => {
        setState(text)
        if (text === "Lager/Beschaffung") {
            LagerBeschaffungRef.current?.scrollIntoView({behavior: 'smooth'});
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
        } else if (text === "Logout") {
            window.location.href = "/logout"
        }

    }
    const [isLehe, setIsLehe] = useState(false);

    useEffect(() => {
        if (Cookies.get("session")) {
            var myHeaders = new Headers();
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
                            window.location.href = "/logout"
                        }
                        let body = await element.text();
                        if (body.replaceAll("\"", "") === "teacher") {
                            setIsLehe(true)
                        } else if (body.replaceAll("\"", "") === "admin") {
                            setIsAdmin(true)
                        }
                        return
                    })

            } catch (error) {
                setIsLehe(false)
            }

        }
    }, [])


    return (
        <div className="h-screen w-screen flex">
            <SideNavBar OnClick={OnClick} state={state}/>

            {state === "Login" ?
                <LoginPage/> :
                (isAdmin ? <AdminPage state={state} OnClick={OnClick}/> : isLehe ? <LehrerPage/> :
                    <Container MarketingRef={MarketingRef} FinanzenRef={FinanzenRef} AbsatzRef={AbsatzRef}
                               LagerBeschaffungRef={LagerBeschaffungRef} ProductionRef={ProductionRef}
                               PersonalRef={PersonalRef}/>)}
        </div>
    )
}

export default DashBoardPage
