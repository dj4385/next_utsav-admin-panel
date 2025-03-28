import { ButtonHTMLAttributes, ReactNode } from "react";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    onClick: () => void;
    loading: boolean;
    icon?: ReactNode;
    customClass?: string
}