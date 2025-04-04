'use client';

import { TableCell } from "@/components/ui/table";

import { TableBody } from "@/components/ui/table";

import { useAppSelector } from "@/lib/store";

import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/lib/store";
import { GoogleRatingService } from "@/services/google-rating.service";
import { useEffect, useState } from "react";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const GoogleRatingTable = () => {
    const [googleRatingList, setGoogleRatingList] = useState<any[]>([])
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const { isAddGoogleRatingSuccess } = useAppSelector((state) => state.EventsSlice);

    const getCapacityList = async () => {
        try {
            const res: any = await GoogleRatingService.getGoogleRating();
            if (res && res.status == 200 && res.data.data.length) {
                setGoogleRatingList(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteCapacity = async (id: string) => {
        try {
            const res: any = await GoogleRatingService.deleteGoogleRating(id);
            if (res && res.status == 200) {
                toast({
                    title: "Capacity deleted successfully",
                    description: "Capacity deleted successfully",
                })
                getCapacityList();
            } else {
                toast({
                    title: "Error",
                    description: "Unable to delete capacity",
                    variant: "destructive",
                })  
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCapacityList();
    }, [])

    useEffect(() => {
        if(isAddGoogleRatingSuccess) {
            getCapacityList();
        }
    }, [isAddGoogleRatingSuccess])

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <div className="p-2">
                <Table className="rounded-md">
                    <TableHeader>
                        <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
                            <TableHead className="text-white">Range</TableHead>
                            <TableHead className="text-white">Min</TableHead>
                            <TableHead className="text-white">Max</TableHead>
                            <TableHead className="text-white">Description</TableHead>
                            <TableHead className="text-white text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {googleRatingList?.length ? googleRatingList.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.range}</TableCell>
                                <TableCell>{item.min}</TableCell>
                                <TableCell>{item.max}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="destructive" size="icon" onClick={() => deleteCapacity(item._id)}>
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

export default GoogleRatingTable;
