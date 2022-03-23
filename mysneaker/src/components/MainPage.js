import React from 'react'


const MainPage = () => {
  return (
    <div className='flex justify-items-center items-center w-screen h-screen '>
        <div className='h-fit w-fit m-auto'>
          <h1 className='text-[#4fd1c5] text-[100px]'>MySneaker</h1>
          <a href='/DashBoard'>DashBoard  </a>
          <a href='/tutorial'>Tutorial</a>
        </div>
    </div>
  )
}

export default MainPage