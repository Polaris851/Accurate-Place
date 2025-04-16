import { useState } from "react";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { Modal } from "../../../components/modal";
import { FieldValues, useForm } from "react-hook-form";
import { api } from "../../../lib/axios";
import toast from "react-hot-toast";
import { CircleCheck } from "lucide-react";

export function AddHostContainer() {
    const [isNewHostModalOpen, setIsNewHostModalOpen] = useState(false);

    const { register, handleSubmit, formState: { errors }} = useForm();

    function openNewHostModal() {
        setIsNewHostModalOpen(true);
    }

    function closeNewHostModal() {
        setIsNewHostModalOpen(false);
    }

    function createNewHost(data: FieldValues) {
        console.log(data);

        toast.promise(api.post("/host", data), {
            loading: "Criando uma nova locação",
            success: "Locação criada com sucesso!",
            error: "Houve um erro ao criar a locação :("
        });
    }

    return (
        <>
            <Button onClick={openNewHostModal} type="button" variant="secondary">
                Nova Locação
            </Button>

            <Modal title="Nova Locação" open={isNewHostModalOpen} onClose={closeNewHostModal}>
                <form className="space-y-3" onSubmit={handleSubmit(createNewHost)}>
                    <Input
                        {...register("name", { required: true })}
                        placeholder="Nome da Locação"
                        type="text"
                    />
                    {errors.name && <span>O campo é obrigatório</span>}


                    <Input
                        {...register("type", { required: true })}
                        placeholder={"Tipo de Locação"}
                        type="text"
                    />
                    {errors.type && <span>O campo é obrigatório</span>}


                    <Input
                        {...register("description", { required: true })}
                        placeholder="Descrição da Locação"
                    />

                    <Input
                        {...register("hourly_price", { required: true, valueAsNumber: true })}
                        placeholder="Valor por hora"
                        type="text"
                    />
                    {errors.hourly_price && <span>O campo é obrigatório</span>}

                    <Input
                        {...register("min_time", { required: true, valueAsNumber: true })}
                        placeholder="Tempo Minimo"
                        type="number"
                    />
                    {errors.min_time && <span>O campo é obrigatório</span>}

                    <Input
                        {...register("max_time", { required: true, valueAsNumber: true })}
                        placeholder="Tempo Máximo"
                        type="number"
                    />
                    {errors.max_time && <span>O campo é obrigatório</span>}

                    <Button type="submit" size="full">
                        <CircleCheck className="size-5 text-fuchsia-300"/>
                        Confirmar
                    </Button>
                </form>
            </Modal>
        </>
    )
}