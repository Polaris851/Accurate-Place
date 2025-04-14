import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { CheckInOut } from "./check-in-out";
import { Button } from "../../../components/button";
import toast from "react-hot-toast";
import { api } from "../../../lib/axios";
import { useParams } from "react-router";

interface MakeReservationProps {
    occupiedDates: string[]
}

export function MakeReservation({ occupiedDates }: MakeReservationProps) {
    const { hostId } = useParams();

    const [range, setRange] = useState<DateRange | undefined>();

    function makeReservation() {
        if (hostId === undefined) {
            return;
        }

        toast.promise(() => api.post("/reservation", {
            client_id: 7,
            host_id: +hostId,
            start_date: range?.from,
            end_date: range?.to,
            status: "foo"
        }), {
            loading: "Criando reserva!",
            success: "Tudo certo com a sua reserva!",
            error: "Houve um erro ao criar a sua reserva :("
        })
    }

    if (!hostId) {
        return;
    }

    return (
        <div className={"flex flex-col gap-2"}>
            <DayPicker
                mode={"range"}
                disabled={occupiedDates.map(date => new Date(date))}
                selected={range}
                onSelect={(foo) => {
                    if (foo === undefined) {
                        return;
                    }
                    
                    console.log(foo.to?.getDate());
                    setRange(foo);
                }}
            />

            <CheckInOut from={range?.from} to={range?.to} />

            <Button size={"full"} variant={"secondary"} onClick={makeReservation}>
                Reservar
            </Button>
        </div>
    )
}