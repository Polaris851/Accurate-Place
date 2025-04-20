import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/axios";
import { useMemo } from "react";
import { Reservation } from "../../../types";

export function useMyReservations() {
    const queryInfo = useQuery({
        queryKey: ["my-reservations"],
        queryFn: () => api.get<Reservation[]>("/reservation/my-reservations")
    });

    const reservations = useMemo(() => {
        return queryInfo.data?.data ?? [];
    }, [queryInfo.data]);

    return {
        ...queryInfo,
        reservations
    };
}