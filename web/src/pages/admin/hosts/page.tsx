import { useHosts } from "../../hosts/api/get-hosts";
import { DataTable } from "../../../components/data-table";
import { Button } from "../../../components/button";
import { useMemo } from "react";

const columns = [
    { key: "name", label: "Nome" },
    { key: "type", label: "Tipo" },
    { key: "hourly_price", label: "Preço/h" }
]

export function AdminHostsPage() {
    const { hosts, isLoading } = useHosts();

    const rows = useMemo(() => {
        return hosts.map((host) => ({
            id: host.id,
            name: host.name,
            type: host.type,
            hourly_price: host.hourly_price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            })
        }))
    }, [hosts]);

    return (
        <DataTable
            loading={isLoading}
            columns={columns}
            rows={rows}
            searchBy={["name", "hourly_price", "type"]}
            barRightContent={(
                <Button color={"primary"}>teste</Button>
            )}
        />
    )
}