"use client"

import { IMission, IMissionData } from "@/app/types/components/Home";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Rocket } from "lucide-react";
import { ChangeEvent } from "react";

const Mission = ({
    missionData,
    setMissionData
}: IMission) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setMissionData((prev: IMissionData) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <Rocket /> Mission Section</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Mission Heading</label>
                    <Input type="text" placeholder="Enter Mission Heading" className="mt-1 w-full" onChange={handleChange} name="mission_heading" value={missionData.mission_heading} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Mission</label>
                    <Textarea placeholder="Enter mission here" name="mission" onChange={handleChange} value={missionData.mission} />
                </div>
            </div>
        </div>
    )
}

export default Mission;