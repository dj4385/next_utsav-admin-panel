"use client"

import { IContentHeader } from "@/app/types/components/contentHeader/contentHeader";
import ButtonComponent from "../core/Button/Button";
import { History } from "lucide-react";

const ContentHeader = ({
    title, icon
}: IContentHeader) => {
    return (
        <div className="flex items-center justify-between w-full">
            <h2 className="text-2xl font-medium flex gap-4 items-center"> 
                {icon}
                {title}
            </h2>
            <div>
                <ButtonComponent label="History" icon={<History />} loading={false} onClick={() => {}} />
            </div>
        </div>
    )
}

export default ContentHeader;