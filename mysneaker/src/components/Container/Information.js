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
                        <h1 className="my-5 text-center text-[#4fd1c5] text-xl font-bold">Verkauf letzte Periode</h1>
                        <h2 className="text-center text-lg text-[#4fd1c5] font-bold">Markt</h2>
                        <p className="text-lg dark:text-white text-center my-2">{data.stock.real_sales} Stück Verkauft</p>
                        <p className="text-lg dark:text-white text-center my-2">{formatter.format(data.stock.income_from_sales - (data.stock.tender_price*data.stock.tender_sales) )} Umsatz</p>
                        <div className="w-[90%] mx-auto dark:bg-white h-[1px] my-5 rounded-full"/>
                        <h2 className="text-center text-lg text-[#4fd1c5] font-bold">Markt</h2>
                        <p className="text-lg dark:text-white text-center my-2">{data.stock.tender_sales} Stück Verkauft</p>
                        <p className="text-lg dark:text-white text-center mt-2 mb-5">{formatter.format(data.stock.tender_price*data.stock.tender_sales)} Umsatz</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InformationContainer;