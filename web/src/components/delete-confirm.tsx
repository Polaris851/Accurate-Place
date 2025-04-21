import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { Button } from "./button";
import { Trash } from "lucide-react";
import { ReactNode } from "react";

interface DeleteProps {
    isOpen: boolean;
    title?: ReactNode;
    body?: ReactNode;
    confirmText?: string;
    onClose: () => void;
    onConfirm: () => void;
}

export function DeleteConfirm(props: DeleteProps) {
    const {
        isOpen,
        title = "Excluir",
        body = "Realmente deseja excluir esse item?",
        confirmText = "Excluir",
        onClose,
        onConfirm
    } = props;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>{title}</ModalHeader>
                        <ModalBody>
                            {body}
                        </ModalBody>
                        <ModalFooter>
                            <Button variant={"light"} color={"default"} onPress={onClose}>Cancelar</Button>
                            <Button
                                startContent={<Trash className="size-4" />}
                                color={"danger"}
                                onPress={() => {
                                    onConfirm();
                                    onClose();
                                }}
                            >
                                {confirmText}
                            </Button>
                        </ModalFooter>
                    </>
                )}

            </ModalContent>
        </Modal>
    )
}