import { Navigate, Outlet } from "react-router";
import { useAuth } from "../auth/use-auth";

export function AdminGuard() {
    const { user } = useAuth();

    if (user !== null && !user?.is_admin) {
        return <Navigate to={"/"} />
    }

    return <Outlet />
}