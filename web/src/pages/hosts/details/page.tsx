import { useParams } from "react-router"
import { useHost } from "../api/get-host";
import { MakeReservation } from "./components/make-reservation";
import { HostTypeFormatter } from "../components/host-type-formatter";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";

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
            <div className="flex md:flex-row flex-col justify-between mx-2">

                <div className="my-4 gap-2 flex flex-col items-center md:items-start px-6">
                    <Breadcrumbs>
                        <BreadcrumbItem href="/">Home</BreadcrumbItem>
                        <BreadcrumbItem>Locação</BreadcrumbItem>
                    </Breadcrumbs>

                    <div className="space-y-2">
                        <h1 className="text-2xl font-semibold">{host.name}</h1>
                        <p className="text-zinc-100 text-lg">
                            <HostTypeFormatter type={host.type} showIcon />
                        </p>
                        <p className="text-zinc-100 text-base">{host.description}</p>
                    </div>

                </div>

                <MakeReservation occupiedDates={host.occupied_dates} />
            </div>
        </div>
    )
}