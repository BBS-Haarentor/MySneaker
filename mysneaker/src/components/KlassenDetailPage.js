import React from 'react'
import { useParams } from 'react-router-dom';

const KlassenDetailPage = () => {
  let { name } = useParams()

  return (
    <>
      <div className='h-screen my-12'>
        <div className='grid grid-cols-1 w-[90%] h-[60%] mx-12'>
          <div className=' border-2 border-[#4fd1c5]  rounded-3xl mx-12  '>

          </div>
        </div>
        <div className='grid grid-cols-3 w-[90%] h-[25%] mx-12 overflow-hidden'>
          <div className='inline-block border-2 border-[#4fd1c5] w-[170%] overflow-y-auto rounded-3xl my-12'>
            <ul>
              <li className='p-3 text-lg'>
                <a>Test</a>
              </li>
              <li className='p-3 text-lg'>
                <a>Test</a>
              </li>
              <li className='p-3 text-lg'>
                <a>Test</a>
              </li>
              <li className='p-3 text-lg'>
                <a>Test</a>
              </li>
              <li className='p-3 text-lg'>
                <a>Test</a>
              </li>
              <li className='p-3 text-lg'>
                <a>Test</a>
              </li>
              <li className='p-3 text-lg'>
                <a>Test</a>
              </li>
            </ul>
          </div>
          <div></div>
          <button className='inline-block border-2 border-[#4fd1c5] w-[100%]  rounded-3xl my-12'>
            Abschließen
          </button>
        </div>
      </div>
    </>
  )
}

export default KlassenDetailPage