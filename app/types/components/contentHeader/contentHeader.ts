import { ReactNode } from "react";

export interface IContentHeader {
    title: string;
    icon: ReactNode;
    buttonLabel?: string;
    buttonIcon?: ReactNode;
    onBtnClick?: () => void
}