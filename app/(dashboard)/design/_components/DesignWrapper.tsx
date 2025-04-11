'use client';

import ContentHeader from "@/components/ContentHeader/ContentHeader";
import { Camera } from "lucide-react";
import DesignForm from "./DesignForm/DesignForm";
import DesignList from "./DesignList/DesignList";

const DesignWrapper = () => {
    return (
        <div className="flex flex-col rounded-lg bg-gray-50 p-2">
            <div className="w-full">
                <ContentHeader title="Design" icon={<Camera />} />
            </div>
            <div className="flex flex-col mt-5">
                <DesignForm />
                <div className="mt-2">
                    <DesignList />
                </div>
            </div>
        </div>
    )
}

export default DesignWrapper;