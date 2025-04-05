'use client';

import { useEffect } from "react";

import { useAppSelector } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/lib/store";
import { useState } from "react";
import { CateringService } from "@/services/catering.service";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const CateringTable = () => {

    const [cateringList, setCateringList] = useState<any[]>([]);
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const { isAddCateringSuccess } = useAppSelector((state) => state.EventsSlice);

    const getCateringList = async () => {
        try {
            const res: any = await CateringService.getCatering();
            if (res && res.status == 200 && res.data.data.length) {
                setCateringList(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteCatering = async (id: string) => {
        try {
            const res: any = await CateringService.deleteCatering(id);
            if (res && res.status == 200) {
                toast({
                    title: "Catering deleted successfully",
                    description: "Catering deleted successfully",
                })
                getCateringList();
            } else {
                toast({
                    title: "Error",
                    description: "Unable to delete catering",
                    variant: "destructive",
                })  
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (isAddCateringSuccess) {
            getCateringList();
        }
    }, [isAddCateringSuccess]);

    useEffect(() => {
        getCateringList();
    }, []);
    
    
    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <div className="p-2">
                <Table className="rounded-md">
                    <TableHeader>
                        <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
                            <TableHead className="text-white">S.No</TableHead>
                            <TableHead className="text-white">Name</TableHead>
                            <TableHead className="text-white">Description</TableHead>
                            <TableHead className="text-white text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cateringList?.length ? cateringList.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="destructive" size="icon" onClick={() => deleteCatering(item._id)}>
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

export default CateringTable;
