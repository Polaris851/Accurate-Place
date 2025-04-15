import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { CheckInOut } from "./check-in-out";
import { Button } from "../../../components/button";
import toast from "react-hot-toast";
import { api } from "../../../lib/axios";
import { useParams } from "react-router";
import { useDisabledDateRange } from "../hooks/use-disabled-date-range";
import { Host } from "../../hosts/api/get-hosts";

interface MakeReservationProps {
    occupiedDates: Host["occupied_dates"]
}

export function MakeReservation({ occupiedDates }: MakeReservationProps) {
    const { hostId } = useParams();

    const [range, setRange] = useState<DateRange | undefined>();

    const disabledRange = useDisabledDateRange(range?.from, new Date(occupiedDates?.[0]));

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

    console.log(occupiedDates, new Date(occupiedDates?.[0]))

    if (!hostId) {
        return;
    }

    return (
        <div className="flex flex-col gap-2 justify-center items-center">
            <div>
                <DayPicker
                    mode={"range"}
                    disabled={disabledRange}
                    
                    selected={range}
                    onSelect={(foo) => {
                        if (foo === undefined) {
                            return;
                        }
                        
                        console.log(foo.to?.getDate());
                        setRange(foo);
                    }}
                    modifiersStyles={{
                        selected: {
                            backgroundColor: 'transparant',
                            color: 'white',
                        },
                        range_middle: {
                            backgroundColor: 'fuchsia',
                            color: 'white',
                        },
                        today: {
                            backgroundColor: 'fuchsia',
                            color: 'white',
                        },
                    }}
                />
                <Button onClick={() => setRange(undefined)}>Limpar datas</Button>
            </div>

            <CheckInOut from={range?.from} to={range?.to} />

            <Button size="full" variant="secondary" onClick={makeReservation}>
                Reservar
            </Button>
        </div>
    )
}