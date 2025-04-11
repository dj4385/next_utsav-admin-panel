'use client';

import { useState } from "react";
import { IPopularLinks, IPopularLinksData } from "@/app/types/components/Foooter";
import { useAppDispatch } from "@/lib/store";
import { useAppSelector } from "@/lib/store";

import { CalendarClock, CirclePlus, Edit2, Trash2 } from "lucide-react";
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
import { useEffect } from "react";
import { setPopularLinksModal } from "@/lib/features/footer/PopularLinkSlice";
import { setPopularLinksListItem } from "@/lib/features/footer/PopularLinkSlice";

const PopularLinks = (
    { popularLinks, setPopularLinks }: IPopularLinks
) => {
    const dispatch = useAppDispatch();
    const { popularLinksModalList } = useAppSelector((state) => state.PopularLinksSlice)

    const openModal = () => {
        dispatch(setPopularLinksModal(true));
    }

    const edit = (data: IPopularLinksData) => {
        dispatch(setPopularLinksListItem(data))
        openModal();
    }

    const deleteData = (id: string | undefined) => {
        if(id) {
            const data = popularLinks.filter((d) => d._id !== id);
            setPopularLinks(data);
        }
    }

    useEffect(() => {
        if(popularLinksModalList?.length) {
            if(popularLinksModalList[0]._id) {
                const data = popularLinks.map((d) =>
                    d._id == popularLinksModalList[0]._id ? {
                        ...d,
                        label: popularLinksModalList[0].label,
                        url: popularLinksModalList[0].url,
                    } : d
                );
                setPopularLinks([...data]);
            } else {
                setPopularLinks([...popularLinks, ...popularLinksModalList])
            }
        }
    }, [popularLinksModalList])

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <CalendarClock /> Popular Links</h2>
            <div className="p-2">
                <div className="flex justify-end items-center mb-2">
                    <Button variant="secondary" className="bg-purple-600 text-white hover:bg-purple-800" onClick={() => openModal()}>
                        <CirclePlus /> Add Popular Link
                    </Button>
                </div>
                <Table className="rounded-md">
                    <TableHeader>
                        <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
                            <TableHead className="text-white">S.No</TableHead>
                            <TableHead className="text-white">Label</TableHead>
                            <TableHead className="text-white">Url</TableHead>
                            <TableHead className="text-white">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {popularLinks.map((popularLinks, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{popularLinks.label}</TableCell>
                                <TableCell>{popularLinks.url}</TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-center gap-2">
                                        <Button variant="secondary" size="icon" onClick={() => edit(popularLinks)}>
                                            <Edit2 />
                                        </Button>
                                        <Button variant="destructive" size="icon" onClick={() => deleteData(popularLinks._id || popularLinks.id)}>
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

export default PopularLinks;
