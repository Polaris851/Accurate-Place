import { Route, Routes } from "react-router";
import { HostsPage } from "../pages/hosts/page";
import { HostPage } from "../pages/host/page";
import { ClientsPage } from "../pages/clients/page";
import { Home } from "../pages/home/page";
import { Login } from "../pages/login/page";
import { AuthGuard } from "./auth-guard";
import { GuestGuard } from "./guest-guard";
import { AdminHostsPage } from "../pages/admin/hosts/page";
import { AdminGuard } from "./admin-guard";

export function RouteManager() {
    return (
        <Routes>
            <Route element={<GuestGuard />}>
                <Route path="/login" element={<Login/>} />
            </Route>
            <Route element={<AuthGuard />}>
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<HostsPage/>} />
                <Route path="/host/:hostId" element={<HostPage/>} />
                <Route path="/client" element={<ClientsPage />} />

                <Route element={<AdminGuard />}>
                    <Route path={"/admin/hosts"} element={<AdminHostsPage />} />
                </Route>
            </Route>
        </Routes>
    )
}