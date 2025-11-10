import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivetRoutes from "./PrivetRoutes";
import AddProperty from "../Pages/AddPropertis/AddProperties";
import MyProperties from "../Pages/MyProperty/MyProperties";
import UpdateProperty from "../Components/Update-Property/UpdateProperty";
import ViewDetails from "../Components/View-Details/ViewDetails";
import MyRatings from "../Pages/My-Ratting/MyRatings";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: '/login',
                Component: Login,
            },
            {
                path: '/signUp',
                Component: SignUp
            },
            {
                path: '/add-properties',
                element: <PrivetRoutes>
                    <AddProperty></AddProperty>
                </PrivetRoutes>
            },
            {
                path: '/my-properties',
                element: <PrivetRoutes>
                    <MyProperties></MyProperties>
                </PrivetRoutes>
            },
            {
                path: '/update-property/:id',
                element: <PrivetRoutes>
                    <UpdateProperty></UpdateProperty>
                </PrivetRoutes>
            },
            {
                path: '/property/:id',
                element: <PrivetRoutes>
                    <ViewDetails></ViewDetails>
                </PrivetRoutes>
            },
            {
                path: '/my-ratings',
                element: <PrivetRoutes>
                    <MyRatings></MyRatings>
                </PrivetRoutes>
            }
        ]
    }
])
export default router;