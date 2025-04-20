import { addToast, Form, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, Textarea } from "@heroui/react";
import { Input } from "../../../../components/input";
import { FieldValues, useForm } from "react-hook-form";
import { Building2, Home, Hotel, TentTree, Tractor } from "lucide-react";
import { Button } from "../../../../components/button";
import { Host, useHosts } from "../../api/get-hosts";
import { api } from "../../../../lib/axios";
import { useMemo } from "react";

interface HostFormProps {
    isOpen: boolean;
    onClose: () => void;
    defaultValues?: Host;
}

export function HostForm(props: HostFormProps) {
    const { isOpen, onClose, defaultValues } = props;

    const { register, handleSubmit, reset } = useForm<Host>({
        defaultValues: defaultValues
    });

    const isEditing = useMemo(() => defaultValues !== undefined, [defaultValues]);

    const { refetch } = useHosts();

    function onSubmit(data: FieldValues) {
        if (isEditing) {
            const editPromise = api.put(`/host/${data.id}`, data).then(() => {
                refetch();
                onClose();
            });
            addToast({
                title: "Editando locação",
                color: "success",
                promise: editPromise
            });
            return;
        }

        const addPromise = api.post("/host", data).then(() => {
            refetch();
            onClose();
        });
        addToast({
            title: "Adicionando locação",
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
                {(onClose) => (
                    <>
                        <ModalHeader>{isEditing ? "Editar locação" : "Adicionar locação"}</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Input
                                    {...register("name", { required: true })}
                                    placeholder="Nome da Locação"
                                    type="text"
                                />

                                <Select
                                    {...register("type", { required: true })}
                                    placeholder={"Tipo de locação"}
                                    size={"lg"}
                                >
                                    <SelectItem startContent={<Home className={"size-4"} />} key={"home"}> Casa</SelectItem>
                                    <SelectItem startContent={<Building2 className={"size-4"} />} key={"apartment"}>Apartamento</SelectItem>
                                    <SelectItem startContent={<Hotel className={"size-4"} />} key={"hotel"}>Hotel</SelectItem>
                                    <SelectItem startContent={<Tractor className={"size-4"} />} key={"farm"}>Fazenda</SelectItem>
                                    <SelectItem startContent={<TentTree className={"size-4"} />} key={"cabin"}>Cabana</SelectItem>
                                </Select>

                                <Textarea
                                    {...register("description", { required: true })}
                                    placeholder="Descrição da Locação"
                                />

                                <Input
                                    {...register("hourly_price", { required: true, valueAsNumber: true })}
                                    startContent={"R$"}
                                    placeholder="Valor por hora"
                                    type="number"
                                />

                                <div className={"flex flex-row gap-3"}>
                                    <Input
                                        {...register("min_time", { required: true, valueAsNumber: true })}
                                        placeholder="Tempo Minimo"
                                        endContent={"Dia(s)"}
                                        type="number"
                                    />
                                    <Input
                                        {...register("max_time", { required: true, valueAsNumber: true })}
                                        endContent={"Dia(s)"}
                                        placeholder="Tempo Máximo"
                                        type="number"
                                    />
                                </div>
                                <div className={"flex flex-row gap-3 justify-end w-full"}>
                                    <Button variant={"light"} color={"danger"} onPress={onClose}>Cancelar</Button>
                                    <Button type={"submit"}>Salvar</Button>
                                </div>
                            </Form>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}