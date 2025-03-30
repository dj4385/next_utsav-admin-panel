"use client"

import { CalendarClock, CirclePlus, Edit2, GalleryHorizontal, Trash2 } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setEventListItem, setEventModal } from "@/lib/features/EventSlice";
import { useEffect } from "react";
import { IAboutGallery, IAboutGalleryData } from "@/app/types/components/About";

const AboutGallery = ({
    aboutGalleryData,
    setAboutGalleryData
}: IAboutGallery) => {

    // const dispatch = useAppDispatch();
    // const { eventModalList } = useAppSelector((state) => state.EventSlice)

    const openModal = () => {
        // dispatch(setEventModal(true));
    }

    const editModal = (data: IAboutGalleryData) => {
        // dispatch(setEventListItem(data))
        // openModal();
    }

    const deleteData = (id: string) => {
        // const data = eventData.filter((d) => d._id !== id);
        // setEventData(data);
    }

    // useEffect(() => {
    //     if(eventModalList?.length) {
    //         if(eventModalList[0]._id) {
    //             const data = eventData.map((d) =>
    //                 d._id == eventModalList[0]._id ? {
    //                     ...d,
    //                     event_ui_type: eventModalList[0].event_ui_type,
    //                     heading: eventModalList[0].heading,
    //                     text: eventModalList[0].text,
    //                     alt_icon: eventModalList[0].alt_icon,
    //                     icon: eventModalList[0].icon,
    //                     alt: eventModalList[0].alt,
    //                     image: eventModalList[0].image,
    //                 } : d
    //             );
    //             setEventData([...data]);
    //         } else {
    //             setEventData([...eventData, ...eventModalList])
    //         }
    //     }
    // }, [eventModalList])

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <GalleryHorizontal /> About Gallery</h2>
            <div className="p-2">
                <div className="flex justify-end items-center mb-2">
                    <Button variant="secondary" className="bg-purple-600 text-white hover:bg-purple-800" onClick={() => openModal()}>
                        <CirclePlus /> Add About Gallery
                    </Button>
                </div>
                <Table className="rounded-md">
                    <TableHeader>
                        <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
                            <TableHead className="text-white">Image</TableHead>
                            <TableHead className="text-white">Alt</TableHead>
                            <TableHead className="text-white">Wide</TableHead>
                            <TableHead className="text-white">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {aboutGalleryData.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {
                                        item && item.image ? <div className="h-[50px] w-[50px]"> <Image src={item.image} alt="image" width={50} height={50} className="h-full w-full rounded-md" /> </div> : null
                                    }
                                </TableCell>
                                <TableCell>{item.alt}</TableCell>
                                <TableCell>{item.isWide ? 'Yes' : 'No'}</TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-center gap-2">
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

export default AboutGallery;