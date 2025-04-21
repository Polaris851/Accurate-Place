export function isDateRangeValid(from: Date, to: Date, minDays: number, maxDays: number): boolean {
    const totalDays = (to.getTime() - from.getTime()) / 1000 / 86400;

    return totalDays >= minDays && totalDays <= maxDays;
}