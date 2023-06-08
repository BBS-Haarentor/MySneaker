import React from 'react'

const BaseContainer = ({title,imageSrc,children}) => {
  return (
    
    <div className="dark:bg-[#1f2733] flex-shrink-0 w-72 min-h-60 rounded-xl max-[1250px]:mx-5 drop-shadow-xl bg-white mb-5">
        <img src={imageSrc} alt={imageSrc} className="w-40 h-36 mx-auto my-5"/>
        <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">{title}</h1>
        {children}
    </div>
  )
}

export default BaseContainer