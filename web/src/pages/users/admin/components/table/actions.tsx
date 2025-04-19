import { addToast, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { Button } from "../../../../../components/button";
import { EllipsisVertical } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { api } from "../../../../../lib/axios";
import { User, useUsers } from "../../../api/get-users";
import { DeleteConfirm } from "../../../../../components/delete-confirm";
import { UserForm } from "../user-form";

interface ActionsProps {
    user: User;
}

export function UserActions(props: ActionsProps) {
    const { user } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const { refetch } = useUsers();

    const navigate = useNavigate();

    function handleDeleteUser() {
        const deletePromise = api.delete(`/client/${user.id}`).then(() => {
            refetch();
        });
        addToast({
            title: "Excluindo usuário",
            color: "success",
            promise: deletePromise
        });

    }

    return (
        <>
            <UserForm isOpen={isEditing} onClose={() => setIsEditing(false)} defaultValues={user} />
            <DeleteConfirm isOpen={isDelete} onClose={() => setIsDelete(false)} onConfirm={handleDeleteUser} />
            <Dropdown>
                <DropdownTrigger>
                    <Button color={"default"} variant={"light"} isIconOnly><EllipsisVertical /></Button>
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownItem onPress={() => navigate(`/client/${user.id}`)} key={"view"}>Visualizar</DropdownItem>
                    <DropdownItem onPress={() => setIsEditing(true)} key={"edit"}>Editar</DropdownItem>
                    <DropdownItem onPress={() => setIsDelete(true)} key={"delete"}>Deletar</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}
