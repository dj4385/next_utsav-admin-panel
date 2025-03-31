"use client"

import { IBanner, IBannerData } from "@/app/types/components/About";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tag } from "lucide-react";
import { ChangeEvent, useEffect } from "react";

const VenueForm = ({
    venueData, setVenueData
}: any) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setVenueData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white mt-4">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <Tag /> Venue Section</h2>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <Input type="text" placeholder="Enter Brand Name" name="name" onChange={handleChange} value={venueData?.name || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Property Type</label>
                    <Input type="text" placeholder="Enter Brand Name" name="property_type" onChange={handleChange} value={venueData?.property_type || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Capacity</label>
                    <Input type="text" placeholder="Enter story here" onChange={handleChange} name="capacity" value={venueData?.capacity || ''} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">OutSide Catering Policy</label>
                    <Input type="text" placeholder="Enter story here" onChange={handleChange} name="outdoor_catering_policy" value={venueData?.outdoor_catering_policy || ''} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">AQI</label>
                    <Input type="number" placeholder="Enter story here" onChange={handleChange} name="air_quality_index" value={venueData?.air_quality_index || 0} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Google Rating</label>
                    <Input type="number" placeholder="Enter story here" onChange={handleChange} name="google_rating" value={venueData?.google_rating || 0} />
                </div>
            </div>
            {/* <Separator className="mt-4" />
            <div>
                <h2 className="flex flex-row gap-2 p-2 items-center text-lg font-medium"> Location</h2>
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 p-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <Input type="text" placeholder="Enter Brand Name" name="city" onChange={handleChange} value={venueData?.city || ''} className="mt-1 w-full" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">State</label>
                        <Input type="text" placeholder="Enter Brand Name" name="state" onChange={handleChange} value={venueData?.state || ''} className="mt-1 w-full" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <Input type="text" placeholder="Enter Brand Name" name="address" onChange={handleChange} value={venueData?.address || ''} className="mt-1 w-full" />
                    </div>
                </div>
            </div> */}
            <Separator className="mt-4" />
            <div>
                <h2 className="flex flex-row gap-2 p-2 items-center text-lg font-medium">Nearest Airport</h2>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <Input type="text" placeholder="Enter Brand Name" name="airportName" onChange={handleChange} value={venueData?.airportName || ''} className="mt-1 w-full" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Distance(KM)</label>
                        <Input type="number" placeholder="Enter Brand Name" name="distance" onChange={handleChange} value={venueData?.distance_km || ''} className="mt-1 w-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VenueForm;