import React from 'react'

const VerkaufIst = ({ formatter , data }) => {

    return (
        <div className="dark:bg-[#1f2733] dark:text-white p-4 shadow-lg rounded-3xl m-2 xl:col-span-3 bg-white flex justify-center snap-start ">
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th className='text-[#4fd1c5]'>Verkauf (Ist)</th>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Verkaufte Stück</td>
                                <td>Umsatz</td>
                            </tr>
                            <tr>
                                <td>Markt</td>
                                <td>{data.stock.real_sales} Stk.</td>
                                <td>{formatter.format(data.stock.income_from_sales - (data.stock.tender_price*data.stock.tender_sales) )}</td>
                            </tr>
                            <tr>
                                <td>Ausschreibung</td>
                                <td>{data.stock.tender_sales} Stk.</td>
                                <td>{formatter.format(data.stock.tender_price*data.stock.tender_sales)}</td>
                            </tr>
                            <tr>
                                <td>Gesamt</td>
                                <td>{data.stock.tender_sales + data.stock.real_sales} Stk. </td>
                                <td>{formatter.format(data.stock.income_from_sales)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <img src="/img/data_reports.svg" className='h-96 w-64 xl:w-96 m-4'></img>
                </div>
    )
}

export default VerkaufIst