import React from 'react'

const Marketing = ({ MarketingRef, setWerbung, Werbung, setForschungUndEntwickelung, ForschungUndEntwickelung }) => {

    return (
        <div className=" p-4  xl:col-span-3 shadow-lg dark:bg-[#1f2733] dark:text-white rounded-3xl m-2 bg-white flex justify-around snap-start " ref={MarketingRef}>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th className='text-[#4fd1c5]'>Marketing</th>
                    </tr>
                    <tr>
                        <td>Werbung</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg dark:bg-[#1f2733]" min="0" type="number" onChange={(e) => e.target.value >= 0 ? setWerbung(e.target.value) : setWerbung(0)} value={Werbung}></input> €</td>
                    </tr>
                    <tr>
                        <th></th>
                        <th className='text-[#4fd1c5]'>Forschung und Entwickelung</th>
                    </tr>
                    <tr>
                        <td>Verbesserung der Maschinen</td>
                        <td><input className="border-2 border-[#4fd1c5] rounded-lg dark:bg-[#1f2733]" min="0" type="number" onChange={(e) => e.target.value >= 0 ? setForschungUndEntwickelung(e.target.value) : setForschungUndEntwickelung(0)} value={ForschungUndEntwickelung}></input> €</td>
                    </tr>
                </tbody>
            </table>
            <img src="/img/undraw_mobile_marketing.svg" className='h-96 w-64 xl:w-96 m-4'></img>
        </div>
    )
}

export default Marketing