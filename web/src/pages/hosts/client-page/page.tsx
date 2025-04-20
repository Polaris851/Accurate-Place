import { CardHost } from "./components/card-host";
import { useHosts } from "../api/get-hosts";
import { AvailableHostsByDate, Range } from "./components/available-hosts-by-date";
import { useState } from "react";

export function HostsPage() {

    const [range, setRange] = useState<Range | undefined>();

    const { hosts, isLoading } = useHosts({
        range
    });

    if (isLoading) {
        return <div>loading...</div>
    }

    return (
        <div className="max-w-6xl mx-auto my-12 space-y-6 px-4">
            <div className="flex md:flex-row flex-col md:justify-between gap-3">
                <h1 className="text-zinc-100 text-3xl font-semibold">Locações</h1>
                <AvailableHostsByDate
                    onSubmit={setRange}
                />
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-3 auto-rows-[130px]">
                {
                    hosts?.map(host =>
                        <CardHost
                            key={host.id}
                            hostId={host.id}
                            name={host.name}
                            type={host.type}
                            hourly_price={host.hourly_price}
                        />
                    )
                }
            </div>
        </div>
    );
}