import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import GameModal from "./Utils/Modal/GameModal";

const MainPage = () => {
    const navigate = useNavigate()
    const [gameActive, setGameActive] = useState(false)

    const toggleGame = () => {
        setGameActive(!gameActive)
    }

    return (
        <div className='flex  items-center w-screen h-screen relative' onDoubleClick={() => setGameActive(!gameActive)}>
            <GameModal isHidden={!gameActive} toggleHidden={toggleGame}/>
            <div className='h-fit w-fit m-auto'>
                <h1 className='text-[#4fd1c5] text-[100px] max-[514px]:text-[75px] max-[382px]:text-[50px]'>MySneaker</h1>
                <a className='p-4 dark:shadow-gray-600 dark:shadow-md dark:bg-[#4fd1c5] dark:text-white shadow-lg rounded-3xl text-xl text-neutral-600 m-auto my-4 flex justify-around bg-white w-[90%]'
                   onClick={() => (navigate("/dashboard"))}>DashBoard</a>
                <a className='p-3 dark:shadow-gray-600 dark:shadow-md dark:bg-[#4fd1c5] dark:text-white shadow-lg rounded-3xl m-auto my-4 text-neutral-500 flex justify-around bg-white w-[90%]'
                   href='/tutorial'>Tutorial</a>
            </div>
        </div>
    )
}

export default MainPage