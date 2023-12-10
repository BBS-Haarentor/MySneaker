import {Outlet} from "react-router-dom";
import DashboardSidebar from './sidebar/dashboardSidebar';

const DashboardLayout = () => {
    return (
        <>
            <div className={"w-full h-[100svh] overflow-y-auto dark:bg-primary-dark bg-primary-light dark:text-white"}>
                <div className={"flex flex-row w-full"}>
                    <DashboardSidebar/>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export default DashboardLayout;