
"use client"

import { useToast } from "@/hooks/use-toast";
import { ExperienceService } from "@/services/experience.service";
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
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setAddExperinceSuccess } from "@/lib/features/EventsSlice";

const ExperienceTable = () => {
    const [experienceList, setExperienceList] = useState<any[]>([])
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const { isAddExperienceSuccess } = useAppSelector((state) => state.EventsSlice);

    const getExperienceList = async () => {
        try {
            const res: any = await ExperienceService.getExperienceList();
            if (res && res.status == 200 && res.data.data.length) {
                setExperienceList(res.data.data)
                dispatch(setAddExperinceSuccess(false));
            }
        } catch (error) {

        }
    }

    const deleteData = async (id: string) => {
        try {
            const res: any = await ExperienceService.deleteExperience(id);
            if (res && res.status) {
                toast({
                    title: "Success",
                    description: "Experience deleted successfully",
                })
                getExperienceList();
            } else {
                toast({
                    title: "Error",
                    description: "Unable to delete experience",
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
        getExperienceList();
    }, [])

    useEffect(() => {
        if(isAddExperienceSuccess) {
            getExperienceList();
        }
    }, [isAddExperienceSuccess])


    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <div className="p-2">
                <Table className="rounded-md">
                    <TableHeader>
                        <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
                            <TableHead className="text-white">S.No</TableHead>
                            <TableHead className="text-white">Name</TableHead>
                            <TableHead className="text-white">CreatedAt</TableHead>
                            <TableHead className="text-white">UpdatedAt</TableHead>
                            <TableHead className="text-white text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {experienceList?.length ? experienceList.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.createdAt}</TableCell>
                                <TableCell>{item.updatedAt}</TableCell>
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

export default ExperienceTable;