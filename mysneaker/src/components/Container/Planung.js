import React from "react";

const Planung = ({AbsatzRef, tempData, data, cycle, handleChange}) => {

    return (
        <>
            <div className="w-full">
                <h1 className="my-5 text-3xl w-full text-center text-[#4fd1c5] font-bold">Planung</h1>
                <div
                    className="flex min-[620px]:justify-center w-full flex-nowrap">
                    <div
                        className={"dark:bg-[#1f2733] xl:w-96 w-full min-h-60 rounded-xl mx-2 drop-shadow-xl bg-white mb-5" + (cycle.include_from_stock > data.stock.finished_sneaker_count ? " border-red-400 border-2" : "")}>
                        <img src="/img/img/planung.svg" alt="Sneaker" className="w-40 h-50 mx-auto my-5"/>
                        <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">Umsatzerlöse</h1>
                        <h2 className="mt-3 mb-1 dark:text-white text-center text-xl font-bold">Geplante Produktion</h2>
                        <p className="text-center dark:text-white text-lg font-medium">{tempData.overall_production} Stk.</p>
                        <h2 className="mt-3 mb-1 dark:text-white text-center text-xl font-bold">Maximal Entnahme aus
                            Lager</h2>
                        <p className="text-center dark:text-white text-lg font-medium">{data.stock.finished_sneaker_count} Stk.</p>
                        <h2 className={"mt-3 mb-1 dark:text-white text-center text-xl font-bold"}>Entnahme aus dem
                            Lager</h2>
                        <div className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 onClick={() => {
                                     if ((cycle.include_from_stock + 1 <= data.stock.finished_sneaker_count)) {
                                         handleChange({
                                             target: {
                                                 name: "include_from_stock",
                                                 value: cycle.include_from_stock + 1
                                             }
                                         })
                                     }
                                 }
                                 }
                                 className={"w-8 cursor-pointer fill-[#4fd1c5]"}
                                 viewBox="0 0 448 512">
                                <path
                                    d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                            </svg>
                            <input
                                className={"border-2 mx-5 text-center dark:text-white rounded-full w-16 dark:bg-[#1f2733] border-[#4fd1c5]"}
                                min="0" name='include_from_stock' type="number" onChange={handleChange}
                                max={data.stock.finished_sneaker_count} value={cycle.include_from_stock}/>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 onClick={() => {
                                     handleChange({
                                         target: {
                                             name: "include_from_stock",
                                             value: cycle.include_from_stock - 1 >= 0 ? cycle.include_from_stock - 1 : 0
                                         }
                                     })
                                 }
                                 }
                                 className={"w-8 cursor-pointer" + (data.scenario.employee_change_allowed ? " fill-[#4fd1c5]" : " fill-gray-500")}
                                 viewBox="0 0 448 512">
                                <path
                                    d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                            </svg>
                        </div>
                        <div className="my-5 dark:bg-white bg-gray-400 w-[90%] h-[2px] mx-auto"/>
                        <p className="text-center mb-5 dark:text-white text-xl font-bold">{Math.round(parseInt(tempData.overall_production) + (isNaN(parseInt(cycle.include_from_stock)) ? 0 : parseInt(cycle.include_from_stock)))} Stk.
                            Verfügbar</p>
                    </div>
                </div>
            </div>
        </>
    )

    return (
        <div
            className="p-4 shadow-lg dark:bg-[#1f2733] dark:text-white rounded-3xl m-2 bg-white flex justify-center max-[1899px]:w-full min-[1900px]:w-[35%]"
            ref={AbsatzRef}>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th className='text-[#4fd1c5]'>Planung Umsatzerlöse</th>
                </tr>
                <tr>
                    <td>Geplante Produktion</td>
                    <td>{tempData.overall_production} Stk.</td>
                </tr>
                <tr>
                    <td>Maximal Entnahme aus Lager</td>
                    <td>{data.stock.finished_sneaker_count} Stk.</td>
                </tr>
                <tr>
                    <td>Entnahme aus dem Lager</td>
                    <td><input className="border-2 w-[100%] border-[#4fd1c5] rounded-lg dark:bg-[#1f2733]" min="0"
                               name='include_from_stock' max={data.stock.finished_sneaker_count} type="number"
                               onChange={handleChange} value={cycle.include_from_stock}></input></td>
                </tr>
                <tr>
                    <td>Gesamtproduktion</td>
                    <td>{Math.round(parseInt(tempData.overall_production) + parseInt(cycle.include_from_stock))} Stk.</td>
                </tr>
                <tr>
                    <td>Geplante Produktion möglich</td>
                    <td>{cycle.include_from_stock > data.stock.finished_sneaker_count ? "Nein" : "Ja"}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Planung