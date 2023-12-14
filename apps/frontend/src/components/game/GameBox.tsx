import React from "react";
import {IGame} from 'types';

interface GameBocProps {
    game: IGame;
}

const GameBoxComponent: React.FC<GameBocProps> = ({game}) => {
    return (
        <>
            <div className={"dark:bg-secondary-dark w-72 rounded-lg p-2 cursor-pointer"}>
                <h1 className="text-center text-lg">{game.name}</h1>
                <p>{game.description}</p>
            </div>
        </>
    )
}

export default GameBoxComponent;