import React from 'react';
import NavBarButton from './NavBarComponents/NavBarButton';
import Spacer from './NavBarComponents/Spacer';
import {useState, useEffect} from "react";

const SideNavBar = () => {
    const[state,setState] = useState("Beschaffung")
    const OnClick = (text) =>{
        console.log(text)
        setState(text)

    }

  return <div className='w-[300px] h-screen '>
      <div className='flex py-4 mx-auto justify-center '>
        <img className='max-w-[20px] max-h-[20px]' src="https://img.icons8.com/ios/50/000000/sneakers.png"/>
        <h1 className='text-black ml-2'>MySneaker</h1>
      </div>
      <Spacer></Spacer>
      <NavBarButton text="Lager" state={state} onClick={OnClick} icon="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-open-box-shipping-delivery-those-icons-lineal-those-icons.png"></NavBarButton>
      <NavBarButton text="Beschaffung" state={state} onClick={OnClick}></NavBarButton>
      <NavBarButton text="Absatz" state={state} onClick={OnClick}></NavBarButton>
      <NavBarButton text="etwas" state={state} onClick={OnClick}></NavBarButton>
      <Spacer></Spacer>
      <NavBarButton text="Login" state={state} onClick={OnClick}></NavBarButton>
  </div>;
};

export default SideNavBar;
