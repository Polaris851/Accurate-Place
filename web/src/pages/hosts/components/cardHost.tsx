import { NavLink } from "react-router"
import { Button } from "../../../components/button"


interface HostProps {
    hostId: number;
    name: string,
    type: string,
    description: string | null,
    hourly_price: number,
    min_time: number,
    max_time: number
}

export function CardHost({ hostId, name, type, description, hourly_price, min_time, max_time }: HostProps) { 
    return (
        <div className="bg-gray-800 p-4 my-2">
            <div className="text-center">
                <h2>{name}</h2>
            </div>
            <div className="flex flex-row gap-4">
                <div className="w-[440px]">
                    <h3>{type}</h3>
                    <p>{description}</p>
                </div>
                <div>
                    <p>R$ {hourly_price}</p>
                    <p>Temp. Minimo: {min_time} min</p> 
                    <p>Temp. Maximo: {max_time} min</p>

                    <NavLink to={`/host/${hostId}`}>
                        <Button type="button">
                            Reservar
                        </Button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}