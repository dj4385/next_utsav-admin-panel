"use client"

import { IChannelPartner, IChannelPartnerData } from "@/app/types/components/Contact";
import { Input } from "@/components/ui/input";
import { Globe2, Tv } from "lucide-react";
import { ChangeEvent, useEffect } from "react";

const ChannelPartner = ({
    channelPartnerData,
    setChannelPartnerData
}: IChannelPartner) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setChannelPartnerData((prev: IChannelPartnerData) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <Tv /> Channel Partner</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Channel Partner Email Heading</label>
                    <Input type="text" placeholder="Enter channel partner Email Heading" name="channel_partner_email_heading" onChange={handleChange} value={channelPartnerData?.channel_partner_email_heading || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Channel Partner Email</label>
                    <Input type="email" placeholder="Enter Channel partner email" onChange={handleChange}  name="channel_partner_email" value={channelPartnerData?.channel_partner_email || ''} />
                </div>
            </div>
        </div>
    )
}

export default ChannelPartner;