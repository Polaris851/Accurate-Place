import { CardHost } from "./components/cardHost";
import { useHosts } from "./api/get-hosts";
import { AddHostContainer } from "./components/add-host";

export function HostsPage() {
    const { hosts, isLoading } = useHosts();

    if (isLoading) {
        return <div>loading...</div>
    }

    return (
        <div className="h-screen flex justify-center">
            <div className="max-w-3xl px-6">
                <div className="flex flex-row justify-between mt-3">
                    <h1 className=" text-zinc-100 text-lg">Locações</h1>
                    <AddHostContainer />
                </div>
                <div>
                    {
                        hosts?.map(host =>
                            <CardHost
                                key={host.id}
                                hostId={host.id}
                                name={host.name}
                                type={host.type}
                                description={host.description}
                                hourly_price={host.hourly_price}
                                min_time={host.min_time}
                                max_time={host.max_time}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    );
}