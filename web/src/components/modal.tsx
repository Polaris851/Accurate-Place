import { X } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
    title: string;
    open: boolean;
    onClose?: () => void;
    children?: ReactNode;
}

export function Modal(props: ModalProps) {
    const { title, open, onClose, children } = props;

    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 bg-zinc-900 space-y-5">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button type="button" className="cursor-pointer" onClick={onClose}>
                        <X className="size-5 text-zinc-200" />
                    </button>
                </div>
                <div aria-description="modal-content">
                    {children}
                </div>
            </div>
        </div>
    )
}