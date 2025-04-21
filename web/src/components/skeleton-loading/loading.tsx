import { Skeleton } from "@heroui/react";

export function Loading() {
    return (
        <div className={"bg-zinc-950 px-4 md:pt-10 pt-4"}>
            <div className={"md:bg-zinc-800 max-w-6xl md:p-8 mx-auto rounded-lg space-y-3"}>
                <Skeleton className="rounded-lg">
                    <div className="h-24 rounded-lg bg-default-300" />
                </Skeleton>
                <div className="space-y-3">
                    <Skeleton className="w-3/5 rounded-lg">
                        <div className="h-3 w-3/5 rounded-lg bg-default-200" />
                    </Skeleton>
                    <Skeleton className="w-4/5 rounded-lg">
                        <div className="h-3 w-4/5 rounded-lg bg-default-200" />
                    </Skeleton>
                    <Skeleton className="w-2/5 rounded-lg">
                        <div className="h-3 w-2/5 rounded-lg bg-default-300" />
                    </Skeleton>
                </div>
            </div>
        </div>
    )
}