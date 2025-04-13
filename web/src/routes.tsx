import { Route, Routes } from "react-router";
import { HostsPage } from "./pages/hosts/page";

export function RouteManager() {
    return (
        <Routes>
            <Route path="/" element={<HostsPage/>} />
        </Routes>
    )
}