import React from 'react'
import {useNavigate} from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate()

  return (
    <div className='flex justify-items-center items-center w-screen h-screen '>
        <div className='h-fit w-fit m-auto'>
          <h1 className='text-[#4fd1c5] text-[100px]'>MySneaker</h1>
          <a className='p-4 dark:shadow-gray-600 dark:shadow-md dark:bg-[#4fd1c5] dark:text-white shadow-lg rounded-3xl text-xl text-neutral-600 m-auto my-4 flex justify-around bg-white w-[90%]' onClick={() => (navigate("/dashboard"))}>DashBoard</a>
          <a className='p-3 dark:shadow-gray-600 dark:shadow-md dark:bg-[#4fd1c5] dark:text-white shadow-lg rounded-3xl m-auto my-4 text-neutral-500 flex justify-around bg-white w-[90%]' href='/tutorial'>Tutorial</a>
        </div>
    </div>
  )
}

export default MainPage