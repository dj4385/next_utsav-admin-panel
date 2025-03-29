import { ReactNode } from "react";

export interface ConfirmModalProps {
    children: ReactNode;
    onConfirm: () => void;
}