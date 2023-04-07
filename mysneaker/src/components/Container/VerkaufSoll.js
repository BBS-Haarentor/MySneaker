import React from 'react'

const Beschaffung = ({cycle, data, tempData, formatter, handleChange}) => {

    return (
        <div
            className={(Math.round(parseInt(tempData.overall_production) + parseInt(cycle.include_from_stock)) < (Math.round(parseInt(cycle.sales_planned) + parseInt(cycle.tender_offer_count))) ? " p-4 border-2 border-red-300 shadow-lg  xl:col-span-2 rounded-3xl m-2 bg-white flex justify-center  snap-start" : "p-4 shadow-lg  xl:col-span-2  rounded-3xl m-2 bg-white flex justify-center") + " dark:bg-[#1f2733] max-[1899px]:w-full min-[1900px]:w-[63%] dark:text-white"}>
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
                    <td><input className="border-2 border-[#4fd1c5] w-[80%] rounded-lg dark:bg-[#1f2733]" min="0"
                               type="number" name="sales_planned" onChange={handleChange} max={(Math.round(parseInt(tempData.overall_production) + parseInt(cycle.include_from_stock)))} value={cycle.sales_planned}></input> Stk.
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
                            <td><input className="border-2 border-[#1f273] w-[80%] rounded-lg dark:bg-[#252e3c]" min="0"
                                       type="number"
                                       onChange={handleChange}
                                       name="tender_offer_count"
                                       value={cycle.tender_offer_count} disabled></input> Stk.
                            </td>
                            <td><input className="border-2 border-[#1f273] w-[90%] rounded-lg dark:bg-[#252e3c]" min="0"
                                       max="300" type="number"
                                       name="tender_offer_price"
                                       onChange={handleChange}
                                       value={cycle.tender_offer_price} disabled></input> €
                            </td>
                        </>
                        :
                        <>
                            <td><select name="tender_offer_count"
                                        className="border-2 border-[#4fd1c5] w-[80%] rounded-lg dark:bg-[#1f2733]"
                                        defaultValue="0"
                                        onChange={handleChange}>
                                <option value="0">0</option>
                                <option value={data.scenario.tender_offer_count}
                                        >{data.scenario.tender_offer_count}</option>
                            </select>Stk.
                            </td>
                            <td><input className="border-2 border-[#4fd1c5] w-[90%] rounded-lg dark:bg-[#1f2733]"
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