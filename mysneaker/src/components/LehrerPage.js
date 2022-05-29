import React from 'react'
import Klassen from './Klassen'
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';

const LehrerPage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch('http://127.0.0.1:8008/api/v1/game/get_all_ids', requestOptions)
        .then(element => {
          return element.json();
        })
        .then(element => {
          let klasses = [];

          element.forEach(element1 => {
            fetch('http://127.0.0.1:8008/api/v1/game/get_by_id/' + element1, requestOptions)
              .then(element2 => {
                return element2.json()
              })
              .then(element => {

                klasses.push({
                  name: element.grade_name,
                  date: element.creation_date,
                  id: element1
                })
              })
          })
          return klasses;
        }).then(klasses => {
          setData(klasses)
          setLoading(false)
        })
    };
    fetchData()
  }, [])

  const derrest = () => {
    return (
      <div className='grid grid-cols-2 w-screen h-screen'>
        <div className='shadow-lg bg-white w-[90%] h-[90%] rounded-3xl my-auto mx-12'>
          {data.forEach((element) => {
            <a href={'/ler/' + element.id}>
              <div className='flex border-[#4fd1c5] border-solid border-2 rounded-2xl w-[90%] h-30 m-[5%]'>
                <div className='text-5xl self-center justify-center m-auto text-[#4fd1c5]'>
                  <p>{element.name}</p>
                  <p className='text-3xl m-auto text-[#a3b1c2]'>Erstellt am: {element.date}</p>
                </div>
              </div>
            </a>
            { console.log(element) }
            { console.log(loading) }
          })}
        </div>
        <div className='flex flex-col justify-center'>
          <button className='my-6 mx-16 bg-white rounded-3xl shadow-lg p-4'>hinzufügen</button>
          <button className=' my-6 mx-16 bg-white rounded-3xl shadow-lg p-4'>hin - - - - zufügen</button>
          <button className='my-6 mx-16 bg-white mb-2 shadow-lg rounded-3xl  p-4'>hinzufügen</button>
          <div className=' shadow-lg bg-white rounded-3xl mx-16 my-auto
          h-[50%]'>
            {data.map(({ name, date }, index) =>
              <p className=''>name</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {loading ? <p></p> : derrest()}

    </>
  )
}

export default LehrerPage