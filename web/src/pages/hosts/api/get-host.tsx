import { useMemo } from "react";
import { useLazy } from "../../../hooks/use-lazy";
import { api } from "../../../lib/axios";
import { Host } from "./get-hosts";

export function useHost(hostId?: number) {
    const queryInfo = useLazy({
        fn: () => api.get<Host>(`/host/${hostId}`)
    });

    const host = useMemo(() => {
        return queryInfo.data?.data;
    }, [queryInfo.data]);

    return {
        host,
        ...queryInfo
    };
}