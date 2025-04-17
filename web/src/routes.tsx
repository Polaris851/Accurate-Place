import { Route, Routes } from "react-router";
import { HostsPage } from "./pages/hosts/page";
import { HostPage } from "./pages/host/page";
import { Login } from "./pages/login/page";
import { ClientsPage } from "./pages/clients/page";
import { Home } from "./pages/home/page";

export function RouteManager() {
    return (
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/home" element={<Home />} />
            <Route path="/host" element={<HostsPage/>} />
            <Route path="/host/:hostId" element={<HostPage/>} />
            <Route path="/client" element={<ClientsPage />} />
            {/* <Route path="/client/:clientId" element={<ClientsPage />} /> */}
            {/* <Route path="/reservation" element={<ClientsPage />} /> */}
            {/* <Route path="/reservation/:clientId" element={<ClientsPage />} /> */}
        </Routes>
    )
}