"use client"

import { IHero, IHeroData } from "@/app/types/components/Home";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Home } from "lucide-react";
import { ChangeEvent } from "react";

const Hero = ({
    heroData,
    setHeroData
}: IHero) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement  >) => {
        const { name, value } = e.target;

        setHeroData((prev: IHeroData) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 items-center p-2 bg-purple-700 text-white text-lg font-medium mb-3"> <Home /> Hero Section</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Heading</label>
                    <Input type="text" placeholder="Enter Heading" className="mt-1 w-full" onChange={handleChange} name="heading" value={heroData.heading} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Sub Heading</label>
                    <Input type="text" placeholder="Enter Sub Heading" className="mt-1 w-full" onChange={handleChange} name="subHeading" value={heroData.subHeading} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Heading Image Alt</label>
                    <Input type="text" placeholder="Enter Heading Image Alt" className="mt-1 w-full" onChange={handleChange} name="headingImgAlt" value={heroData.headingImgAlt} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Story Heading</label>
                    <Input type="text" placeholder="Enter Story Heading" className="mt-1 w-full" onChange={handleChange} name="storyHeading" value={heroData.storyHeading} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Story</label>
                    <Textarea placeholder="Enter story here" onChange={handleChange}  name="story" value={heroData.story} />
                </div>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 mt-4 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
                    <FileUploader imageUrl={heroData.backgroundImg || ''} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Heading Image</label>
                    <FileUploader imageUrl={heroData.headingImg} />
                </div>
            </div>
        </div>
    )
}

export default Hero;