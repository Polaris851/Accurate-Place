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

export interface User {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
    phone: string;
    cpf: string;
}

export interface Reservation {
    id: number;
    client_id: number;
    host_id: number;
    start_date: string | Date;
    end_date: string | Date;
    total_price: number;
    status: string;

    client?: User;
    host?: Host;
}