"use client"

import { IGallery, IGalleryData } from "@/app/types/components/Home";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CirclePlus, Edit2, ImageDown, Trash2 } from "lucide-react";
import { ChangeEvent } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image";
import { useAppDispatch } from "@/lib/store";
import { setGalleryModal } from "@/lib/features/GallerySlice";

const Gallery = ({
    galleryData,
    setGalleryData,
    galleryList,
    setGalleryList
}: IGallery) => {

    const dispatch = useAppDispatch();

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

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 items-center p-2 bg-purple-700 text-white text-lg font-medium mb-3"> <ImageDown /> Gallery Section</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Gallery Section</label>
                    <Input type="text" placeholder="Enter Gallery Section" className="mt-1 w-full" onChange={handleChange} name="gallerySection" value={galleryData.gallerySection} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Gallery Heading</label>
                    <Input type="text" placeholder="Enter Gallery Heading" className="mt-1 w-full" onChange={handleChange} name="galleryHeading" value={galleryData.galleryHeading} />
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
                            <TableHead className="text-white">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {galleryList.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {data && data.image ? <Image src={data.image} alt="icon" className="rounded-md" width={50} height={50} /> : null}
                                </TableCell>
                                <TableCell>{data.alt}</TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-center gap-2">
                                        <Button variant="secondary" size="icon">
                                            <Edit2 />
                                        </Button>
                                        <Button variant="destructive" size="icon">
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