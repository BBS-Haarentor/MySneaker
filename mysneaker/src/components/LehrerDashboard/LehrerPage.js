import React from 'react'
import { useState, useEffect } from "react";
import { TagsInput } from "../Game2048/InputTags/index";
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';

const LehrerPage = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [createGameName, setCreateGameName] = useState("")
  const [companiesVerify, setCompaniesVerify] = useState([])
  const [selected, setSelected] = useState([]);

  const getGames = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(process.env.REACT_APP_MY_API_URL + '/api/v1/game/teacher/my_games', requestOptions)
        .then(async (element) => {
          if (element.status === 401) {
            window.location.href = "/"
          }
          let elementArray = await element.json()
          await setData(elementArray)

        }).then(() => {
          getCompaniesVerify()
        })
  }

  useEffect(() => {

    getGames();

    const interval = setInterval(() => {
      getCompaniesVerify()
      if(window.location.pathname !== "/dashboard") {
        clearInterval(interval)
      }
    }, 2000)

  }, [])

  const getCompaniesVerify = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(process.env.REACT_APP_MY_API_URL + '/api/v1/game/get_all_users_for_my_games', requestOptions).then((element) => {
      if (element.status === 200) {
        let companies = []
        element.json().then((element1) => {
          element1.forEach(element2 => {
            if (!element2.is_active) {
              companies.push(element2)
            }
          });
        }).then(() => {
          setCompaniesVerify(companies)
        })
      }
    })
  }


  const onCreateGame = () => {
    if (createGameName && selected.length > 0) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))


      const selectedMapChars = selected.map(value => {
        return String.fromCharCode(Number(value)+64)
      });

      const raw = JSON.stringify({
        "grade_name": createGameName,
        "is_active": true,
        "scenario_order": selectedMapChars.join(""),
        "signup_enabled": false
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: raw
      };

      fetch(process.env.REACT_APP_MY_API_URL + '/api/v1/game/create', requestOptions)
        .then(async (element) => {
          switch (element.status) {
            case 401:
              window.location.href = "/"
              break;
            default:
              setCreateGameName("");
              setSelected([])
              break;
          }
          getGames()
        })
    }
    setShowModal(false)
    setCreateGameName("")
  }

  const deleteUser = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))

    const requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(process.env.REACT_APP_MY_API_URL + '/user/delete/' + id, requestOptions).then((element) => {
      if (element.status === 200) {
        getCompaniesVerify();
      }
    })
  }

  const activeUser = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(process.env.REACT_APP_MY_API_URL + '/user/toggle_active/' + id, requestOptions).then(() => getCompaniesVerify())
  }


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
              className="text-center dark:bg-[#1f2733] dark:text-white bg-white rounded-xl shadow-2xl p-6 sm:w-8/12 mx-10 ">

              <span className="font-bold block text-xl mb-3">Spiel erstellen</span>
              <div className='flex flex-col'>
                <div className='my-6'>
                  <label>Spiel Name</label>
                  <input type='text' className="w-[100%] dark:text-white p-2 dark:bg-[#1f2733] dark:border-[#282d3c] border-[#4fd1c5] border-solid border-2 rounded-2xl " value={createGameName} onChange={(e) => setCreateGameName(e.target.value)} placeholder="Spiel 1" required />
                </div>
                <div className='my-6'>
                  <TagsInput
                      value={selected}
                      onChange={setSelected}
                      name="fruits"
                      classNamw="dark:text-white dark:bg-[#1f2733] dark:border-[#282d3c]"
                      placeHolder="Scenario"
                  />
                </div>
                <div className='my-6'>
                  <button onClick={onCreateGame} className="px-4 py-2 text-sm bg-green-400 rounded-xl border transition-colors duration-150 ease-linear border-gray-200 focus:outline-none focus:ring-0 font-bold text-white hover:bg-green-500 focus:bg-green-300 focus:text-indigo">Spiel erstellen</button>
                </div>
              </div>
              <div className="text-right space-x-5 mt-5">
                <button onClick={disableModal} className="px-4 dark:bg-[#1f2733] dark:text-white py-2 text-sm bg-white rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-gray-50 focus:bg-indigo-50 focus:text-indigo">Schließen</button>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 w-screen h-screen'>
          <div className='shadow-lg dark:bg-[#1f2733] dark:text-white bg-white w-[90%] h-[90%] rounded-3xl overflow-y-auto my-auto mx-12'>
            {data.map((element, index) => {
              return (
                <div key={index} onClick={() => navigate('/ler/' + element.id)}>
                  <div className='flex border-[#4fd1c5] border-solid border-2 rounded-2xl w-[90%] h-30 m-[5%]'>
                    <div className='text-5xl self-center justify-center m-auto text-[#4fd1c5]'>
                      <p>{element.grade_name}</p>
                      <p className='text-3xl m-auto text-[#a3b1c2]'>Erstellt am: {("0" + new Date(element.creation_date*1000).getDate()).slice(-2) + '.' + ("0" + (new Date(element.creation_date*1000).getMonth() + 1)).slice(-2) + '.' + new Date(element.creation_date*1000).getFullYear()}</p>
                    </div>
                  </div>
                </div>)
            })}
          </div>
          <div className='flex flex-col justify-center self-center'>
            <button className='my-6 dark:bg-[#1f2733] dark:text-white mx-16 bg-white rounded-3xl shadow-lg p-4' onClick={() => onClickRegister()}>Spiel Erstellen</button>
            <div className=' shadow-lg dark:bg-[#1f2733] dark:text-white bg-white rounded-3xl mx-16 my-auto overflow-y-auto
          h-96'>
              <table className='w-full'>
                <tbody>
                  {companiesVerify.map(({ name, grade_name, id }, index) =>
                    <>
                      <tr key={index} className='p-4 shadow-lg rounded-3xl m-auto my-3 flex justify-around dark:bg-[#28303c] dark:text-white bg-white w-[90%]'>
                        <td>{name}</td>
                        <td>{grade_name}</td>
                        <td>
                          <button className='mx-2' onClick={() => activeUser(id)}>
                            <svg className='fill-green-500 hover:fill-green-600 w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                              <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z" />
                            </svg>
                          </button>
                          <button className='mx-2' onClick={() => deleteUser(id)}>
                            <svg className='fill-red-500 hover:fill-red-600 w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                              <path d="M376.6 427.5c11.31 13.58 9.484 33.75-4.094 45.06c-5.984 4.984-13.25 7.422-20.47 7.422c-9.172 0-18.27-3.922-24.59-11.52L192 305.1l-135.4 162.5c-6.328 7.594-15.42 11.52-24.59 11.52c-7.219 0-14.48-2.438-20.47-7.422c-13.58-11.31-15.41-31.48-4.094-45.06l142.9-171.5L7.422 84.5C-3.891 70.92-2.063 50.75 11.52 39.44c13.56-11.34 33.73-9.516 45.06 4.094L192 206l135.4-162.5c11.3-13.58 31.48-15.42 45.06-4.094c13.58 11.31 15.41 31.48 4.094 45.06l-142.9 171.5L376.6 427.5z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
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