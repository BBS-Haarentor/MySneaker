import React from "react";
import Game2048 from "../Game2048";

const GameModal = ({isHidden, toggleHidden}) => {

    return(
        <>
            <div className={isHidden ? "hidden" : "block"}>
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
                    id="my-modal"
                ></div>
                <div
                    className="fixed text-gray-600 flex items-center justify-center overflow-auto z-50 bg-black bg-opacity-40 left-0 right-0 top-0 bottom-0">
                    <div
                        className="text-center dark:bg-[#1a202c] bg-white rounded-xl shadow-2xl p-6 sm:w-8/12 mx-10 ">
                        <Game2048/>
                        <div className=" mx-auto w-full mt-5">
                            <button
                                className="px-4 py-2 text-sm bg-white rounded-xl dark:bg-[#4fd1c5] border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-gray-50 focus:bg-indigo-50 focus:text-indigo"
                                onClick={() => toggleHidden()}>Schließen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GameModal;