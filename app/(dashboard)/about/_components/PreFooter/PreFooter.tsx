"use client"

import { IPrefooter, IPreFooterData } from "@/app/types/components/About";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Input } from "@/components/ui/input";
import { Tag } from "lucide-react";
import { ChangeEvent } from "react";

const PreFooter = ({
    preFooterData, setPreFooterData
}: IPrefooter) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setPreFooterData((prev: IPreFooterData) => ({
            ...prev,
            [name]: value,
        }));
    }

    const onFileUpload = (url: string) => {
        setPreFooterData((prev: IPreFooterData) => ({
            ...prev,
            pre_footer_image: url,
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <Tag /> Pre-Footer Section</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">PreFooter Text</label>
                    <Input type="text" placeholder="Enter Prefooter Text" name="pre_footer_text" onChange={handleChange} value={preFooterData?.pre_footer_text || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">PreFooter Image Alt</label>
                    <Input type="text" placeholder="Enter Prefooter Image Alt" name="pre_alt_footer_image" onChange={handleChange} value={preFooterData?.pre_alt_footer_image || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prefooter Image</label>
                    <FileUploader url={preFooterData?.pre_footer_image || ''} urlType="image" onFileUpload={(url: string) => onFileUpload(url)}  />
                </div>
                
            </div>
        </div>
    )
}

export default PreFooter;