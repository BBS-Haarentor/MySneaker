import React, { useState } from 'react'

const KlasseContainer = (companyId) => {

    const [select, setSelect] = useState("main");
    const [modal, setModal] = useState();

    if (companyId) {

        const changePasswordModal = async () => {
            setModal(<>
                <div className="hidden">
                    <div
                        className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
                        id="my-modal"
                    ></div>
                    <div
                        className="fixed text-gray-600 flex items-center justify-center overflow-auto z-50 bg-black bg-opacity-40 left-0 right-0 top-0 bottom-0">
                        <div
                            className="text-center bg-white rounded-xl shadow-2xl p-6 sm:w-8/12 mx-10 ">
                            <span className="font-bold block text-xl mb-3">Spiel Erstellen</span>
                            <div className='flex flex-col'>
                                <div className='my-6'>
                                    <label>Spiel Name</label>
                                    <input type='text' className="w-[100%] p-2 border-[#4fd1c5] border-solid border-2 rounded-2xl rounded" onChange={(e) => setCreateGameName(e.target.value)} placeholder="Spiel 1" required />
                                </div>
                                <div className='my-6'>
                                    <label>Scenario Ordnung</label>
                                    <input type='text' className="w-[100%] p-2 border-[#4fd1c5] border-solid border-2 rounded-2xl rounded" onChange={(e) => setCreateGameScenarioOrder(e.target.value)} placeholder="ABCDEFG" required />
                                </div>
                                <div className='my-6'>
                                    <button onClick={onCreateGame} className="px-4 py-2 text-sm bg-green-400 rounded-xl border transition-colors duration-150 ease-linear border-gray-200 focus:outline-none focus:ring-0 font-bold text-white hover:bg-green-500 focus:bg-green-300 focus:text-indigo">Spiel erstellen</button>
                                </div>
                            </div>
                            <div className="text-right space-x-5 mt-5">
                                <button onClick={disableModal} className="px-4 py-2 text-sm bg-white rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-gray-50 focus:bg-indigo-50 focus:text-indigo">Schließen</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>)
        }

        const menues = () => {
            switch (select) {
                case "main":
                    return (<>
                        {modal}
                        <div className='p-4 xl:col-span-2 m-2 flex justify-center snap-start grid-cols-3 w-[90%] h-[30%] mx-12 overflow-hidden'>

                            <button className='inline-block shadow-lg rounded-3xl m-2 h-32 bg-white w-[82%] my-12' onClick={() => changePasswordModal()}>
                                Passwort ändern
                            </button>
                            <button className='inline-block shadow-lg rounded-3xl m-2 h-32 bg-white w-[82%] my-12'>
                                Spieler Löschen
                            </button>
                        </div>
                    </>)

            }
        }

        return (menues())
    } else {

    }
}

export default KlasseContainer