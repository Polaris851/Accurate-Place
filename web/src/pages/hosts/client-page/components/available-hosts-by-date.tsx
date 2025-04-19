
import { Search } from "lucide-react";
import { Button } from "../../../../components/button";
import { DateRangePicker } from "@heroui/react";
import { FieldValues } from "react-hook-form";

export function AvailableHostsByDate() {
  function searchHostRangeDate(data: FieldValues) {

  }

  return (
    <form className="flex" onSubmit={searchHostRangeDate}>
        <DateRangePicker className="text-violet-900"  color="secondary"  label="Locações Disponiveis" pageBehavior="single" visibleMonths={2} />
        <Button type="submit">
          <Search className="size-5 text-zinc-200" />
          Buscar
        </Button>
    </form>
  )
}
