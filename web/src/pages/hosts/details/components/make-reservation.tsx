import { useMemo, useState } from "react";
import { CheckInOut } from "./check-in-out";
import { Button } from "../../../../components/button";
import { api } from "../../../../lib/axios";
import { useParams } from "react-router";
import { Host } from "../../api/get-hosts";
import { addToast, RangeCalendar } from "@heroui/react";
import { useAuth } from "../../../../auth/use-auth";
import { useHost } from "../../api/get-host";
import { ValueFromDateRange } from "./value-from-date-range";
import { isDateRangeValid } from "../helpers/is-date-range-valid";
import { getMessageFromError } from "../../../../utils/get-message-from-error";

interface Range {
    from: Date;
    to: Date;
}

interface MakeReservationProps {
    occupiedDates: Host["occupied_dates"];
    onSubmit: () => void;
}

export function MakeReservation(props: MakeReservationProps) {
    const { occupiedDates, onSubmit } = props;

    const { hostId } = useParams();
    const { host } = useHost(hostId);

    const [range, setRange] = useState<Range | undefined>();
    const [isValid, setIsValid] = useState(true);

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
            end_date: range?.to
        })
        .then(() => {
            onSubmit();
            addToast({
                title: "Reserva criada com sucesso",
                color: "success"
            })
        })
        .catch((error) => {
            const message = error?.response?.data?.message;
            
            if (message) {
                addToast({
                    title: getMessageFromError(message),
                    color: "danger"
                })
            }
        });
    }

    if (!hostId) {
        return;
    }

    if (!host) {
        return <div>Host não encontrado</div>
    }

    return (
        <div className="flex flex-col justify-center items-center px-6">
            <div className="space-y-4 my-2">
                <RangeCalendar
                    calendarWidth={250}
                    isInvalid={!isValid}
                    errorMessage={!isValid ? `Selecione entre ${host.min_time} dia(s) e ${host.max_time} dias` : ""}
                    onChange={(_range) => {
                        const from = new Date(_range.start.year, _range.start.month - 1, _range.start.day);
                        const to = new Date(_range.end.year, _range.end.month - 1, _range.end.day);

                        const isRangeValid = isDateRangeValid(from, to, host?.min_time, host?.max_time);
                        
                        setIsValid(isRangeValid);

                        setRange({
                            from,
                            to,
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
                <ValueFromDateRange
                    hourlyPrice={host?.hourly_price ?? 0}
                    from={range?.from}
                    to={range?.to}
                />
                <Button
                    fullWidth
                    isDisabled={!isValid}
                    onPress={makeReservation}
                >
                    Reservar
                </Button>
            </div>
        </div>
    )
}