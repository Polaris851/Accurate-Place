import { Navigate, Outlet } from "react-router";
import { useMe } from "../auth/get-me";
import { Spinner } from "@heroui/react";
import { useEffect } from "react";
import { useAuth } from "../auth/use-auth";
import { MainNavBar } from "../components/navbar/main-navbar";

export function AuthGuard() {
    const { isLoading, user } = useMe();

    const { setUser } = useAuth();

    useEffect(() => {
        setUser(user);
    }, [user]);

    if (isLoading) {
        return <Spinner />
    }

    if (user === null) {
        localStorage.clear();
        return <Navigate to={"/login"} />
    }

    return (
        <>
            <MainNavBar />
            <Outlet />
        </>
    );
}