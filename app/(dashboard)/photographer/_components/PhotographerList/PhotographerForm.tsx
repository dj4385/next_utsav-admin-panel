'use client';

import { useEffect } from "react";

import { useAppSelector } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/lib/store";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import { PhotographerService } from "@/services/photographer.service";

const PhotographerList = () => {
    const [photographerList, setPhotographerList] = useState<any[]>([]);
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const { isAddPhotographerSuccess } = useAppSelector((state) => state.EventsSlice);

    const getPhotographerList = async () => {
        try {
            const res: any = await PhotographerService.getPhotographerList();
            if (res && res?.status == 200 && res?.data?.data?.length) {
                setPhotographerList(res?.data?.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deletePhotographer = async (id: string) => {
        try {
            const res: any = await PhotographerService.deletePhotographer(id);
            if (res && res.status == 200) {
                toast({
                    title: "Photographer deleted successfully",
                    description: "Photographer deleted successfully",
                })
                getPhotographerList();
            } else {
                toast({
                    title: "Error",
                    description: "Unable to delete photographer",
                    variant: "destructive",
                })  
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (isAddPhotographerSuccess) {
            getPhotographerList();
        }
    }, [isAddPhotographerSuccess]);

    useEffect(() => {
        getPhotographerList();
    }, []);
    
    
    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <div className="p-2">
                <Table className="rounded-md">
                    <TableHeader>
                        <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
                            <TableHead className="text-white">S.No</TableHead>
                            <TableHead className="text-white">Name</TableHead>
                            <TableHead className="text-white text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {photographerList?.length ? photographerList.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="destructive" size="icon" onClick={() => deletePhotographer(item._id)}>
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

export default PhotographerList;
