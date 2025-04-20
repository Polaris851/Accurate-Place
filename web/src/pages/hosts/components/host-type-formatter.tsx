import { Building2, Home, Hotel, TentTree, Tractor } from "lucide-react";
import { Host } from "../api/get-hosts";

interface FormatterProps {
    type: Host["type"];
    showIcon?: boolean;
}

export function HostTypeFormatter(props: FormatterProps) {
    const { type, showIcon = false } = props;

    switch (type.toLowerCase()) {
        case "home":
            return (
                <span className="flex flex-row items-center gap-1">
                    {showIcon && <Home className={"size-4"} />}
                    Casa
                </span>
            );
        case "apartment":
            return (
                <span className="flex flex-row items-center gap-1">
                    {showIcon && <Building2 className={"size-4"} />}
                    Apartamento
                </span>
            );
        case "hotel":
            return (
                <span className="flex flex-row items-center gap-1">
                    {showIcon && <Hotel className={"size-4"} />}
                    Hotel
                </span>
            );
        case "farm":
            return (
                <span className="flex flex-row items-center gap-1">
                    {showIcon && <Tractor className={"size-4"} />}
                    Fazenda
                </span>
            );
        case "cabin":
            return (
                <span className="flex flex-row items-center gap-1">
                    {showIcon && <TentTree className={"size-4"} />}
                    Cabana
                </span>
            );
        default:
            return;
    }
}