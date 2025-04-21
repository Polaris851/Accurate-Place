import { Navigate, Outlet } from "react-router";
import { useMe } from "../auth/get-me";
import { useEffect } from "react";
import { useAuth } from "../auth/use-auth";
import { MainNavBar } from "../components/navbar/main-navbar";
import { Loading } from "../components/skeleton-loading/loading";

export function AuthGuard() {
    const { isLoading, user } = useMe();

    const { setUser } = useAuth();

    useEffect(() => {
        setUser(user);
    }, [user]);

    if (isLoading) {
        return <Loading />
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