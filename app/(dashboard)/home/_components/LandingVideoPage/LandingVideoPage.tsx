"use client"

import { ILandingVideoPage, ILandingVideoPageData } from "@/app/types/components/Home";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Input } from "@/components/ui/input";
import { Video } from "lucide-react";
import { ChangeEvent } from "react";


const LandingVideoPage = ({
    landingVideoPageData,
    setLandingVideoPageData
}: ILandingVideoPage) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement  >) => {
        const { name, value } = e.target;

        setLandingVideoPageData((prev: ILandingVideoPageData) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 items-center text-lg p-2 bg-purple-700 text-white font-medium mb-3"> <Video /> Landing Video Page Section</h2>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Heading</label>
                    <Input type="text" placeholder="Enter Heading" className="mt-1 w-full" onChange={handleChange} name="heading" value={landingVideoPageData.heading} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Sub Heading</label>
                    <Input type="text" placeholder="Enter Sub Heading" className="mt-1 w-full" onChange={handleChange} name="subHeading" value={landingVideoPageData.subHeading} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image Alt</label>
                    <Input type="text" placeholder="Enter Heading Image Alt" className="mt-1 w-full" onChange={handleChange} name="alt" value={landingVideoPageData.alt} />
                </div>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                    <FileUploader imageUrl={landingVideoPageData.image || ""} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Video</label>
                    <FileUploader imageUrl="" />
                </div>
            </div>
        </div>
    )
}

export default LandingVideoPage;
