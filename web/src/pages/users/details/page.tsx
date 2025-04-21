import { Navigate, useParams } from "react-router";
import { useUser } from "../api/get-user";
import { addToast, Avatar, Form } from "@heroui/react";
import { Input } from "../../../components/input";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useEffect } from "react";
import { User } from "../api/get-users";
import { Button } from "../../../components/button";
import { useAuth } from "../../../auth/use-auth";
import { api } from "../../../lib/axios";
import { NotFound } from "../../../components/not-found";
import { Loading } from "../../../components/skeleton-loading/loading";

export function UserPage() {
    const params = useParams();

    const { user, isLoading, refetch } = useUser(Number(params?.userId));
    const { user: currentUser } = useAuth();

    const { handleSubmit, control, reset } = useForm<User & { password?: string }>();

    const differentUser = currentUser?.id !== user?.id;

    function saveProfile(data: FieldValues) {
        const editPromise = api.put(`/update-me`, data).then(() => {
            refetch();
        });

        addToast({
            title: "Salvando",
            color: "success",
            promise: editPromise
        });

        return;
    }

    useEffect(() => {
        if (user) {
            reset(user);
        }
    }, [user]);

    if (isLoading) {
        return <Loading />
    }

    if (user === undefined) {
        return <NotFound />
    }

    if (differentUser && !currentUser?.is_admin) {
        return <Navigate to={"/"} />
    }

    return (
        <div className={"w-full flex items-center justify-center pt-10"}>
            <div className={"bg-zinc-900 rounded-lg p-4 md:min-w-[500px]"}>
                <div className={"w-full flex items-center flex-col gap-2 mb-4"}>
                    <Avatar className="md:min-w-24 md:min-h-24 w-14 h-14" src={`https://robohash.org/${user?.id}`} />
                    <h1 className={"text-zinc-100 font-semibold text-2xl"}>{user.name}</h1>
                </div>
                <Form onSubmit={handleSubmit(saveProfile)}>
                    <Controller
                        name={"name"}
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                isDisabled={differentUser}
                                placeholder="Seu nome"
                                type="text"
                            />
                        )}
                    />

                    <Controller
                        name={"email"}
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                isDisabled={differentUser}
                                placeholder="E-mail"
                                type="email"
                            />
                        )}
                    />

                    <Controller
                        name={"password"}
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                isDisabled={differentUser}
                                placeholder="Senha"
                                type="password"
                            />
                        )}
                    />

                    <Controller
                        name={"phone"}
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                isDisabled={differentUser}
                                placeholder="Telefone"
                                type="text"
                            />
                        )}
                    />

                    <Controller
                        name={"cpf"}
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                isDisabled={differentUser}
                                placeholder="CPF"
                                type="text"
                            />
                        )}
                    />

                    <Button
                        isDisabled={differentUser}
                        fullWidth
                        type={"submit"}
                    >
                        Salvar
                    </Button>
                </Form>
            </div>
        </div>
    )
}