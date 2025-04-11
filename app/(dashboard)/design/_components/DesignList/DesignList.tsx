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
import { DesignService } from "@/services/design.service";

const DesignList = () => {
    const [designList, setDesignList] = useState<any[]>([]);
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const { isAddDesignSuccess } = useAppSelector((state) => state.EventsSlice);

    const getDesignList = async () => {
        try {
            const res: any = await DesignService.getDesignList();
            if (res && res?.status == 200 && res?.data?.length) {
                setDesignList(res?.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteDesign = async (id: string) => {
        try {
            const res: any = await DesignService.deleteDesign(id);
            if (res && res.status == 200) {
                toast({
                    title: "Design deleted successfully",
                    description: "Design deleted successfully",
                })
                getDesignList();
            } else {
                toast({
                    title: "Error",
                    description: "Unable to delete design",
                    variant: "destructive",
                })  
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (isAddDesignSuccess) {
            getDesignList();
        }
    }, [isAddDesignSuccess]);

    useEffect(() => {
        getDesignList();
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
                        {designList?.length ? designList.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="destructive" size="icon" onClick={() => deleteDesign(item._id)}>
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

export default DesignList;
