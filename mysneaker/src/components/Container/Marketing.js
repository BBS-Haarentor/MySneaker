import React from 'react'

const Marketing = ({ MarketingRef, setWerbung, Werbung, setForschungUndEntwickelung, ForschungUndEntwickelung }) => {

    return (
        <div className=" p-4  xl:col-span-3 shadow-lg rounded-3xl m-2 bg-white flex justify-around snap-start " ref={MarketingRef}>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th className='text-[#4fd1c5]'>Marketing</th>
                    </tr>
                    <tr>
                        <td>Werbung</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setWerbung(e.target.value)} value={Werbung}></input> €</td>
                    </tr>
                    <tr>
                        <th></th>
                        <th className='text-[#4fd1c5]'>Forschung und Entwickelung</th>
                    </tr>
                    <tr>
                        <td>Verbesserung der Maschinen</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg" min="0" type="number" onChange={(e) => setForschungUndEntwickelung(e.target.value)} value={ForschungUndEntwickelung}></input> €</td>
                    </tr>
                </tbody>
            </table>
            <img src="/img/undraw_mobile_marketing.svg" className='h-96 w-64 xl:w-96 m-4'></img>
        </div>
    )
}

export default Marketing