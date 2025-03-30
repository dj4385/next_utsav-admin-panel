"use client"

import { IVision, IVisionData } from "@/app/types/components/Home";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EyeIcon, Home } from "lucide-react";
import { ChangeEvent } from "react";

const Vision = ({
    setVisionData,
    visionData
}: IVision) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setVisionData((prev: IVisionData) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 items-center p-2 bg-purple-700 text-white text-lg font-medium mb-3"> <EyeIcon /> Vision Section</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Vision Heading</label>
                    <Input type="text" placeholder="Enter Vision Heading" className="mt-1 w-full" onChange={handleChange} name="vision_heading" value={visionData.vision_heading} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Vision</label>
                    <Textarea placeholder="Enter vision here" onChange={handleChange} name="vision" value={visionData.vision} />
                </div>
            </div>
        </div>
    )
}

export default Vision;