"use client"

import { ICelebration, ICelebrationData } from "@/app/types/components/About";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LocateIcon, PartyPopper, Tag } from "lucide-react";
import { ChangeEvent, useEffect } from "react";

const Celebration = ({
    celebrationData, setCelebrationData
}: ICelebration) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setCelebrationData((prev: ICelebrationData) => ({
            ...prev,
            [name]: value,
        }));
    }

    const onFileUpload = (url: string) => {
        setCelebrationData((prev: ICelebrationData) => ({
            ...prev,
            celebration_image: url,
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <PartyPopper /> Celebration</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Celebration Heading</label>
                    <Input type="text" placeholder="Enter Brand Name" name="celebration_heading" onChange={handleChange} value={celebrationData?.celebration_heading || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Alt Celebration Image</label>
                    <Input type="text" placeholder="Enter Brand Name" name="alt_celebration_image" onChange={handleChange} value={celebrationData?.alt_celebration_image || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Celebration Text</label>
                    <Textarea placeholder="Enter celebration text" name="celebration_text" onChange={handleChange} value={celebrationData?.celebration_text || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Celebration Pitch</label>
                    <Textarea placeholder="Enter celebration pitch" onChange={handleChange}  name="celebration_pitch" value={celebrationData.celebration_pitch} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Celebration Image</label>
                    <FileUploader url={celebrationData?.celebration_image || ''} urlType="image" onFileUpload={(url: string) => onFileUpload(url)}  />
                </div>
                
            </div>
        </div>
    )
}

export default Celebration;