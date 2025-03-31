"use client"

import { IGlobalPresence, IGlobalPresenceData } from "@/app/types/components/Contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Globe2 } from "lucide-react";
import { ChangeEvent, useEffect } from "react";

const GlobalPresence = ({
    globalPresenceData,
    globalPresenceList,
    setGlobalPresenceData,
    setGlobalPresenceList
}: IGlobalPresence) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setGlobalPresenceData((prev: IGlobalPresenceData) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <Globe2 /> Global Presence</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Global Presence Heading</label>
                    <Input type="text" placeholder="Enter Global Presence Heading" name="global_presence_heading" onChange={handleChange} value={globalPresenceData?.global_presence_heading || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Global Presence Sub Heading</label>
                    <Textarea placeholder="Enter sub heading here" onChange={handleChange}  name="global_presence_sub_heading" value={globalPresenceData?.global_presence_sub_heading || ''} />
                </div>
            </div>
        </div>
    )
}

export default GlobalPresence;