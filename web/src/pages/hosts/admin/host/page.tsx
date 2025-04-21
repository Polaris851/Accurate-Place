import { useParams } from "react-router"
import { useReservations } from "../../../../api/get-reservations";
import { ReservationsTable } from "./components/reservations-table";

export function AdminHostPage() {
    const { hostId } = useParams();

    const { reservations, isLoading, refetch } = useReservations({ hostId: hostId });

    return (
        <div className={"bg-zinc-950 px-4 md:pt-10 pt-4"}>
            <div className={"md:bg-zinc-800 max-w-6xl md:p-8 mx-auto rounded-lg"}>
                <h1 className={"text-3xl text-zinc-100 font-semibold mb-4"}>Reservas da locação</h1>
                <ReservationsTable
                    isLoading={isLoading}
                    reservations={reservations}
                    onCancel={refetch}
                />
            </div>
        </div>
    )
}