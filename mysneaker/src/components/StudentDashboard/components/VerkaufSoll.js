import React from 'react'
import Sale from '../../../assets/img/container/sale.svg';

const VerkaufSoll = ({cycle, data, tempData, formatter, handleChange}) => {
    return (
        <>
            <div className="w-full">
                <h1 className="my-5 text-3xl w-full text-center text-[#4fd1c5] font-bold">Verkauf (Soll)</h1>
                <div
                    className="flex min-[620px]:justify-center flex-wrap">
                    <div
                        className={"dark:bg-[#1f2733] mx-2 xl:w-96 w-full min-h-60 rounded-xl drop-shadow-xl bg-white mb-5" + (Math.round(parseInt(tempData.overall_production) + parseInt(cycle.include_from_stock)) < (Math.round(parseInt(cycle.sales_planned) + parseInt(cycle.tender_offer_count))) ? " border-2 border-red-400" : "")}>
                        <img src={Sale} alt="Sneaker" className="w-40 h-50 mx-auto my-5"/>
                        <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">Markt</h1>
                        <h2 className={"mt-3 mb-1 dark:text-white text-center text-xl font-bold"}>Geplante Stückzahl</h2>
                        <div className="w-full flex justify-center">
                            <div>
                                <input type={"number"} name='sales_planned' onChange={(e) => {
                                    if(e.target.value >= (Math.round((isNaN(parseInt(tempData.overall_production)) ? 0 : parseInt(tempData.overall_production)) + (isNaN(parseInt(cycle.include_from_stock)) ? 0 : parseInt(cycle.include_from_stock)))-(isNaN(cycle.tender_offer_count) ? 0 : cycle.tender_offer_count))) {
                                        handleChange({
                                            target: {
                                                name: "sales_planned",
                                                value: (Math.round((isNaN(parseInt(tempData.overall_production)) ? 0 : parseInt(tempData.overall_production)) + (isNaN(parseInt(cycle.include_from_stock)) ? 0 : parseInt(cycle.include_from_stock)))-(isNaN(cycle.tender_offer_count) ? 0 : cycle.tender_offer_count))
                                            }
                                        })
                                    } else {
                                        handleChange(e)
                                    }
                                }
                                } max={(Math.round((isNaN(parseInt(tempData.overall_production)) ? 0 : parseInt(tempData.overall_production)) + (isNaN(parseInt(cycle.include_from_stock)) ? 0 : parseInt(cycle.include_from_stock)))-(isNaN(cycle.tender_offer_count) ? 0 : cycle.tender_offer_count))}
                                       className="text-center dark:text-white mt-5 inline w-56 text-xl dark:bg-transparent font-medium"
                                       value={cycle.sales_planned}/>
                            </div>
                        </div>
                        <div className="flex flex-row flex-nowrap">
                            <p className="w-1/5 text-center dark:text-white font-medium text-lg">0</p>
                            <input type="range" name='sales_planned' onChange={handleChange} value={cycle.sales_planned}
                                   max={(Math.round((isNaN(parseInt(tempData.overall_production)) ? 0 : parseInt(tempData.overall_production)) + (isNaN(parseInt(cycle.include_from_stock)) ? 0 : parseInt(cycle.include_from_stock)))-(isNaN(cycle.tender_offer_count) ? 0 : cycle.tender_offer_count))}
                                   className="w-3/5 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-3"/>
                            <p className="w-1/5 text-center dark:text-white font-medium text-lg">{(Math.round((isNaN(parseInt(tempData.overall_production)) ? 0 : parseInt(tempData.overall_production)) + (isNaN(parseInt(cycle.include_from_stock)) ? 0 : parseInt(cycle.include_from_stock))) - (isNaN(cycle.tender_offer_count) ? 0 : cycle.tender_offer_count))}</p>
                        </div>
                        <h2 className={"mt-3 mb-1 dark:text-white text-center text-xl font-bold"}>Preis</h2>
                        <div className="w-full flex justify-center">
                            <div>
                                <input type={"number"} name='sales_bid' onChange={(e) => {
                                    if(e.target.value >= 300) {
                                        handleChange({
                                            target: {
                                                name: "sales_bid",
                                                value: 300
                                            }
                                        })
                                    } else {
                                        handleChange(e)
                                    }
                                }
                                } max={300}
                                       className="text-center dark:text-white mt-5 inline w-56 text-xl dark:bg-transparent font-medium"
                                       value={cycle.sales_bid}/>
                                <p className="inline font-medium text-xl dark:text-white">€</p>
                            </div>
                        </div>
                        <div className="flex flex-row flex-nowrap">
                            <p className="w-1/5 text-center dark:text-white font-medium text-lg">0,00 €</p>
                            <input type="range" name='sales_bid' onChange={handleChange} value={isNaN(cycle.sales_bid) ? 0 : cycle.sales_bid}
                                   max={300}
                                   className="w-3/5 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-3"/>
                            <p className="w-1/5 text-center dark:text-white font-medium text-lg">300,00 €</p>
                        </div>
                        <div className="h-[2px] bg-gray-400 dark:bg-white w-[90%] mx-auto my-5"/>
                        <p className="text-xl dark:text-white text-center font-bold mb-5">{formatter.format((isNaN(cycle.sales_planned) ? 0 : cycle.sales_planned) * (isNaN(cycle.sales_bid) ? 0 : cycle.sales_bid))}</p>
                    </div>
                    <div
                        className={"dark:bg-[#1f2733] mx-2 xl:w-96 w-full min-h-60 rounded-xl drop-shadow-xl bg-white mb-5" + (Math.round(parseInt(tempData.overall_production) + parseInt(cycle.include_from_stock)) < (Math.round(parseInt(cycle.sales_planned) + parseInt(cycle.tender_offer_count))) ? " border-2 border-red-400" : "")}>
                        <img src={Sale} alt="Sneaker" className="w-40 h-50 mx-auto my-5"/>
                        <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">Ausschreibung</h1>
                        <h2 className={"mt-3 mb-1 dark:text-white text-center text-xl font-bold"}>Geplante Stückzahl</h2>
                        <h3 className="text-center dark:text-white pt-2 text-xl font-medium">{cycle.tender_offer_count}</h3>
                        <div className="flex flex-row flex-nowrap">
                            <p className="w-1/5 text-center dark:text-white font-medium text-lg">0</p>
                            <input type="range" step={data.scenario.tender_offer_count} disabled={data.scenario.tender_offer_count === 0} name='tender_offer_count' onChange={handleChange} value={cycle.tender_offer_count}
                                   max={data.scenario.tender_offer_count}
                                   className="w-3/5 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-3"/>
                            <p className="w-1/5 text-center dark:text-white font-medium text-lg">{data.scenario.tender_offer_count}</p>
                        </div>
                        <h2 className={"mt-3 mb-1 dark:text-white text-center text-xl font-bold"}>Preis</h2>
                        <div className="w-full flex justify-center">
                            <div>
                                <input type={"number"} name='tender_offer_price' onChange={(e) => {
                                    if(e.target.value >= 300) {
                                        handleChange({
                                            target: {
                                                name: "tender_offer_price",
                                                value: 300
                                            }
                                        })
                                    } else {
                                        handleChange(e)
                                    }
                                }
                                } max={300}
                                       className="text-center dark:text-white mt-5 inline w-56 text-xl dark:bg-transparent font-medium"
                                       value={cycle.tender_offer_price}/>
                                <p className="inline font-medium text-xl dark:text-white">€</p>
                            </div>
                        </div>
                        <div className="flex flex-row flex-nowrap">
                            <p className="w-1/5 text-center dark:text-white font-medium text-lg">0,00 €</p>
                            <input type="range" name='tender_offer_price' onChange={handleChange} disabled={data.scenario.tender_offer_count === 0} value={cycle.tender_offer_price}
                                   max={300}
                                   className="w-3/5 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-3"/>
                            <p className="w-1/5 text-center dark:text-white font-medium text-lg">300,00 €</p>
                        </div>
                        <div className="h-[2px] bg-gray-400 dark:bg-white w-[90%] mx-auto my-5"/>
                        <p className="text-xl dark:text-white text-center font-bold mb-5">{formatter.format(cycle.tender_offer_count * cycle.tender_offer_price)}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VerkaufSoll