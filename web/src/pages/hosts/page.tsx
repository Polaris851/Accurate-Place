import { FormEvent, useState } from "react";
import { Button } from "../../components/button";
import { CardHost } from "./components/cardHost";
import { Modal } from "../../components/modal";
import { useHosts } from "./api/get-hosts";
import { Input } from "../../components/input";
import { api } from "../../lib/axios";

export function HostsPage() {
    const { hosts, isLoading } = useHosts();

    const [isNewHostModalOpen, setIsNewHostModalOpen] = useState(false);

    function openNewHostModal() {
        setIsNewHostModalOpen(true);
    }

    function closeNewHostModal() {
        setIsNewHostModalOpen(false);
    }

    function createNewHost(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const data = {
            name: formData.get('name'),
            type: formData.get('type'),
            description: formData.get('description'),
            hourly_price: +(formData.get('hourly_price') ?? 0),
            min_time: +(formData.get('min_time') ?? 0),
            max_time: +(formData.get('max_time') ?? 0),
        };

        api.post("/host", data).then(response => console.log(response.data));
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
                <form className="space-y-3" onSubmit={createNewHost}>
                    <Input
                        name={"name"}
                        placeholder={"Nome da Locação"}
                        type={"text"}
                    />

                    <Input
                        name={"type"}
                        placeholder={"Tipo de Locação"}
                        type={"text"}
                    />

                    <Input
                        name={"description"}
                        placeholder={"Descrição da Locação"}
                        type={"text"}
                    />

                    <Input
                        name={"hourly_price"}
                        placeholder={"Valor por hora"}
                        type={"text"}
                    />

                    <Input
                        name={"min_time"}
                        placeholder={"Tempo Minimo"}
                        type={"number"}
                    />

                    <Input
                        name={"max_time"}
                        placeholder={"Tempo Máximo"}
                        type={"number"}
                    />

                    <Button type="submit" size="full">
                        Confirmar
                    </Button>
                </form>
            </Modal>
        </div>
    );
}