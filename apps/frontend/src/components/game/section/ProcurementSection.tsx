import GameSectionBoxContainerComponent from "../GameSectionBoxContainer";
import GameSectionTitle from "../GameSectionTitle";
import { LessImage, MoreImage, PaintImage, SneakerImage } from 'assets';
import GameSectionBoxComponent from "../GameSectionBox";
import GameInput from '../../input/GameInput';
import currencyFormatter from '../../../hooks/currencyFormatter';

const ProcurementSectionComponent = () => {
  return (
    <>
      <div className="w-full">
        <GameSectionTitle name={"Beschaffung"} />
        <GameSectionBoxContainerComponent>
          <GameSectionBoxComponent className={"w-72"}>
            <SneakerImage className="w-40 h-auto mx-auto my-5" />
            <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">
              Sneaker
            </h1>
            <div className="text-center my-7 dark:text-[#D7D7D7]">
              <p className="text-[20px] font-medium">{currencyFormatter.format(10.00)}</p>
              <p className="text-[18px] font-medium">pro Sneaker</p>
            </div>
            <div className="flex items-center justify-center">
              <MoreImage className="fill-[#4fd1c5] w-8 cursor-pointer"/>

              <GameInput type={'number'} name={'buy_sneaker'} value={10} min={0} className="w-16 mx-5"/>

              <LessImage className="fill-[#4fd1c5] w-8 cursor-pointer"/>
            </div>
            <p className="dark:text-[#D7D7D7] w-full text-2xl text-center my-5 truncate">
              {currencyFormatter.format(40.00)}
            </p>
          </GameSectionBoxComponent>
          <GameSectionBoxComponent className={"w-72"}>
            <PaintImage className="w-40 h-36 mx-auto my-5" />
            <h1 className="text-[#4fd1c5] text-center text-2xl font-medium">
              Farben
            </h1>
            <div className="text-center my-7 dark:text-[#D7D7D7]">
              <p className="text-[20px] font-medium">{currencyFormatter.format(10.00)}</p>
              <p className="text-[18px] font-medium">pro Farbe</p>
            </div>
            <div className="flex items-center justify-center">
              <MoreImage className="fill-[#4fd1c5] w-8 cursor-pointer"/>

              <GameInput type={'number'} name={'buy_sneaker'} value={4} min={0} className="w-16 mx-5"/>

              <LessImage className="fill-[#4fd1c5] w-8 cursor-pointer"/>
            </div>
            <p className="dark:text-[#D7D7D7] w-full text-2xl text-center my-5 truncate">
              {currencyFormatter.format(40.00)}
            </p>
          </GameSectionBoxComponent>
        </GameSectionBoxContainerComponent>
        <p className="dark:text-white text-center text-xl font-medium mb-5">{currencyFormatter.format(80.00)} gesamt
          Werkstoffkosten</p>
      </div>
    </>
  );
};

export default ProcurementSectionComponent;
