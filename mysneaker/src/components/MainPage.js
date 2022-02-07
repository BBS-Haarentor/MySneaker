import Container from "./Container"
import Lager from "./Lager"
import SideNavBar from "./SideNavBar"
import {useState, useEffect} from "react";

const MainPage = () => {
 const [data, setData] = useState({
    "0": {
        "row": [  
          1,  
          1,  
          1,
          1,
          1
        ]
      },
      "1": {
        "row": [
          1,
          0,
          0,
          3,
          1
        ]
      },
      "2": {
        "row": [
          1,  
          1,
          0,
          1,
          1
        ]
      },
      "3": {
        "row": [
          1,
          41,
          0,
          1,
          1
        ]
      },
      "4": {
        "row": [
          1,
          1,
          1,
          1,
          1
        ]
      }
    
    
     })
    return (
        <div className="h-screen w-screen bg-[#f7fafc] flex" >
           <SideNavBar></SideNavBar>
           <Container data={data}/>
        </div>
    )
}

export default MainPage
