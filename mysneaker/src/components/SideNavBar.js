import React from 'react';
import NavBarButton from './NavBarComponents/NavBarButton';
import Spacer from './NavBarComponents/Spacer';
import {useState, useEffect} from "react";


const SideNavBar = ({OnClick , state}) => {
const [token, setToken] = useState("test");


  return <div className=' h-screen min-w-[300px] '>
        <div className='flex py-4 mx-auto justify-center '>
          <img className='max-w-[20px] max-h-[20px]' src="https://img.icons8.com/ios/50/000000/sneakers.png"/>
          <h1 className='text-black ml-2 font-bold '>MySneaker</h1>
        </div>
        {token === undefined ?  <NavBarButton text="Login" state={state} onClick={OnClick}></NavBarButton> : <> <Spacer></Spacer>
        <NavBarButton text="Lager" state={state} onClick={OnClick} ></NavBarButton>
        <NavBarButton text="Beschaffung" state={state} onClick={OnClick}></NavBarButton>
        <NavBarButton text="Absatz" state={state} onClick={OnClick}></NavBarButton>
        <NavBarButton text="Produktion" state={state} onClick={OnClick}></NavBarButton>
        <NavBarButton text="Personal" state={state} onClick={OnClick}></NavBarButton>
        <NavBarButton text="Marketing" state={state} onClick={OnClick}></NavBarButton>
        <NavBarButton text="Finanzen" state={state} onClick={OnClick}></NavBarButton>
        <Spacer></Spacer><NavBarButton text="Logout" state={state} onClick={OnClick}></NavBarButton></> }
        
    </div>;
};

export default SideNavBar;
