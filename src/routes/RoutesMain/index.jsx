import { Route, Routes } from "react-router-dom"
import { LoginPage } from "../../pages/LoginPage"
import { RegisterPage } from "../../pages/RegisterPage"
import { DashboardPage } from "../../pages/DashboardPage"

export const RoutesMain = ({user, setUser}) => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage setUser={setUser} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage user={user} setUser={setUser} />} />
        </Routes>
    )
}