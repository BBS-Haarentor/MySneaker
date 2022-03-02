import React from 'react'
import Beschaffung from './Beschaffung'
import { useState, useEffect } from "react";


const Container = () => {
    const [data, setData] = useState({
        "vorperiode": {
            "lager": {
                "sneaker": 0,
                "farben": 0,
                "fertigeSneaker": 0
            },
            "finanzen": {
                "kontostand": 15000,
                "darlehenstand": 0
            }
        },
        "beschaffungUndLager": {
            "beschaffung": {
                "einstandspreis": {
                    "sneaker": 60,
                    "farben": 10
                }
            },
            "lager": {
                "lagerVorperiode": {
                    "sneaker": 0,
                    "farben": 0,
                    "fertigeSneaker": 0
                }
            }
        }
    })
    const [SneakerEinkaufMenge, setSneakerEinkaufMenge] = useState(0)
    const [FarbenEinkaufMenge, setFarbenEinkaufMenge] = useState(0)
    const SneakerKosten = data.beschaffungUndLager.beschaffung.einstandspreis.sneaker * SneakerEinkaufMenge
    const FarbenKosten = data.beschaffungUndLager.beschaffung.einstandspreis.farben * FarbenEinkaufMenge
    const [GeplanteProduktion, setGeplanteProduktion] = useState(0)
    const [ZugeteilteMitarbeiter, setZugeteilteMitarbeiter] = useState(0)
    const [Mitarbeiter, setMitarbeiter] = useState(8)
    const [Neueinstellungen, setNeueinstellungen] = useState(0)
    const [Kündigungen, setKündigungen] = useState(0)
    const [Personalnebenkosten, setPersonalnebenkosten] = useState(20)

    const [Werbung, setWerbung] = useState(0)
    const [ForschungUndEntwickelung, setForschungUndEntwickelung] = useState(0)
    
    const [MaximaleEntnahmeAusLager, setMaximaleEntnahmeAusLager] = useState(0)
    const [EntnahmeAusDemLager, setEntnahmeAusDemLager] = useState(0)
    const [Gesamtproduktion, setGesamtproduktion] = useState(0)
    const [GesamtproduktionMöglich, setGesamtproduktionMöglich] = useState(0)

    var ProduktionFarben = parseInt(FarbenEinkaufMenge / 2)
    var Produktionskapazität = 200;
    var FertigungskostenProStückFE = 60;
    var Maschinenkosten = 4000;
    var MaximalproduzierbareAnzahl = SneakerEinkaufMenge > ProduktionFarben ? ProduktionFarben : SneakerEinkaufMenge
    var PersonalnebenkostenInP = Personalnebenkosten / 100 + 1 

    console.log(PersonalnebenkostenInP)

    useEffect(() => {
        const getData = async () => {
            const dataFromServer = await fetchData()
            setData(dataFromServer)
        }
        getData()

    }, [])

    const fetchData = async () => {
        const res = await fetch('http://127.0.0.1:8000/playlist')
        const data = await res.json()

        return data
    }

    return (
        <>
            <form className='grid grid-cols-1 xl:grid-cols-3'>


                <div className=" p-4 w-fit h-fit border-[#4FD1C5]  xl:col-span-2 border-2 rounded-3xl m-2 bg-white flex justify-center  ">
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th>Sneaker</th>
                                <th>Farben</th>
                            </tr>
                            <tr>
                                <td>Einstandspreis</td>
                                <td>{data.beschaffungUndLager.beschaffung.einstandspreis.sneaker}</td>
                                <td>{data.beschaffungUndLager.beschaffung.einstandspreis.farben}</td>
                            </tr>
                            <tr>
                                <td>Einkauf (Menge)</td>
                                <td><input min="0" type="number" onChange={(e) => setSneakerEinkaufMenge(e.target.value)} value={SneakerEinkaufMenge}></input></td>
                                <td><input min="0" type="number" onChange={(e) => setFarbenEinkaufMenge(e.target.value)} value={FarbenEinkaufMenge}></input></td>
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
                </div>
                <div className="p-4  row-span-2 border-[#4FD1C5] border-2 rounded-3xl m-2 bg-white">
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
                                <td>{data.vorperiode.lager.sneaker}</td>
                                <td>{data.vorperiode.lager.farben}</td>
                                <td>{data.vorperiode.lager.fertigeSneaker}</td>
                            </tr>
                            <tr>
                                <td>Aktuelle Beschaffung</td>
                                <td>{SneakerEinkaufMenge}</td>
                                <td>{FarbenEinkaufMenge}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Gesamte Verfügbarkeit</td>
                                <td>{data.vorperiode.lager.sneaker + parseInt(SneakerEinkaufMenge)}</td>
                                <td>{data.vorperiode.lager.farben + parseInt(FarbenEinkaufMenge)}</td>
                                <td>{data.vorperiode.lager.fertigeSneaker}</td>
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
                </div>
                <div className="p-4 border-[#4FD1C5] border-2 rounded-3xl m-2 bg-white">
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th>Sneakerbox 200</th>
                                <th></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>Produktionskapazität</td>
                                <td><input min="0" type="number" onChange={(e) => setSneakerEinkaufMenge(e.target.value)} value={SneakerEinkaufMenge}></input></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Maschinenkosten p. Per.</td>
                                <td>{Maschinenkosten}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Fertigungskosten pro Stück</td>
                                <td>60€</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Fertigungskosten pro Stück (F&E)</td>
                                <td>{FertigungskostenProStückFE}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Rationalisierung</td>
                                <td>100%</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Geplante Produktion</td>
                                <td><input min="0" type="number" onChange={(e) => setGeplanteProduktion(e.target.value)} value={GeplanteProduktion}></input></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Produktionsprüfung (Werkstoffe)</td>
                                <td>{MaximalproduzierbareAnzahl >= GeplanteProduktion / 1 ? "ja" : "Keine ausreichenden Werkstoffe"}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Benötigte Mitarbeiter</td>
                                <td>{Math.ceil(GeplanteProduktion / 20)}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Zugeteilte Mitarbeiter</td>
                                <td><input min="0" type="number" onChange={(e) => setZugeteilteMitarbeiter(e.target.value)} value={ZugeteilteMitarbeiter}></input></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Produktionsprüfung (Mitarbeiter)</td>
                                <td>{ZugeteilteMitarbeiter == Math.ceil(GeplanteProduktion / 20) && (Mitarbeiter - ZugeteilteMitarbeiter) >=0 ? "ja" : "Keine passende Mitarbeiteranzahl"}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Auslastung</td>
                                <td>{Math.round((GeplanteProduktion / 1) / Produktionskapazität * 100)}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Gesamtkosten Produktion</td>
                                <td>{Maschinenkosten + FertigungskostenProStückFE * GeplanteProduktion}</td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <div className="p-4  border-[#4FD1C5] border-2 rounded-3xl m-2 bg-white">
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th>Sneakerbox 200</th>
                                <th></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>Produktionskapazität</td>
                                <td><input min="0" type="number" onChange={(e) => setSneakerEinkaufMenge(e.target.value)} value={SneakerEinkaufMenge}></input></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Maschinenkosten p. Per.</td>
                                <td>{Maschinenkosten}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Fertigungskosten pro Stück</td>
                                <td>60€</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Fertigungskosten pro Stück (F&E)</td>
                                <td>{FertigungskostenProStückFE}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Rationalisierung</td>
                                <td>100%</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Geplante Produktion</td>
                                <td><input min="0" type="number" onChange={(e) => setGeplanteProduktion(e.target.value)} value={GeplanteProduktion}></input></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Produktionsprüfung (Werkstoffe)</td>
                                <td>{MaximalproduzierbareAnzahl >= GeplanteProduktion / 1 ? "ja" : "Keine ausreichenden Werkstoffe"}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Benötigte Mitarbeiter</td>
                                <td>{Math.ceil(GeplanteProduktion / 20)}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Zugeteilte Mitarbeiter</td>
                                <td><input min="0" type="number" onChange={(e) => setZugeteilteMitarbeiter(e.target.value)} value={ZugeteilteMitarbeiter}></input></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Produktionsprüfung (Mitarbeiter)</td>
                                <td>{ZugeteilteMitarbeiter == Math.ceil(GeplanteProduktion / 20) && (Mitarbeiter - ZugeteilteMitarbeiter) >=0 ? "ja" : "Keine passende Mitarbeiteranzahl"}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Auslastung</td>
                                <td>{Math.round((GeplanteProduktion / 1) / Produktionskapazität * 100)}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Gesamtkosten Produktion</td>
                                <td>{Maschinenkosten + FertigungskostenProStückFE * GeplanteProduktion}</td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <div className="p-4  border-[#4FD1C5] border-2 rounded-3xl m-2 bg-white">
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th>Sneakerbox 200</th>
                                <th></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>Produktionskapazität</td>
                                <td><input min="0" type="number" onChange={(e) => setSneakerEinkaufMenge(e.target.value)} value={SneakerEinkaufMenge}></input></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Maschinenkosten p. Per.</td>
                                <td>{Maschinenkosten}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Fertigungskosten pro Stück</td>
                                <td>60€</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Fertigungskosten pro Stück (F&E)</td>
                                <td>{FertigungskostenProStückFE}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Rationalisierung</td>
                                <td>100%</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Geplante Produktion</td>
                                <td><input min="0" type="number" onChange={(e) => setGeplanteProduktion(e.target.value)} value={GeplanteProduktion}></input></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Produktionsprüfung (Werkstoffe)</td>
                                <td>{MaximalproduzierbareAnzahl >= GeplanteProduktion / 1 ? "ja" : "Keine ausreichenden Werkstoffe"}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Benötigte Mitarbeiter</td>
                                <td>{Math.ceil(GeplanteProduktion / 20)}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Zugeteilte Mitarbeiter</td>
                                <td><input min="0" type="number" onChange={(e) => setZugeteilteMitarbeiter(e.target.value)} value={ZugeteilteMitarbeiter}></input></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Produktionsprüfung (Mitarbeiter)</td>
                                <td>{ZugeteilteMitarbeiter == Math.ceil(GeplanteProduktion / 20) && (Mitarbeiter - ZugeteilteMitarbeiter) >=0 ? "ja" : "Keine passende Mitarbeiteranzahl"}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Auslastung</td>
                                <td>{Math.round((GeplanteProduktion / 1) / Produktionskapazität * 100)}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Gesamtkosten Produktion</td>
                                <td>{Maschinenkosten + FertigungskostenProStückFE * GeplanteProduktion}</td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </div>


                <div className=" p-4  border-[#4FD1C5] border-2 rounded-3xl m-2 bg-white flex justify-center  ">
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th>Personal</th>
                            </tr>
                            <tr>
                                <td>Mitarbeiter</td>
                                <td><input min="0" type="number" onChange={(e) => setMitarbeiter(e.target.value)} value={Mitarbeiter}></input></td>

                            </tr>
                            <tr>
                                <td>Grundkapazität Stück je MA</td>
                                <td>20</td>

                            </tr>
                            <tr>
                                <td>Verfügbare Kapazität (MA)</td>
                                <td>{Mitarbeiter - ZugeteilteMitarbeiter}</td>

                            </tr>
                            <tr>
                                <td>benötigte MA </td>
                                <td>{ZugeteilteMitarbeiter}</td>

                            </tr>
                            <tr>
                                <td>Auslastung </td>
                                <td>{Math.round((ZugeteilteMitarbeiter / 1) / Mitarbeiter * 100)}</td>

                            </tr>
                            <tr>
                                <td>Neueinstellungen</td>
                                <td><input min="0" type="number" onChange={(e) => setNeueinstellungen(e.target.value)} value={Neueinstellungen}></input></td>

                            </tr>
                            <tr>
                                <td>Kosten Neueinstellung</td>
                                <td>100,00€</td>

                            </tr>
                            <tr>
                                <td>Kündigungen/Rente/ etc.</td>
                                <td><input min="0" type="number" onChange={(e) => setKündigungen(e.target.value)} value={Kündigungen}></input></td>

                            </tr>
                            <tr>
                                <td>Zugeteilte Mitarbeiter</td>
                                <td><input min="0" type="number" onChange={(e) => setZugeteilteMitarbeiter(e.target.value)} value={ZugeteilteMitarbeiter}></input></td>

                            </tr>
                            <tr>
                                <td>Mitarbeiter nächste Periode</td>
                                <td>{parseInt(Mitarbeiter) + parseInt(Neueinstellungen) - Kündigungen}</td>


                            </tr>
                            <tr>
                                <td>Kosten pro MA</td>
                                <td>500</td>

                            </tr>
                            <tr>
                                <td>Personalnebenkosten</td>
                                <td><input min="0" type="number" onChange={(e) => setPersonalnebenkosten(e.target.value)} value={Personalnebenkosten}></input></td>

                            </tr>
                            <tr>
                                <td>Personalkosten akt. Periode</td>
                                <td>{Mitarbeiter * (500 * (PersonalnebenkostenInP))}</td>

                            </tr>
                            <tr>
                                <td>Personalkosten folg. Periode</td>
                                <td>{(parseInt(Mitarbeiter) + parseInt(Neueinstellungen)  - Kündigungen) * (500 * (PersonalnebenkostenInP))}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-[#4FD1C5] border-2 rounded-3xl m-2 bg-white">
                    <table>
                        <tbody>
                    <tr>
                        <th></th>
                        <th>Marketing</th>
                    </tr>
                    <tr>
                        <td>Werbung</td>
                        <td><input min="0" type="number" onChange={(e) => setWerbung(e.target.value)} value={Werbung}></input></td>
                    </tr>
                    <tr>
                        <th></th>
                        <th>Forschung und Entwickelung</th>
                    </tr>
                    <tr>
                        <td>Verbesserung der Maschinen</td>
                        <td><input min="0" type="number" onChange={(e) => setForschungUndEntwickelung(e.target.value)} value={ForschungUndEntwickelung}></input></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className=" p-4 border-[#4FD1C5] border-2 rounded-3xl m-2 bg-white flex justify-center  ">
             <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>Planung Umsatzerlöse</th>
                    </tr>
                    <tr>
                        <td>Geplante Produktion</td>
                        <td><input min="0" type="number" onChange={(e)=> setGeplanteProduktion(e.target.value)} value={GeplanteProduktion}></input></td>
                    </tr>
                    <tr>
                        <td>Maximal Entnahme aus Lager</td>
                        <td><input min="0" type="number" onChange={(e)=> setMaximaleEntnahmeAusLager(e.target.value)} value={MaximaleEntnahmeAusLager}></input></td>
                    </tr>
                    <tr>
                        <td>Entnahme aus dem Lager</td>
                        <td><input min="0" type="number" onChange={(e)=> setEntnahmeAusDemLager(e.target.value)} value={EntnahmeAusDemLager}></input></td>
                    </tr>
                    <tr>
                        <td>Gesamtproduktion</td>
                        <td><input min="0" type="number" onChange={(e)=> setGesamtproduktion(e.target.value)} value={Gesamtproduktion}></input></td>
                    </tr>
                    <tr>
                        <td>Geplanteproduktion möglich</td>
                        <td><input min="0" type="number" onChange={(e)=> setGesamtproduktionMöglich(e.target.value)} value={GesamtproduktionMöglich}></input></td>
                    </tr>
                </tbody>
             </table>
        </div>
        </form>
    </>
)
}

export default Container