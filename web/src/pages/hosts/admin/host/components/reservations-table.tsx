import { useMemo } from "react";
import { DataTable } from "../../../../../components/data-table";
import { Reservation } from "../../../../../types";
import { User } from "@heroui/react";
import { formatCurrency } from "../../../../../utils/format-currency";
import { CancelReservationAction } from "./cancel-reservation-action";
import { ReservationStatus } from "./reservation-status";

interface ReservationsTableProps {
    reservations: Reservation[];
    onCancel?: () => void;
}

export function ReservationsTable(props: ReservationsTableProps) {
    const { reservations, onCancel } = props;

    const rows = useMemo(() => {
        return reservations.map((reservation) => ({
            id: reservation.id,
            client: (
                <User
                    name={reservation.client?.name}
                    avatarProps={{
                        showFallback: true,
                        src: `https://robohash.org/${reservation.client?.id}`
                    }}
                />
            ),
            clientName: reservation.client?.name,
            clientEmail: reservation.client?.email,
            host: reservation.host?.name,
            start_date: new Date(reservation.start_date).toLocaleDateString("pt-BR"),
            end_date: new Date(reservation.end_date).toLocaleDateString("pt-BR"),
            total_price: formatCurrency(reservation.total_price),
            status: <ReservationStatus status={reservation.status}/>,
            actions: <CancelReservationAction disabled={reservation.status === "canceled"} reservationId={reservation.id} onCancel={onCancel} />
        }))
    }, [reservations]);

    return (
        <DataTable
            columns={[
                {
                    key: "client",
                    label: "Usuário"
                },
                {
                    key: "host",
                    label: "Nome da Locação"
                },
                {
                    key: "start_date",
                    label: "Check-in"
                },
                {
                    key: "end_date",
                    label: "Check-out"
                },
                {
                    key: "total_price",
                    label: "Preço total"
                },
                {
                    key: "status",
                    label: "Status"
                },
                {
                    key: "actions",
                    label: "Ações"
                }
            ]}
            rows={rows}
            searchBy={["clientName", "clientEmail", "start_date", "end_date", "total_price"]}
            emptyContentMessage={"Nenhum dado de reserva encontrado"}
        />
    )
}