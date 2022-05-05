import React from 'react'
import { useParams } from 'react-router-dom';

const KlassenDetailPage = () => {
  let { name } = useParams()

  return (
    <>
      <div className='grid grid-cols-1 w-screen h-screen'>
        <div className=' border-2 border-[#4fd1c5] w-[90%] h-[50%] rounded-3xl mx-12  '>

        </div>
      </div>
      <div className='grid grid-cols-1 w-screen h-screen'>
        <div className=' border-2 border-[#4fd1c5] w-[90%] h-[50%] rounded-3xl my-auto mx-12  '>

        </div>
      </div>
    </>
  )
}

export default KlassenDetailPage