"use client"

import { IBanner, IBannerData } from "@/app/types/components/About";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ExperienceService } from "@/services/experience.service";
import { LocationService } from "@/services/location.service";
import { Tag } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

const VenueForm = ({
    venueData, setVenueData
}: any) => {

    const [experienceList, setExperienceList] = useState<any[]>([])
    const [locationList, setLocationList] = useState<any[]>([])
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'location') {
            const selectedLocation = locationList.find(loc => loc._id === value);
            setVenueData((prev: any) => ({
                ...prev,
                location: selectedLocation || null,
            }));
        } else if (name === 'experience') {
            const selectedExperience = experienceList.find(exp => exp._id === value);
            setVenueData((prev: any) => ({
                ...prev,
                experience: selectedExperience || null,
            }));
        } else {
            setVenueData((prev: any) => ({
                ...prev,
                [name]: value,
            }));
        }
    }

    const getExperienceList = async () => {
        try {
            const res: any = await ExperienceService.getExperienceList();
            if (res && res.status == 200 && res.data.data.length) {
                setExperienceList(res.data.data)
            }
        } catch (error) {

        }
    }

    const getLocationList = async () => {
        try {
            const res: any = await LocationService.getLocationList();
            if (res && res.status == 200 && res.data.data.length) {
                setLocationList(res.data.data)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getExperienceList();
        getLocationList();
    }, [])

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white mt-4">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <Tag /> Venue Section</h2>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <Input type="text" placeholder="Enter Venue Name" name="venue_name" onChange={handleChange} value={venueData?.venue_name || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <select className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" name="location" onChange={handleChange} value={venueData?.location?._id || ''}  >
                        <option value="">Select Location</option>
                        {
                            locationList.length ? locationList.map((loc, index) => <option key={index} value={loc._id}> {loc.name} </option>) : null
                        }
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Experience</label>
                    <select className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" name="experience" onChange={handleChange} value={venueData?.experience?._id || ''} >
                        <option value="">Select Experience</option>
                        {
                            experienceList.length ? experienceList.map((exp, index) => <option key={index} value={exp._id}> {exp.name} </option>) : null

                        }
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Property Type</label>
                    <Input type="text" placeholder="Enter Property type" name="property_type" onChange={handleChange} value={venueData?.property_type || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Capacity</label>
                    <Input type="number" placeholder="Enter Capacity" onChange={handleChange} name="capacity" value={venueData?.capacity || ''} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Outside Catering Policy</label>
                    <select className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" name="outdoor_catering_policy" onChange={handleChange} value={venueData?.outdoor_catering_policy || ''} >
                        <option value="">Select Outside Catering Policy</option>
                        <option value="ALLOWED">Allowed</option>
                        <option value="NOT ALLOWED">Not Allowed</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">AQI</label>
                    <Input type="number" placeholder="Enter air quality index" onChange={handleChange} name="air_quality_index" value={venueData?.air_quality_index || 0} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Google Rating</label>
                    <Input type="number" placeholder="Enter google review" onChange={handleChange} name="google_rating" value={venueData?.google_rating || 0} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Google Rating Review</label>
                    <Input type="number" placeholder="Enter google rating review" onChange={handleChange} name="google_rating_review" value={venueData?.google_rating_review || 0} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Map Link</label>
                    <Input type="text" placeholder="Enter map link" onChange={handleChange} name="map_link" value={venueData?.map_link || ''} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <Textarea placeholder="Enter description" onChange={handleChange} name="description" value={venueData?.description || ''} />
                </div>
            </div>
            <Separator className="mt-4" />
            <div>
                <h2 className="flex flex-row gap-2 p-2 items-center text-lg font-medium">Theme Options</h2>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Theme Options Heading</label>
                        <Input type="text" placeholder="Enter Theme Options Heading" name="theme_options_heading" onChange={handleChange} value={venueData?.theme_options_heading || ''} className="mt-1 w-full" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Theme Options Sub Heading</label>
                        <Input type="text" placeholder="Enter Theme Options Sub Heading" name="theme_options_subheading" onChange={handleChange} value={venueData?.theme_options_subheading || ''} className="mt-1 w-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VenueForm;