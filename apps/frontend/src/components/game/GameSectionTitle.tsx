import React from "react";

interface GameSectionComponentProps {
    name: string;
}

const GameSectionComponent: React.FC<GameSectionComponentProps> = ({name}) => {
    return (
        <>
            <h1 className="my-5 text-3xl w-full text-center text-[#4fd1c5] font-bold">{name}</h1>
        </>
    )
}

export default GameSectionComponent;