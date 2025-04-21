import { useMemo } from "react";
import { formatCurrency } from "../../../../utils/format-currency";

interface ValueFromDateRangeProps {
    hourlyPrice: number;
    from?: Date;
    to?: Date;
}

export function ValueFromDateRange(props: ValueFromDateRangeProps) {
    const { hourlyPrice = 0, from, to } = props;

    const totalDaysInMilliseconds = useMemo(() => {
        const deltaTime = (to?.getTime() ?? 0) - (from?.getTime() ?? 0);
        console.log(deltaTime)
        return deltaTime;
    }, [from, to]);

    const totalDays = totalDaysInMilliseconds / 86400000;
    
    const price = useMemo(() => {
        return totalDays * hourlyPrice * 24
    }, [totalDays]);


    return <div>{formatCurrency(price)} por {totalDays} dia(s)</div>
}