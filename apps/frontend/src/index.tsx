import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/errorPage";
import DefaultLayout from "./layouts/defaultLayout";
import HomePage from "./pages/homePage";
import {Provider} from "react-redux";
import store from "./features/store/store";
import SignUpPage from "./pages/auth/singUpPage";
import SignInPage from "./pages/auth/singInPage";
import DashboardUser from "./pages/dashboard/dashboardUser";
import DashboardLayout from "./layouts/dashboardLayout";
import DashboardTeacher from "./pages/dashboard/dashboardTeacher";
import DashboardAdmin from "./pages/dashboard/dashboardAdmin";
import UserSettings from "./pages/dashboard/userSettings";
import {ToastContainer} from "react-toastify";
import "./ReactToastify.css";
import {QueryClient, QueryClientProvider} from 'react-query';
import GamePage from "./pages/dashboard/gamePage";
import Logo from "react-query/types/devtools/Logo";
import LogoutPage from "./pages/LogoutPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "",
                element: <HomePage/>,
            },
            {
                path: "signin",
                element: <SignInPage/>,
            },
            {
                path: "signup",
                element: <SignUpPage/>,
            },
        ],
    },
    {
        path: "/dashboard",
        element: <DashboardLayout/>,
        children: [
            {
                index: true,
                path: "",
                element: <DashboardUser/>,
            },
            {
                path: "game/:gameId",
                element: <GamePage/>
            },
            {
                path: "teacher",
                element: <DashboardTeacher/>,
            },
            {
                path: "admin",
                element: <DashboardAdmin/>,
            },
            {
                path: "settings",
                element: <UserSettings/>,
            },
        ],
    },
    {
        path: "logout",
        element: <LogoutPage/>
    }
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <ToastContainer
                toastClassName={
                    "dark:text-white dark:bg-secondary-dark dark:fill-white"
                }
                closeButton={false}
                position={"top-right"}
            />
            <RouterProvider router={router}/>
        </QueryClientProvider>
    </Provider>,
);

reportWebVitals();
