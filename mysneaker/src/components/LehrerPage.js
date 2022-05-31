import React from 'react'
import Klassen from './Klassen'
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';

const LehrerPage = () => {
  const [data, setData] = useState([])

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

    const d1 = fetch('http://127.0.0.1:8008/api/v1/game/get_all_ids', requestOptions)
      .then(async (element) => {
        let klasses = [];
        let elementArray = await element.json()


        await elementArray.forEach(element1 => {
          const d = fetch('http://127.0.0.1:8008/api/v1/game/get_by_id/' + element1, requestOptions)
            .then(element3 => {
              return element3.json()
            })

            d.then((d1) => {
              console.log(d1)
              klasses.push({
                name: d1.grade_name,
                date: d1.creation_date,
                id: element1
              })
            })
        })



        if(mounted){
          await setData(klasses)
        }
      })
   

    return () => mounted = false;

  }, [])

  if (data) {
    return (
      <div className='grid grid-cols-2 w-screen h-screen'>
        <div className='shadow-lg bg-white w-[90%] h-[90%] rounded-3xl my-auto mx-12'>
          {console.log(data)}
          {data.map((d6, index) => {
            console.log(d6)
            return (
              <a key={index} href={'/ler/' + d6.id}>
                <div className='flex border-[#4fd1c5] border-solid border-2 rounded-2xl w-[90%] h-30 m-[5%]'>
                  <div className='text-5xl self-center justify-center m-auto text-[#4fd1c5]'>
                    <p>{d6.name}</p>
                    <p className='text-3xl m-auto text-[#a3b1c2]'>Erstellt am: {d6.date}</p>
                  </div>
                </div>
              </a>)

          })}
        </div>
        <div className='flex flex-col justify-center'>
          <button className='my-6 mx-16 bg-white rounded-3xl shadow-lg p-4'>hinzufügen</button>
          <button className=' my-6 mx-16 bg-white rounded-3xl shadow-lg p-4'>hin - - - - zufügen</button>
          <button className='my-6 mx-16 bg-white mb-2 shadow-lg rounded-3xl  p-4'>hinzufügen</button>
          <div className=' shadow-lg bg-white rounded-3xl mx-16 my-auto
          h-[50%]'>
            {data.map(({ name, date }, index) =>
              <p key={index} className=''>name</p>
            )}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <></>
    );
  }
}

export default LehrerPage