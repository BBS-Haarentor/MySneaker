import React from 'react'

const Klassen = ({ name, date }) => {

  console.log(name)

  return (
    <a href={'/ler/' + name}>
      <div className='flex border-[#4fd1c5] border-solid border-2 rounded-2xl w-[90%] h-30 m-[5%]'>
        <div className='text-5xl self-center justify-center m-auto text-[#4fd1c5]'>
          <p>{name}</p>
          <p className='text-3xl m-auto text-[#a3b1c2]'>Erstellt am: {date}</p>
        </div>
      </div>
    </a>
  )
}

export default Klassen