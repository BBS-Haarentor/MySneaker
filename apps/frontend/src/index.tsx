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
import DashboardPage from "./pages/dashboardPage";
import DashboardLayout from "./layouts/dashboardLayout";

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
            }
        ],
    },
    {
        path: "/dashboard",
        element: <DashboardLayout/>,
        children: [
            {
                path: "",
                element: <DashboardPage/>,
            },
        ]
    }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>
    </Provider>
);

reportWebVitals();
