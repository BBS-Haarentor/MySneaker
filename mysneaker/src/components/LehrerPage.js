import React from 'react'
import Klassen from './Klassen'
import {useState, useEffect} from "react";

const LehrerPage = () => {
  const [data, setData] = useState([{
    name:"testKlasse1",
    date:"1.8.22"
  },{
    name:"testKlasse2",
    date:"1.5.22"
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
    <div >
        <h1>Lehrer Panal</h1>
        <div className='flex justify-items-center items-center h-screen'>
          <div className='grid grid-cols-2 gap-4 place-items-center w-screen h-[50%]' > 
            {data.map(({name,date},index)=>
              <Klassen key={index} name={name} date={date}></Klassen>
            )}
          </div>
        </div>
    </div>
  )
}

export default LehrerPage