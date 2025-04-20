import { Ban } from "lucide-react";
import { Button } from "../../../../../components/button";

export function CancelReservationAction() {
    return (
        <Button
            isIconOnly
            size={"sm"}
            variant={"light"}
            color={"danger"}
        >
            <Ban className={"size-4"} />
        </Button>
    )
}