import {useState, useEffect} from "react";

const Lager = ({data}) => {
    const [SneakerEinkaufMenge, setSneakerEinkaufMenge] = useState('')
    const [FarbenEinkaufMenge, setFarbenEinkaufMenge] = useState('')
    const SneakerKosten = data.SneakerEinstandsPreis * SneakerEinkaufMenge
    const FarbenKosten = data.FarbenEinstandsPreis * FarbenEinkaufMenge

    useEffect(() => {
       setFarbenEinkaufMenge(data.FarbenEinkaufMenge)
       setSneakerEinkaufMenge(data.SneakerEinkaufMenge)
    }, [])

    return (
        <>
            <from className=" grid-cols-2 p-4 w-fit h-fit border-[#4FD1C5] border-2 rounded-3xl m-2 bg-white">
                 <table>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>Sneaker</th>
                            <th>Farben</th>
                        </tr>
                        <tr>
                            <td>Einstandspreis</td>
                            <td>{data.SneakerEinstandsPreis}</td>
                            <td>{data.FarbenEinstandsPreis}</td>
                        </tr>
                        <tr>
                            <td>Einkauf (Menge)</td>
                            <td><input type="number" onChange={(e)=> setSneakerEinkaufMenge(e.target.value)} value={SneakerEinkaufMenge}></input></td>
                            <td><input type="number" onChange={(e)=> setFarbenEinkaufMenge(e.target.value)} value={FarbenEinkaufMenge}></input></td>
                        </tr>
                        <tr>
                            <td>Kosten pro Werkstoff</td>
                            <td>{SneakerKosten}</td>
                            <td>{FarbenKosten}</td>
                        </tr>
                        <tr>
                            <td>Gesamtkosten Werkstoffe</td>
                            <td>{SneakerKosten + FarbenKosten}</td>
                        </tr>
                    </tbody>
                 </table>
            </from>
        </>
    )
}
export default Lager