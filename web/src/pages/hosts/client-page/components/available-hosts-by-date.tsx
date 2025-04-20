
import { Button } from "../../../../components/button";
import { DateRangePicker } from "@heroui/react";
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

  return (
    <div className="flex gap-3 bg-zinc-800 rounded-lg items-center justify-center py-1.5 px-2">
      <DateRangePicker
        label="Locações Disponiveis"
        variant={undefined}
        selectorButtonPlacement="start"
        visibleMonths={1}
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
        Buscar
      </Button>
    </div>
  )
}
