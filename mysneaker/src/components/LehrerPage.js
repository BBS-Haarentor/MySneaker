import React from 'react'
import Klassen from './Klassen'
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';

const LehrerPage = () => {
  const [data, setData] = useState([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {

    let mounted = true;


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const d1 = fetch('http://127.0.0.1:8008/api/v1/game/my_games', requestOptions)
      .then(async (element) => {
        let klasses = [];
        let elementArray = await element.json()

        if (mounted) {
          await setData(elementArray)
        }
      })


    return () => mounted = false;

  }, [])

  const onClickRegister = () => {
    setShowModal(true)
  }

  const disableModal = () => {
    setShowModal(false)
  }

  if (data) {
    return (
      <>
        <div className={showModal ? "block" : "hidden"}>
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
            id="my-modal"
          ></div>
          <div
            className="fixed text-gray-600 flex items-center justify-center overflow-auto z-50 bg-black bg-opacity-40 left-0 right-0 top-0 bottom-0">
            <div
              className="text-center bg-white rounded-xl shadow-2xl p-6 sm:w-8/12 mx-10 ">

              <span className="font-bold block text-xl mb-3">Spiel Erstellen</span>
              <div className='flex'>

              </div>
              <div className="text-right space-x-5 mt-5">
                <button onClick={disableModal} className="px-4 py-2 text-sm bg-white rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-gray-50 focus:bg-indigo-50 focus:text-indigo">Schließen</button>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 w-screen h-screen'>
          <div className='shadow-lg bg-white w-[90%] h-[90%] rounded-3xl my-auto mx-12'>
            {data.map((element, index) => {
              return (
                <a key={index} href={'/ler/' + element.id}>
                  <div className='flex border-[#4fd1c5] border-solid border-2 rounded-2xl w-[90%] h-30 m-[5%]'>
                    <div className='text-5xl self-center justify-center m-auto text-[#4fd1c5]'>
                      <p>{element.grade_name}</p>
                      <p className='text-3xl m-auto text-[#a3b1c2]'>Erstellt am: {element.creation_date}</p>
                    </div>
                  </div>
                </a>)
            })}
          </div>
          <div className='flex flex-col justify-center self-center'>
            <button className='my-6 mx-16 bg-white rounded-3xl shadow-lg p-4' onClick={() => onClickRegister()}>Spiel Erstellen</button>
            <div className=' shadow-lg bg-white rounded-3xl mx-16 my-auto
          h-96'>
              {data.map(({ name, date }, index) =>
                <p key={index} className=''>name</p>
              )}
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <></>
    );
  }
}

export default LehrerPage