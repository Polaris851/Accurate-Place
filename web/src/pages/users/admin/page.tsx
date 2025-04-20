import { DataTable } from "../../../components/data-table";
import { useMemo } from "react";
import { User } from "@heroui/react";
import { useUsers } from "../api/get-users";
import { UserActions } from "./components/table/actions";

const columns = [
    { key: "name", label: "NOME" },
    { key: "cpf", label: "CPF" },
    { key: "actions", label: "AÇÕES" },
]

export function AdminUsersPage() {

    const { users, isLoading } = useUsers();

    const rows = useMemo(() => {
        return users.map((user) => ({
            id: user.id,
            name:  (
                <User
                    name={user?.name}
                    description={user?.email}
                    avatarProps={{
                        showFallback: true,
                        src: `https://robohash.org/${user?.id}`
                    }}
                />
            ),
            cpf: user.cpf,
            actions: (
                <UserActions
                    user={user}
                />
            ),
            searchName: user.name,
            searchEmail: user.email
        }))
    }, [users]);

    return (
        <div className={"bg-zinc-950 px-4 md:pt-10 pt-4"}>
            <div className={"md:bg-zinc-800 max-w-6xl md:p-8 mx-auto rounded-lg"}>
                <h1 className={"text-zinc-100 text-3xl font-semibold mb-4"}>Painel de Clientes</h1>
                <DataTable
                    loading={isLoading}
                    columns={columns}
                    rows={rows}
                    searchBy={["searchName", "searchEmail", "cpf"]}
                    emptyContentMessage={"Nenhum usuário encontrado"}
                />
            </div>
        </div>
    )
}