import { Route, Routes } from "react-router";
import { HostsPage } from "../pages/hosts/client-page/page";
import { HostPage } from "../pages/hosts/details/page";
import { Home } from "../pages/home/page";
import { Login } from "../pages/login/page";
import { AuthGuard } from "./auth-guard";
import { GuestGuard } from "./guest-guard";
import { AdminHostsPage } from "../pages/hosts/admin/page";
import { AdminGuard } from "./admin-guard";
import { AdminUsersPage } from "../pages/users/admin/page";
import { UserPage } from "../pages/users/details/page";
import { Register } from "../pages/register/page";
import { AdminHostPage } from "../pages/hosts/admin/host/page";

export function RouteManager() {
    return (
        <Routes>
            <Route element={<GuestGuard />}>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<AuthGuard />}>
                <Route path="/" element={<HostsPage/>} />
                <Route path="/host/:hostId" element={<HostPage/>} />
                <Route path="/client/:userId" element={<UserPage/>} />

                <Route element={<AdminGuard />}>
                    <Route path={"/admin"} element={<Home />} />
                    <Route path={"/admin/hosts"} element={<AdminHostsPage />} />
                    <Route path={"/admin/hosts/:hostId"} element={<AdminHostPage />} />
                    <Route path={"/admin/clients"} element={<AdminUsersPage />} />
                </Route>
            </Route>
        </Routes>
    )
}