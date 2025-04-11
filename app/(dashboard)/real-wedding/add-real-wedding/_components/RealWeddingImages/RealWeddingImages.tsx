"use client"

import { CirclePlus, Edit2, GalleryHorizontalEndIcon, Trash2 } from "lucide-react";
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
import { IRealWeddingImages } from "@/app/types/components/RealWedding";
import { setRealWeddingImageListItem, setRealWeddingImageModal, setRealWeddingImageModalList } from "@/lib/features/real-wedding/RealWeddingImageSlice";
import { IImages } from "@/app/types/api/request/venue.request";

const RealWeddingImages = ({
    setRealWeddingImages,
    realWeddingImagesList
}: IRealWeddingImages) => {

    const dispatch = useAppDispatch();
    const { realWeddingImageModalList } = useAppSelector((state) => state.RealWeddingImageSlice)

    const openModal = () => {
        dispatch(setRealWeddingImageModal(true));
    }

    const editModal = (data: IImages) => {
        dispatch(setRealWeddingImageListItem(data))
        openModal();
    }

    const deleteData = (id: string | undefined) => {
        if(!id) {
            return;
        }
        const data = realWeddingImagesList.filter((d) => d._id !== id && d.id !== id);
        setRealWeddingImages(data);
    }

    useEffect(() => {
        if(realWeddingImageModalList?.length) {
            if(realWeddingImageModalList[0]._id) {
                const data = realWeddingImagesList.map((d) =>
                    d._id == realWeddingImageModalList[0]._id ? {
                        ...d,
                        type: realWeddingImageModalList[0].type,
                        images: realWeddingImageModalList[0].images,
                    } : d
                );
                setRealWeddingImages([...data]);
            } else {
                setRealWeddingImages([...realWeddingImagesList, ...realWeddingImageModalList])
                
            }
        }
    }, [realWeddingImageModalList])


    useEffect(() => {
        return () => {
            dispatch(setRealWeddingImageModalList([]));
        }   
    }, [])

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <GalleryHorizontalEndIcon /> Real Wedding Images</h2>
            <div className="p-2">
                <div className="flex justify-end items-center mb-2">
                    <Button variant="secondary" className="bg-purple-600 text-white hover:bg-purple-800" onClick={() => openModal()}>
                        <CirclePlus /> Add Image
                    </Button>
                </div>
                <Table className="rounded-md">
                    <TableHeader>
                        <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
                            <TableHead className="text-white">S.No</TableHead>
                            <TableHead className="text-white">Image</TableHead>
                            <TableHead className="text-white">Name</TableHead>
                            <TableHead className="text-white">Type</TableHead>
                            <TableHead className="text-white">Alt</TableHead>
                            <TableHead className="text-white text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {realWeddingImagesList?.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    {
                                        item?.type == 'image' && item?.images ? <div className="h-[50px] w-[50px]"> <Image src={item?.images} alt="image" width={50} height={50} className="h-full w-full rounded-md" /> </div> : null
                                    }
                                    {
                                        item?.type == 'video' && item?.video ? <div className="h-[50px] w-[50px]"> <video src={item?.video} width={50} height={50} controls className="h-full w-full rounded-md" /> </div> : null
                                    }
                                </TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.type}</TableCell>
                                <TableCell>{item.alt}</TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="secondary" size="icon" onClick={() => editModal(item)}>
                                            <Edit2 />
                                        </Button>
                                        <Button variant="destructive" size="icon" onClick={() => deleteData(item?._id || item?.id)}>
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

export default RealWeddingImages;