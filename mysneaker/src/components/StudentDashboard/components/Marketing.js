import React from 'react'
import MarketingImage from '../../../assets/img/container/marketing.svg';

const Marketing = ({MarketingRef, cycle, handleChange, data}) => {

    return (
        <>
            <div className="w-full" ref={MarketingRef}>
                <h1 className="my-5 text-3xl w-full text-center text-[#4fd1c5] font-bold">Marketing</h1>
                <div
                    className="flex min-[620px]:justify-center space-x-8 flex-nowrap overflow-x-auto">
                    <div
                        className="dark:bg-[#1f2733] flex-shrink-0 w-72 min-h-60 rounded-xl max-[620px]:mx-5 drop-shadow-xl bg-white mb-5">
                        <img src={MarketingImage} alt="Sneaker" className="w-40 h-50 mx-auto my-5"/>
                        <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">Marketing</h1>
                        <h2 className="my-3 dark:text-white text-center text-xl">Werbung</h2>
                        <div className={"flex justify-center py-4"}>
                            <input min="0" onChange={handleChange} value={cycle.ad_invest}
                                    name="ad_invest" disabled={!data.scenario.advertisement_allowed}
                                    className={"w-32 bg-transparent dark:text-white text-center border-2 border-[#4fd1c5] rounded-full" + (data.scenario.advertisement_allowed ? " border-[#4fd1c5]" : " border-[#1f273] dark:bg-[#252e3c]")}
                                    type={"number"}/>
                            <p className={"ml-2 font-bold text-xl dark:text-white"}>€</p>
                        </div>
                    </div>
                    <div
                        className="dark:bg-[#1f2733] flex-shrink-0 w-72 min-h-60 rounded-xl max-[620px]:mx-5 drop-shadow-xl bg-white mb-5">
                        <img src={MarketingImage} alt="Sneaker" className="w-40 h-50 mx-auto my-5"/>
                        <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">Forschung und
                            Entwickelung</h1>
                        <h2 className="my-3 dark:text-white text-center text-xl">Verbesserung
                            der Maschinen</h2>
                        <div className={"flex justify-center py-4"}>
                            <input min="0" onChange={handleChange} value={cycle.research_invest}
                                    name="research_invest" disabled={!data.scenario.research_allowed}
                                   className={"w-32 bg-transparent dark:text-white text-center border-2 border-[#4fd1c5] rounded-full" + (data.scenario.research_allowed ? " border-[#4fd1c5]" : " border-[#1f273] dark:bg-[#252e3c]")}
                                    type={"number"}/>
                            <p className={"ml-2 font-bold text-xl dark:text-white"}>€</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Marketing