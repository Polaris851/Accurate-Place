import { NavLink } from "react-router"

interface HostProps {
    hostId: number;
    name: string,
    type: string,
    hourly_price: number,
}

export function CardHost({ hostId, name, type, hourly_price }: HostProps) { 
    return (
        <NavLink 
         className="rounded-md bg-zinc-800 p-5 flex flex-col gap-3 overflow-hidden hover:ring-2 hover:ring-fuchsia-950" 
         to={`/host/${hostId}`} >
            <h1 className="text-zinc-200 text-lg font-semibold">{name}</h1>
            <p className="text-base font-medium text-zinc-400">
                {type}
                <span>R$ {hourly_price}</span>
            </p>
        </NavLink>
    )
}