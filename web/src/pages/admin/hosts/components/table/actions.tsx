import { addToast, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { Button } from "../../../../../components/button";
import { EllipsisVertical } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { HostForm } from "../host-form";
import { Host, useHosts } from "../../../../hosts/api/get-hosts";
import { DeleteConfirm } from "../delete-confirm";
import { api } from "../../../../../lib/axios";

interface ActionsProps {
    host: Host;
}

export function HostActions(props: ActionsProps) {
    const { host } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const { refetch } = useHosts();

    const navigate = useNavigate();

    function handleDeleteHost() {
        const deletePromise = api.delete(`/host/${host.id}`).then(() => {
            refetch();
        });
        addToast({
            title: "Excluindo locação",
            color: "success",
            promise: deletePromise
        });

    }

    return (
        <>
            <HostForm isOpen={isEditing} onClose={() => setIsEditing(false)} defaultValues={host} />
            <DeleteConfirm isOpen={isDelete} onClose={() => setIsDelete(false)} onConfirm={handleDeleteHost} />
            <Dropdown>
                <DropdownTrigger>
                    <Button color={"default"} variant={"light"} isIconOnly><EllipsisVertical /></Button>
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownItem onPress={() => navigate(`/host/${host.id}`)} key={"view"}>Visualizar</DropdownItem>
                    <DropdownItem onPress={() => setIsEditing(true)} key={"edit"}>Editar</DropdownItem>
                    <DropdownItem onPress={() => setIsDelete(true)} key={"delete"}>Deletar</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}
