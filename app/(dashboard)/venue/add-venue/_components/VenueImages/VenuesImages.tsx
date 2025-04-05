"use client"

import { CalendarClock, CirclePlus, Edit2, GalleryHorizontal, GalleryHorizontalEndIcon, ScanHeart, Trash2 } from "lucide-react";
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
import { useEffect } from "react";
import { IVenueImages } from "@/app/types/components/Venue";
import { setVenueImageListItem, setVenueImageModal } from "@/lib/features/venue/VenueImageSlice";
import { IImages } from "@/app/types/api/request/venue.request";

const VenuesImages = ({
    setVenueImages,
    venueImagesList
}: IVenueImages) => {

    const dispatch = useAppDispatch();
    const { venueImageModalList } = useAppSelector((state) => state.VenueImageSlice)

    const openModal = () => {
        dispatch(setVenueImageModal(true));
    }

    const editModal = (data: IImages) => {
        dispatch(setVenueImageListItem(data))
        openModal();
    }

    const deleteData = (id: string | undefined) => {
        if(!id) {
            return;
        }
        const data = venueImagesList.filter((d) => d._id !== id && d.id !== id);
        setVenueImages(data);
    }

    useEffect(() => {
        if(venueImageModalList?.length) {
            if(venueImageModalList[0]._id) {
                const data = venueImagesList.map((d) =>
                    d._id == venueImageModalList[0]._id ? {
                        ...d,
                        type: venueImageModalList[0].type,
                        images: venueImageModalList[0].images,
                    } : d
                );
                setVenueImages([...data]);
            } else {
                setVenueImages([...venueImagesList, ...venueImageModalList])
                
            }
        }
    }, [venueImageModalList])

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <GalleryHorizontalEndIcon /> Images</h2>
            <div className="p-2">
                <div className="flex justify-end items-center mb-2">
                    <Button variant="secondary" className="bg-purple-600 text-white hover:bg-purple-800" onClick={() => openModal()}>
                        <CirclePlus /> Add Image
                    </Button>
                </div>
                <Table className="rounded-md">
                    <TableHeader>
                        <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
                            <TableHead className="text-white">Image</TableHead>
                            <TableHead className="text-white">Name</TableHead>
                            <TableHead className="text-white">Type</TableHead>
                            <TableHead className="text-white">Alt</TableHead>
                            <TableHead className="text-white text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {venueImagesList.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {
                                        item?.type == 'image' && item?.images ? <div className="h-[50px] w-[50px]"> <Image src={item?.images} alt="image" width={50} height={50} className="h-full w-full rounded-md" /> </div> : null
                                    }
                                    {
                                        item?.type == 'video' && item?.video ? <div className="h-[50px] w-[50px]"> <video src={item?.video} width={50} height={50} controls className="h-full w-full rounded-md" /> </div> : null
                                    }
                                </TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.type}</TableCell>
                                <TableCell>{item.alt}</TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="secondary" size="icon" onClick={() => editModal(item)}>
                                            <Edit2 />
                                        </Button>
                                        <Button variant="destructive" size="icon" onClick={() => deleteData(item?._id || item?.id)}>
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

export default VenuesImages;