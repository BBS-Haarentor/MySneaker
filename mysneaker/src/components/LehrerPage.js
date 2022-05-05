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
        <div className=' border-2 border-[#4fd1c5] w-[90%] h-[90%] rounded-3xl my-auto mx-12  '>
          {data.map(({ name, date }, index) =>
              <Klassen key={index} name={name} date={date}></Klassen>
          )}
        </div>
      <div className='flex flex-col justify-center'>
        <button className='my-6 mx-16 border-2 rounded-3xl border-[#4fd1c5] p-4'>hinzufügen</button>
        <button className=' my-6 mx-16 border-2 rounded-3xl border-[#4fd1c5] p-4'>hin     zufügen</button>
        <button className='my-6 mx-16 mb-2 border-2 rounded-3xl border-[#4fd1c5] p-4'>hinzufügen</button>
        <div className=' border-2 border-[#4fd1c5]  rounded-3xl mx-16  h-60'>
          {data.map(({ name, date }, index) =>
             <p className=''>name</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default LehrerPage