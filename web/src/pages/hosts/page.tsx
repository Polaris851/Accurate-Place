import { useState } from "react";
import { Button } from "../../components/button";
import { CardHost } from "./components/cardHost";
import { Modal } from "../../components/modal";
import { useHosts } from "./api/get-hosts";

export function HostsPage() {
    const { hosts, isLoading } = useHosts();

    const [isNewHostModalOpen, setIsNewHostModalOpen] = useState(false);

    function openNewHostModal() {
        setIsNewHostModalOpen(true);
    }

    function closeNewHostModal() {
        setIsNewHostModalOpen(false);
    }

    if (isLoading) {
        return <div>loading...</div>
    }

    return (
        <div className="h-screen flex justify-center">
            <div className="max-w-3xl px-6">
                <div className="flex flex-row justify-between mt-3">
                    <h1 className=" text-zinc-100 text-lg">Locações</h1>
                    <Button onClick={openNewHostModal} type="button" variant="secondary">
                        Nova Locação
                    </Button>
                </div>
                <div>
                    {
                        hosts?.map(host =>
                            <CardHost
                                key={host.id}
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
            <Modal title="Nova Locação" open={isNewHostModalOpen} onClose={closeNewHostModal}>
                <form className="space-y-3">
                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <input type="text" name="name" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" placeholder="Nome da Locação" />
                    </div>

                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <input type="email" name="email" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" placeholder="Tipo de Locação" />
                    </div>

                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <input type="text" name="description" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" placeholder="Descrição da Locação" />
                    </div>

                    <Button type="submit" size="full">
                        Confirmar
                    </Button>
                </form>
            </Modal>
        </div>
    );
}