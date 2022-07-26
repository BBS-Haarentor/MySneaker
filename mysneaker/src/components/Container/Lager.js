import React from 'react'

const Lager = ({ data, Gesamtproduktion, EntnahmeAusDemLager, MarktSoll, formatter, AusschreibungSoll, SneakerEinkaufMenge, FarbenEinkaufMenge, MarktIst, AusschreibungIst }) => {


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
                        <td>{SneakerEinkaufMenge} Stk.</td>
                        <td>{FarbenEinkaufMenge} Stk.</td>
                        <td>{Gesamtproduktion} Stk.</td>
                    </tr>
                    <tr>
                        <td>Gesamte Verfügbarkeit</td>
                        <td>{data.sneaker_count + parseInt(SneakerEinkaufMenge) + " Stk."}</td>
                        <td>{data.paint_count + parseInt(FarbenEinkaufMenge) + " Stk."}</td>
                        <td>{data.finished_sneaker_count + parseInt(Gesamtproduktion) + " Stk."}</td>
                    </tr>
                    <tr>
                        <td>Verbrauch Produktion (PLAN)</td>
                        <td>{Gesamtproduktion} Stk.</td>
                        <td>{Gesamtproduktion * 2} Stk.</td>
                        <td>{Math.round(parseInt(Gesamtproduktion) + parseInt(EntnahmeAusDemLager)) + " Stk."}</td>
                    </tr>
                    <tr>
                        <td>Lager Periodenende (PLAN)</td>
                        <td>{(data.sneaker_count + parseInt(SneakerEinkaufMenge)) - Gesamtproduktion + " Stk."}</td>
                        <td>{(data.sneaker_count + parseInt(FarbenEinkaufMenge)) - Gesamtproduktion * 2 + " Stk."}</td>
                        <td>{data.finished_sneaker_count + parseInt(Gesamtproduktion) - Math.round(parseInt(MarktSoll) + parseInt(AusschreibungSoll)) + " Stk."}</td>
                    </tr>
                    <tr>
                        <td>Lagerkosten pro Stück</td>
                        <td>4,00€</td>
                        <td>1,00€</td>
                        <td>8,00€</td>
                    </tr>
                    <tr>
                        <td>Lagerkosten (PLAN)</td>
                        <td>{formatter.format(((data.sneaker_count + parseInt(SneakerEinkaufMenge)) - Gesamtproduktion) * 4)}</td>
                        <td>{formatter.format(((data.sneaker_count + parseInt(FarbenEinkaufMenge)) - Gesamtproduktion * 2) * 1)}</td>
                        <td>{formatter.format((data.finished_sneaker_count + parseInt(Gesamtproduktion) - Math.round(parseInt(MarktSoll) + parseInt(AusschreibungSoll))) * 8)}</td>
                    </tr>
                    <tr>
                        <td>Verbrauch Produktion (IST)</td>
                        <td>{Gesamtproduktion} Stk.</td>
                        <td>{Gesamtproduktion * 2} Stk.</td>
                        <td>{MarktSoll} Stk.</td>
                    </tr>
                    <tr>
                        <td>Lager Periodenende (IST)</td>
                        <td>{data.sneaker_count + parseInt(SneakerEinkaufMenge) - Gesamtproduktion} Stk.</td>
                        <td>{data.paint_count + parseInt(FarbenEinkaufMenge) - Gesamtproduktion * 2} Stk.</td>
                        <td>{data.finished_sneaker_count + parseInt(Gesamtproduktion) - Math.round(parseInt(MarktIst) + parseInt(AusschreibungIst))} Stk.</td>
                    </tr>
                    <tr>
                        <td>Lagerkosten (IST)</td>
                        <td>{formatter.format((data.sneaker_count + parseInt(SneakerEinkaufMenge) - Gesamtproduktion) * 4)}</td>
                        <td>{formatter.format((data.paint_count + parseInt(FarbenEinkaufMenge) - Gesamtproduktion * 2) * 1)}</td>
                        <td>{formatter.format((data.finished_sneaker_count + parseInt(Gesamtproduktion) - Math.round(parseInt(MarktIst) + parseInt(AusschreibungIst))) * 8)}</td>
                    </tr>

                </tbody>
            </table>

        </div>
    )
}

export default Lager