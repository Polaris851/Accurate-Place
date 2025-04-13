import { useMemo } from "react";
import { api } from "../../../lib/axios";
import { useLazy } from "../../../hooks/use-lazy";

export interface Host {
    id: number,
    name: string,
    type: string,
    description: string | null,
    hourly_price: number,
    min_time: number,
    max_time: number
}

export function useHosts() {
    const { data, isLoading } = useLazy({
        fn: () => api.get<Host[]>('/host')
    })
    
    const hosts = useMemo(() => {
        return data?.data;
    }, [data]);
    
    return {
        hosts,
        isLoading
    }
}