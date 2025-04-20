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

interface Options {
    range?: {
        from: Date;
        to: Date;
    }
}

export function useHosts(options?: Options) {
    const { range } = options ?? {};

    const startDate = useMemo(() => {
        if (range?.from === undefined) {
            return;
        }

        return `${range.from.getFullYear()}-${range.from.getMonth() + 1}-${range.from.getDate()}`;
    }, [range]);

    const endDate = useMemo(() => {
        if (range?.to === undefined) {
            return;
        }

        return `${range.to.getFullYear()}-${range.to.getMonth() + 1}-${range.to.getDate()}`;
    }, [range]);

    const key = useMemo(() => {
        if (startDate === undefined || endDate === undefined) {
            return ["hosts"];
        }

        return ["hosts", { startDate, endDate }];
    }, [startDate, endDate]);

    const queryInfo = useQuery({
        queryKey: key,
        queryFn: () => api.get<Host[]>(`/host`, {
            params: {
                start_date: startDate,
                end_date: endDate
            }
        })
    })
    
    const hosts = useMemo(() => {
        return queryInfo.data?.data ?? [];
    }, [queryInfo.data]);

    return {
        ...queryInfo,
        hosts
    };
}