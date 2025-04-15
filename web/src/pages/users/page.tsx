import { Trash, FilePenLine  } from "lucide-react";

export function UsersPage() {
    return (
      <div className="max-w-6xl mx-auto my-12 space-y-6 px-4">
        <div className="flex flex-row justify-between">
            <h1 className="text-zinc-100 text-3xl font-semibold">Clientes</h1>
            {/* <AddHostContainer /> */}
        </div>
        <div className="flow-root space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-between">
            <p>Leticia Polari</p>
            <p>6 reservaas</p>
           
            <div className="flex gap-3">
              <FilePenLine  className="size-5 text-zinc-200" />
              <Trash className="size-5 text-zinc-200" />
            </div>
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-between">
            <p>Leticia Polari</p>
            <p>6 reservaas</p>
           
            <div className="flex gap-3">
              <FilePenLine  className="size-5 text-zinc-200" />
              <Trash className="size-5 text-zinc-200" />
            </div>
          </div>
        </div>
    </div>
    );
}