"use client"

import { ITeam, ITeamData, ITeamList } from "@/app/types/components/About";
import { Input } from "@/components/ui/input";
import { CirclePlus, Edit2, Trash2, Users } from "lucide-react";
import { ChangeEvent, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setTeamListItem, setTeamModal } from "@/lib/features/about/TeamSlice";

const Team = ({
    setTeamData, teamData, setTeamList, teamList
}: ITeam) => {

    const dispatch = useAppDispatch();
    const { teamModalList } = useAppSelector((state) => state.TeamSlice)

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setTeamData((prev: ITeamData) => ({
            ...prev,
            [name]: value,
        }));
    }

    const openModal = () => {
        dispatch(setTeamModal(true));
    }
    
    const edit = (data: ITeamList) => {
        dispatch(setTeamListItem(data));
        dispatch(setTeamModal(true));
    }

    const deleteData = (id: string) => {
        const data = teamList.filter((d) => d._id !== id);
        setTeamList(data);
    }

    useEffect(() => {
        if(teamModalList?.length) {
            if(teamModalList[0]._id) {
                const data = teamList.map((d) =>
                    d._id == teamModalList[0]._id ? {
                        ...d,
                        alt: teamModalList[0].alt,
                        name: teamModalList[0].name,
                        designation: teamModalList[0].designation,
                        quotes: teamModalList[0].quotes,
                        image: teamModalList[0].image
                    } : d
                );
                setTeamList([...data]);
            } else {
                setTeamList([...teamList, ...teamModalList])
            }
        }
    }, [teamModalList])

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <Users /> Team</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Team Section</label>
                    <Input type="text" placeholder="Enter Brand Name" name="team_section" onChange={handleChange} value={teamData?.team_section || ''} className="mt-1 w-full" />
                </div>
            </div>
            <Separator className="mt-4" />
            <div className="p-2">
                <div className="flex justify-end items-center mb-2">
                    <Button variant="secondary" className="bg-purple-600 text-white hover:bg-purple-800" onClick={() => openModal()}>
                        <CirclePlus /> Add Team
                    </Button>
                </div>
                <Table className="rounded-md">
                    <TableHeader>
                        <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
                            <TableHead className="text-white">S.No</TableHead>
                            <TableHead className="text-white">Image</TableHead>
                            <TableHead className="text-white">Alt</TableHead>
                            <TableHead className="text-white">Name</TableHead>
                            <TableHead className="text-white">Designation</TableHead>
                            <TableHead className="text-white">Quotes</TableHead>
                            <TableHead className="text-white">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {teamList.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    {data && data.image ? <div className="h-[50px] w-[50px]"> <Image src={data.image} alt="icon" className="h-full w-full rounded-md" width={50} height={50} /> </div> : null}
                                </TableCell>
                                <TableCell>{data.alt}</TableCell>
                                <TableCell>{data.name}</TableCell>
                                <TableCell>{data.designation}</TableCell>
                                <TableCell>{data.quotes}</TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-center gap-2">
                                        <Button variant="secondary" size="icon" onClick={() => edit(data)}>
                                            <Edit2 />
                                        </Button>
                                        <Button variant="destructive" size="icon" onClick={() => deleteData(data._id)}>
                                            <Trash2 />
                                        </Button>
                                    </div>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Team;