import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { Button } from "../../../../components/button";
import { Trash } from "lucide-react";

interface DeleteProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function DeleteConfirm(props: DeleteProps) {
    const { isOpen, onClose, onConfirm } = props;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Excluir</ModalHeader>
                        <ModalBody>
                            Realmente deseja excluir esse item?
                        </ModalBody>
                        <ModalFooter>
                            <Button variant={"light"} onPress={onClose}>Cancelar</Button>
                            <Button
                                startContent={<Trash className="size-4" />}
                                color={"danger"}
                                onPress={() => {
                                    onConfirm();
                                    onClose();
                                }}
                            >Excluir</Button>
                        </ModalFooter>
                    </>
                )}

            </ModalContent>
        </Modal>
    )
}