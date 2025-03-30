"use client"

import { IAward, IAwardData, IAwardList } from "@/app/types/components/About";
import { Input } from "@/components/ui/input";
import { AwardIcon, CirclePlus, Edit2, Trash2 } from "lucide-react";
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
import { setAwardListItem, setAwardModal } from "@/lib/features/about/AwardSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";

const Award = ({
    awardData, setAwardData, awardList, setAwardList
}: IAward) => {

    const dispatch = useAppDispatch();
    const { awardModalList } = useAppSelector((state) => state.AwardSlice)

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setAwardData((prev: IAwardData) => ({
            ...prev,
            [name]: value,
        }));
    }

    const openModal = () => {
        dispatch(setAwardModal(true));
    }

    const edit = (data: IAwardList) => {
        dispatch(setAwardListItem(data))
        openModal();
    }

    const deleteData = (id: string) => {
        const data = awardList.filter((d) => d._id !== id);
        setAwardList(data);
    }

    useEffect(() => {
        if(awardModalList?.length) {
            if(awardModalList[0]._id) {
                const data = awardList.map((d) =>
                    d._id == awardModalList[0]._id ? {
                        ...d,
                        heading: awardModalList[0].heading,
                        name: awardModalList[0].name,
                        title: awardModalList[0].title,
                    } : d
                );
                setAwardList([...data]);
            } else {
                setAwardList([...awardList, ...awardModalList])
            }
        }
    }, [awardModalList])

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <AwardIcon /> Award</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Award Section</label>
                    <Input type="text" placeholder="Enter Brand Name" name="awards_section" onChange={handleChange} value={awardData?.awards_section || ''} className="mt-1 w-full" />
                </div>
            </div>
            <Separator className="mt-4" />
            <div className="p-2">
                <div className="flex justify-end items-center mb-2">
                    <Button variant="secondary" className="bg-purple-600 text-white hover:bg-purple-800" onClick={() => openModal()}>
                        <CirclePlus /> Add Awards
                    </Button>
                </div>
                <Table className="rounded-md">
                    <TableHeader>
                        <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
                            <TableHead className="text-white">Name</TableHead>
                            <TableHead className="text-white">Title</TableHead>
                            <TableHead className="text-white">Heading</TableHead>
                            <TableHead className="text-white">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {awardList.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell>{data.name}</TableCell>
                                <TableCell>{data.title}</TableCell>
                                <TableCell>{data.heading}</TableCell>
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

export default Award;