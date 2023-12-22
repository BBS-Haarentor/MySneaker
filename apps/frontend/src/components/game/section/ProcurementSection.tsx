import GameSectionBoxComponent from "../GameSectionBox";
import GameSectionTitle from "../GameSectionTitle";
import {SneakerImage} from 'assets';

const ProcurementSectionComponent = () => {
    return (
        <>
            <div className={""}>
                <GameSectionTitle name={"Beschaffung"}/>
                <GameSectionBoxComponent>
                    <SneakerImage className="w-40 h-auto mx-auto my-5"/>
                    <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">Sneaker</h1>
                    <div className="text-center my-7 dark:text-[#D7D7D7]">
                        <p className="text-[20px] font-medium">10,00 Euro</p>
                        <p className="text-[18px] font-medium">pro Sneaker</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="fill-[#4fd1c5] w-8 cursor-pointer"
                             viewBox="0 0 448 512">
                            <path
                                d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                        </svg>
                        <input
                            className="border-2 mx-5 text-center border-[#4fd1c5] dark:text-white rounded-full w-16 dark:bg-[#1f2733]"
                            name="buy_sneaker" min="0" type="number" value={4}/>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="fill-[#4fd1c5] w-8 cursor-pointer"
                             viewBox="0 0 448 512">
                            <path
                                d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                        </svg>
                    </div>
                    <p className="dark:text-[#D7D7D7] w-72 text-2xl text-center my-5 truncate">30,00 Euro</p>
                </GameSectionBoxComponent>
            </div>
        </>
    )
}

export default ProcurementSectionComponent;