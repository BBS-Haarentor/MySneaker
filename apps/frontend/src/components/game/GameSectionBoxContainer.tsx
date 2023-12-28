import React from "react";

interface GameSectionBoxComponentProps {
  children: React.ReactNode;
  hasError?: boolean;
  className?: string;
}

const GameSectionBoxContainerComponent: React.FC<
  GameSectionBoxComponentProps
> = ({ children, className }) => {
  return (
    <>
      <div className={`w-full flex flex-nowrap overflow-x-auto min-[1250px]:justify-center ${className}`}>{children}</div>
    </>
  );
};

export default GameSectionBoxContainerComponent;