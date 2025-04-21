import { ReservationsTable } from "../hosts/admin/host/components/reservations-table";
import { useMyReservations } from "./api/get-my-reservations";

export function MyReservations() {
    const { reservations, refetch, isLoading } = useMyReservations();

    return (
        <div className={"bg-zinc-950 px-4 md:pt-10 pt-4"}>
            <div className={"md:bg-zinc-800 max-w-6xl md:p-8 mx-auto rounded-lg"}>
                <h1 className={"text-3xl text-zinc-100 font-semibold mb-4"}>Minhas reservas</h1>
                <ReservationsTable
                    isLoading={isLoading}
                    reservations={reservations}
                    onCancel={refetch}
                />
            </div>
        </div>
    )
}