import { useMemo } from "react";
import { api } from "../../../lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface Host {
    id: number,
    name: string,
    type: string,
    description: string | null,
    hourly_price: number,
    min_time: number,
    max_time: number,
    occupied_dates: string[]
}

export function useHosts() {
    const queryInfo = useQuery({
        queryKey: ["hosts"],
        queryFn: () => api.get<Host[]>('/host')
    })
    
    const hosts = useMemo(() => {
        return queryInfo.data?.data ?? [];
    }, [queryInfo.data]);

    return {
        ...queryInfo,
        hosts
    };
}