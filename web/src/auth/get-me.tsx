import { useMemo } from "react";
import { api } from "../lib/axios";
import { User } from "./use-auth";
import { useQuery } from "@tanstack/react-query";

export function useMe() {
    const queryInfo = useQuery({
        queryKey: ["me"],
        queryFn: () => api.get<{ user: User }>("/me")
    });

    const user = useMemo(() => {
        return queryInfo.data?.data?.user ?? null;
    }, [queryInfo.data]);

    return {
        ...queryInfo,
        user
    };
}