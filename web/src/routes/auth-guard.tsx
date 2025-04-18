import { Navigate, Outlet } from "react-router";
import { useMe } from "../auth/get-me";
import { Spinner } from "@heroui/react";
import { useEffect } from "react";
import { useAuth } from "../auth/use-auth";

export function AuthGuard() {
    const { isLoading, user } = useMe();

    const { setUser } = useAuth();

    useEffect(() => {
        console.log(user);
        setUser(user);
    }, [user]);

    if (isLoading) {
        return <Spinner/>
    }

    if (user === null) {
        localStorage.clear();
        return <Navigate to={"/login"} />
    }

    return <Outlet />
}