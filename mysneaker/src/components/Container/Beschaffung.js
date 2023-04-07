import React from 'react'

const Beschaffung = ({scenario, formatter, cycle, tempData, handleChange, LagerBeschaffungRef}) => {

    return (
        <div className="w-full" ref={LagerBeschaffungRef}>
            <h1 className="my-5 text-3xl w-full text-center text-[#4fd1c5] font-bold">Einkauf</h1>
            <div className="flex overflow-x-auto min-[620px]:justify-center space-x-8 items-center flex-nowrap overflow-x-auto">
                <div className="dark:bg-[#1f2733] flex-shrink-0 w-72 min-h-60 rounded-xl max-[620px]:mx-5 drop-shadow-xl bg-white mb-5">
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
                                     value: cycle.buy_sneaker+1
                                 }
                             })}
                             className="fill-[#4fd1c5] w-8 cursor-pointer"
                             viewBox="0 0 448 512">
                            <path
                                d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                        </svg>
                        <input className="border-2 mx-5 text-center border-[#4fd1c5] dark:text-white rounded-full w-16 dark:bg-[#1f2733]"
                               name="buy_sneaker" min="0" type="number" onChange={handleChange} value={cycle.buy_sneaker}/>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             onClick={() => handleChange({
                                 target: {
                                     name: "buy_sneaker",
                                     value: cycle.buy_sneaker-1 >= 0 ? cycle.buy_sneaker-1 : 0
                                 }
                             })}
                             className="fill-[#4fd1c5] w-8 cursor-pointer"
                             viewBox="0 0 448 512">
                            <path
                                d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                        </svg>
                    </div>
                    <p className="dark:text-[#D7D7D7] text-2xl text-center my-5">{formatter.format(tempData.sneaker_cost)}</p>
                </div>
                <div className="dark:bg-[#1f2733] flex-shrink-0 w-72 min-h-60 rounded-xl max-[620px]:mr-5 drop-shadow-xl bg-white mb-5">
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
                                     value: cycle.buy_paint+1
                                 }
                             })}
                             className="fill-[#4fd1c5] w-8 cursor-pointer"
                             viewBox="0 0 448 512">
                            <path
                                d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                        </svg>
                        <input className="border-2 mx-5 text-center border-[#4fd1c5] dark:text-white rounded-full w-16 dark:bg-[#1f2733]"
                               name="buy_paint" min="0" type="number" onChange={handleChange} value={cycle.buy_paint}/>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             onClick={() => handleChange({
                                 target: {
                                     name: "buy_paint",
                                     value: cycle.buy_paint-1 >= 0 ? cycle.buy_paint-1 : 0
                                 }
                             })}
                             className="fill-[#4fd1c5] w-8 cursor-pointer"
                             viewBox="0 0 448 512">
                            <path
                                d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                        </svg>
                    </div>
                    <p className="dark:text-[#D7D7D7] text-2xl text-center my-5">{formatter.format(tempData.paint_cost)}</p>
                </div>
            </div>
            <p className="dark:text-white text-center text-xl font-medium mb-5">{formatter.format(tempData.sneaker_cost + tempData.paint_cost)} gesamt Werkstoffkosten</p>
        </div>
    )

    return (
        <div
            className=" p-4 xl:col-span-3 shadow-lg rounded-3xl m-2 bg-white dark:bg-[#1f2733] dark:text-white flex justify-center snap-start "
            ref={LagerBeschaffungRef}>
            <table>
                <tbody>
                <tr>
                    <th className='xl:w-72'></th>
                    <th className='text-[#4fd1c5]'>Sneaker</th>
                    <th className='text-[#4fd1c5]'>Farben</th>
                </tr>
                <tr>
                    <td>Einstandspreis</td>
                    <td>{formatter.format(scenario.sneaker_price)}</td>
                    <td>{formatter.format(scenario.paint_price)}</td>
                </tr>
                <tr>
                    <td>Einkauf (Menge)</td>
                    <td><input className="border-2  border-[#4fd1c5] rounded-lg dark:bg-[#1f2733]" name="buy_sneaker"
                               min="0" type="number" onChange={handleChange} value={cycle.buy_sneaker}></input></td>
                    <td><input className="border-2 border-[#4fd1c5] rounded-lg dark:bg-[#1f2733]" name="buy_paint"
                               min="0" type="number" onChange={handleChange} value={cycle.buy_paint}></input></td>
                </tr>
                <tr>
                    <td>Kosten pro Werkstoff</td>
                    <td>{formatter.format(tempData.sneaker_cost)}</td>
                    <td>{formatter.format(tempData.paint_cost)}</td>
                </tr>
                <tr>
                    <td>Gesamtkosten Werkstoffe</td>
                    <td>{formatter.format(tempData.sneaker_cost + tempData.paint_cost)}</td>
                </tr>
                </tbody>
            </table>
            <img src="/img/undraw_empty_cart.svg" alt='empty' className='h-96 w-0 xl:w-96 m-4'></img>
        </div>
    )
}

export default Beschaffung