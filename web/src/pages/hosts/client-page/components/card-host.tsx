import { MapPinHouse } from "lucide-react";
import { NavLink } from "react-router"

interface HostProps {
    hostId: number;
    name: string,
    type: string,
    hourly_price: number,
}

function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
  }

export function CardHost({ hostId, name, hourly_price }: HostProps) { 
    return (
        <NavLink 
         className="rounded-md bg-zinc-800 p-5 flex flex-col gap-3 overflow-hidden hover:ring-2 hover:ring-fuchsia-950" 
         to={`/host/${hostId}`} >
            <p className="flex gap-2 text-zinc-200 text-lg font-semibold"><MapPinHouse className="size-5 text-zinc-200" /> {name} </p>
            {/* <p className="text-base font-medium text-zinc-400"> {type}</p> */}
            <p className="text-base font-medium text-zinc-400">
                <span className="text-fuchsia-900 font-bold text-lg">{formatCurrency(hourly_price)}</span> por hora
            </p>
        </NavLink>
    )
}