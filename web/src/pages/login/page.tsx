import { CircleCheck } from "lucide-react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { FieldValues, useForm } from "react-hook-form";
import { addToast } from "@heroui/react";
import { api } from "../../lib/axios";
import { useNavigate } from "react-router";

export function Login() {
  const { handleSubmit, register } = useForm();

  const navigate = useNavigate();

  function login(data: FieldValues) {
    api.post("/login", data)
      .then((response) => {
        const token = response.data.accessToken;

        if (!token) {
          throw new Error();
        }

        localStorage.setItem("access_token", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        navigate("/");
      })
      .catch(() => {
        addToast({
          title: "E-mail ou senha incorretos",
          description: "Por favor verifique o seu e-mail e senha e tente novamente",
          color: "danger"
        });
      });
  }

  return (
    <div className="h-screen grid md:grid-cols-2 grid-cols-1">
      <div className="flex items-center justify-center">
        <p>imagem</p>
      </div>
      <div className="flex items-center justify-center">
        <form
          className="w-[540px] py-5 px-6 space-y-3"
          onSubmit={handleSubmit(login)}
        >
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
            placeholder={"Insira a sua senha segura"}
            type="password"
          />

          <Button type="submit" fullWidth>
            <CircleCheck className="size-5 text-fuchsia-300" />
            Confirmar
          </Button>
        </form>
      </div>
    </div>
  );
}