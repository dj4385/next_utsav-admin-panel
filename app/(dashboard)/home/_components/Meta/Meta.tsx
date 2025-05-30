"use client"

import { IMeta, IMetaData } from "@/app/types/components/Home";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Input } from "@/components/ui/input";
import { Home, Search } from "lucide-react";
import { ChangeEvent } from "react";

const Meta = ({
    metaData,
    setMetaData
}: IMeta) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement  >) => {
        const { name, value } = e.target;

        setMetaData((prev: IMetaData) => ({
            ...prev,
            [name]: value,
        }));
    }

    const onFileUpload = (url: string) => {
        setMetaData((prev: IMetaData) => ({
            ...prev,
            meta_image: url
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 items-center p-2 bg-purple-700 text-white text-lg font-medium mb-3"> <Search /> Meta Section</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Meta Title</label>
                    <Input type="text" placeholder="Enter Meta Title" className="mt-1 w-full" onChange={handleChange} name="meta_title" value={metaData.meta_title} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                    <Input type="text" placeholder="Enter Meta Description" className="mt-1 w-full" onChange={handleChange} name="meta_description" value={metaData.meta_description} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Meta Image</label>
                    <FileUploader url={metaData.meta_image || ''} urlType="image" onFileUpload={(url: string) => onFileUpload(url)} />
                </div>
            </div>
        </div>
    )
}

export default Meta;
