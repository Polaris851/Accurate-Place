import { useMemo, useState } from "react";
import { CheckInOut } from "./check-in-out";
import { Button } from "../../../../components/button";
import { api } from "../../../../lib/axios";
import { useParams } from "react-router";
import { Host } from "../../api/get-hosts";
import { RangeCalendar } from "@heroui/react";
import { useAuth } from "../../../../auth/use-auth";

interface Range {
    from: Date;
    to: Date;
}

interface MakeReservationProps {
    occupiedDates: Host["occupied_dates"]
}

export function MakeReservation({ occupiedDates }: MakeReservationProps) {
    const { hostId } = useParams();

    const [range, setRange] = useState<Range | undefined>();
    const { user } = useAuth();

    const disabledDateMap = useMemo(() => {
        const map = new Map<string, Date>();

        for (const isoDate of occupiedDates) {
            const date = new Date(isoDate);
            const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

            map.set(key, date);
        }
        
        return map;
    }, [occupiedDates]);

    function makeReservation() {
        if (hostId === undefined) {
            return;
        }
        api.post("/reservation", {
            client_id: user?.id,
            host_id: +hostId,
            start_date: range?.from,
            end_date: range?.to,
            status: "foo"
        });
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

    console.log(range);

    if (!hostId) {
        return;
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="space-y-4 my-2">
                <RangeCalendar
                    calendarWidth={250}
                    onChange={(_range) => {
                        setRange({
                            from: new Date(_range.start.year, _range.start.month - 1, _range.start.day),
                            to: new Date(_range.end.year, _range.end.month - 1, _range.end.day),
                        });
                    }}
                    isDateUnavailable={(date) => {
                        const tomorrow = new Date(date.year, date.month - 1, date.day + 1);

                        if (tomorrow.getTime() < Date.now()) {
                            return true;
                        }

                        const mapKey = `${date.year}-${date.month}-${date.day}`;

                        return disabledDateMap.has(mapKey);
                    }}
                />

                <CheckInOut from={range?.from} to={range?.to} />

                <Button fullWidth onPress={makeReservation}>
                    Reservar
                </Button>
            </div>
        </div>
    )
}