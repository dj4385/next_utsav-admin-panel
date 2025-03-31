"use client"

import { IGlobalPresence, IGlobalPresenceData, IGlobalPresenceList } from "@/app/types/components/Contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { CirclePlus, Edit2, Globe2, Trash2 } from "lucide-react";
import { ChangeEvent, useEffect } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setGlobalPresenceListItem, setGlobalPresenceModal } from "@/lib/features/contact/GlobalPresenceSlice";

const GlobalPresence = ({
    globalPresenceData,
    globalPresenceList,
    setGlobalPresenceData,
    setGlobalPresenceList
}: IGlobalPresence) => {
    const dispatch = useAppDispatch();
    const { globalPresenceModalList } = useAppSelector((state) => state.GlobalPresenceSlice)
    
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setGlobalPresenceData((prev: IGlobalPresenceData) => ({
            ...prev,
            [name]: value,
        }));
    }

    const openModal = () => {
        dispatch(setGlobalPresenceModal(true));
    }

    const editModal = (data: IGlobalPresenceList) => {
        dispatch(setGlobalPresenceListItem(data))
        openModal();
    }

    const deleteData = (id: string) => {
        const data = globalPresenceList.filter((d) => d._id !== id);
        setGlobalPresenceList(data);
    }

    useEffect(() => {
        if(globalPresenceModalList?.length) {
            if(globalPresenceModalList[0]._id) {
                const data = globalPresenceList.map((d) =>
                    d._id == globalPresenceModalList[0]._id ? {
                        ...d,
                        alt_country_image: globalPresenceModalList[0].alt_country_image,
                        country_address: globalPresenceModalList[0].country_address,
                        country_image: globalPresenceModalList[0].country_image,
                        country_name: globalPresenceModalList[0].country_name,
                    } : d
                );
                setGlobalPresenceList([...data]);
            } else {
                setGlobalPresenceList([...globalPresenceList, ...globalPresenceModalList])
            }
        }
    }, [globalPresenceModalList])

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <Globe2 /> Global Presence</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Global Presence Heading</label>
                    <Input type="text" placeholder="Enter Global Presence Heading" name="global_presence_heading" onChange={handleChange} value={globalPresenceData?.global_presence_heading || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Global Presence Sub Heading</label>
                    <Textarea placeholder="Enter sub heading here" onChange={handleChange}  name="global_presence_sub_heading" value={globalPresenceData?.global_presence_sub_heading || ''} />
                </div>
            </div>
            <Separator className="mt-4" />
            <div className="p-2">
                <div className="flex justify-end items-center mb-2">
                    <Button variant="secondary" className="bg-purple-600 text-white hover:bg-purple-800" onClick={() => openModal()}>
                        <CirclePlus /> Add Global Presence
                    </Button>
                </div>
                <Table className="rounded-md">
                    <TableHeader>
                        <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
                            <TableHead className="text-white">Image</TableHead>
                            <TableHead className="text-white">Image Alt</TableHead>
                            <TableHead className="text-white">Name</TableHead>
                            <TableHead className="text-white">Address</TableHead>
                            <TableHead className="text-white text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {globalPresenceList.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {
                                        item && item.country_image ? <div className="h-[50px] w-[50px]"> <Image src={item.country_image} alt="image" width={50} height={50} className="h-full w-full rounded-md" /> </div> : null
                                    }
                                </TableCell>
                                <TableCell>{item.alt_country_image}</TableCell>
                                <TableCell>{item.country_name}</TableCell>
                                <TableCell>{item.country_address}</TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="secondary" size="icon" onClick={() => editModal(item)}>
                                            <Edit2 />
                                        </Button>
                                        <Button variant="destructive" size="icon" onClick={() => deleteData(item._id)}>
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

export default GlobalPresence;