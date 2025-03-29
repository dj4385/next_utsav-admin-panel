"use client"

import { IContact, IContactData,  } from "@/app/types/components/Home";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Contact2, Rocket } from "lucide-react";
import { ChangeEvent } from "react";

const Contact = ({
    contactData,
    setContactData
}: IContact) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setContactData((prev: IContactData) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <Contact2 /> Contact Section</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Heading</label>
                    <Input type="text" placeholder="Enter Contact Heading" className="mt-1 w-full" onChange={handleChange} name="heading" value={contactData.heading} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Sub Heading</label>
                    <Input type="text" placeholder="Enter Contact Heading" className="mt-1 w-full" onChange={handleChange} name="sub_heading" value={contactData.sub_heading} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <Input type="text" placeholder="Enter Contact Heading" className="mt-1 w-full" onChange={handleChange} name="email" value={contactData.email} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <Input type="text" placeholder="Enter Contact Heading" className="mt-1 w-full" onChange={handleChange} name="phone" value={contactData.phone} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Button</label>
                    <Input type="text" placeholder="Enter Contact Heading" className="mt-1 w-full" onChange={handleChange} name="button" value={contactData.button} />
                </div>
            </div>
        </div>
    )
}

export default Contact;