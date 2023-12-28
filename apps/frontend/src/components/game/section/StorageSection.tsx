import GameSectionTitle from "../GameSectionTitle";
import GameSectionBoxComponent from "../GameSectionBox";
import GameSectionBoxContainerComponent from "../GameSectionBoxContainer";
import { PaintImage, SneakerImage } from "assets";
import Spacer from "../Spacer";
import TextOutput from '../TextOutput';

const StorageSectionComponent = () => {
  return (
    <>
      <div className={"w-full block"}>
        <GameSectionTitle name={"Lager"} />
        <GameSectionBoxContainerComponent>
          <GameSectionBoxComponent className={"w-72"}>
            <SneakerImage className="w-40 h-36 mx-auto my-5" />
            <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">
              Sneaker
            </h1>
            <Spacer />
            <TextOutput value={4} text="Sneaker im Lager" />
            <TextOutput value={4} text="Sneaker werden gekauft" />
            <TextOutput value={4} text="Sneaker gesamt Verfügbar" />
            <TextOutput value={0} text="Sneaker Verbraucht (PLAN)" />
            <Spacer />
            <TextOutput value={0} text="Sneaker im Lager (PLAN)" />
          </GameSectionBoxComponent>
          <GameSectionBoxComponent className={"w-72"}>
            <PaintImage className="w-40 h-36 mx-auto my-5" />
            <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">
              Farben
            </h1>
            <Spacer/>
            <TextOutput value={4} text="Farben im Lager"/>
            <TextOutput value={4} text="Farben werden gekauft"/>
            <TextOutput value={4} text="Farben gesamt Verfügbar"/>
            <TextOutput value={0} text="Farben Verbraucht (PLAN)"/>
            <Spacer/>
            <TextOutput value={4} text="Farben im Lager (PLAN)"/>
          </GameSectionBoxComponent>
          <GameSectionBoxComponent className={"w-72"}>
            <SneakerImage className="w-40 h-36 mx-auto my-5" />
            <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">
              Sneaker
            </h1>
            <Spacer/>
            <TextOutput value={0} text="Sneaker im Lager"/>
            <TextOutput value={0} text="Sneaker werden Produziert"/>
            <TextOutput value={0} text="Sneaker gesamt Verfügbar"/>
            <TextOutput value={0} text="Sneaker Verbraucht (PLAN)"/>
            <Spacer/>
            <TextOutput value={0} text="Sneaker im Lager (PLAN)"/>
          </GameSectionBoxComponent>
        </GameSectionBoxContainerComponent>
      </div>
    </>
  );
};

export default StorageSectionComponent;
