import { Ban } from "lucide-react";
import { Button } from "../../../../../components/button";
import { api } from "../../../../../lib/axios";
import { addToast, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { DeleteConfirm } from "../../../../../components/delete-confirm";
import { useState } from "react";

interface CancelReservationActionProps {
    reservationId: number | string;
    disabled?: boolean
    onCancel?: () => void;
}

export function CancelReservationAction(props: CancelReservationActionProps) {
    const { reservationId, disabled = false, onCancel = () => {} } = props;

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    function openConfirm() {
        setIsConfirmOpen(true);
    }

    function closeConfirm() {
        setIsConfirmOpen(false);
    }

    function cancelReservation() {
        addToast({
            title: "Cancelando a sua reserva!",
            promise: api.put("/reservation/cancel", {
                reservationId
            })
            .then(() => {
                onCancel();
                addToast({
                    title: "Tudo certo!",
                    color: "success",
                    description: "A reserva foi cancelada com sucesso!"
                })
            })
            .catch(() => {
                addToast({
                    title: "Oops",
                    color: "danger",
                    description: "Houve uma falha ao cancelar a reserva"
                })
            })
        });
    }

    return (
        <>
            <Button
                isIconOnly
                isDisabled={disabled}
                size={"sm"}
                variant={"light"}
                color={"danger"}
                onPress={openConfirm}
            >
                <Ban className={"size-4"} />
            </Button>
            <DeleteConfirm
                title={"Cancelar reserva"}
                body={(
                    <>
                        <p>Tem certeza que deseja cancelar a reserva?</p>
                        <p className={"font-semibold"}>Ao cancelar a reserva os dias selecionados serão liberados para outras pessoas reservarem</p>
                    </>
                )}
                isOpen={isConfirmOpen}
                onClose={closeConfirm}
                onConfirm={cancelReservation}
                confirmText={"Confirmar"}
            />
            <Modal>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Cancelar reserva</ModalHeader>
                            <ModalBody>
                                <p>Tem certeza que deseja cancelar a reserva?</p>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}