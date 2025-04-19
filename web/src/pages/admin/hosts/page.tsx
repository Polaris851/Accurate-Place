import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "../../../components/button";
import { DataTable } from "../../../components/data-table";
import { useHosts } from "../../hosts/api/get-hosts";
import { HostForm } from "./components/host-form";
import { HostActions } from "./components/table/actions";

const columns = [
    { key: "name", label: "NOME" },
    { key: "type", label: "TIPO" },
    { key: "hourly_price", label: "PREÇO/H" },
    { key: "actions", label: "AÇÕES" },
]

export function AdminHostsPage() {
    const [addFormOpen, setAddFormOpen] = useState(false);
    
    const { hosts, isLoading } = useHosts();

    const rows = useMemo(() => {
        return hosts.map((host) => ({
            id: host.id,
            name: host.name,
            type: host.type,
            hourly_price: host.hourly_price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            }),
            actions: (
                <HostActions
                    host={host}
                />
            )
        }))
    }, [hosts]);

    function openAddForm() {
        setAddFormOpen(true);
    }

    function closeAddForm() {
        setAddFormOpen(false);
    }

    return (
        <>
            <HostForm
                onClose={closeAddForm}
                isOpen={addFormOpen}
            />
            <DataTable
                loading={isLoading}
                columns={columns}
                rows={rows}
                searchBy={["name", "hourly_price", "type"]}
                barRightContent={(
                    <Button startContent={<Plus />} onPress={openAddForm}>Adicionar</Button>
                )}
            />
        </>
    )
}