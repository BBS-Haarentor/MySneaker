import React from 'react';

interface GameSectionBoxComponentProps {
  children: React.ReactNode;
  hasError?: boolean
  className: string;
}


const GameSectionBoxComponent: React.FC<GameSectionBoxComponentProps> = ({children, hasError, className}) => {
  return (
    <>
      <div
        className={`dark:bg-[#1f2733] mx-2 min-h-60 rounded-lg flex-shrink-0 drop-shadow-xl bg-white mb-5 ${className}` + (hasError ? " border-2 border-red-400" : "")}>
        {children}
      </div>
    </>
  )
}

export default GameSectionBoxComponent;