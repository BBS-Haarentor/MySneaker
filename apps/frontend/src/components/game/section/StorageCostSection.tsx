import GameSectionTitle from "../GameSectionTitle";
import GameSectionBoxContainerComponent from '../GameSectionBoxContainer';
import GameSectionBoxComponent from '../GameSectionBox';
import {SneakerImage} from 'assets';
import Spacer from '../Spacer';
import TextOutput from '../TextOutput';

const StorageCostSection = () => {
  return (
    <>
      <div className={"w-full block"}>
        <GameSectionTitle name={"Lager Kosten"} />
        <GameSectionBoxContainerComponent>
          <GameSectionBoxComponent className={"w-72"}>
            <SneakerImage className="w-40 h-36 mx-auto my-5" />
            <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">
              Sneaker
            </h1>
            <Spacer/>
            <TextOutput text={"4,00 € pro Stück"}/>
            <TextOutput text={"640,00 € Lagerkosten (PLAN)"}/>
            <TextOutput text={"640,00 € Lagerkosten (IST)"}/>
          </GameSectionBoxComponent>
          <GameSectionBoxComponent className={"w-72"}>
            <SneakerImage className="w-40 h-36 mx-auto my-5" />
            <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">
              Farben
            </h1>
            <Spacer/>
            <TextOutput text={"4,00 € pro Stück"}/>
            <TextOutput text={"640,00 € Lagerkosten (PLAN)"}/>
            <TextOutput text={"640,00 € Lagerkosten (IST)"}/>
          </GameSectionBoxComponent>
          <GameSectionBoxComponent className={"w-72"}>
            <SneakerImage className="w-40 h-36 mx-auto my-5" />
            <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">
              Fertige Sneaker
            </h1>
            <Spacer/>
            <TextOutput text={"4,00 € pro Stück"}/>
            <TextOutput text={"0,00 € Lagerkosten (PLAN)"}/>
            <TextOutput text={"0,00 € Lagerkosten (IST)"}/>
          </GameSectionBoxComponent>
        </GameSectionBoxContainerComponent>
      </div>
    </>
  );
};

export default StorageCostSection;