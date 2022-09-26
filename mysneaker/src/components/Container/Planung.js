import React, {useState} from 'react'

const Planung = ({ AbsatzRef, tempData, data, cycle, handleChange }) => {
    return (
        <div className="p-4 shadow-lg dark:bg-[#1f2733] dark:text-white rounded-3xl m-2 bg-white flex justify-center snap-start" ref={AbsatzRef}>
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
                        <td><input className="border-2 w-[100%] border-[#4fd1c5] rounded-lg dark:bg-[#1f2733]" min="0" name='include_from_stock' max={data.stock.finished_sneaker_count} type="number" onChange={handleChange} value={cycle.include_from_stock}></input></td>
                    </tr>
                    <tr>
                        <td>Gesamtproduktion</td>
                        <td>{Math.round(parseInt(tempData.overall_production) + parseInt(cycle.include_from_stock))} Stk.</td>
                    </tr>
                    <tr>
                        <td>Geplante Produktion möglich</td>
                        <td>{cycle.include_from_stock > data.stock.finished_sneaker_count / 1 ? "Nein" : "Ja"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Planung