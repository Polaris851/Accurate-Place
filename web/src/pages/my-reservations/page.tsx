import { ReservationsTable } from "../hosts/admin/host/components/reservations-table";
import { useMyReservations } from "./api/get-my-reservations";

export function MyReservations() {
    const { reservations } = useMyReservations();

    return (
        <div className="px-4 md:pt-10 pt-4">
            <h1 className={"text-3xl text-zinc-100 font-semibold mb-4"}>Minhas reservas</h1>
            <ReservationsTable
                reservations={reservations}
            />
        </div>
    )
}