import { Link } from 'react-router-dom';
import BasicLine from '../../components/line/BasicLine';
import BasicItems from '../../components/sidebar/BasicItems';
import { useState } from 'react';

const DashboardSidebar = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  const updateSidebarToggle = () => {
    setSidebarToggle(!sidebarToggle);
  }

  return (
    <>
      {/* Toggle Sidebar */}
      <div className="absolute right-[10px] top-[10px] z-20 min-[900px]:hidden">
        <button
          id="sidebarToggle"
          onClick={() => updateSidebarToggle()}
          type="button"
          className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={"w-5 h-5" + (sidebarToggle ? " hidden" : "")}
            fill="currentColor"
            viewBox="0 0 448 512"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={"w-5 h-5" + (sidebarToggle ? "" : " hidden")}
            fill="currentColor"
            viewBox="0 0 384 512"
          >
            <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
          </svg>
        </button>
      </div>



      <aside
        className={
          "flex flex-col w-64 h-[100svh] px-4 py-8 overflow-y-auto border-r rtl:border-r-0 rtl:border-l dark:border-gray-700 dark:bg-primary-dark" + (sidebarToggle ? " max-[900px]:absolute z-10" : " max-[900px]:hidden min-[900px]:flex")
        }
      >
        <Link to="/">
          <h1 className={"font-bold text-xl"}>MySneaker</h1>
        </Link>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <BasicItems
              title={"Dashboard"}
              to={"/dashboard"}
              iconName={"house"}
            />

            <BasicItems
              title={"Lehrer Dashboard"}
              to={"/dashboard/teacher"}
              iconName={"house"}
            />

            <BasicItems
              title={"Admin Dashboard"}
              to={"/dashboard/admin"}
              iconName={"house"}
            />

            <BasicLine />

            <BasicItems
              title={"Einstellungen"}
              to={"/dashboard/settings"}
              iconName={"gearWheel"}
            />
          </nav>

          <BasicItems title={"Abmelden"} to={"/logout"} iconName={"turnOff"} />
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;