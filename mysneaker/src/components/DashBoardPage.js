
import SideNavBar from "./SideNavBar"
import {useState, useEffect} from "react";
import LoginPage from "./LoginPage";
import Container from "./Container";

const DashBoardPage = () => {


    
     const[state,setState] = useState("Beschaffung")
     const OnClick = (text) =>{
      console.log(text)
      setState(text)

  }

    return (
        <div className="h-screen w-screen bg-[#f7fafc] flex" >
           <SideNavBar OnClick={OnClick} state={state}/>

           {state =="Login" ? <LoginPage/> : <Container/> }
        </div>
    )
}

export default DashBoardPage
