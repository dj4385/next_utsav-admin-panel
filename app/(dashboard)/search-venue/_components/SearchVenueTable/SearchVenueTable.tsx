
"use client"

import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { LocationService } from "@/services/location.service";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setAddLocationSuccess } from "@/lib/features/EventsSlice";
import Image from "next/image";
import { SearchVenueService } from "@/services/search-venue.service";

const SearchVenueTable = () => {
    const [venueList, setVenueList] = useState<any[]>([])
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const { isAddVenueSuccess } = useAppSelector((state) => state.EventsSlice);

    const getVenueList = async () => {
        try {
            const res: any = await SearchVenueService.getVenueList();
            if (res && res.status == 200 && res.data.length) {
                setVenueList(res.data)
                dispatch(setAddLocationSuccess(false));
            }
        } catch (error) {

        }
    }

    const deleteData = async (id: string) => {
        try {
            const res: any = await LocationService.deleteLocation(id);
            if (res && res.status) {
                toast({
                    title: "Success",
                    description: "Venue deleted successfully",
                })
                getVenueList();
            } else {
                toast({
                    title: "Error",
                    description: "Unable to delete venue",
                    variant: "destructive",
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive",
            })
        }
    }

    useEffect(() => {
        getVenueList();
    }, [])

    useEffect(() => {
        if(isAddVenueSuccess) {
            getVenueList();
        }
    }, [isAddVenueSuccess])


    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <div className="p-2">
                <Table className="rounded-md">
                    <TableHeader>
                        <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
                            <TableHead className="text-white">S.No</TableHead>
                            <TableHead className="text-white">Image</TableHead>
                            <TableHead className="text-white">Heading</TableHead>
                            <TableHead className="text-white">Subheading</TableHead>
                            <TableHead className="text-white text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {venueList?.length ? venueList.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    { item?.venue_image ? <div className="h-[50px] w-[50px]"> <Image src={item?.venue_image} className="h-full w-full rounded-md" alt="location" width={50} height={50} /> </div> : null }
                                </TableCell>
                                <TableCell>{item?.venue_heading || ''}</TableCell>
                                <TableCell>{item?.venue_subheading || ''}</TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="destructive" size="icon" onClick={() => deleteData(item._id)}>
                                            <Trash2 />
                                        </Button>
                                    </div>

                                </TableCell>
                            </TableRow>
                        )) : null}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default SearchVenueTable;