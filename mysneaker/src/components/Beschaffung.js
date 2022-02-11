import {useState, useEffect} from "react";

const Beschaffung = ({data}) => {
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
            <from className=" grid-cols-2 p-4 w-fit h-fit border-[#4FD1C5] border-2 rounded-3xl m-2 bg-white">
                 <table>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>Sneaker</th>
                            <th>Farben</th>
                            <th>Fertige Sneaker</th>
                        </tr>
                        <tr>
                            <td>Lager (Vorperiode)</td>
                            <td>{data.SneakerVorperiode}</td>
                            <td>{data.FarbenVorperiode}</td>
                            <td>{data.FertigeSneakerVorperiode}</td>
                        </tr>
                        <tr>
                            <td>Aktuelle Beschaffung</td>
                            <td>{SneakerEinkaufMenge}</td>
                            <td>{FarbenEinkaufMenge}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Gesamte Verfügbarkeit</td>
                            <td>{data.SneakerVorperiode + parseInt(SneakerEinkaufMenge)}</td>
                            <td>{data.FarbenVorperiode + parseInt(FarbenEinkaufMenge)}</td>
                            <td>{data.GeplanteProduktion}</td>
                        </tr>
                        <tr>
                            <td>Verbrauch Produktion (PLAN)</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Lager Periodenende (PLAN)</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Lagerkosten pro Stück</td>
                            <td>4,00€</td>
                            <td>1,00€</td>
                            <td>8,00€</td>
                        </tr>
                        <tr>
                            <td>Lagerkosten (PLAN)</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Verbrauch Produktion (IST)</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Lager Periodenende (IST)</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Lagerkosten (IST)</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        
                    </tbody>
                 </table>
            </from>
        </>
    )
}
export default Beschaffung