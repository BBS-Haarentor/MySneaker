import React from 'react';

const NavBarButton = ({text , state, onClick, icon}) => {
    var style =""
    if(text === state){
         style = "bg-white shadow-md";
    }else{
         style = "bg-[#F7FAFC]"
    }


  return <button  onClick={()=>onClick(text)} className={style + ' rounded-3xl min-h-14 min-w-[220px] flex py-4 mx-auto my-5'} >
      <img src={icon} className='max-w-[15px] max-h-[15px] self-center ml-[20px] mr-3'></img>
      <p className='self-center' >{text}</p>
  </button>;
};

export default NavBarButton;
