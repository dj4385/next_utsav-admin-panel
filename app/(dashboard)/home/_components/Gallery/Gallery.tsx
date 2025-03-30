"use client"

import { IGallery, IGalleryData, IGalleryList } from "@/app/types/components/Home";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CirclePlus, Edit2, ImageDown, Trash2 } from "lucide-react";
import { ChangeEvent, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setGalleryListItem, setGalleryModal } from "@/lib/features/home/GallerySlice";

const Gallery = ({
    galleryData,
    setGalleryData,
    galleryList,
    setGalleryList
}: IGallery) => {

    const dispatch = useAppDispatch();
    const { galleryModalList } = useAppSelector((state) => state.GallerySlice)

    const openModal = () => {
        dispatch(setGalleryModal(true));
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setGalleryData((prev: IGalleryData) => ({
            ...prev,
            [name]: value,
        }));
    }

    const editGallery = (data: IGalleryList) => {
        dispatch(setGalleryListItem(data))
        openModal();
    }

    const deleteData = (id: string) => {
        const data = galleryList.filter((d) => d._id !== id);
        setGalleryList(data);
    }

    useEffect(() => {
        if(galleryModalList?.length) {
            if(galleryModalList[0]._id) {
                const data = galleryList.map((d) =>
                    d._id == galleryModalList[0]._id ? {
                        ...d,
                        alt: galleryModalList[0].alt,
                        image: galleryModalList[0].image,
                    } : d
                );
                setGalleryList([...data]);
            } else {
                setGalleryList([...galleryList, ...galleryModalList])
            }
        }
    }, [galleryModalList])

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 items-center p-2 bg-purple-700 text-white text-lg font-medium mb-3"> <ImageDown /> Gallery Section</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Gallery Section</label>
                    <Input type="text" placeholder="Enter Gallery Section" className="mt-1 w-full" onChange={handleChange} name="gallery_section" value={galleryData.gallery_section} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Gallery Heading</label>
                    <Input type="text" placeholder="Enter Gallery Heading" className="mt-1 w-full" onChange={handleChange} name="gallery_heading" value={galleryData.gallery_heading} />
                </div>
            </div>
            <Separator className="mt-4" />
            <div className="p-2">
                <div className="flex justify-end items-center mb-2">
                    <Button variant="secondary" className="bg-purple-600 text-white hover:bg-purple-800" onClick={() => openModal()}>
                        <CirclePlus /> Add Gallery
                    </Button>
                </div>
                <Table className="rounded-md">
                    <TableHeader>
                        <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
                            <TableHead className="text-white">Image</TableHead>
                            <TableHead className="text-white">Icon Alt</TableHead>
                            <TableHead className="text-white text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {galleryList.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {data && data.image ? <div className="h-[50px] w-[50px]"> <Image src={data.image} alt="icon" className="h-full w-full rounded-md" width={50} height={50} /> </div> : null}
                                </TableCell>
                                <TableCell>{data.alt}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="secondary" size="icon" onClick={() => editGallery(data)}>
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

export default Gallery;