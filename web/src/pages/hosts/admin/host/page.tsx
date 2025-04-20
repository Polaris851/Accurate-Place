import { useParams } from "react-router"
import { useReservations } from "../../../../api/get-reservations";
import { ReservationsTable } from "./components/reservations-table";

export function AdminHostPage() {
    const { hostId } = useParams();

    const { reservations, isLoading } = useReservations({ hostId: hostId });

    console.log(reservations);

    if (isLoading) {
        return <p>loading</p>
    }

    return (
        <div className="px-4 md:pt-10 pt-4">
            <h1 className={"text-3xl text-zinc-100 font-semibold mb-4"}>Reservas da locação</h1>
            <ReservationsTable
                reservations={reservations}
            />
        </div>
    )
}