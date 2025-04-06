"use client"

import FileUploader from "@/components/FileUploader/FileUploader";
import { Input } from "@/components/ui/input";
import { Tag } from "lucide-react";
import { ChangeEvent, useEffect } from "react";

const DestinationFields = ({
    destinationData, setDestinationData
}: any) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setDestinationData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    }

    const onFileUpload = (url: string, type: string) => {
        setDestinationData((prev: any) => ({
            ...prev,
            [type]: url,
        }));
    }

    useEffect(() => {
        console.log(destinationData);
    }, [destinationData]);

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <Tag /> Brand Section</h2>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Destination Heading</label>
                    <Input type="text" placeholder="Enter Destination Heading" name="destination_heading" onChange={handleChange} value={destinationData?.destination_heading || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Destination Subheading</label>
                    <Input type="text" placeholder="Enter Destination Subheading" name="destination_subheading" onChange={handleChange} value={destinationData?.destination_subheading || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Destination Image Alt</label>
                    <Input type="text" placeholder="Enter Brand Name" name="destination_image_alt" onChange={handleChange} value={destinationData?.destination_image_alt || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Destination Image</label>
                    <FileUploader url={destinationData?.destination_image || ''} urlType="image" onFileUpload={(url: string) => onFileUpload(url, 'destination_image')}  />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Destination Card Heading</label>
                    <Input type="text" placeholder="Enter Destination Card Heading" name="destination_card_heading" onChange={handleChange} value={destinationData?.destination_card_heading || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Destination Card Description</label>
                    <Input type="text" placeholder="Enter Destination Card Description" name="destination_card_description" onChange={handleChange} value={destinationData?.destination_card_description || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Explore City Heading</label>
                    <Input type="text" placeholder="Enter Explore City Heading" name="explore_city_heading" onChange={handleChange} value={destinationData?.explore_city_heading || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Explore City Description</label>
                    <Input type="text" placeholder="Enter Explore City Description" name="explore_city_description" onChange={handleChange} value={destinationData?.explore_city_description || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Editor Desk Heading</label>
                    <Input type="text" placeholder="Enter Editor Desk Heading" name="editor_desk_heading" onChange={handleChange} value={destinationData?.editor_desk_heading || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Editor Desk Description</label>
                    <Input type="text" placeholder="Enter Editor Desk Description" name="editor_desk_description" onChange={handleChange} value={destinationData?.editor_desk_description || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo Image</label>
                    <FileUploader url={destinationData?.logo_image && destinationData?.logo_image?.includes('https://') ? destinationData?.logo_image : ''} urlType="image" onFileUpload={(url: string) => onFileUpload(url, 'logo_image')}  />
                </div>
                
            </div>
        </div>
    )
}

export default DestinationFields;