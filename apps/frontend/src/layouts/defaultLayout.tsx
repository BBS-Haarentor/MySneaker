import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
      <div className={"w-full h-screen overflow-y-auto dark:bg-primary-dark bg-primary-light dark:text-white"}>
        <Outlet />
      </div>
    </>
  );
};

export default DefaultLayout;