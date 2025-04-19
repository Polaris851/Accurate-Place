import { useMemo } from "react";
import { api } from "../../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../../auth/use-auth";

export function useUser(userId?: number) {
    const queryInfo = useQuery({
        queryKey: ["user", userId],
        queryFn: () => api.get<User>(`/client/${userId}`)
    });
    
    const user = useMemo(() => {
        return queryInfo.data?.data ?? undefined;
    }, [queryInfo.data]);

    return {
        ...queryInfo,
        user
    };
}