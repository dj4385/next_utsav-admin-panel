'use server'

import ContentHeader from "@/components/ContentHeader/ContentHeader";
import { Camera } from "lucide-react";
import PhotographerForm from "./PhotographerForm/PhotographerForm";
import PhotographerList from "./PhotographerList/PhotographerForm";

const PhotographerWrapper = async () => {
    return (
        <div className="flex flex-col rounded-lg bg-gray-50 p-2">
            <div className="w-full">
                <ContentHeader title="Photographer" icon={<Camera />} />
            </div>
            <div className="flex flex-col mt-5">
                <PhotographerForm />
                <div className="mt-2">
                    <PhotographerList />
                </div>
            </div>
        </div>
    )
}

export default PhotographerWrapper;
