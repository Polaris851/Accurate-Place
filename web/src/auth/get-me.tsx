import { useMemo } from "react";
import { useLazy } from "../hooks/use-lazy";
import { api } from "../lib/axios";
import { User } from "./use-auth";

export function useMe() {
    const info = useLazy({
        fn: () => api.get<{ user: User }>("/me")
    });

    const user = useMemo(() => {
        return info.data?.data?.user ?? null;
    }, [info.data]);

    return {
        ...info,
        user
    };
}