import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import Cookies from 'js-cookie';
import SideNavBar from './SideNavBar'

const KlassenDetailPage = () => {
  let { id } = useParams()

  const [companies, setCompanies] = useState([
    {
      name: "test"
    },
    {
      name: "test"
    },
  ])

  const [register, setRegister] = useState(false)

  const changeCompanie = (name) => {
    console.log(name)
  }


  const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    image:
      "https://www.bbs-haarentor.de/typo3conf/ext/bbs/Resources/Public/Images/bbs-haarentor-logo.png",
    dotsOptions: {
      color: "#4fd1c5",
      type: "classy-rounded"
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 20
    }
  });

  const [url, setUrl] = useState("http://window.location.hostname:3000/register/" + id);
  const [showModal, setShowModal] = useState(false)
  const ref = useRef(null);

  useEffect(() => {
    qrCode.update({
      data: url
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))
    myHeaders.append('Access-Control-Allow-Origin', '*')

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch('http://window.location.hostname:8008/api/v1/game/get_all_users_for_game/' + id, requestOptions)
      .then(async (element) => {
        let json = await element.json();

        setCompanies(json)
      })
  }, [url]);

  const toggleTurnover = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))
    myHeaders.append("Access-Control-Allow-Origin", "*")

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      mode: 'cors',
    };

    fetch('http://window.location.hostname:8008/api/v1/game/turnover/' + id, requestOptions)
      .then(async (element) => {
        return
      })

  }



  const onClickRegister = () => {
    qrCode.append(ref.current);
    setShowModal(true)
    if (!register) {
      setRegister(true)
    } else {
      setRegister(false)
    }

  }

  const disableModal = () => {
    setShowModal(false)
  }
  const OnClick = (text) => {
    if(text == "LehrerPage"){
      window.location.href = "/dashboard"
    }
      
  }

  return (
    <>
    <div className='flex'>
    <SideNavBar OnClick={OnClick}/>
      <div className={showModal ? "block" : "hidden"}>
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
        ></div>
        <div
          className="fixed text-gray-600 flex items-center justify-center overflow-auto z-50 bg-black bg-opacity-40 left-0 right-0 top-0 bottom-0">
          <div
            className="text-center bg-white rounded-xl shadow-2xl p-6 sm:w-8/12 mx-10 ">

            <span className="font-bold block text-xl mb-3">Register QRCode</span>
            <div className='flex'>
              <div className='block text-xl m-auto justify-center' ref={ref} />
            </div>
            <div className="text-right space-x-5 mt-5">
              <button onClick={disableModal} className="px-4 py-2 text-sm bg-white rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-gray-50 focus:bg-indigo-50 focus:text-indigo">Schließen</button>
            </div>
          </div>
        </div>
      </div>

      <div className='h-screen w-full overflow-hidden'>
        <div className='mt-12 p-4 xl:col-span-2 shadow-lg rounded-3xl m-2 bg-white  justify-center snap-start grid-cols-1 w-[90%] h-[60%] mx-12'>
          <img src="/img/teacher_empty.svg" className='h-96  w-96 m-4 m-auto'></img>
          <h1 className='text-[#4fd1c5] text-center w-full text-xl font-bold'>No Data</h1>
        </div>
        <div className='p-4 xl:col-span-2 m-2 flex justify-center snap-start grid-cols-3 w-[90%] h-[30%] mx-12 overflow-hidden'>
          <div className='inline-block shadow-lg rounded-3xl m-2 h-32 bg-white w-[160%] overflow-y-auto my-12'>
            <ul>
              {companies.map(({ name }) =>
                <li className='p-3 text-lg' onClick={() => changeCompanie(name)}><a>{name}</a></li>
              )}
            </ul>
          </div>
          <div className='absolute m-auto' />
          <div></div>
          <button className={'inline-block border-2 shadow-lg rounded-3xl m-2 h-32 bg-white w-[82%] my-12 '} onClick={() => onClickRegister()}>
            Register Freischalten
          </button>
          <button className='inline-block shadow-lg rounded-3xl m-2 h-32 bg-white w-[82%] my-12' onClick={() => toggleTurnover()}>
            Abschließen
          </button>

        </div>
      </div>
      </div>
    </>
  )
}

export default KlassenDetailPage