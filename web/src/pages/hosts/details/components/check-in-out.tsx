interface CheckInOutProps {
    from: Date | undefined;
    to: Date | undefined;
}

export function CheckInOut(props: CheckInOutProps) {
    const { from, to } = props;

    return (
        <div className="flex items-center w-full select-none">
            <div className="flex-1 text-center p-4 border border-white rounded-l-[9px]">
                {from?.toLocaleDateString("pt-BR") ?? "Check-in"}
            </div>
            <div className="flex-1 text-center p-4 border border-white rounded-r-[9px]">
                {to?.toLocaleDateString("pt-BR") ?? "Check-out"}
            </div>
        </div>
    )
}