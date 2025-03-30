"use client"

import { IExperience, IExperienceData } from "@/app/types/components/About";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import { ChangeEvent, useEffect } from "react";

const Experience = ({
    experienceData, setExperienceData
}: IExperience) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setExperienceData((prev: IExperienceData) => ({
            ...prev,
            [name]: value,
        }));
    }

    const onFileUpload = (url: string) => {
        setExperienceData((prev: IExperienceData) => ({
            ...prev,
            experience: url,
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <Star /> Experience Section</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Experience</label>
                    <Input placeholder="Enter story here" onChange={handleChange}  name="experience" value={experienceData.experience} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Experience Label</label>
                    <Input type="text" placeholder="Enter Brand Name" name="experience_label" onChange={handleChange} value={experienceData?.experience_label || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Alt Experience Logo</label>
                    <Input type="text" placeholder="Enter Brand Name" name="alt_experience_icon" onChange={handleChange} value={experienceData?.alt_experience_icon || ''} className="mt-1 w-full" />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience Icon</label>
                    <FileUploader url={experienceData?.experience_icon || ''} urlType="image" onFileUpload={(url: string) => onFileUpload(url)}  />
                </div>
                
            </div>
        </div>
    )
}

export default Experience;