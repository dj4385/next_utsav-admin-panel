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
        <div className="border-[2px] rounded-lg p-2 w-full">
            <h2 className="flex flex-row gap-2 items-center text-lg font-medium mb-3"> <Tag /> Brand Section</h2>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Brand Name</label>
                    <Input type="text" placeholder="Enter Brand Name" name="brandName" onChange={handleChange} value={brandData?.brandName || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Alt Brand Logo</label>
                    <Input type="text" placeholder="Enter Brand Name" name="brandAlt" onChange={handleChange} value={brandData?.brandAlt || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Brand Logo</label>
                    <FileUploader imageUrl={brandData?.brandLogo || ''}  />
                </div>
                
            </div>
        </div>
    )
}

export default Brand;