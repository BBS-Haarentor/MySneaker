import React from 'react'
import Klassen from './Klassen'
import { useState, useEffect } from "react";

const LehrerPage = () => {
  const [data, setData] = useState([{
    name: "testKlasse1",
    date: "1.8.22"
  }, {
    name: "testKlasse2",
    date: "1.5.22"
  }])

  useEffect(() => {
    const getData = async () => {
      //const dataFromServer = await fetchData()
      //setData(dataFromServer)
    }
    getData()

  }, [])

  const fetchData = async () => {
    const res = await fetch('http://127.0.0.1:8000/playlist')
    var data = await res.json()


    return data

  }
  console.log(data)
  return (
    <div className='grid grid-cols-2 w-screen h-screen'>
        <div className=' shadow-lg bg-white w-[90%] h-[90%] rounded-3xl my-auto mx-12  '>
          {data.map(({ name, date }, index) =>
              <Klassen key={index} name={name} date={date}></Klassen>
          )}
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

export default LehrerPage