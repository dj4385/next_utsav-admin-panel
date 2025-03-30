"use client"

import { IAward, IAwardData } from "@/app/types/components/About";
import { Input } from "@/components/ui/input";
import { AwardIcon } from "lucide-react";
import { ChangeEvent } from "react";

const Award = ({
    awardData, setAwardData
}: IAward) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setAwardData((prev: IAwardData) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <AwardIcon /> Award</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Award Section</label>
                    <Input type="text" placeholder="Enter Brand Name" name="awards_section" onChange={handleChange} value={awardData?.awards_section || ''} className="mt-1 w-full" />
                </div>
            </div>
        </div>
    )
}

export default Award;