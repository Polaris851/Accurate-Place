interface StatusProps {
    status: "active" | "canceled" | (string & {});
}

interface PulseProps {
    color: string;
    active?: boolean;
}

function Pulse(props: PulseProps) {
    const { active = true, color = "bg-green-400" } = props;

    return (
        <div className="relative w-3 h-3">
            <div className={`absolute w-3 h-3 ${color} ${active ? "animate-ping" : ""} rounded-full`} />
            <div className={`absolute w-3 h-3 ${color} rounded-full`} />
        </div>
    )
}

export function ReservationStatus(props: StatusProps) {
    if (props.status === "active") {
        return (
            <div className={"flex gap-2 items-center"}>
                <Pulse color={"bg-green-400"}/>
                Ativo
            </div>
        );
    } else if (props.status === "canceled") {
        return (
            <div className={"flex gap-2 items-center"}>
                <Pulse active={false} color={"bg-danger-400"}/>
                Inativo
            </div>
        );
    } else {
        return (
            <div className={"flex gap-2 items-center"}>
                <Pulse active={false} color={"bg-gray-400"}/>
                Desconhecido
            </div>
        );
    }
}