import { Route, Routes } from "react-router-dom"
import { LoginPage } from "../../pages/LoginPage"
import { RegisterPage } from "../../pages/RegisterPage"
import { DashboardPage } from "../../pages/DashboardPage"
import { ProtectedRoutes } from "../../components/ProtectedRoutes"

export const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<ProtectedRoutes />}>
                <Route index element={<DashboardPage />} />
            </Route>
        </Routes>
    )
}