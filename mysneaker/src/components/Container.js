import React from 'react'
import Beschaffung from './Beschaffung'
import {useState, useEffect} from "react";


const Container = () => {
    
const [data, setData] = useState({
    SneakerEinstandsPreis : 60,
    FarbenEinstandsPreis : 10,
    SneakerEinkaufMenge : 0,
    FarbenEinkaufMenge : 0,
})
useEffect(() => {
    const getData = async () => {
        const dataFromServer = await fetchData()
        setData(dataFromServer)
    }
    getData()
}, [])

const fetchData = async () => {
    const res = await fetch('http://127.0.0.1:8000/playlist')
    const data = await res.json()

    return data
}
  return (
    <Beschaffung data={data}/>
  )
}

export default Container