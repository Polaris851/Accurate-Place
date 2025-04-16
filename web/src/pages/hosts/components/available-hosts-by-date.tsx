
import { Search } from "lucide-react";
import { Input } from "../../../components/input";
import { Button } from "../../../components/button";

export function AvailableHostsByDate() {
  return (
    <div className="flex">
      <Input
        placeholder="CheckIn"
        type="date"
      />
      <Input
        placeholder="CheckOut"
        type="date"
      />
      <Button type="submit">
        <Search className="size-5 text-zinc-200" />
        Buscar
      </Button>
    </div>
  )
}
