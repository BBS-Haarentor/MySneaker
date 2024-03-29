import React from 'react'
import BaseContainer from '../baseComponents/BaseContainer'
import Spacer from '../baseComponents/Spacer'
import TextOutput from '../baseComponents/TextOutput'
import Sneaker from '../../../assets/img/container/sneaker.svg';
import Paint from '../../../assets/img/container/paint.svg';

const Lager = ({LagerRef, data, cycle,scenario,tempData, formatter }) => {

    return (
        <>
            <div className="w-full" ref={LagerRef}>
                <h1 className="my-5 text-3xl w-full text-center text-[#4fd1c5] font-bold">Lager</h1>
                <div className="flex min-[1250px]:justify-center space-x-8 items-center flex-nowrap overflow-x-auto">
                    <BaseContainer title="Sneaker" imageSrc={Sneaker}>
                        <Spacer/>
                            <TextOutput value={data.sneaker_count} text="Sneaker im Lager"/>
                            <TextOutput value={cycle.buy_sneaker} text="Sneaker werden gekauft"/>
                            <TextOutput value={data.sneaker_count + (isNaN(cycle.buy_sneaker) ? 0 : cycle.buy_sneaker)} text="Sneaker gesamt Verfügbar"/>
                            <TextOutput value={tempData.overall_production} text="Sneaker Verbraucht (PLAN)"/>
                        <Spacer/>
                            <TextOutput value={(data.sneaker_count + (isNaN(cycle.buy_sneaker) ? 0 : cycle.buy_sneaker)) - tempData.overall_production} text="Sneaker im Lager (PLAN)"/>
                    </BaseContainer>
                    <BaseContainer title="Farben" imageSrc={Paint}>
                        <Spacer/>
                            <TextOutput value={data.paint_count} text="Farben im Lager"/>
                            <TextOutput value={cycle.buy_paint} text="Farben werden gekauft"/>
                            <TextOutput value={data.paint_count + (isNaN(cycle.buy_paint) ? 0 : cycle.buy_paint)} text="Farben gesamt Verfügbar"/>
                            <TextOutput value={tempData.overall_production * 2} text="Farben Verbraucht (PLAN)"/>
                        <Spacer/>
                            <TextOutput value={(data.paint_count + (isNaN(cycle.buy_paint) ? 0 : cycle.buy_paint)) - tempData.overall_production*2} text="Farben im Lager (PLAN)"/>
                    </BaseContainer>
                    <BaseContainer title="Fertige Sneaker" imageSrc={Sneaker}>
                        <Spacer/>
                            <TextOutput value={data.finished_sneaker_count} text="Sneaker im Lager"/>
                            <TextOutput value={tempData.overall_production} text="Sneaker werden Produziert"/>
                            <TextOutput value={data.finished_sneaker_count + tempData.overall_production} text="Sneaker gesamt Verfügbar"/>
                            <TextOutput value={cycle.sales_planned + cycle.tender_offer_count} text="Sneaker Verbraucht (PLAN)"/>
                        <Spacer/>
                            <TextOutput value={data.finished_sneaker_count +tempData.overall_production - Math.round(cycle.sales_planned + cycle.tender_offer_count)} text="Sneaker im Lager (PLAN)"/>
                    </BaseContainer>
                </div>

                <h1 className="my-5 text-3xl w-full text-center text-[#4fd1c5] font-bold">Lager Kosten</h1>
                <div className="flex min-[1250px]:justify-center space-x-8 items-center flex-nowrap overflow-x-auto">
                    <div className="dark:bg-[#1f2733] flex-shrink-0 w-72 min-h-60 rounded-xl max-[1250px]:mx-5 drop-shadow-xl bg-white mb-5">
                        <img src={Sneaker} alt="Sneaker" className="w-40 h-50 mx-auto my-5"/>
                        <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">Sneaker</h1>
                        <div className="w-[90%] h-[2px] rounded-full dark:bg-white bg-black m-auto my-2"></div>
                        <p className="my-2 text-center dark:text-white text-xl">{formatter.format(scenario.storage_fee_sneaker)} pro Stück</p>
                        <p className="my-2 text-center dark:text-white text-xl">{formatter.format(((data.sneaker_count + (isNaN(cycle.buy_sneaker) ? 0 : cycle.buy_sneaker)) - tempData.overall_production) * scenario.storage_fee_sneaker)} Lagerkosten (PLAN)</p>
                        <p className="my-2 text-center dark:text-white text-xl">{formatter.format((data.sneaker_count +(isNaN(cycle.buy_sneaker) ? 0 : cycle.buy_sneaker) - tempData.overall_production) * scenario.storage_fee_sneaker)} Lagerkosten (IST)</p>
                    </div>
                    <div className="dark:bg-[#1f2733] flex-shrink-0 w-72 min-h-60 rounded-xl max-[620px]:mx-5 drop-shadow-xl bg-white mb-5">
                        <img src={Paint} alt="Sneaker" className="w-40 h-36 mx-auto my-5"/>
                        <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">Farben</h1>
                        <div className="w-[90%] h-[2px] rounded-full dark:bg-white bg-black m-auto my-2"></div>
                        <p className="my-2 text-center dark:text-white text-xl">{formatter.format(scenario.storage_fee_paint)} pro Stück</p>
                        <p className="my-2 text-center dark:text-white text-xl">{formatter.format(((data.paint_count + (isNaN(cycle.buy_paint) ? 0 : cycle.buy_paint)) - tempData.overall_production * 2)*scenario.storage_fee_paint)} Lagerkosten (PLAN)</p>
                        <p className="my-2 text-center dark:text-white text-xl">{formatter.format((data.paint_count + (isNaN(cycle.buy_paint) ? 0 : cycle.buy_paint) - tempData.overall_production * 2)*scenario.storage_fee_paint)} Lagerkosten (IST)</p>
                    </div>
                    <div className="dark:bg-[#1f2733] flex-shrink-0 w-72 min-h-60 rounded-xl max-[620px]:mx-5 drop-shadow-xl bg-white mb-5">
                        <img src={Sneaker} alt="Sneaker" className="w-40 h-50 mx-auto my-5"/>
                        <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">Fertige Sneaker</h1>
                        <div className="w-[90%] h-[2px] rounded-full dark:bg-white bg-black m-auto my-2"></div>
                        <p className="my-2 text-center dark:text-white text-xl">{formatter.format(scenario.storage_fee_finished_sneaker)} pro Stück</p>
                        <p className="my-2 text-center dark:text-white text-xl">{formatter.format((data.finished_sneaker_count + tempData.overall_production - Math.round((cycle.sales_planned + cycle.tender_offer_count)))* scenario.storage_fee_finished_sneaker)} Lagerkosten (PLAN)</p>
                        <p className="my-2 text-center dark:text-white text-xl">{formatter.format((data.finished_sneaker_count + tempData.overall_production) * 8)} Lagerkosten (IST)</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Lager