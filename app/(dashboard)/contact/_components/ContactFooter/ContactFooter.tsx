"use client"

import { IContactFooter, IContactFooterData } from "@/app/types/components/Contact";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Input } from "@/components/ui/input";
import { Book } from "lucide-react";
import { ChangeEvent, useEffect } from "react";

const ContactFooter = ({
    contactFooterData,
    contactFooterList,
    setContactFooterList,
    setContactFooterData
}: IContactFooter) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setContactFooterData((prev: IContactFooterData) => ({
            ...prev,
            [name]: value,
        }));
    }

    const onFileUpload = (url: string) => {
        setContactFooterData((prev: IContactFooterData) => ({
            ...prev,
            footer_image: url,
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <Book /> Footer</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Banner</label>
                    <FileUploader url={contactFooterData?.footer_image || ''} urlType="image" onFileUpload={(url: string) => onFileUpload(url)} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Alt Footer Image</label>
                    <Input type="text" placeholder="Enter Alt Footer Image" name="alt_footer_image" onChange={handleChange} value={contactFooterData?.alt_footer_image || ''} className="mt-1 w-full" />
                </div>
            </div>
        </div>
    )
}

export default ContactFooter;