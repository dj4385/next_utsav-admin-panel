"use client"

import { ITeam, ITeamData } from "@/app/types/components/About";
import { Input } from "@/components/ui/input";
import { Users } from "lucide-react";
import { ChangeEvent } from "react";

const Team = ({
    setTeamData, teamData
}: ITeam) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setTeamData((prev: ITeamData) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <Users /> Team</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Team Section</label>
                    <Input type="text" placeholder="Enter Brand Name" name="team_section" onChange={handleChange} value={teamData?.team_section || ''} className="mt-1 w-full" />
                </div>
            </div>
        </div>
    )
}

export default Team;