'use client';

import { useAppDispatch } from "@/lib/store";

import { useToast } from "@/hooks/use-toast";
import { useAppSelector } from "@/lib/store";
import { useEffect, useState } from "react";
import { AQIService } from "@/services/aqi.service";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const AQITable = () => {
    const [aqiList, setAqiList] = useState<any[]>([])
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const { isAddAQIRequestSuccess } = useAppSelector((state) => state.EventsSlice);

    const getAQIList = async () => {
        try {
            const res: any = await AQIService.getAQI();
            if (res && res.status == 200 && res.data.data.length) {
                setAqiList(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteAQI = async (id: string) => {
        try {
            const res: any = await AQIService.deleteAQI(id);
            if (res && res.status == 200) {
                toast({
                    title: "AQI deleted successfully",
                    description: "AQI deleted successfully",
                })
                getAQIList();
            } else {
                toast({
                    title: "Error",
                    description: "Unable to delete aqi",
                    variant: "destructive",
                })  
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAQIList();
    }, [])

    useEffect(() => {
        if(isAddAQIRequestSuccess) {
            getAQIList();
        }
    }, [isAddAQIRequestSuccess])

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <div className="p-2">
                <Table className="rounded-md">
                    <TableHeader>
                        <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
                            <TableHead className="text-white">S.No</TableHead>
                            <TableHead className="text-white">Range</TableHead>
                            <TableHead className="text-white">Min</TableHead>
                            <TableHead className="text-white">Max</TableHead>
                            <TableHead className="text-white">Description</TableHead>
                            <TableHead className="text-white text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {aqiList?.length ? aqiList.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.range}</TableCell>
                                <TableCell>{item.min}</TableCell>
                                <TableCell>{item.max}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="destructive" size="icon" onClick={() => deleteAQI(item._id)}>
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

export default AQITable;
