"use client"

import { IBrand, IBrandData } from "@/app/types/components/Home";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Input } from "@/components/ui/input";
import { Tag } from "lucide-react";
import { ChangeEvent } from "react";

const Brand = ({
    brandData, setBrandData
}: IBrand) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setBrandData((prev: IBrandData) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <Tag /> Brand Section</h2>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Brand Name</label>
                    <Input type="text" placeholder="Enter Brand Name" name="brand_name" onChange={handleChange} value={brandData?.brand_name || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Alt Brand Logo</label>
                    <Input type="text" placeholder="Enter Brand Name" name="alt_brand_logo" onChange={handleChange} value={brandData?.alt_brand_logo || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Brand Logo</label>
                    <FileUploader url={brandData?.brand_logo || ''} urlType="image"  />
                </div>
                
            </div>
        </div>
    )
}

export default Brand;