import React from 'react'

const Beschaffung = ({ scenario,formatter,cycle,tempData,handleChange,LagerBeschaffungRef}) => {

    return (
        <div className=" p-4 xl:col-span-3 shadow-lg rounded-3xl m-2 bg-white dark:bg-[#1f2733] dark:text-white flex justify-center snap-start " ref={LagerBeschaffungRef}>
            <table>
                <tbody>
                    <tr>
                        <th className='xl:w-72'></th>
                        <th className='text-[#4fd1c5]'>Sneaker</th>
                        <th className='text-[#4fd1c5]'>Farben</th>
                    </tr>
                    <tr>
                        <td>Einstandspreis</td>
                        <td>{formatter.format(scenario.sneaker_price)}</td>
                        <td>{formatter.format(scenario.paint_price)}</td>
                    </tr>
                    <tr>
                        <td>Einkauf (Menge)</td>
                        <td><input className="border-2  border-[#4fd1c5] rounded-lg dark:bg-[#1f2733]" name="buy_sneaker" min="0" type="number" onChange={handleChange} value={cycle.buy_sneaker}></input></td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg dark:bg-[#1f2733]" name="buy_paint" min="0" type="number" onChange={handleChange} value={cycle.buy_paint}></input></td>
                    </tr>
                    <tr>
                        <td>Kosten pro Werkstoff</td>
                        <td>{formatter.format(tempData.sneaker_cost)}</td>
                        <td>{formatter.format(tempData.paint_cost)}</td>
                    </tr>
                    <tr>
                        <td>Gesamtkosten Werkstoffe</td>
                        <td>{formatter.format(tempData.sneaker_cost + tempData.paint_cost)}</td>
                    </tr>
                </tbody>
            </table>
            <img src="/img/undraw_empty_cart.svg" alt='empty' className='h-96 w-0 xl:w-96 m-4'></img>
        </div>
    )
}

export default Beschaffung