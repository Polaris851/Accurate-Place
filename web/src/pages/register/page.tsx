import { CircleCheck, EyeClosedIcon, EyeIcon } from "lucide-react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { FieldValues, useForm } from "react-hook-form";
import { api } from "../../lib/axios";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

export function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const { handleSubmit, register } = useForm();

    const navigate = useNavigate();

    function registerUser(data: FieldValues) {
        api.post("/register", data)
            .then((response) => {
                const token = response.data.accessToken;
                if (!token) {
                    throw new Error();
                }

                localStorage.setItem("access_token", token);
                api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                navigate("/");
            });
    }

    return (
        <div className="h-screen grid md:grid-cols-2 grid-cols-1">
            <div className="flex items-center justify-center">
                <img src="/undraw_welcome.svg" className="size-2/3" />
            </div>
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2">
                    <h1 className="text-zinc-100 text-3xl font-semibold">Seja bem-vindo!</h1>
                    <p className="text-zinc-400 text-sm">Já possui uma conta? {" "}
                        <Link to={"/login"} className="text-primary-400 underline font-semibold">
                            Clique aqui
                        </Link></p>
                </div>

                <form
                    className="md:w-[540px] md:py-5 py-2 md:px-6 px-3 space-y-3"
                    onSubmit={handleSubmit(registerUser)}
                >
                    <Input
                        {...register("name", {
                            required: true
                        })}
                        isRequired
                        label="Nome"
                        errorMessage={"Insira um nome"}
                        placeholder={"Insira o seu nome"}
                        type="text"
                    />

                    <div className="flex gap-3">
                        <Input
                            {...register("cpf", {
                                required: {
                                    message: "Insira o CPF",
                                    value: true
                                }
                            })}
                            isRequired
                            errorMessage={"Insira o CPF"}
                            label={"CPF"}
                            placeholder={"Insira o seu CPF"}
                            type="text"
                        />

                        <Input
                            {...register("phone", {
                                required: {
                                    message: "Insira um telefone",
                                    value: true
                                }
                            })}
                            isRequired
                            errorMessage={"Insira um telefone"}
                            label={"Telefone"}
                            placeholder={"Insira o seu telefone"}
                            type="text"
                        />

                    </div>

                    <Input
                        {...register("email", {
                            required: true
                        })}
                        isRequired
                        label="E-mail"
                        errorMessage={"Insira um e-mail"}
                        placeholder={"Insira o seu e-mail"}
                        type="email"
                    />

                    <Input
                        {...register("password", {
                            required: {
                                message: "Insira uma senha",
                                value: true
                            }
                        })}
                        isRequired
                        errorMessage={"Insira uma senha"}
                        label={"Senha"}
                        minLength={8}
                        placeholder={"Insira a sua senha"}
                        type={showPassword ? "text" : "password"}
                        endContent={
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="focus:outline-none "
                            >
                              {showPassword ? (
                                <EyeClosedIcon className="size-6 text-gray-500" />
                              ) : (
                                <EyeIcon className="size-6 text-gray-500" />
                              )}
                            </button>}
                    />



                    <Button type="submit" fullWidth>
                        <CircleCheck className="size-5 text-primary-400" />
                        Confirmar
                    </Button>
                </form>
            </div>
        </div>
    );
}