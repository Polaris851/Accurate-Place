import { useMemo } from "react";
import { api } from "../../../lib/axios";
import { useLazy } from "../../../hooks/use-lazy";

export interface Client {
    id: number,
    name: string,
    email: string,
    phone: string,
    cpf: string
}

export function useClients() {
    const { data, isLoading } = useLazy({
        fn: () => api.get<Client[]>('/client')
    })
    
    const clients = useMemo(() => {
        return data?.data;
    }, [data]);
    
    return {
        clients,
        isLoading
    }
}