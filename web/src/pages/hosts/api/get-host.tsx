import { useMemo } from "react";
import { api } from "../../../lib/axios";
import { Host } from "./get-hosts";
import { useQuery } from "@tanstack/react-query";

export function useHost(hostId?: number | string) {
    const queryInfo = useQuery({
        queryKey: ["host", { hostId }],
        queryFn: () => api.get<Host>(`/host/${hostId}`),
        enabled: !!hostId
    });

    const host = useMemo(() => {
        return queryInfo.data?.data;
    }, [queryInfo.data]);

    return {
        host,
        ...queryInfo
    };
}