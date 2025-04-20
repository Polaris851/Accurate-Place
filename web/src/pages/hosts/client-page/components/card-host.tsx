import { Card, CardFooter, Image } from "@heroui/react";
import { Link } from "react-router"
import { HostTypeFormatter } from "../../components/host-type-formatter";

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

export function CardHost({ hostId, type, name, hourly_price }: HostProps) {
    return (
        <Link to={`/host/${hostId}`}>
            <Card isFooterBlurred className="w-full h-[250px] col-span-12 sm:col-span-5 hover:scale-95">
                <Image
                    removeWrapper
                    alt="Card example background"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                    src={`/host-images/${type.toLowerCase()}/1.jpg`}
                />
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between items-end">
                    <div>
                        <p className="text-zinc-950 font-semibold">{name}</p>
                        <p className="text-zinc-950 text-base">
                            <HostTypeFormatter type={type} showIcon />
                        </p>
                    </div>
                    <p className="text-zinc-950 text-base">{formatCurrency(hourly_price)} por hora</p>
                </CardFooter>
            </Card>
        </Link>
    )
}