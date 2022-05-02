
import SideNavBar from "./SideNavBar"
import {useState, useEffect} from "react";
import LoginPage from "./LoginPage";
import Container from "./Container";
import Cookies from "js-cookie";

const DashBoardPage = () => {

     const[state,setState] = useState("Login")
     const OnClick = (text) =>{
      console.log(text)
      setState(text)

  }
  
  if(Cookies.get("session") === undefined){
    Cookies.set("session",[])
  }
      return (
        <div className="h-screen w-screen bg-[#f7fafc] flex" >
           <SideNavBar OnClick={OnClick} state={state} />

           {state =="Login" ? <LoginPage/> : <Container/> }
        </div>
    )
}

export default DashBoardPage
