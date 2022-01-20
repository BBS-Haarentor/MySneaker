import {useState, useEffect} from "react";

const Lager = () => {
    const [Playlists, setTasks] = useState([])
    useEffect(() => {
        const getData = async () => {
            const dataFromServer = await fetchData()
            setTasks(dataFromServer)
        }
        getData()
    }, [])

    const fetchData = async () => {
        const res = await fetch('http://127.0.0.1:8000/playlist')
        const data = await res.json()

        return data
    }
    return (
        <>
             <from className="grid grid-cols-2">
                {Playlists.map((li)=>{
                    <input type="text" >{li.name}</input>
                 }) 
                }
                <input type="submit" >Submit</input>
            </from>
        </>
    )
}
export default Lager