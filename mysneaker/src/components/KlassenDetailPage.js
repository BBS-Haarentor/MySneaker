import React from 'react'
import { useParams } from 'react-router-dom';

const KlassenDetailPage = () => {
  let { name } = useParams()

  return (
    <>
      <div className='h-screen my-12'>
        <div className='grid grid-cols-1 w-screen h-[60%]'>
          <div className=' border-2 border-[#4fd1c5] w-[90%]  rounded-3xl mx-12  '>

          </div>
        </div>
        <div className='grid grid-cols-3 w-screen h-[25%] mx-12 overflow-hidden'>
          <div className='inline-block border-2 border-[#4fd1c5] w-[170%]  rounded-3xl my-12'>

          </div>
          <div></div>
          <div className='inline-block border-2 border-[#4fd1c5] w-[70%]  rounded-3xl my-12'>

          </div>
        </div>
      </div>
    </>
  )
}

export default KlassenDetailPage