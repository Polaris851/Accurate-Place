import { Route, Routes } from "react-router";
import { HostsPage } from "./pages/hosts/page";
import { HostPage } from "./pages/host/page";
import { Login } from "./pages/login/page";
import { UsersPage } from "./pages/users/page";

export function RouteManager() {
    return (
        <Routes>
            {/* <Route path="/" element={<Login/>} /> */}
            <Route path="/" element={<HostsPage/>} />
            <Route path="/host/:hostId" element={<HostPage/>} />
            <Route path="/users" element={<UsersPage />} />
        </Routes>
    )
}