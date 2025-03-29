"use client"

import { IGallery, IGalleryData } from "@/app/types/components/Home";
import { Input } from "@/components/ui/input";
import { Home } from "lucide-react";
import { ChangeEvent } from "react";

const Gallery = ({
    galleryData,
    setGalleryData
}: IGallery) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setGalleryData((prev: IGalleryData) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 items-center p-2 bg-purple-700 text-white text-lg font-medium mb-3"> <Home /> Gallery Section</h2>
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
        </div>
    )
}

export default Gallery;