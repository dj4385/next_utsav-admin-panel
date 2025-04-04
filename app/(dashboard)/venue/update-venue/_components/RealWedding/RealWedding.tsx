"use client"

import { CalendarClock, CirclePlus, Edit2, GalleryHorizontal, ScanHeart, Trash2 } from "lucide-react";
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
import { setRealWeddingListItem, setRealWeddingModal } from "@/lib/features/venue/RealWeddingSlice";
import { IRealWeddings } from "@/app/types/api/request/venue.request";
import { IRealWeddingsProps } from "@/app/types/components/Venue";

const RealWedding = ({
    realWeddings,
    setRealWeddings
}: IRealWeddingsProps) => {

    const dispatch = useAppDispatch();
    const { realWeddingModalList } = useAppSelector((state) => state.RealWeddingSlice)

    const openModal = () => {
        dispatch(setRealWeddingModal(true));
    }

    const editModal = (data: IRealWeddings) => {
        dispatch(setRealWeddingListItem(data))
        openModal();
    }

    const deleteData = (id: string | undefined) => {
        if(!id) {
            return;
        }
        const data = realWeddings.filter((d) => d._id !== id);
        setRealWeddings(data);
    }

    useEffect(() => {
        if(realWeddingModalList?.length) {
            if(realWeddingModalList[0]._id) {
                const data = realWeddings.map((d) =>
                    d._id == realWeddingModalList[0]._id ? {
                        ...d,
                        couple: realWeddingModalList[0].couple,
                        description: realWeddingModalList[0].description,
                        image: realWeddingModalList[0].image,
                    } : d
                );
                setRealWeddings([...data]);
            } else {
                setRealWeddings([...realWeddings, ...realWeddingModalList])
            }
        }
    }, [realWeddingModalList])

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <ScanHeart /> Real Wedding</h2>
            <div className="p-2">
                <div className="flex justify-end items-center mb-2">
                    <Button variant="secondary" className="bg-purple-600 text-white hover:bg-purple-800" onClick={() => openModal()}>
                        <CirclePlus /> Add Real Wedding
                    </Button>
                </div>
                <Table className="rounded-md">
                    <TableHeader>
                        <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
                            <TableHead className="text-white">Image</TableHead>
                            <TableHead className="text-white">Coupe</TableHead>
                            <TableHead className="text-white">Description</TableHead>
                            <TableHead className="text-white text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {realWeddings.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {
                                        item && item.image ? <div className="h-[50px] w-[50px]"> <Image src={item.image} alt="image" width={50} height={50} className="h-full w-full rounded-md" /> </div> : null
                                    }
                                </TableCell>
                                <TableCell>{item.couple}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="secondary" size="icon" onClick={() => editModal(item)}>
                                            <Edit2 />
                                        </Button>
                                        <Button variant="destructive" size="icon" onClick={() => deleteData(item._id)}>
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

export default RealWedding;