import React, {useState} from 'react'

const Planung = ({ AbsatzRef, Gesamtproduktion, setEntnahmeAusDemLager, EntnahmeAusDemLager, MaximaleEntnahmeAusLager, stock }) => {

    const [TempEntnahmeAusDemLager, setTempEntnahmeAusDemLager] = useState(EntnahmeAusDemLager);
    
    function setEntnahmeAusDemLagerFunction(change) {
        if(change === ""){
            console.log("ich bin nichts")
            setTempEntnahmeAusDemLager("")
            setEntnahmeAusDemLager(0)
        }else{
            if (stock.finished_sneaker_count >= change) {
                if (change <= 0) {
                    setTempEntnahmeAusDemLager(0)
                    setEntnahmeAusDemLager(0)
                } else {
                    setTempEntnahmeAusDemLager(change)
                    setEntnahmeAusDemLager(change)
                }
            } else {
                setTempEntnahmeAusDemLager(MaximaleEntnahmeAusLager)
                setEntnahmeAusDemLager(MaximaleEntnahmeAusLager)
            }
        }
        
    }

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
                        <td>{Gesamtproduktion} Stk.</td>
                    </tr>
                    <tr>
                        <td>Maximal Entnahme aus Lager</td>
                        <td>{MaximaleEntnahmeAusLager} Stk.</td>
                    </tr>
                    <tr>
                        <td>Entnahme aus dem Lager</td>
                        <td><input className="border-2 w-[100%] border-[#4fd1c5] rounded-lg dark:bg-[#1f2733]" min="" max={MaximaleEntnahmeAusLager} type="number" onChange={(e) => setEntnahmeAusDemLagerFunction(e.target.value)} value={TempEntnahmeAusDemLager}></input></td>
                    </tr>
                    <tr>
                        <td>Gesamtproduktion</td>
                        <td>{Math.round(parseInt(Gesamtproduktion) + parseInt(EntnahmeAusDemLager))} Stk.</td>
                    </tr>
                    <tr>
                        <td>Geplante Produktion möglich</td>
                        <td>{EntnahmeAusDemLager > MaximaleEntnahmeAusLager / 1 ? "Nein" : "Ja"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Planung