"use client"

import { Input } from "@/components/ui/input";
import { Tag } from "lucide-react";
import { ChangeEvent } from "react";

const NearestAirport = ({
    nearestAirport, setNearestAirport
}: any) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNearestAirport((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white mt-4">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <Tag /> Nearest Airport Section</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <Input type="text" placeholder="Enter Nearest Airport Name" name="name" onChange={handleChange} value={nearestAirport?.name || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Distance(KM)</label>
                    <Input type="number" placeholder="Enter Distance in KM" name="distance_km" onChange={handleChange} value={nearestAirport?.distance_km || 0} className="mt-1 w-full" />
                </div>
            </div>
        </div>
    )
}

export default NearestAirport;