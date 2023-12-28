import React from 'react'

interface Props {
  value?: number;
  text: string;
}

const TextOutput: React.FC<Props> = ({value,text}) => {
  return (
    <p className="my-2 text-center dark:text-white text-xl">{value !== undefined ? isNaN(value) ? 0 : value : ""} {text}</p>
  )
}

export default TextOutput