"use client"

import { IGallery } from "@/app/types/components/Home";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Home } from "lucide-react";

const Gallery = ({
    galleryData,
    setGalleryData
}: IGallery) => {
    return (
        <div className="border-[2px] rounded-lg p-2 w-full">
            <h2 className="flex flex-row gap-2 items-center text-lg font-medium mb-3"> <Home /> Gallery Section</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Gallery Section</label>
                    <Input type="text" placeholder="Enter Gallery Section" className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Gallery Heading</label>
                    <Input type="text" placeholder="Enter Gallery Heading" className="mt-1 w-full" />
                </div>
            </div>
        </div>
    )
}

export default Gallery;