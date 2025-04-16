import { Trash, FilePenLine  } from "lucide-react";

interface ClientProps {
  clientId: number;
    name: string,
}

export function CardClient({ clientId, name }: ClientProps) { 
    return (
        <div 
         className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-between" >
          <p>{name}</p>
          <p>6 reservaas</p>
        
          <div className="flex gap-3">
            <button className="cursor-pointer" onClick={() => alert("oii")}>
              <FilePenLine className="size-5 text-zinc-200" />
            </button>
            <button className="cursor-pointer" onClick={() => alert("aaa")}>
              <Trash className="size-5 text-zinc-200" />
            </button>
          </div>
        </div>
    )
}