import { Input, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { ReactNode } from "react";

interface Row {
    id: string | number;
    [key: string]: string | number;
}

interface Column {
    key: string;
    label: string;
}

interface DataTableProps {
    columns: Column[];
    rows: Row[];
    loading?: boolean;
    foo?: ReactNode;
}

export function DataTable(props: DataTableProps) {
    return (
        <div className={"p-4 bg-zinc-950 gap-4 flex flex-col"}>
            <div className={"flex gap-4"}>
                <Input placeholder={"Pesquise"} />
                {props.foo}
            </div>
            <Table
                rowHeight={40}
            >
                <TableHeader columns={props.columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody
                    items={props.rows}
                    loadingContent={<Spinner />}
                    loadingState={props.loading ? "loading" : "idle"}
                    emptyContent={"Nenhuma locação encontrada"}
                >
                    {(item) => (
                        <TableRow key={item.id}>
                            {(key) => <TableCell>{item[key]}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}