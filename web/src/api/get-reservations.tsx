import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { useMemo } from "react";
import { Reservation } from "../types";

interface GetReservationOptions {
    hostId?: string | number;
}

export function useReservations(options?: GetReservationOptions) {
    const { hostId } = options ?? {};

    const queryInfo = useQuery({
        queryKey: ["reservations"],
        queryFn: () => api.get<Reservation[]>("/reservation")
    });

    const reservations = useMemo(() => {
        return queryInfo?.data?.data ?? [];
    }, [queryInfo.data]);

    return {
        ...queryInfo,
        reservations
    };
}