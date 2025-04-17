import { Route, Routes } from "react-router";
import { HostsPage } from "./pages/hosts/page";
import { HostPage } from "./pages/host/page";
import { ClientsPage } from "./pages/clients/page";

export function RouteManager() {
    return (
        <Routes>
            {/* <Route path="/" element={<Login/>} /> */}
            <Route path="/" element={<HostsPage/>} />
            <Route path="/host/:hostId" element={<HostPage/>} />
            <Route path="/client" element={<ClientsPage />} />
        </Routes>
    )
}