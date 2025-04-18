import { create } from "zustand";

export interface User {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
    phone: string;
    cpf: string;
}

interface AuthStore {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const useAuth = create<AuthStore>((set) => ({
    user: null,
    setUser(user) {
        set({ user });
    }
}));