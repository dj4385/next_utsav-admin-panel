"use client"

import { ILegacy, ILegacyData } from "@/app/types/components/About";
import { Input } from "@/components/ui/input";
import { NotebookPen, Tag } from "lucide-react";
import { ChangeEvent } from "react";

const Legacy = ({
    legacyData, setLegacyData
}: ILegacy) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setLegacyData((prev: ILegacyData) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <NotebookPen /> Legacy Section</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Legacy Heading</label>
                    <Input type="text" placeholder="Enter Legacy Heading" name="legacy_heading" onChange={handleChange} value={legacyData?.legacy_heading || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Legacy Section</label>
                    <Input type="text" placeholder="Enter Legacy Section" name="legacy_section" onChange={handleChange} value={legacyData?.legacy_section || ''} className="mt-1 w-full" />
                </div>
                
            </div>
        </div>
    )
}

export default Legacy;