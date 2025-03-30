"use client"

import { IVenue, IVenueData } from "@/app/types/components/About";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Input } from "@/components/ui/input";
import { LocateIcon, Tag } from "lucide-react";
import { ChangeEvent, useEffect } from "react";

const Venue = ({
    setVenueData, venueData
}: IVenue) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setVenueData((prev: IVenueData) => ({
            ...prev,
            [name]: value,
        }));
    }

    const onFileUpload = (url: string) => {
        setVenueData((prev: IVenueData) => ({
            ...prev,
            venues_count_icon: url,
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <LocateIcon /> Venue</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Venue Label</label>
                    <Input type="text" placeholder="Enter Brand Name" name="venue_label" onChange={handleChange} value={venueData?.venue_label || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Alt Venue Count Icon</label>
                    <Input type="text" placeholder="Enter Brand Name" name="alt_venues_count_icon" onChange={handleChange} value={venueData?.alt_venues_count_icon || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Venue Count</label>
                    <Input type="text" placeholder="Enter Brand Name" name="venues_count" onChange={handleChange} value={venueData?.venues_count || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Venue Count Icon</label>
                    <FileUploader url={venueData?.venues_count_icon || ''} urlType="image" onFileUpload={(url: string) => onFileUpload(url)}  />
                </div>
                
            </div>
        </div>
    )
}

export default Venue;