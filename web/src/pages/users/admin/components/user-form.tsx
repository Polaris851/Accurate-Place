import { addToast, Form, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { User, useUsers } from "../../api/get-users";
import { useMemo } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "../../../../components/button";
import { api } from "../../../../lib/axios";
import { Input } from "../../../../components/input";

interface UserFormProps {
    isOpen: boolean;
    onClose: () => void;
    defaultValues?: User;
}

export function UserForm(props: UserFormProps) {
    const { isOpen, onClose, defaultValues } = props;

    const { register, handleSubmit, reset } = useForm<User>({
        defaultValues: defaultValues
    });

    const isEditing = useMemo(() => defaultValues !== undefined, [defaultValues]);

    const { refetch } = useUsers();

    function onSubmit(data: FieldValues) {
        if (isEditing) {
            const editPromise = api.put(`/client/${data.id}`, data).then(() => {
                refetch();
                onClose();
            });
            addToast({
                title: "Editando cliente",
                color: "success",
                promise: editPromise
            });
            return;
        }

        const addPromise = api.post("/client", data).then(() => {
            refetch();
            onClose();
        });
        addToast({
            title: "Adicionando cliente",
            color: "success",
            promise: addPromise
        });
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                reset();
                onClose();
            }}
        >
            <ModalContent>
                {
                    (onClose) => (
                        <>
                            <ModalHeader>{isEditing ? "Editar Cliente" : "Adicionar Cliente"}</ModalHeader>
                            <ModalBody>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Input
                                        {...register("name", { required: true })}
                                        placeholder="Nome do cliente"
                                        type="text"
                                    />

                                    <Input
                                        {...register("email", { required: true })}
                                        placeholder="E-mail do cliente"
                                        type="email"
                                    />

                                    <Input
                                        {...register("phone", { required: true })}
                                        placeholder="Telefone do cliente"
                                        type="text"
                                    />

                                    <Input
                                        {...register("cpf", { required: true })}
                                        placeholder="CPF do cliente"
                                        type="text"
                                    />

                                    <div className={"flex flex-row gap-3 justify-end w-full"}>
                                        <Button variant={"light"} color={"danger"} onPress={onClose}>Cancelar</Button>
                                        <Button type={"submit"}>Salvar</Button>
                                    </div>
                                </Form>
                            </ModalBody>
                        </>
                    )
                }
            </ModalContent>
        </Modal>
    )
}