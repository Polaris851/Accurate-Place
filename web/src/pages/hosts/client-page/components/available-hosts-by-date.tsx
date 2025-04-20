
import { Search } from "lucide-react";
import { Button } from "../../../../components/button";
import { DateRangePicker } from "@heroui/react";
import { FieldValues } from "react-hook-form";
import { useState } from "react";

export interface Range {
  from: Date;
  to: Date;
}

interface Props {
  onSubmit: (range: Range | undefined) => void;
}

export function AvailableHostsByDate(props: Props) {
  const { onSubmit } = props;

  const [range, setRange] = useState<Range | undefined>();

  console.log(range);

  return (
    <div>
      <DateRangePicker
        className="text-violet-900"
        color="secondary"
        label="Locações Disponiveis"
        pageBehavior="single"
        visibleMonths={2}
        onChange={(_range) => {
          if (_range === null) {
            setRange(undefined);

            return;
          }

          setRange({
            from: new Date(_range.start.year, _range.start.month - 1, _range.start.day),
            to: new Date(_range.end.year, _range.end.month - 1, _range.end.day),
          });
        }}
      />
      <Button onPress={() => onSubmit(range)}>
        <Search className="size-5 text-zinc-200" />
        Buscar
      </Button>
    </div>
  )
}
