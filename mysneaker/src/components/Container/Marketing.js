import React from 'react'

const Marketing = ({MarketingRef, cycle, handleChange}) => {

    return (
        <>
            <div className="w-full" ref={MarketingRef}>
                <h1 className="my-5 text-3xl w-full text-center text-[#4fd1c5] font-bold">Marketing</h1>
                <div
                    className="flex overflow-x-auto min-[620px]:justify-center space-x-8 flex-nowrap overflow-x-auto">
                    <div
                        className="dark:bg-[#1f2733] flex-shrink-0 w-72 min-h-60 rounded-xl max-[620px]:mx-5 drop-shadow-xl bg-white mb-5">
                        <img src="/img/img/marketing.svg" alt="Sneaker" className="w-40 h-50 mx-auto my-5"/>
                        <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">Marketing</h1>
                        <h2 className="my-3 dark:text-white text-center text-xl">Werbung</h2>
                        <div className={"flex justify-center py-4"}>
                            <input min="0" onChange={handleChange} value={cycle.ad_invest}
                                    name="ad_invest"
                                    className="w-32 bg-transparent dark:text-white text-center border-2 border-[#4fd1c5] rounded-full"
                                    type={"number"}/>
                            <p className={"ml-2 font-bold text-xl dark:text-white"}>€</p>
                        </div>
                    </div>
                    <div
                        className="dark:bg-[#1f2733] flex-shrink-0 w-72 min-h-60 rounded-xl max-[620px]:mx-5 drop-shadow-xl bg-white mb-5">
                        <img src="/img/img/marketing.svg" alt="Sneaker" className="w-40 h-50 mx-auto my-5"/>
                        <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">Forschung und
                            Entwickelung</h1>
                        <h2 className="my-3 dark:text-white text-center text-xl">Verbesserung
                            der Maschinen</h2>
                        <div className={"flex justify-center py-4"}>
                            <input min="0" onChange={handleChange} value={cycle.research_invest}
                                    name="research_invest"
                                    className="w-32 bg-transparent dark:text-white text-center border-2 border-[#4fd1c5] rounded-full"
                                    type={"number"}/>
                            <p className={"ml-2 font-bold text-xl dark:text-white"}>€</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    return (
        <div
            className=" p-4  xl:col-span-3 shadow-lg dark:bg-[#1f2733] dark:text-white rounded-3xl m-2 bg-white flex justify-around w-full"
            ref={MarketingRef}>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th className='text-[#4fd1c5]'>Marketing</th>
                </tr>
                <tr>
                    <td>Werbung</td>
                    <td><input className="border-2 border-[#4fd1c5] rounded-lg dark:bg-[#1f2733]" min="0"
                               name='ad_invest' type="number" onChange={handleChange} value={cycle.ad_invest}></input> €
                    </td>
                </tr>
                <tr>
                    <th></th>
                    <th className='text-[#4fd1c5]'>Forschung und Entwickelung</th>
                </tr>
                <tr>
                    <td>Verbesserung der Maschinen</td>
                    <td><input className="border-2 border-[#4fd1c5] rounded-lg dark:bg-[#1f2733]" min="0"
                               name='research_invest' type="number" onChange={handleChange}
                               value={cycle.research_invest}></input> €
                    </td>
                </tr>
                </tbody>
            </table>
            <img alt="marketing image" src="/img/undraw_mobile_marketing.svg"
                 className='h-96 w-64 xl:w-96 m-4 max-[800px]:hidden'></img>
        </div>
    )
}

export default Marketing