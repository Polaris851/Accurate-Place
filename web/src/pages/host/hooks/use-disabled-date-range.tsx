type DisabledDateRange = {
    after: Date;
} | {
    before: Date;
} | undefined;

function addDaysFromDate(date: Date, days: number) {
    const clone = new Date(date);

    clone.setDate(clone.getDate() + days);

    return clone;
}

export function useDisabledDateRange(currentDate: Date | undefined, nearestOccupiedDate: Date | undefined): DisabledDateRange {
    if (currentDate === undefined) {
        return undefined;
    }
    
    if (nearestOccupiedDate === undefined) {
        return {
            before: currentDate
        };
    } 

    return {
        before: currentDate,
        after: nearestOccupiedDate
    };
}