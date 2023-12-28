import ProcurementSection from "../../components/game/section/ProcurementSection";
import StorageSectionComponent from "../../components/game/section/StorageSection";
import StorageCostSection from '../../components/game/section/StorageCostSection';

const GamePage = () => {
  return (
    <>
      <div className="w-full h-screen overflow-y-auto">
        <div
          className={
            "w-full overflow-x-hidden overflow-y-auto flex flex-wrap flex-row justify-center h-full"
          }
        >
          <ProcurementSection />
          <StorageSectionComponent />
          <StorageCostSection />
        </div>
      </div>
    </>
  );
};

export default GamePage;
