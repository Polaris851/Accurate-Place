import { Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { useHosts } from "../../hosts/api/get-hosts";
import { DataTable } from "../../../components/data-table";
import { Button } from "../../../components/button";

const columns = [
    { key: "name", label: "Nome" },
    { key: "type", label: "Tipo" },
    { key: "hourly_price", label: "Preço/h" }
]

export function AdminHostsPage() {
    const { hosts, isLoading } = useHosts();

    return (
        <DataTable
            columns={[
                {
                    key: "name",
                    label: "foda"
                },
                {
                    key: "id",
                    label: "id foda"
                }
            ]}
            rows={[
                {
                    id: 1,
                    name: "teste"
                },
                {
                    id: 2,
                    name: "teste"
                },
                {
                    id: 3,
                    name: "teste"
                },
            ]}
            foo={(
                <Button color={"primary"}>teste</Button>
            )}
        >
            {/* <TableCell></TableCell> */}
        </DataTable>
        // <div>
        //     <Table
        //         rowHeight={40}
        //     >
        //         <TableHeader columns={columns}>
        //             {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        //         </TableHeader>
        //         <TableBody
        //             items={hosts}
        //             loadingContent={<Spinner/>}
        //             loadingState={isLoading ? "loading" : "idle"}
        //             emptyContent={"Nenhuma locação encontrada"}
        //         >
        //             {(host) => (
        //                 <TableRow key={host.id}>
        //                     <TableCell>{host.name}</TableCell>
        //                     <TableCell>{host.type}</TableCell>
        //                     <TableCell>R$ {host.hourly_price}</TableCell>
        //                 </TableRow>
        //             )}
        //         </TableBody>
        //     </Table>
        // </div>
    )
}