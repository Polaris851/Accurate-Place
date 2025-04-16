import { CircleCheck } from "lucide-react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";

export function Login() {
    return (
        <div className="h-screen grid md:grid-cols-2 grid-cols-1">
          <div className="flex items-center justify-center">
            <p>imagem</p>
          </div>
          <div className="flex items-center justify-center">
            <form className="w-[540px] py-5 px-6 space-y-3">
              <Input
                placeholder="Nome"
                type="text"
              />

              <Input
                placeholder="Senha"
                type="password"
              />

              <Button type="submit" size="full">
                <CircleCheck className="size-5 text-fuchsia-300"/>
                Confirmar
              </Button>
            </form>
          </div>
        </div>
    );
}