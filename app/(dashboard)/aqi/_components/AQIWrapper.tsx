'use client';

import ContentHeader from "@/components/ContentHeader/ContentHeader";
import { Wind } from "lucide-react";
import AQIForm from "./AQIForm/AQIForm";
import AQITable from "./AQITable/AQITable";

const AQIWrapper = () => {
    return (
        <div className="flex flex-col rounded-lg bg-gray-50 p-2">
            <div className="w-full">
                <ContentHeader title="AQI" icon={<Wind />} />
            </div>
            <div className="flex flex-col mt-5">
                <AQIForm />
                <div className="mt-2">
                    <AQITable />
                </div>
            </div>
        </div>
    )
}

export default AQIWrapper;
