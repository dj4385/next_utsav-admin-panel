"use client"

import { IWork, IWorkData } from "@/app/types/components/Contact";
import { Input } from "@/components/ui/input";
import { WorkflowIcon } from "lucide-react";
import { ChangeEvent, useEffect } from "react";

const Work = ({
    setWorkData,
    workData
}: IWork) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setWorkData((prev: IWorkData) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <WorkflowIcon /> Work Section</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Work Email Heading</label>
                    <Input type="text" placeholder="Enter Work Email Heading" name="work_email_heading" onChange={handleChange} value={workData?.work_email_heading || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Work Email</label>
                    <Input type="email" placeholder="Enter work email" onChange={handleChange}  name="work_email" value={workData?.work_email || ''} />
                </div>
            </div>
        </div>
    )
}

export default Work;