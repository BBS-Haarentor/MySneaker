import {useSelector} from "react-redux";


const DashboardUser = () => {
    const {user} = useSelector((state: any) => state.user);

    console.log(user)

    return (
        <>
            <div className="w-full">
                <h1 className={"ml-5 mt-10 text-2xl font-bold"}>Moin, {user.username}</h1>

                <div className={"flex py-5 flex-row flex-wrap w-full px-5 space-x-5 lg:flex-nowrap"}>
                    <div className="w-1/3 min-h-[5rem] rounded-lg bg-secondary-dark">

                    </div>
                    <div className="w-1/3 min-h-[5rem] rounded-lg bg-secondary-dark">

                    </div>
                    <div className="w-1/3 min-h-[5rem] rounded-lg bg-secondary-dark">

                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardUser;