import React, {useEffect} from "react";

export const MachineContainer = ({
                                     name,
                                     kapazität,
                                     handleChange,
                                     planned_production,
                                     planned_production_name,
                                     hasError,
                                     tempData,
                                     workersAvailable,
                                     overallCost,
                                     workers_name
                                 }) => {

    useEffect(() => {
        if (!workers_name) return;
        handleChange({
            target: {
                name: workers_name,
                value: Math.ceil((isNaN(planned_production) ? 0 : planned_production) / 20)
            }
        })
    }, [planned_production])

    if (tempData === undefined || !tempData) return (<></>)

    const auslastung = (planned_production / kapazität) * 100;

    return (
        <>
            <div
                className={"p-4 dark:bg-[#1f2733] relative dark:text-white shadow-lg rounded-3xl m-2 bg-white max-[1200px]:w-[45%] max-[612px]:w-[96%] min-[1200px]:w-1/3 h-[500px]" + (hasError ? " border-red-300 border-2" : "")}>
                <div
                    className="h-3 absolute border-2 border-[#4ecfc3] rotate-[270deg] box-content flex rounded-full overflow-hidden font-[0.75rem] w-[250px] right-[-50px] top-[250px]">
                    <div
                        style={{width: (auslastung: 100) + "%", transition: "all 0.2s ease"}}
                        className={"flex relative flex-col justify-center box-content text-center bg-green-500 rounded-full bg-gradient-to-r" + (auslastung <= 50 ? " from-green-300 to-green-500" : auslastung <= 90 ? " from-green-300 to-orange-500" : " from-green-500 via-orange-600 to-red-600")}
                        role="progressbar">
                    </div>
                </div>
                <div className="bg-[#4ecfc3] rounded-full w-10 h-10 absolute">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className={"w-8 h-8 my-1 fill-white"}
                         viewBox="0 0 320 512">
                        <path
                            d="M48.1 240c-.1 2.7-.1 5.3-.1 8v16c0 2.7 0 5.3 .1 8H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H60.3C89.9 419.9 170 480 264 480h24c17.7 0 32-14.3 32-32s-14.3-32-32-32H264c-57.9 0-108.2-32.4-133.9-80H256c17.7 0 32-14.3 32-32s-14.3-32-32-32H112.2c-.1-2.6-.2-5.3-.2-8V248c0-2.7 .1-5.4 .2-8H256c17.7 0 32-14.3 32-32s-14.3-32-32-32H130.1c25.7-47.6 76-80 133.9-80h24c17.7 0 32-14.3 32-32s-14.3-32-32-32H264C170 32 89.9 92.1 60.3 176H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H48.1z"/>
                    </svg>
                </div>
                <h1 className={"text-center text-2xl font-bold text-[#4ecfc3]"}>{name}</h1>
                <h2 className={"mt-7 mb-5 text-center text-xl font-bold" + (tempData.max_production >= tempData.overall_production ? "" : " text-red-300")}>Geplante
                    Produktion</h2>
                <div className="flex items-center justify-center">
                    <input onChange={handleChange} min={0} value={planned_production} name={planned_production_name}
                           className={"rounded-full bg-transparent border-2 text-center border-[#4fd1c5] w-24 inline-block"}
                           type={"number"}/>
                    <p className="text-lg inline-block ml-2">/ {kapazität}</p>
                </div>
                <h2 className={"mt-7 mb-5 text-center text-xl font-bold" + (workersAvailable ? "" : " text-red-300")}>Benötigte
                    Mitarbeiter</h2>
                <p className={"text-center font-semibold text-lg"}>{Math.ceil((isNaN(planned_production) ? 0 : planned_production) / 20)}</p>
                <h2 className={"mt-7 mb-5 text-center text-xl font-bold"}>Gesamtkosten Produktion</h2>
                <p className={"text-center font-semibold text-lg"}>{overallCost}</p>
                <div className={"absolute w-full bottom-5 pr-4"}>
                    <img src={"/img/img/sneakerbox200.svg"} className={"w-[100%] max-h-[100px] mx-auto"}/>
                </div>
            </div>
        </>
    )
}

export const BuyNewMachine = ({ProductionRef, onBuy}) => {
    return (
        <>
            <div className="p-4 dark:bg-[#1f2733] shadow-lg rounded-3xl m-2 bg-white w-1/3"
                 ref={ProductionRef}>
                <h1 className='text-[#4fd1c5]'>Neue Maschine Kaufen</h1>
                <img src="/img/add_maschine.svg" className='h-96 w-64 xl:w-96 my-auto' onClick={onBuy}
                     alt={""}></img>
            </div>
        </>
    )
}

export const NewMachineBuyed = ({ProductionRef}) => {
    return (
        <>
            <div className="p-4 dark:bg-[#1f2733] shadow-lg rounded-3xl m-2 bg-white w-1/3"
                 ref={ProductionRef}>
                <h1 className='text-[#4fd1c5]'>Neue Maschine wurde bestellt, sie wird im nächsten cycle
                    Verfügbare sein</h1>
                <img src="/img/speed_test.svg" className='h-96 w-64 xl:w-96 my-auto' alt={""}></img>
            </div>
        </>
    )
}

export const NoMachineBuy = ({ProductionRef}) => {
    return (
        <>
            <div className="p-4 dark:bg-[#1f2733] shadow-lg rounded-3xl m-2 bg-white w-1/3"
                 ref={ProductionRef}>
                <h1 className='text-[#4fd1c5] pl-4 w-fit m-auto'>In dieser Periode ist der Kauf einer
                    Maschine nicht möglich</h1>
                <img src="/img/access_denied.svg" className='h-96 w-96 m-auto' alt={""}></img>
            </div>
        </>
    )
}

export const Maschine = ({
                             data,
                             machines,
                             handleChange,
                             cycle,
                             tempData,
                             formatter,
                             ProductionRef,
                             onBuyM2,
                             onBuyM3
                         }) => {
    return (
        <>
            <div className="w-full" ref={ProductionRef}>
                <h1 className="my-5 text-3xl w-full text-center text-[#4fd1c5] font-bold">Produktion</h1>

                <div
                    className="flex w-full min-[1200px]:flex-nowrap max-[1200px]:flex-wrap flex-row justify-center overflow-x-hidden">
                    {data.stock.machine_1_space !== 0 ?
                        <MachineContainer name={machines[0].name} kapazität={machines[0].kapazität}
                                          handleChange={handleChange} workers_name={"planned_workers_1"}
                                          planned_production={cycle.planned_production_1}
                                          planned_production_name={"planned_production_1"} tempData={tempData}
                                          hasError={!(cycle.planned_workers_1 === Math.ceil((isNaN(cycle.planned_production_1) ? 0 : cycle.planned_production_1) / 20) && tempData.max_production >= tempData.overall_production && cycle.employees_count >= tempData.overall_workers)}
                                          workersAvailable={cycle.planned_workers_1 === parseInt(Math.ceil((isNaN(cycle.planned_production_1) ? 0 : cycle.planned_production_1) / 20)) && cycle.employees_count >= tempData.overall_workers}
                                          overallCost={formatter.format(data.scenario.machine_maintainance_cost1 + data.scenario.production_cost_per_sneaker1 * (isNaN(cycle.planned_production_1) ? 0 : cycle.planned_production_1))}/>
                        : <BuyNewMachine ProductionRef={ProductionRef} onBuy={null}/>}

                    {data.stock.machine_2_space !== 0 ?
                        <MachineContainer name={machines[1].name} kapazität={machines[1].kapazität}
                                          handleChange={handleChange} workers_name={"planned_workers_2"}
                                          planned_production={cycle.planned_production_2}
                                          planned_production_name={"planned_production_2"} tempData={tempData}
                                          hasError={!(cycle.planned_workers_2 === Math.ceil((isNaN(cycle.planned_production_2) ? 0 : cycle.planned_production_2) / 20) && tempData.max_production >= tempData.overall_production && cycle.employees_count >= tempData.overall_workers)}
                                          workersAvailable={cycle.planned_workers_2 === parseInt(Math.ceil((isNaN(cycle.planned_production_2) ? 0 : cycle.planned_production_2) / 20)) && cycle.employees_count >= tempData.overall_workers}
                                          overallCost={formatter.format(machines[1].costpp + machines[1].fertigungskostenpp * (isNaN(cycle.planned_production_2) ? 0 : cycle.planned_production_2))}/>
                        : cycle.buy_new_machine !== 0 ?
                            <NewMachineBuyed ProductionRef={ProductionRef}/> : data.scenario.machine_purchase_allowed ?
                                <BuyNewMachine ProductionRef={ProductionRef} onBuy={onBuyM2}/> :
                                <NoMachineBuy ProductionRef={ProductionRef}/>}

                    {data.stock.machine_3_space !== 0 ?
                        <MachineContainer name={machines[2].name} kapazität={machines[2].kapazität}
                                          handleChange={handleChange} workers_name={"planned_workers_3"}
                                          planned_production={cycle.planned_production_3}
                                          planned_production_name={"planned_production_3"} tempData={tempData}
                                          hasError={!(cycle.planned_workers_3 === Math.ceil((isNaN(cycle.planned_production_3) ? 0 : cycle.planned_production_3) / 20) && tempData.max_production >= tempData.overall_production && cycle.employees_count >= tempData.overall_workers)}
                                          workersAvailable={cycle.planned_workers_3 === parseInt(Math.ceil((isNaN(cycle.planned_production_3) ? 0 : cycle.planned_production_3) / 20)) && cycle.employees_count >= tempData.overall_workers}
                                          overallCost={formatter.format(machines[2].costpp + machines[2].fertigungskostenpp * (isNaN(cycle.planned_production_3) ? 0 : cycle.planned_production_3))}/>
                        : data.stock.machine_2_space === 0 ?
                            <></> : cycle.buy_new_machine !== 0 ?
                                <NewMachineBuyed ProductionRef={ProductionRef}/> : data.stock.machine_2_space === 0 ?
                                    <></> : data.scenario.machine_purchase_allowed ?
                                        <BuyNewMachine ProductionRef={ProductionRef} onBuy={onBuyM3}/> :
                                        <NoMachineBuy ProductionRef={ProductionRef}/>}
                </div>
            </div>
        </>
    )
}

