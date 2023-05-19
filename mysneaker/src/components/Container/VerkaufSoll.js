import React from 'react'

const Beschaffung = ({cycle, data, tempData, formatter, handleChange}) => {

    return (
        <>
            <div className="w-full">
                <h1 className="my-5 text-3xl w-full text-center text-[#4fd1c5] font-bold">Verkauf (Soll)</h1>
                <div
                    className="flex min-[620px]:justify-center flex-wrap">
                    <div
                        className={"dark:bg-[#1f2733] mx-2 xl:w-96 w-full min-h-60 rounded-xl drop-shadow-xl bg-white mb-5" + (Math.round(parseInt(tempData.overall_production) + parseInt(cycle.include_from_stock)) < (Math.round(parseInt(cycle.sales_planned) + parseInt(cycle.tender_offer_count))) ? " border-2 border-red-400" : "")}>
                        <img src="/img/img/sale.svg" alt="Sneaker" className="w-40 h-50 mx-auto my-5"/>
                        <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">Markt</h1>
                        <h2 className={"mt-3 mb-1 dark:text-white text-center text-xl font-bold"}>Geplante Stückzahl</h2>
                        <h3 className="text-center dark:text-white pt-2 text-xl font-medium">{cycle.sales_planned}</h3>
                        <div className="flex flex-row flex-nowrap">
                            <p className="w-1/5 text-center dark:text-white font-medium text-lg">0</p>
                            <input type="range" name='sales_planned' onChange={handleChange} value={cycle.sales_planned}
                                   max={(Math.round(parseInt(tempData.overall_production) + parseInt(cycle.include_from_stock))-cycle.tender_offer_count)}
                                   className="w-3/5 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-3"/>
                            <p className="w-1/5 text-center dark:text-white font-medium text-lg">{(Math.round(parseInt(tempData.overall_production) + parseInt(cycle.include_from_stock)) - cycle.tender_offer_count)}</p>
                        </div>
                        <h2 className={"mt-3 mb-1 dark:text-white text-center text-xl font-bold"}>Geplante Stückzahl</h2>
                        <h3 className="text-center dark:text-white pt-2 text-xl font-medium">{formatter.format(cycle.sales_bid)}</h3>
                        <div className="flex flex-row flex-nowrap">
                            <p className="w-1/5 text-center dark:text-white font-medium text-lg">0,00 €</p>
                            <input type="range" name='sales_bid' onChange={handleChange} value={cycle.sales_bid}
                                   max={300}
                                   className="w-3/5 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-3"/>
                            <p className="w-1/5 text-center dark:text-white font-medium text-lg">300,00 €</p>
                        </div>
                        <div className="h-[2px] bg-gray-400 dark:bg-white w-[90%] mx-auto my-5"/>
                        <p className="text-xl dark:text-white text-center font-bold mb-5">{formatter.format(cycle.sales_planned * cycle.sales_bid)}</p>
                    </div>
                    <div
                        className={"dark:bg-[#1f2733] mx-2 xl:w-96 w-full min-h-60 rounded-xl drop-shadow-xl bg-white mb-5" + (Math.round(parseInt(tempData.overall_production) + parseInt(cycle.include_from_stock)) < (Math.round(parseInt(cycle.sales_planned) + parseInt(cycle.tender_offer_count))) ? " border-2 border-red-400" : "")}>
                        <img src="/img/img/sale.svg" alt="Sneaker" className="w-40 h-50 mx-auto my-5"/>
                        <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">Ausschreibung</h1>
                        <h2 className={"mt-3 mb-1 dark:text-white text-center text-xl font-bold"}>Geplante Stückzahl</h2>
                        <h3 className="text-center dark:text-white pt-2 text-xl font-medium">{cycle.tender_offer_count}</h3>
                        <div className="flex flex-row flex-nowrap">
                            <p className="w-1/5 text-center dark:text-white font-medium text-lg">0</p>
                            <input type="range" step={data.scenario.tender_offer_count} name='tender_offer_count' onChange={handleChange} value={cycle.tender_offer_count}
                                   max={data.scenario.tender_offer_count}
                                   className="w-3/5 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-3"/>
                            <p className="w-1/5 text-center dark:text-white font-medium text-lg">{data.scenario.tender_offer_count}</p>
                        </div>
                        <h2 className={"mt-3 mb-1 dark:text-white text-center text-xl font-bold"}>Geplante Stückzahl</h2>
                        <h3 className="text-center dark:text-white pt-2 text-xl font-medium">{formatter.format(cycle.tender_offer_price)}</h3>
                        <div className="flex flex-row flex-nowrap">
                            <p className="w-1/5 text-center dark:text-white font-medium text-lg">0,00 €</p>
                            <input type="range" name='tender_offer_price' onChange={handleChange} value={cycle.tender_offer_price}
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

    return (
        <div
            className={(Math.round(parseInt(tempData.overall_production) + parseInt(cycle.include_from_stock)) < (Math.round(parseInt(cycle.sales_planned) + parseInt(cycle.tender_offer_count))) ? " p-4 border-2 border-red-300 shadow-lg rounded-3xl m-2 bg-white flex justify-center  snap-start" : "p-4 shadow-lg rounded-3xl m-2 bg-white flex justify-center") + " dark:bg-[#1f2733] max-[1899px]:w-full min-[1900px]:w-[63%] dark:text-white"}>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th className='text-[#4fd1c5]'>Verkauf (Soll)</th>
                </tr>
                <tr>
                    <td></td>
                    <td>Geplante Stückzahl</td>
                    <td>Preis je Einheit (Angebot)</td>
                    <td>Geplanter Umsatz</td>
                </tr>
                <tr>
                    <td>Markt</td>
                    <td><input className="border-2 border-[#4fd1c5] w-[150px] rounded-lg dark:bg-[#1f2733]" min="0"
                               type="number" name="sales_planned" onChange={handleChange}
                               max={(Math.round(parseInt(tempData.overall_production) + parseInt(cycle.include_from_stock)))}
                               value={cycle.sales_planned}></input> Stk.
                    </td>
                    <td><input className="border-2 border-[#4fd1c5] w-[90%] rounded-lg dark:bg-[#1f2733]" min="0"
                               max="300" type="number"
                               onChange={handleChange}
                               name="sales_bid"
                               value={cycle.sales_bid}></input> €
                    </td>
                    <td>{formatter.format(cycle.sales_planned * cycle.sales_bid)}</td>
                </tr>
                <tr>

                    <td>Ausschreibung</td>

                    {data.scenario.tender_offer_count === 0 ?
                        <>
                            <td><input className="border-2 border-[#1f273] w-[150px] rounded-lg dark:bg-[#252e3c]"
                                       min="0"
                                       type="number"
                                       onChange={handleChange}
                                       name="tender_offer_count"
                                       value={cycle.tender_offer_count} disabled></input> Stk.
                            </td>
                            <td><input className="border-2 border-[#1f273] w-[160px] rounded-lg dark:bg-[#252e3c]"
                                       min="0"
                                       max="300" type="number"
                                       name="tender_offer_price"
                                       onChange={handleChange}
                                       value={cycle.tender_offer_price} disabled></input> €
                            </td>
                        </>
                        :
                        <>
                            <td><select name="tender_offer_count"
                                        className="border-2 border-[#4fd1c5] w-[150px] rounded-lg dark:bg-[#1f2733]"
                                        defaultValue="0"
                                        onChange={handleChange}>
                                <option value="0">0</option>
                                <option value={data.scenario.tender_offer_count}
                                >{data.scenario.tender_offer_count}</option>
                            </select>Stk.
                            </td>
                            <td><input className="border-2 border-[#4fd1c5] w-[160px] rounded-lg dark:bg-[#1f2733]"
                                       min="0" max="300" type="number"
                                       onChange={handleChange}
                                       name="tender_offer_price"
                                       value={cycle.tender_offer_price}></input> €
                            </td>
                        </>
                    }
                    <td>{formatter.format(cycle.tender_offer_count * cycle.tender_offer_price)}</td>
                </tr>
                <tr>
                    <td>Gesamt</td>
                    <td>{Math.round(parseInt(cycle.sales_planned) + parseInt(cycle.tender_offer_count))} Stk.</td>
                </tr>
                <tr>
                    <td>Gesamtverkauf möglich</td>
                    <td>{Math.round(parseInt(tempData.overall_production) + parseInt(cycle.include_from_stock)) < (Math.round(parseInt(cycle.sales_planned) + parseInt(cycle.tender_offer_count))) ? "Nein" : "Ja"}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Beschaffung