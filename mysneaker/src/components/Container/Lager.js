import React from 'react'

const Lager = ({ data, cycle,tempData, formatter, handleChange }) => {


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