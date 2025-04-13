import { Route, Routes } from "react-router";
import { HostsPage } from "./pages/hosts/page";
import { HostPage } from "./pages/host/page";

export function RouteManager() {
    return (
        <Routes>
            <Route path="/" element={<HostsPage/>} />
            <Route path="/host/:hostId" element={<HostPage/>} />
        </Routes>
    )
}