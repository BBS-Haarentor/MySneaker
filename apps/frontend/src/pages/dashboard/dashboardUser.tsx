import GameBoxComponent from "../../components/game/GameBox";

const DashboardUser = () => {
    return (
        <>
            <div className="w-full">
                <h1 className={"ml-5 mt-10 text-2xl font-bold"}>Moin, User</h1>

                <div className={"flex py-5 flex-row flex-wrap w-full px-5"}>
                    <div className={"lg:w-1/2 w-full"}>
                        <h1 className={"text-xl"}>Meine Aktiven Spiele</h1>
                        <div className="flex flex-row flex-wrap mt-5">
                            <GameBoxComponent game={{
                                cycle_index: 1,
                                description: "",
                                name: "FA3A-B",
                                status: "",
                                id: 0,
                            }}/>
                        </div>
                    </div>
                    <div className={"lg:w-1/2 w-full"}>
                        <h1 className={"text-xl"}>Neuigkeiten</h1>
                        <div className="flex flex-row flex-wrap mt-5">
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardUser;