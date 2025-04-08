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
import { IHeaderImage, IVenueImages } from "@/app/types/components/Venue";
import { setVenueHeaderImageListItem, setVenueHeaderImageModal } from "@/lib/features/venue/VenueHeaderImageSlice";
import { IHeaderImages } from "@/app/types/api/request/venue.request";
import { Checkbox } from "@/components/ui/checkbox";



const RealWeddingHeaderImage = ({
    setHeaderImageList,
    headerImageList
}: IHeaderImage) => {

    const dispatch = useAppDispatch();
    const { venueHeaderImageModalList } = useAppSelector((state) => state.VenueHeaderImageSlice)

    const openModal = () => {
        dispatch(setVenueHeaderImageModal(true));
    }

    const editModal = (data: IHeaderImages) => {
        dispatch(setVenueHeaderImageListItem(data))
        openModal();
    }

    const deleteData = (id: string | undefined) => {
        if(!id) {
            return;
        }
        const data = headerImageList.filter((d) => d._id !== id && d.id !== id);
        setHeaderImageList(data);
    }

    useEffect(() => {
        if(venueHeaderImageModalList?.length) {
            if(venueHeaderImageModalList[0]._id) {
                const data = headerImageList.map((d) =>
                    d._id == venueHeaderImageModalList[0]._id ? {
                        ...d,
                        url: venueHeaderImageModalList[0].url,
                        alt: venueHeaderImageModalList[0].alt,
                        is_wide: venueHeaderImageModalList[0].is_wide,
                    } : d
                );
                setHeaderImageList([...data]);
            } else {
                setHeaderImageList([...headerImageList, ...venueHeaderImageModalList])
                
            }
        }
    }, [venueHeaderImageModalList])

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <GalleryHorizontalEndIcon /> Header Images Gallery</h2>
            <div className="p-2">
                <div className="flex justify-end items-center mb-2">
                    <Button variant="secondary" className="bg-purple-600 text-white hover:bg-purple-800" onClick={() => openModal()}>
                        <CirclePlus /> Add Header Image
                    </Button>
                </div>
                <Table className="rounded-md">
                    <TableHeader>
                        <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
                            <TableHead className="text-white">S.No</TableHead>
                            <TableHead className="text-white">Image</TableHead>
                            <TableHead className="text-white">Alt</TableHead>
                            <TableHead className="text-white">IsWide</TableHead>
                            <TableHead className="text-white text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {headerImageList?.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    {
                                        item?.url ? <div className="h-[50px] w-[50px]"> <Image src={item?.url} alt="image" width={50} height={50} className="h-full w-full rounded-md" /> </div> : null
                                    }
                                </TableCell>
                                <TableCell>{item.alt}</TableCell>
                                <TableCell>
                                    <Checkbox 
                                        checked={item.is_wide}
                                        onCheckedChange={(checked: boolean) => {
                                            // Uncheck all other checkboxes
                                            const updatedList = headerImageList.map((img: IHeaderImages) => ({
                                                ...img,
                                                is_wide: img._id === item._id && img.id === item.id ? checked : false
                                            }));
                                            setHeaderImageList(updatedList);
                                        }}
                                    />
                                </TableCell>
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

export default RealWeddingHeaderImage;