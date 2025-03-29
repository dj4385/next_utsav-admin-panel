"use client"

import { CalendarClock, CirclePlus, Edit2, Trash2 } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { IEvent } from "@/app/types/components/Home";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/store";
import { setEventModal } from "@/lib/features/EventSlice";

const Event = ({
    eventData,
    setEventData
}: IEvent) => {

    const dispatch = useAppDispatch();

    const openModal = () => {
        dispatch(setEventModal(true));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <CalendarClock /> Event Cards</h2>
            <div className="p-2">
                <div className="flex justify-end items-center mb-2">
                    <Button variant="secondary" className="bg-purple-600 text-white hover:bg-purple-800" onClick={() => openModal()}>
                        <CirclePlus /> Add Event Card
                    </Button>
                </div>
                <Table className="rounded-md">
                    <TableHeader>
                        <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
                            <TableHead className="text-white">Icon</TableHead>
                            <TableHead className="text-white">Image</TableHead>
                            <TableHead className="text-white w-[100px]">Event Type</TableHead>
                            <TableHead className="text-white">Icon Alt</TableHead>
                            <TableHead className="text-white">Alt</TableHead>
                            <TableHead className="text-white">Heading</TableHead>
                            <TableHead className="text-white">Text</TableHead>
                            <TableHead className="text-white">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {eventData.map((event, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {event && event.icon ? <Image src={event.icon} alt="icon" className="rounded-md" width={50} height={50} /> : null}
                                </TableCell>
                                <TableCell>
                                    {
                                        event && event.image ? <Image src={event.image} alt="image" width={50} height={50} className="rounded-md" /> : null
                                    }
                                </TableCell>
                                <TableCell>{event.event_ui_type}</TableCell>
                                <TableCell>{event.alt_icon}</TableCell>
                                <TableCell>{event.alt}</TableCell>
                                <TableCell>{event.heading}</TableCell>
                                <TableCell>{event.text}</TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-center gap-2">
                                        <Button variant="secondary" size="icon">
                                            <Edit2 />
                                        </Button>
                                        <Button variant="destructive" size="icon">
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

export default Event;