"use client"

import ContentHeader from "@/components/ContentHeader/ContentHeader";
import { VenueService } from "@/services/venue.service";
import { MapPinHouse } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

const VenueListing = () => {

    const [venues, setVenues] = useState<any[]>([]);
    const { toast } = useToast();
    const router = useRouter();

    const getVenueListing = async () => {
        try {
            const res: any = await VenueService.getVenues();
            console.log(res);
            
            if (res && res.status == 200 && res.data.data) {
                setVenues(res.data.data);
            } else {
                toast({
                    title: "Error",
                    description: res?.response?.data?.message || 'No Venue Found',
                    variant: "destructive",
                })
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.response?.data?.message || 'Something went wrong',
                variant: "destructive",
            })
        }
    }

    const addVenue = () => {
        router.push('/venue/add-venue')
    }

    const edit = (data: any) => {
        router.push(`/venue/edit-venue/${data._id}`)
    }

    const deleteData = async (id: string) => {
        try {
            const res: any = await VenueService.deleteVenue(id);
            if (res && res.status == 200) {
                toast({
                    title: "Venue deleted successfully",
                    description: "Venue deleted successfully",
                })
                getVenueListing();
            } else {
                toast({
                    title: "Error",
                    description: res?.response?.data?.message || 'Unable to delete venue',
                    variant: "destructive",
                })
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.response?.data?.message || 'Something went wrong',
                variant: "destructive",
            })
        }
    }

    useEffect(() => {
        getVenueListing()
    }, [])

    return (
        <div className="flex flex-col rounded-lg bg-gray-50 p-2">
            <div className="w-full">
                <ContentHeader title="Venue Listing" icon={<MapPinHouse />} buttonLabel="Add Venue" buttonIcon={<MapPinHouse />} onBtnClick={() => addVenue()} />
            </div>
            <div className="py-4">
                <Table className="rounded-md">
                    <TableHeader>
                        <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
                            <TableHead className="text-white">Image</TableHead>
                            <TableHead className="text-white">Name</TableHead>
                            <TableHead className="text-white">Type</TableHead>
                            <TableHead className="text-white">Capacity</TableHead>
                            <TableHead className="text-white">AQI</TableHead>
                            <TableHead className="text-white">Google Rating</TableHead>
                            <TableHead className="text-white">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {venues.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {data?.gallery?.length ? <div className="h-[50px] w-[50px]"> <Image src={data?.gallery[0]?.images} alt="icon" className="h-full w-full rounded-md" width={50} height={50} /> </div> : null}
                                </TableCell>
                                <TableCell>{data.venue_name}</TableCell>
                                <TableCell>{data.venue.property_type}</TableCell>
                                <TableCell>{data.venue.capacity}</TableCell>
                                <TableCell>{data.venue.air_quality_index}</TableCell>
                                <TableCell>{data.venue.google_rating}</TableCell>
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

export default VenueListing;
