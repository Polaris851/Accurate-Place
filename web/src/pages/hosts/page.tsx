import { CardHost } from "./components/cardHost";
import { useHosts } from "./api/get-hosts";
import { AddHostContainer } from "./components/add-host";

export function HostsPage() {
    const { hosts, isLoading } = useHosts();

    if (isLoading) {
        return <div>loading...</div>
    }

    return (
        <div className="max-w-6xl mx-auto my-12 space-y-6">
            <div className="flex flex-row justify-between">
                <h1 className="text-zinc-100 text-3xl font-semibold">Locações</h1>
                <AddHostContainer />
            </div>
            <div className="grid grid-cols-3 gap-3 auto-rows-[130px]">
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