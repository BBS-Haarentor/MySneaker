
import SideNavBar from "./SideNavBar"
import { useState, useEffect, useRef } from "react";
import LoginPage from "./LoginPage";
import Container from "./Container";
import Cookies from "js-cookie";

const DashBoardPage = () => {
  const MarketingRef = useRef(null);
  const PersonalRef = useRef(null);
  const FinanzenRef = useRef(null);
  const LagerBeschaffungRef = useRef(null);
  const ProductionRef = useRef(null);
  const AbsatzRef = useRef(null);

  const [state, setState] = useState("Login")

  const OnClick = (text) => {
    console.log(text)
    setState(text)
    if(text==="Lager/Beschaffung"){
      LagerBeschaffungRef.current?.scrollIntoView({ behavior: 'smooth' });
    }else if(text === "Personal"){
      PersonalRef.current?.scrollIntoView({ behavior: 'smooth' });
    }else if(text === "Produktion"){
      ProductionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }else if(text === "Marketing"){
      MarketingRef.current?.scrollIntoView({ behavior: 'smooth' });
    }else if(text === "Absatz"){
      AbsatzRef.current?.scrollIntoView({ behavior: 'smooth' });
    }else if(text === "Finanzen"){
      FinanzenRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
      

  }

  if (Cookies.get("session") === undefined) {
    Cookies.set("session", [])
  }
  return (
    <div className="h-screen w-screen bg-[#f7fafc] flex" >
      <SideNavBar OnClick={OnClick} state={state} />

      {state == "Login" ? <LoginPage /> : <Container MarketingRef={MarketingRef} FinanzenRef={FinanzenRef} AbsatzRef={AbsatzRef} LagerBeschaffungRef={LagerBeschaffungRef} ProductionRef={ProductionRef} PersonalRef={PersonalRef}/>}
    </div>
  )
}

export default DashBoardPage
