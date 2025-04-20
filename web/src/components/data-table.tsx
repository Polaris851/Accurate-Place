import { Input, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { ReactNode, useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Search } from "lucide-react";

interface Row {
    id: string | number;
    [key: string]: ReactNode;
}

interface Column {
    key: string;
    label: string;
}

interface DataTableProps {
    columns: Column[];
    rows: Row[];
    loading?: boolean;
    barRightContent?: ReactNode;
    searchBy?: string[];
    emptyContentMessage?: string;
}

export function DataTable(props: DataTableProps) {
    const [rows, setRows] = useState<Row[]>(props.rows);

    const fuse = useMemo(() => {
        return new Fuse(props.rows, {
            keys: props.searchBy ?? [],
            includeMatches: true,
            threshold: 0.45
        })
    }, [props.rows]);

    function onSearch(input: string) {
        if (input === "") {
            setRows(props.rows);
            return;
        }

        const searchResult = fuse.search(input);

        const rowsResult = searchResult.map((result) => result.item);

        setRows(rowsResult);
    }

    useEffect(() => {
        setRows(props.rows);
    }, [props.rows]);

    return (
        <Table
            rowHeight={70}
            topContent={(
                <div className={"flex gap-4"}>
                    <Input
                        startContent={<Search className="size-5" />}
                        placeholder={"Pesquise"}
                        onChange={(e) => onSearch(e.target.value)}
                    />
                    {props.barRightContent}
                </div>
            )}
        >
            <TableHeader columns={props.columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody
                items={rows}
                loadingContent={<Spinner />}
                loadingState={props.loading ? "loading" : "idle"}
                emptyContent={props.emptyContentMessage ?? "Nenhum resultado encontrado"}
            >
                {(item) => (
                    <TableRow key={item.id}>
                        {(key) => <TableCell>{item[key]}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}