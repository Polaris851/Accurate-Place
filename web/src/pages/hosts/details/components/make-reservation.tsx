import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { CheckInOut } from "./check-in-out";
import { Button } from "../../../../components/button";
import { api } from "../../../../lib/axios";
import { useParams } from "react-router";
import { useDisabledDateRange } from "../hooks/use-disabled-date-range";
import { Host } from "../../api/get-hosts";

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

        // toast.promise(() => api.post("/reservation", {
        //     client_id: 7,
        //     host_id: +hostId,
        //     start_date: range?.from,
        //     end_date: range?.to,
        //     status: "foo"
        // }), {
        //     loading: "Criando reserva!",
        //     success: "Tudo certo com a sua reserva!",
        //     error: "Houve um erro ao criar a sua reserva :("
        // })
    }

    if (!hostId) {
        return;
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="space-y-4 my-2">
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
                            color: '#f5f4f4',
                        },
                        range_middle: {
                            color: '#1b1718',
                        },
                        today: {
                            backgroundColor: '#8a0194',
                            color: '#f5f4f4',
                        },
                    }}
                />
                <Button onPress={() => setRange(undefined)}>Limpar datas</Button>

                <CheckInOut from={range?.from} to={range?.to} />

                <Button fullWidth onPress={makeReservation}>
                    Reservar
                </Button>
            </div>
        </div>
    )
}