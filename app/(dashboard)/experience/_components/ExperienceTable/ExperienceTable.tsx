
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

const ExperienceTable = () => {
    const [experienceList, setExperienceList] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();

    const getExperienceList = async () => {
        try {
            const res: any = await ExperienceService.getExperienceList();
            if (res && res.status == 200 && res.data.data.length) {
                setExperienceList(res.data.data)
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


    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <div className="p-2">
                <Table className="rounded-md">
                    <TableHeader>
                        <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
                            <TableHead className="text-white">Name</TableHead>
                            <TableHead className="text-white">CreatedAt</TableHead>
                            <TableHead className="text-white">UpdatedAt</TableHead>
                            <TableHead className="text-white text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {experienceList?.length ? experienceList.map((item, index) => (
                            <TableRow key={index}>
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