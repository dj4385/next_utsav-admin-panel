"use client"

import { IMeta } from "@/app/types/components/Home";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Home } from "lucide-react";

const Meta = ({
    metaData,
    setMetaData
}: IMeta) => {
    return (
        <div className="border-[2px] rounded-lg p-2 w-full">
            <h2 className="flex flex-row gap-2 items-center text-lg font-medium mb-3"> <Home /> Meta Section</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Meta Title</label>
                    <Input type="text" placeholder="Enter Meta Title" className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                    <Input type="text" placeholder="Enter Meta Description" className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Meta Image</label>
                    <FileUploader imageUrl="" />
                </div>
            </div>
        </div>
    )
}

export default Meta;