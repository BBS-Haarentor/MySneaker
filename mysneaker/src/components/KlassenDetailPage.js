import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import Cookies from 'js-cookie';
import SideNavBar from './SideNavBar'
import KlassenDetailContainer from './KlassenDetailContainer';
import KlasseContainer from './KlasseContainer';

const KlassenDetailPage = () => {
  let { id } = useParams()

  const [companies, setCompanies] = useState([])

  const [register, setRegister] = useState(false)
  const [selectCompanie, setSelectCompanie] = useState(null)

  const changeCompanie = (name, id) => {
    if (!selectCompanie) {
      setSelectCompanie({
        "name": name,
        "id": id
      })
    } else {
      setSelectCompanie(null)
    }
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

  const [url, setUrl] = useState(window.location.protocol + "//" + window.location.hostname + "/register/" + id);
  const [showModal, setShowModal] = useState(false)
  const [game, setGame] = useState({
    current_cycle_index: ""
  })
  const ref = useRef(null);
  const [infoModal, setInfoModal] = useState(<></>)

  useEffect(async () => {
    qrCode.update({
      data: url
    });

    qrCode.append(ref.current);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))
    myHeaders.append('Access-Control-Allow-Origin', '*')

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    await fetch(process.env.REACT_APP_MY_API_URL + '/api/v1/game/get_all_users_for_game/' + id, requestOptions)
      .then(async (element) => {
        let json = await element.json();
        setCompanies(json)
      })

    await fetch(process.env.REACT_APP_MY_API_URL + '/api/v1/game/get_by_id/' + id, requestOptions).then(async (res) => {
      if (res.status === 200) {
        let json = await res.json();
        setGame(json)
      }
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

    fetch(process.env.REACT_APP_MY_API_URL + '/api/v1/game/turnover/' + id, requestOptions)
      .then(async (element) => {
        if (element.status === 200) {
          setInfoModal(<>
            <div className={"block"}>
              <div
                className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
                id="my-modal"
              ></div>
              <div
                className="fixed text-gray-600 flex items-center justify-center overflow-auto z-50 bg-black bg-opacity-40 left-0 right-0 top-0 bottom-0">
                <div
                  className="text-center bg-white rounded-xl shadow-2xl p-6 sm:w-8/12 mx-10 ">

                  <div class="hero container max-w-screen-lg mx-auto p-5">
                    <svg xmlns="http://www.w3.org/2000/svg"
                      id="Capa_1" x="0px" y="0px" viewBox="0 0 507.506 507.506"
                      fill="currentColor"
                      class="mx-auto h-32 text-green-400"
                      height="512">
                      <g>
                        <path d="M163.865,436.934c-14.406,0.006-28.222-5.72-38.4-15.915L9.369,304.966c-12.492-12.496-12.492-32.752,0-45.248l0,0   c12.496-12.492,32.752-12.492,45.248,0l109.248,109.248L452.889,79.942c12.496-12.492,32.752-12.492,45.248,0l0,0   c12.492,12.496,12.492,32.752,0,45.248L202.265,421.019C192.087,431.214,178.271,436.94,163.865,436.934z" />
                      </g>
                    </svg>
                  </div>
                  <span className="font-bold block text-xl mb-3">Erfolgreich</span>
                  <span className="block text-xl mb-3">Das Spiel ist jetzt in der nächsten Periode</span>
                  <div className="text-right space-x-5 mt-5">
                    <button onClick={() => setInfoModal(<></>)} className="px-4 py-2 text-sm bg-white rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-gray-50 focus:bg-indigo-50 focus:text-indigo">Schließen</button>
                  </div>
                </div>
              </div>
            </div>
          </>)
        } else {
          let json = await element.json()
          setInfoModal(<>
            <div className={"block"}>
              <div
                className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
                id="my-modal"
              ></div>
              <div
                className="fixed text-gray-600 flex items-center justify-center overflow-auto z-50 bg-black bg-opacity-40 left-0 right-0 top-0 bottom-0">
                <div
                  className="text-center bg-white rounded-xl shadow-2xl p-6 sm:w-8/12 mx-10 ">

                  <div class="hero container max-w-screen-lg mx-auto p-5">
                    <svg class="mx-auto h-32 text-red-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512"
                      height="512">
                      <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" />
                      <path d="M12,5a1,1,0,0,0-1,1v8a1,1,0,0,0,2,0V6A1,1,0,0,0,12,5Z" />
                      <rect x="11" y="17" width="2" height="2" rx="1" />
                    </svg>
                  </div>
                  <span className="font-bold block text-xl mb-3">Fehler!</span>
                  <span className="block text-xl mb-3">{json.detail}</span>
                  <div className="text-right space-x-5 mt-5">
                    <button onClick={() => setInfoModal(<></>)} className="px-4 py-2 text-sm bg-white rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-gray-50 focus:bg-indigo-50 focus:text-indigo">Schließen</button>
                  </div>
                </div>
              </div>
            </div>
          </>)
        }
        return
      })



  }



  const onClickRegister = () => {
    setShowModal(true)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))
    myHeaders.append("Access-Control-Allow-Origin", "*")

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      mode: 'cors',
    };

    fetch(process.env.REACT_APP_MY_API_URL + '/api/v1/game/activate_signup/' + id, requestOptions)
      .then(async (element) => {
        return
      })
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
    if (text == "LehrerPage") {
      window.location.href = "/dashboard"
    } else if (text == "Logout") {
      window.location.href = "/logout"
    }

  }

  return (
    <>
      <div className='flex'>
        <SideNavBar OnClick={OnClick} />
        {infoModal}
        <div className={showModal ? "block" : "hidden"}>
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
            id="my-modal"
          ></div>
          <div
            className="fixed text-gray-600 flex items-center justify-center overflow-auto z-50 bg-black bg-opacity-40 left-0 right-0 top-0 bottom-0">
            <div
              className="text-center bg-white rounded-xl shadow-2xl p-6 sm:w-8/12 mx-10 ">

              <span className="font-bold block text-xl mb-3">QR-Code</span>
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
          <div className='mt-12 p-4 xl:col-span-2 shadow-lg rounded-3xl m-2 bg-white overflow-y-auto justify-center snap-start grid-cols-1 w-[90%] h-[60%] mx-12 overflow-x-hidden'>

            <KlasseContainer companyId={selectCompanie !== null ? selectCompanie.id : null} current_cycle_index={game.current_cycle_index} />


          </div>
          <div className='p-4 xl:col-span-2 m-2 flex justify-center snap-start grid-cols-3 w-[90%] h-[30%] mx-12 overflow-hidden'>
            <div className='inline-block shadow-lg rounded-3xl m-2 h-32 bg-white w-[160%] overflow-y-auto my-12'>
              <ul>
                {companies.map(({ name, id, is_active }) => {
                  if (is_active) {
                    return (
                      <li className='p-3 shadow-lg rounded-3xl m-auto my-4 flex justify-around bg-white w-[90%]' onClick={() => changeCompanie(name, id)}><a>{name}</a></li>
                    )
                  }
                }
                )}
              </ul>
            </div>
            <div className='absolute m-auto' />
            <div></div>
            <button className={'inline-block border-2 shadow-lg rounded-3xl m-2 h-32 bg-white w-[82%] my-12 '} onClick={() => onClickRegister()}>
              QR-Code anzeigen
            </button>
            <button className='inline-block shadow-lg rounded-3xl m-2 h-32 bg-white w-[82%] my-12' onClick={() => toggleTurnover()}>
              Periode abschließen
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default KlassenDetailPage