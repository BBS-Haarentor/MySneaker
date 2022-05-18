import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";

const KlassenDetailPage = () => {
  let { name } = useParams()

  const [companies, setCompanies] = useState([
    {
      name: "test"
    },
    {
      name: "test"
    },
  ])

  

  const changeCompanie = (name) => {
    console.log(name)
  }

  return (
    <>
      <div className='h-screen  overflow-hidden'>
        <div className='mt-12 p-4 xl:col-span-2 shadow-lg rounded-3xl m-2 bg-white flex justify-center snap-start grid-cols-1 w-[90%] h-[60%] mx-12'>
          <h1 className='text-center'>Test</h1>
        </div>
        <div className='p-4 xl:col-span-2 m-2 flex justify-center snap-start grid-cols-3 w-[90%] h-[30%] mx-12 overflow-hidden'>
          <div className='inline-block shadow-lg rounded-3xl m-2 h-32 bg-white w-[160%] overflow-y-auto my-12'>
            <ul>
              {companies.map(({name}) =>
                <li className='p-3 text-lg' onClick={() => changeCompanie(name)}><a>{name}</a></li>
              )}
            </ul>
          </div>
          <div></div>
          <button className='inline-block shadow-lg rounded-3xl m-2 h-32 bg-white w-[82%] my-12'>
            Abschließen
          </button>
        </div>
      </div>
    </>
  )
}

export default KlassenDetailPage