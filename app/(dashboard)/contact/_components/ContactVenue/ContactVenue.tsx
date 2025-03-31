"use client"

import { IContactVenue, IContactVenueData } from "@/app/types/components/Contact";
import { Input } from "@/components/ui/input";
import { Globe2, Locate, Tv } from "lucide-react";
import { ChangeEvent, useEffect } from "react";

const ContactVenue = ({
    contactVenueData,
    setContactVenueData
}: IContactVenue) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setContactVenueData((prev: IContactVenueData) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <Locate /> Venue</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Venue Email Heading</label>
                    <Input type="text" placeholder="Enter Venue Email Heading" name="venue_email_heading" onChange={handleChange} value={contactVenueData?.venue_email_heading || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Venue Email</label>
                    <Input type="email" placeholder="Enter venue email" onChange={handleChange}  name="venue_email" value={contactVenueData?.venue_email || ''} />
                </div>
            </div>
        </div>
    )
}

export default ContactVenue;