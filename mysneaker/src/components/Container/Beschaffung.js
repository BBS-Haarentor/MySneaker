import React from 'react'

const Beschaffung = ({scenario, formatter, cycle, tempData, handleChange, BeschaffungRef}) => {

    return (
        <div className="w-full" ref={BeschaffungRef}>
            <h1 className="my-5 text-3xl w-full text-center text-[#4fd1c5] font-bold">Beschaffung</h1>
            <div
                className="flex overflow-x-auto min-[620px]:justify-center space-x-8 items-center flex-nowrap overflow-x-auto">
                <div
                    className="dark:bg-[#1f2733] flex-shrink-0 w-72 min-h-60 rounded-xl max-[620px]:mx-5 drop-shadow-xl bg-white mb-5">
                    <img src="/img/img/sneaker.svg" alt="Sneaker" className="w-40 h-50 mx-auto my-5"/>
                    <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">Sneaker</h1>
                    <div className="text-center my-7 dark:text-[#D7D7D7]">
                        <p className="text-[20px] font-medium">{formatter.format(scenario.sneaker_price)}</p>
                        <p className="text-[18px] font-medium">pro Sneaker</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             onClick={() => handleChange({
                                 target: {
                                     name: "buy_sneaker",
                                     value: cycle.buy_sneaker + 1
                                 }
                             })}
                             className="fill-[#4fd1c5] w-8 cursor-pointer"
                             viewBox="0 0 448 512">
                            <path
                                d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                        </svg>
                        <input
                            className="border-2 mx-5 text-center border-[#4fd1c5] dark:text-white rounded-full w-16 dark:bg-[#1f2733]"
                            name="buy_sneaker" min="0" type="number" onChange={handleChange} value={cycle.buy_sneaker}/>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             onClick={() => handleChange({
                                 target: {
                                     name: "buy_sneaker",
                                     value: cycle.buy_sneaker - 1 >= 0 ? cycle.buy_sneaker - 1 : 0
                                 }
                             })}
                             className="fill-[#4fd1c5] w-8 cursor-pointer"
                             viewBox="0 0 448 512">
                            <path
                                d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                        </svg>
                    </div>
                    <p className="dark:text-[#D7D7D7] w-72 text-2xl text-center my-5 truncate">{formatter.format(isNaN(tempData.sneaker_cost) ? 0 : tempData.sneaker_cost)}</p>
                </div>
                <div
                    className="dark:bg-[#1f2733] flex-shrink-0 w-72 min-h-60 rounded-xl max-[620px]:mr-5 drop-shadow-xl bg-white mb-5">
                    <img src="/img/img/paint.svg" alt="Paint" className="w-40 h-36 mx-auto my-5"/>
                    <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">Farben</h1>
                    <div className="text-center my-7 dark:text-[#D7D7D7]">
                        <p className="text-[20px] font-medium">{formatter.format(scenario.paint_price)}</p>
                        <p className="text-[18px] font-medium">pro Farbe</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             onClick={() => handleChange({
                                 target: {
                                     name: "buy_paint",
                                     value: cycle.buy_paint + 1
                                 }
                             })}
                             className="fill-[#4fd1c5] w-8 cursor-pointer"
                             viewBox="0 0 448 512">
                            <path
                                d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                        </svg>
                        <input
                            className="border-2 mx-5 text-center border-[#4fd1c5] dark:text-white rounded-full w-16 dark:bg-[#1f2733]"
                            name="buy_paint" min="0" type="number" onChange={handleChange} value={cycle.buy_paint}/>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             onClick={() => handleChange({
                                 target: {
                                     name: "buy_paint",
                                     value: cycle.buy_paint - 1 >= 0 ? cycle.buy_paint - 1 : 0
                                 }
                             })}
                             className="fill-[#4fd1c5] w-8 cursor-pointer"
                             viewBox="0 0 448 512">
                            <path
                                d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                        </svg>
                    </div>
                    <p className="dark:text-[#D7D7D7] w-72 truncate text-2xl text-center my-5">{formatter.format(isNaN(tempData.paint_cost) ? 0 : tempData.paint_cost)}</p>
                </div>
            </div>
            <p className="dark:text-white text-center text-xl font-medium mb-5">{formatter.format((isNaN(tempData.sneaker_cost) ? 0 : tempData.sneaker_cost) + (isNaN(tempData.paint_cost) ? 0 : tempData.paint_cost))} gesamt
                Werkstoffkosten</p>
        </div>
    )
}

export default Beschaffung