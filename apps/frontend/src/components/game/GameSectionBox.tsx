import React from "react";

interface GameSectionBoxComponentProps {
    children: React.ReactNode;
    hasError?: boolean
}

const GameSectionBoxComponent: React.FC<GameSectionBoxComponentProps> = ({children, hasError = false}) => {
    return (
        <>
            <div
                className="flex min-[620px]:justify-center flex-wrap">
                <div
                    className={"dark:bg-[#1f2733] mx-2 xl:w-96 w-full min-h-60 rounded-xl drop-shadow-xl bg-white mb-5" + (hasError ? " border-2 border-red-400" : "")}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default GameSectionBoxComponent;