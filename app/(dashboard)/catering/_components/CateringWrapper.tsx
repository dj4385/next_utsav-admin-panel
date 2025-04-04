'use client';

import ContentHeader from "@/components/ContentHeader/ContentHeader";
import { UtensilsCrossed } from "lucide-react";
import CateringForm from "./CateringForm/CateringForm";
import CateringTable from "./CateringTable/CateringTable";

const CateringWrapper = () => {
    return (
        <div className="flex flex-col rounded-lg bg-gray-50 p-2">
            <div className="w-full">
                <ContentHeader title="Catering" icon={<UtensilsCrossed />} />
            </div>
            <div className="flex flex-col mt-5">
                <CateringForm />
                <div className="mt-2">
                    <CateringTable />
                </div>
            </div>
        </div>
    )
}

export default CateringWrapper;