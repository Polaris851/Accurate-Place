import { Navigate, Outlet } from "react-router";

export function GuestGuard() {
    const token = localStorage.getItem("access_token");
    
    if (Boolean(token)) {
        return <Navigate to={"/"} />
    }

    return <Outlet />
}