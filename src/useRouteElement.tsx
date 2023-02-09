import { Navigate, Outlet, useRoutes } from "react-router-dom";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterComponent from "./loyouts/RegisterComponent";
import MainLayout from "./loyouts/MainLayout";
import Profile from "./pages/Profile";
import { useContext } from "react";
import { AppContext } from "./contexts/context";
import path from "./untils/constant";

function ProtectedRoute() {
    const { isAuthenticated } = useContext(AppContext);

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

function RejtectedRoute() {
    const { isAuthenticated } = useContext(AppContext);
    return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default function useRouteElement() {
    const routeElement = useRoutes([
        {
            path: "",
            index: true,
            element: (
                <MainLayout>
                    <ProductList />
                </MainLayout>
            ),
        },
        {
            path: "",
            element: <ProtectedRoute />,
            children: [
                {
                    path: path.profile,
                    element: (
                        <MainLayout>
                            <Profile />
                        </MainLayout>
                    ),
                },
            ],
        },
        {
            path: "",
            element: <RejtectedRoute />,
            children: [
                {
                    path: path.login,
                    element: (
                        <RegisterComponent>
                            <Login />
                        </RegisterComponent>
                    ),
                },
                {
                    path: path.register,
                    element: (
                        <RegisterComponent>
                            <Register />
                        </RegisterComponent>
                    ),
                },
            ],
        },
    ]);
    return routeElement;
}
