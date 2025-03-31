"use client"

import { IContactHeading, IContactHeadingData } from "@/app/types/components/Contact";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreditCard } from "lucide-react";
import { ChangeEvent, useEffect } from "react";

const ContactHeading = ({
    contactHeadingData,
    setContactHeadingData
}: IContactHeading) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setContactHeadingData((prev: IContactHeadingData) => ({
            ...prev,
            [name]: value,
        }));
    }

    const onFileUpload = (url: string) => {
        setContactHeadingData((prev: IContactHeadingData) => ({
            ...prev,
            header_image: url,
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <CreditCard /> Heading Section</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Heading</label>
                    <Input type="text" placeholder="Enter Brand Name" name="heading" onChange={handleChange} value={contactHeadingData?.heading || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Sub Heading</label>
                    <Textarea placeholder="Enter story here" onChange={handleChange}  name="sub_heading" value={contactHeadingData.sub_heading} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Alt Header Image</label>
                    <Input type="text" placeholder="Enter Brand Name" name="alt_header_image" onChange={handleChange} value={contactHeadingData?.alt_header_image || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Banner</label>
                    <FileUploader url={contactHeadingData?.header_image || ''} urlType="image" onFileUpload={(url: string) => onFileUpload(url)}  />
                </div>
                
            </div>
        </div>
    )
}

export default ContactHeading;