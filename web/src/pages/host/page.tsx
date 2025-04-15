import { useParams } from "react-router"
import { useHost } from "./api/get-host";
import { MakeReservation } from "./components/make-reservation";

export function HostPage() {
    const params = useParams();

    const { host, isLoading } = useHost(Number(params?.hostId));
    
    if (isLoading) {
        return <div>loading component</div>
    }

    if (host === undefined) {
        return <div>host não encontrado</div>
    }

    return (
        <div className="max-w-6xl mx-auto my-12 space-y-6 px-4">
            <div className="flex md:flex-row flex-col justify-between items-center">
                <h1 className="text-2xl font-semibold">{host.name}</h1>
                <div>compartilhar</div>
            </div>

            <div className="flex md:flex-row flex-col justify-between">
                <div className="flex-1/2">
                    <div>{host.type}</div>
                    <div>total de reservas já feitas!</div>
                    <div>{host.description}</div>
                </div>
                
                <MakeReservation occupiedDates={host.occupied_dates}  />
            </div>
        </div>
    )
}