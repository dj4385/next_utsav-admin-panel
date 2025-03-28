"use client"

import { IHero } from "@/app/types/components/Home";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Home } from "lucide-react";

const Hero = ({
    heroData,
    setHeroData
}: IHero) => {
    return (
        <div className="border-[2px] rounded-lg p-2 w-full">
            <h2 className="flex flex-row gap-2 items-center text-lg font-medium mb-3"> <Home /> Hero Section</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Heading</label>
                    <Input type="text" placeholder="Enter Heading" className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Sub Heading</label>
                    <Input type="text" placeholder="Enter Sub Heading" className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Heading Image Alt</label>
                    <Input type="text" placeholder="Enter Heading Image Alt" className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Story Heading</label>
                    <Input type="text" placeholder="Enter Story Heading" className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Story</label>
                    <Textarea placeholder="Enter story here" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
                    <FileUploader imageUrl="" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Heading Image</label>
                    <FileUploader imageUrl="" />
                </div>
            </div>
        </div>
    )
}

export default Hero;