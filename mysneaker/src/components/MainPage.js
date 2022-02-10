import Container from "./Container"
import Lager from "./Lager"
import SideNavBar from "./SideNavBar"
import {useState, useEffect} from "react";
import LoginPage from "./LoginPage";

const MainPage = () => {


    
     const[state,setState] = useState("Beschaffung")
     const OnClick = (text) =>{
      console.log(text)
      setState(text)

  }

    return (
        <div className="h-screen w-screen bg-[#f7fafc] flex" >
           <SideNavBar OnClick={OnClick} state={state}/>

           {{
              'Beschaffung':<Container/>,
              'Login':<LoginPage/>
           }[state]
           }
        </div>
    )
}

export default MainPage
