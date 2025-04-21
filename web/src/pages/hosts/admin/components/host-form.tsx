import { addToast, Form, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, Textarea } from "@heroui/react";
import { Input } from "../../../../components/input";
import { FieldValues, useForm } from "react-hook-form";
import { Building2, Home, Hotel, TentTree, Tractor } from "lucide-react";
import { Button } from "../../../../components/button";
import { Host, useHosts } from "../../api/get-hosts";
import { api } from "../../../../lib/axios";
import { useMemo } from "react";
import { getMessageFromError } from "../../../../utils/get-message-from-error";

interface HostFormProps {
    isOpen: boolean;
    onClose: () => void;
    defaultValues?: Host;
}

export function HostForm(props: HostFormProps) {
    const { isOpen, onClose, defaultValues } = props;

    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<Host>({
        defaultValues: defaultValues
    });

    const isEditing = useMemo(() => defaultValues !== undefined, [defaultValues]);

    const { refetch } = useHosts();

    function onSubmit(data: FieldValues) {
        if (!data.type) {
            setError("type", { type: "required", message: "Insira um tipo" });
            return;
        }

        if (data.min_time > data.max_time) {
            setError("min_time", { type: "timeOutOfBounds", message: "O tempo mínimo precisa ser menor do que o tempo máximo o.O" });
            return;
        }

        data.hourly_price = +data.hourly_price;
        if (isEditing) {
            const editPromise = api.put(`/host/${data.id}`, data).then(() => {
                refetch();
                onClose();
                addToast({
                    title: "Locação salva!",
                    color: "success"
                });
            }).catch((error) => {
                const message = error?.response?.data?.message;

                if (message) {
                    addToast({
                        title: getMessageFromError(message),
                        color: "danger"
                    });
                }
            });
            addToast({
                title: "Editando locação",
                promise: editPromise
            });
            return;
        }

        const addPromise = api.post("/host", data).then(() => {
            refetch();
            onClose();
            reset();
            addToast({
                title: "Locação criada!",
                color: "success"
            });
        }).catch((error) => {
            const message = error?.response?.data?.message;

            if (message) {
                addToast({
                    title: getMessageFromError(message),
                    color: "danger"
                });
            }
        });
        addToast({
            title: "Adicionando locação",
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
                                    {...register("name", { required: { message: "Insira um nome", value: true } })}
                                    errorMessage={errors?.name?.message}
                                    isInvalid={"name" in errors}
                                    placeholder="Nome da Locação"
                                    type="text"
                                />

                                <Select
                                    {...register("type")}
                                    errorMessage={errors?.type?.message}
                                    isInvalid={"type" in errors}
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
                                    {...register("description", { required: false })}
                                    placeholder="Descrição da Locação"
                                />

                                <Input
                                    {...register("hourly_price", {
                                        required: {
                                            message: "Insira um preço",
                                            value: true
                                        },
                                        min: {
                                            message: "Um valor negativo é inválido",
                                            value: 0
                                        }
                                    })}
                                    min={0}
                                    errorMessage={errors?.hourly_price?.message}
                                    isInvalid={"hourly_price" in errors}
                                    startContent={"R$"}
                                    placeholder="Valor por hora"
                                    type="number"
                                />

                                <div className={"flex flex-row gap-3"}>
                                    <Input
                                        {...register("min_time", { required: { message: "Insira um tempo mínimo", value: true }, valueAsNumber: true })}
                                        errorMessage={errors?.min_time?.message}
                                        isInvalid={"min_time" in errors}
                                        placeholder="Tempo Minimo"
                                        min={1}
                                        endContent={"Dia(s)"}
                                        type="number"
                                    />
                                    <Input
                                        {...register("max_time", { required: { message: "Insira um tempo máximo", value: true }, valueAsNumber: true })}
                                        errorMessage={errors?.max_time?.message}
                                        isInvalid={"max_time" in errors}
                                        endContent={"Dia(s)"}
                                        placeholder="Tempo Máximo"
                                        min={1}
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