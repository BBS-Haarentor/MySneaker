import React from "react";

const InformationContainer = ({formatter, data}) => {
    return (
        <>
            <div className="w-full">
                <h1 className="my-5 text-3xl w-full text-center text-[#4fd1c5] font-bold">Informationen</h1>
                <div
                    className="flex min-[620px]:justify-center flex-wrap">
                    <div
                        className={"dark:bg-[#1f2733] mx-2 xl:w-96 w-full min-h-60 rounded-xl drop-shadow-xl bg-white mb-5"}>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default InformationContainer;