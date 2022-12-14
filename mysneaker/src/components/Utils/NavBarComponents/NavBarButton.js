import React from 'react';

const NavBarButton = ({text , state, onClick}) => {
    var style =""
    var icon = ""
    var iconstyle = ""
    var textstyle = ""
    if(text === state){
          icon = "/img/" + text + "-w.png"
          style = "dark:bg-[#1f2733] bg-white shadow-md dark:shadow-gray-800";
          iconstyle = "bg-[#4fd1c5]"
          textstyle = "dark:text-white"
    }else{
         icon = "/img/" + text + ".png"
         iconstyle = "dark:bg-[#1f2733] bg-white"
         style = "dark:bg-[#1f2733] bg-[#F7FAFC]"
         textstyle = "text-[#a0aec0]"
    }


  return <button  onClick={()=>onClick(text)} className={style + ' rounded-3xl min-h-14 min-w-[220px] flex py-4 mx-auto my-5 select-none'} >
       <div className={iconstyle + " rounded-xl w-[30px] h-[30px] self-center ml-[20px] mr-3 items-center"}>
          <img src={icon} alt={text} className='max-w-[20px] max-h-[20px] mt-[5px] ml-[5px] '></img>
       </div>
      <p className={'self-center ' + textstyle} >{text}</p>
  </button>;
};

export default NavBarButton;
