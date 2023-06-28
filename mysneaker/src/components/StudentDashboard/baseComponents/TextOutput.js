import React from 'react'

const TextOutput = ({value,text}) => {
  return (
    <p className="my-2 text-center dark:text-white text-xl">{isNaN(value) ? 0 : value} {text}</p>
  )
}

export default TextOutput