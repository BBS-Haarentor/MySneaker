import React from 'react'
import Klassen from './Klassen'

const LehrerPage = () => {
  const [data, setData] = useState([])

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
    <div>
        <h1>Lehrer Panal</h1>

        {data.map((index)=>
         <Klassen key={index}></Klassen>
        )}
        

    </div>
  )
}

export default LehrerPage