"use client";

import { store } from "@/lib/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

interface ChildrenProps{
    children: ReactNode
}


export function ReduxProvider({children}: ChildrenProps) {
    return <Provider store={store}>{children}</Provider>
}