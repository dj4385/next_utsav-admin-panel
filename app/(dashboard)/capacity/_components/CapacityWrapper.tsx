'use client';

import ContentHeader from "@/components/ContentHeader/ContentHeader";
import { Lightbulb } from "lucide-react";
import CapacityForm from "./CapacityForm/CapacityForm";
import CapacityTable from "./CapacityTable/CapacityTable";

const CapacityWrapper = () => {
    return (
        <div className="flex flex-col rounded-lg bg-gray-50 p-2">
            <div className="w-full">
                <ContentHeader title="Capacity" icon={<Lightbulb />} />
            </div>
            <div className="flex flex-col mt-5">
                <CapacityForm />
                <div className="mt-2">
                    <CapacityTable />
                </div>
            </div>
        </div>
    )
}

export default CapacityWrapper;
