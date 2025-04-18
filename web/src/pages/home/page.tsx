import { FileChartLine, MapPinHouse, UsersRound } from "lucide-react";
import { NavLink } from "react-router";

export function Home() {
  return (
    <div className="max-w-6xl mx-auto my-12 space-y-6 px-4">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-3 auto-rows-[130px]">
        <NavLink
          className="rounded-md bg-zinc-800 p-5 flex flex-col items-center justify-center gap-3 overflow-hidden hover:ring-2 hover:ring-fuchsia-950"
          to={"/host"} >
          <p className="flex items-center gap-2 text-zinc-200 text-lg font-semibold">
            <MapPinHouse className="size-5 text-zinc-200" />
            Tipos de Locações
          </p>
        </NavLink>
        <NavLink
          className="rounded-md bg-zinc-800 p-5 flex flex-col items-center justify-center gap-3 overflow-hidden hover:ring-2 hover:ring-fuchsia-950"
          to={"/client"} >
          <p className="flex items-center gap-2 text-zinc-200 text-lg font-semibold">
            <UsersRound className="size-5 text-zinc-200" />
            Clientes
          </p>
        </NavLink>
        <NavLink
          className="rounded-md bg-zinc-800 p-5 flex flex-col items-center justify-center gap-3 overflow-hidden hover:ring-2 hover:ring-fuchsia-950"
          to={"/reservation"} >
          <p className="flex items-center gap-2 text-zinc-200 text-lg font-semibold">
            <FileChartLine className="size-5 text-zinc-200" />
            Reservas
          </p>
        </NavLink>
      </div>
    </div>
  );
}