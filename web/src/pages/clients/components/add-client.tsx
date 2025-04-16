import { useState } from "react";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { Modal } from "../../../components/modal";
import { FieldValues, useForm } from "react-hook-form";
import { api } from "../../../lib/axios";
import toast from "react-hot-toast";
import { Check, CircleCheck } from "lucide-react";

export function AddClientContainer() {
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  function openNewClientModal() {
    setIsNewClientModalOpen(true);
  }

  function closeNewClientModal() {
    setIsNewClientModalOpen(false);
  }

  function createNewClient(data: FieldValues) {
    console.log(data);

    toast.promise(api.post("/client", data), {
      loading: "Criando um novo cliente",
      success: "Cliente criado com sucesso!",
      error: "Houve um erro ao criar um cliente :("
    });
  }

  return (
    <>
      <Button onClick={openNewClientModal} type="button" variant="secondary">
        Novo Cliente
      </Button>

      <Modal title="Novo Cliente" open={isNewClientModalOpen} onClose={closeNewClientModal}>
        <form className="space-y-3" onSubmit={handleSubmit(createNewClient)}>
          <Input
            {...register("name", { required: true })}
            placeholder="Nome"
            type="text"
          />
          {errors.name && <span>O campo é obrigatório</span>}

          <Button type="submit" size="full">
            <CircleCheck className="size-5 text-fuchsia-300"/>
            Confirmar
          </Button>
        </form>
      </Modal>
    </>
  )
}