"use client"

import { IBanner, IBannerData } from "@/app/types/components/About";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tag } from "lucide-react";
import { ChangeEvent, useEffect } from "react";

const Banner = ({
    bannerData, setBannerData
}: IBanner) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setBannerData((prev: IBannerData) => ({
            ...prev,
            [name]: value,
        }));
    }

    const onFileUpload = (url: string) => {
        setBannerData((prev: IBannerData) => ({
            ...prev,
            banner: url,
        }));
    }
   

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <Tag /> Banner Section</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Banner Heading</label>
                    <Input type="text" placeholder="Enter Brand Name" name="banner_heading" onChange={handleChange} value={bannerData?.banner_heading || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Alt Banner Logo</label>
                    <Input type="text" placeholder="Enter Brand Name" name="alt_banner" onChange={handleChange} value={bannerData?.alt_banner || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Banner Text</label>
                    <Textarea placeholder="Enter story here" onChange={handleChange}  name="banner_text" value={bannerData.banner_text} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Banner</label>
                    <FileUploader url={bannerData?.banner || ''} urlType="image" onFileUpload={(url: string) => onFileUpload(url)}  />
                </div>
                
            </div>
        </div>
    )
}

export default Banner;