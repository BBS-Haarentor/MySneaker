import React from 'react'

const Klassen = ({name,date}) => {
  return (
    <div className='flex border-[#4fd1c5] border-solid border-2 rounded-2xl w-[90%] h-[90%]'>
      <div className='text-5xl sm:text-7xl self-center justify-center m-auto text-[#4fd1c5]'>
        <p>{name}</p>
        <p className='text-3xl sm:text-5xl m-auto text-[#a3b1c2]'>Erstellt am:{date}</p>
      </div>
    </div>
  )
}

export default Klassen