import React from 'react'

const Lager = ({ data, cycle,tempData, formatter, handleChange }) => {

    return (
        <>
            <div className="w-full">
                <h1 className="my-5 text-3xl w-full text-center text-[#4fd1c5] font-bold">Lager</h1>
                <div className="flex overflow-x-auto min-[1250px]:justify-center space-x-8 items-center flex-nowrap overflow-x-auto">
                    <div className="dark:bg-[#1f2733] flex-shrink-0 w-72 min-h-60 rounded-xl max-[1250px]:mx-5 drop-shadow-xl bg-white mb-5">
                        <img src="/img/img/sneaker.svg" alt="Sneaker" className="w-40 h-50 mx-auto my-5"/>
                        <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">Sneaker</h1>
                        <div className="w-[90%] h-[2px] rounded-full dark:bg-white bg-black m-auto my-2"></div>
                        <p className="my-2 text-center dark:text-white text-xl">{data.sneaker_count} Sneaker im Lager</p>
                        <p className="my-2 text-center dark:text-white text-xl">{isNaN(cycle.buy_sneaker) ? 0 : cycle.buy_sneaker} Sneaker werden gekauft</p>
                        <p className="my-2 text-center dark:text-white text-xl">{data.sneaker_count + (isNaN(cycle.buy_sneaker) ? 0 : cycle.buy_sneaker)} Sneaker gesamt Verfügbar</p>
                        <p className="my-2 text-center dark:text-white text-xl">{tempData.overall_production} Sneaker Verbraucht (PLAN)</p>
                        <div className="w-[90%] h-[2px] rounded-full dark:bg-white bg-black m-auto my-4"></div>
                        <p className="my-2 text-center dark:text-white text-xl">{(data.sneaker_count + (isNaN(cycle.buy_sneaker) ? 0 : cycle.buy_sneaker)) - tempData.overall_production} Sneaker im Lager (PLAN)</p>
                    </div>
                    <div className="dark:bg-[#1f2733] flex-shrink-0 w-72 min-h-60 rounded-xl max-[620px]:mx-5 drop-shadow-xl bg-white mb-5">
                        <img src="/img/img/paint.svg" alt="Sneaker" className="w-40 h-36 mx-auto my-5"/>
                        <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">Farben</h1>
                        <div className="w-[90%] h-[2px] rounded-full dark:bg-white bg-black m-auto my-2"></div>
                        <p className="my-2 text-center dark:text-white text-xl">{data.paint_count} Farben im Lager</p>
                        <p className="my-2 text-center dark:text-white text-xl">{isNaN(cycle.buy_paint) ? 0 : cycle.buy_paint} Farben werden gekauft</p>
                        <p className="my-2 text-center dark:text-white text-xl">{data.paint_count + (isNaN(cycle.buy_paint) ? 0 : cycle.buy_paint)} Farben gesamt Verfügbar</p>
                        <p className="my-2 text-center dark:text-white text-xl">{tempData.overall_production * 2} Sneaker Verbraucht (PLAN)</p>
                        <div className="w-[90%] h-[2px] rounded-full dark:bg-white bg-black m-auto my-4"></div>
                        <p className="my-2 text-center dark:text-white text-xl">{(data.paint_count + (isNaN(cycle.buy_paint) ? 0 : cycle.buy_paint)) - tempData.overall_production*2} Sneaker im Lager (PLAN)</p>
                    </div>
                    <div className="dark:bg-[#1f2733] flex-shrink-0 w-72 min-h-60 rounded-xl max-[620px]:mx-5 drop-shadow-xl bg-white mb-5">
                        <img src="/img/img/sneaker.svg" alt="Sneaker" className="w-40 h-50 mx-auto my-5"/>
                        <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">Fertige Sneaker</h1>
                        <div className="w-[90%] h-[2px] rounded-full dark:bg-white bg-black m-auto my-2"></div>
                        <p className="my-2 text-center dark:text-white text-xl">{data.finished_sneaker_count} Sneaker im Lager</p>
                        <p className="my-2 text-center dark:text-white text-xl">{tempData.overall_production} Sneaker werden gekauft</p>
                        <p className="my-2 text-center dark:text-white text-xl">{data.finished_sneaker_count + tempData.overall_production} Sneaker gesamt Verfügbar</p>
                        <p className="my-2 text-center dark:text-white text-xl">{Math.round(tempData.overall_production + cycle.include_from_stock)} Sneaker Verbraucht (PLAN)</p>
                        <div className="w-[90%] h-[2px] rounded-full dark:bg-white bg-black m-auto my-4"></div>
                        <p className="my-2 text-center dark:text-white text-xl">{data.finished_sneaker_count +tempData.overall_production - Math.round(cycle.sales_planned + cycle.tender_offer_count)} Sneaker im Lager (PLAN)</p>
                    </div>
                </div>

                <h1 className="my-5 text-3xl w-full text-center text-[#4fd1c5] font-bold">Lager Kosten</h1>
                <div className="flex overflow-x-auto min-[1250px]:justify-center space-x-8 items-center flex-nowrap overflow-x-auto">
                    <div className="dark:bg-[#1f2733] flex-shrink-0 w-72 min-h-60 rounded-xl max-[1250px]:mx-5 drop-shadow-xl bg-white mb-5">
                        <img src="/img/img/sneaker.svg" alt="Sneaker" className="w-40 h-50 mx-auto my-5"/>
                        <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">Sneaker</h1>
                        <div className="w-[90%] h-[2px] rounded-full dark:bg-white bg-black m-auto my-2"></div>
                        <p className="my-2 text-center dark:text-white text-xl">4,00€ pro Stück</p>
                        <p className="my-2 text-center dark:text-white text-xl">{formatter.format(((data.sneaker_count + (isNaN(cycle.buy_sneaker) ? 0 : cycle.buy_sneaker)) - tempData.overall_production) * 4)} Lagerkosten (PLAN)</p>
                        <p className="my-2 text-center dark:text-white text-xl">{formatter.format((data.sneaker_count +(isNaN(cycle.buy_sneaker) ? 0 : cycle.buy_sneaker) - tempData.overall_production) * 4)} Lagerkosten (IST)</p>
                    </div>
                    <div className="dark:bg-[#1f2733] flex-shrink-0 w-72 min-h-60 rounded-xl max-[620px]:mx-5 drop-shadow-xl bg-white mb-5">
                        <img src="/img/img/paint.svg" alt="Sneaker" className="w-40 h-36 mx-auto my-5"/>
                        <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">Farben</h1>
                        <div className="w-[90%] h-[2px] rounded-full dark:bg-white bg-black m-auto my-2"></div>
                        <p className="my-2 text-center dark:text-white text-xl">1,00€ pro Stück</p>
                        <p className="my-2 text-center dark:text-white text-xl">{formatter.format(((data.paint_count + (isNaN(cycle.buy_paint) ? 0 : cycle.buy_paint)) - tempData.overall_production * 2))} Lagerkosten (PLAN)</p>
                        <p className="my-2 text-center dark:text-white text-xl">{formatter.format((data.paint_count + (isNaN(cycle.buy_paint) ? 0 : cycle.buy_paint) - tempData.overall_production * 2))} Lagerkosten (IST)</p>
                    </div>
                    <div className="dark:bg-[#1f2733] flex-shrink-0 w-72 min-h-60 rounded-xl max-[620px]:mx-5 drop-shadow-xl bg-white mb-5">
                        <img src="/img/img/sneaker.svg" alt="Sneaker" className="w-40 h-50 mx-auto my-5"/>
                        <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">Fertige Sneaker</h1>
                        <div className="w-[90%] h-[2px] rounded-full dark:bg-white bg-black m-auto my-2"></div>
                        <p className="my-2 text-center dark:text-white text-xl">8,00€ pro Stück</p>
                        <p className="my-2 text-center dark:text-white text-xl">{formatter.format((data.finished_sneaker_count + tempData.overall_production - Math.round((cycle.sales_planned + cycle.tender_offer_count)))* 8)} Lagerkosten (PLAN)</p>
                        <p className="my-2 text-center dark:text-white text-xl">{formatter.format((data.finished_sneaker_count + tempData.overall_production) * 8)} Lagerkosten (IST)</p>
                    </div>
                </div>
            </div>
        </>
    )

    return (
        <div className="p-4 shadow-lg rounded-3xl dark:bg-[#1f2733] dark:text-white m-2 xl:col-span-3 flex justify-around bg-white  snap-start">
            <img src="/img/undraw_heavy_box.svg" className='h-96 w-0 xl:w-96 m-4' alt=''></img>
            <table>
                <tbody>
                    <tr>
                        <th className='text-[#4fd1c5] w-96'></th>
                        <th className='text-[#4fd1c5] w-40'>Sneaker</th>
                        <th className='text-[#4fd1c5] w-40'>Farben</th>
                        <th className='text-[#4fd1c5] w-40'>Fertige Sneaker</th>
                    </tr>
                    <tr>
                        <td>Lager (Vorperiode)</td>
                        <td>{data.sneaker_count} Stk.</td>
                        <td>{data.paint_count} Stk.</td>
                        <td>{data.finished_sneaker_count} Stk.</td>
                    </tr>
                    <tr>
                        <td>Aktuelle Beschaffung</td>
                        <td>{cycle.buy_sneaker} Stk.</td>
                        <td>{cycle.buy_paint} Stk.</td>
                        <td>{tempData.overall_production} Stk.</td>
                    </tr>
                    <tr>
                        <td>Gesamte Verfügbarkeit</td>
                        <td>{data.sneaker_count + cycle.buy_sneaker + " Stk."}</td>
                        <td>{data.paint_count + cycle.buy_paint + " Stk."}</td>
                        <td>{data.finished_sneaker_count + tempData.overall_production + " Stk."}</td>
                    </tr>
                    <tr>
                        <td>Verbrauch Produktion (PLAN)</td>
                        <td>{tempData.overall_production} Stk.</td>
                        <td>{tempData.overall_production * 2} Stk.</td>
                        <td>{Math.round(tempData.overall_production + cycle.include_from_stock) + " Stk."}</td>
                    </tr>
                    <tr>
                        <td>Lager Periodenende (PLAN)</td>
                        <td>{(data.sneaker_count + cycle.buy_sneaker) - tempData.overall_production + " Stk."}</td>
                        <td>{(data.paint_count + cycle.buy_paint) - tempData.overall_production * 2 + " Stk."}</td>
                        <td>{data.finished_sneaker_count +tempData.overall_production - Math.round(cycle.sales_planned + cycle.tender_offer_count) + " Stk."}</td>
                    </tr>
                    <tr>
                        <td>Lagerkosten pro Stück</td>
                        <td>4,00€</td>
                        <td>1,00€</td>
                        <td>8,00€</td>
                    </tr>
                    <tr>
                        <td>Lagerkosten (PLAN)</td>
                        <td>{formatter.format(((data.sneaker_count + cycle.buy_sneaker) - tempData.overall_production) * 4)}</td>
                        <td>{formatter.format(((data.paint_count + cycle.buy_paint) - tempData.overall_production * 2) * 1)}</td>
                        <td>{formatter.format((data.finished_sneaker_count + tempData.overall_production - Math.round((cycle.sales_planned + cycle.tender_offer_count)) * 8))}</td>
                    </tr>
                    <tr>
                        <td>Verbrauch Produktion (IST)</td>
                        <td>{tempData.overall_production} Stk.</td>
                        <td>{tempData.overall_production * 2} Stk.</td>
                        <td>{cycle.sales_planned} Stk.</td>
                    </tr>
                    <tr>
                        <td>Lager Periodenende (IST)</td>
                        <td>{data.sneaker_count + cycle.buy_sneaker - tempData.overall_production} Stk.</td>
                        <td>{data.paint_count + cycle.buy_paint - tempData.overall_production * 2} Stk.</td>
                        <td>{data.finished_sneaker_count + tempData.overall_production} Stk.</td>
                    </tr>
                    <tr>
                        <td>Lagerkosten (IST)</td>
                        <td>{formatter.format((data.sneaker_count +cycle.buy_sneaker - tempData.overall_production) * 4)}</td>
                        <td>{formatter.format((data.paint_count + cycle.buy_paint - tempData.overall_production * 2) * 1)}</td>
                        <td>{formatter.format((data.finished_sneaker_count + tempData.overall_production) * 8)}</td>
                    </tr>

                </tbody>
            </table>

        </div>
    )
}

export default Lager