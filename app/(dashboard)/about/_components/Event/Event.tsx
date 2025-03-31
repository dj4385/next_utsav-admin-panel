"use client"

import { IEventSection, IEventSectionData } from "@/app/types/components/About";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Input } from "@/components/ui/input";
import { Calendar1Icon } from "lucide-react";
import { ChangeEvent } from "react";

const Event = ({
   eventData, setEventData 
}: IEventSection) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setEventData((prev: IEventSectionData) => ({
            ...prev,
            [name]: value,
        }));
    }

    const onFileUpload = (url: string) => {
        setEventData((prev: IEventSectionData) => ({
            ...prev,
            events_count_icon: url,
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <Calendar1Icon /> Event Section</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Events Count Label</label>
                    <Input placeholder="Enter story here" onChange={handleChange}  name="events_count_label" value={eventData.events_count_label} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Events Count</label>
                    <Input type="number" placeholder="Enter Brand Name" name="events_count" onChange={handleChange} value={eventData?.events_count || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Alt Event Count Icon</label>
                    <Input type="text" placeholder="Enter Brand Name" name="alt_events_count_icon" onChange={handleChange} value={eventData?.alt_events_count_icon || ''} className="mt-1 w-full" />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Countries served icon</label>
                    <FileUploader url={eventData?.events_count_icon || ''} urlType="image" onFileUpload={(url: string) => onFileUpload(url)}  />
                </div>
                
            </div>
        </div>
    )
}

export default Event;