import { useMemo } from "react";
import { api } from "../../../lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface User {
    id: number,
    name: string,
    email: string,
    phone: string,
    cpf: string,
}

export function useUsers() {
    const queryInfo = useQuery({
        queryKey: ["users"],
        queryFn: () => api.get<User[]>('/client')
    })
    
    const users = useMemo(() => {
        return queryInfo.data?.data ?? [];
    }, [queryInfo.data]);

    return {
        ...queryInfo,
        users
    };
}