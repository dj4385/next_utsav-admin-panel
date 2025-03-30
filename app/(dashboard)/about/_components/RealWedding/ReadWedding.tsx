"use client"

import { IRealWedding, IRealWeddingData } from "@/app/types/components/About";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Gem } from "lucide-react";
import { ChangeEvent, useEffect } from "react";

const RealWedding = ({
    readWeddingData, setRealWeddingData
}: IRealWedding) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setRealWeddingData((prev: IRealWeddingData) => ({
            ...prev,
            [name]: value,
        }));
    }

    const onFileUpload = (url: string) => {
        setRealWeddingData((prev: IRealWeddingData) => ({
            ...prev,
            real_weddings_image: url,
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <Gem /> Real Wedding Section</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Real Wedding Button</label>
                    <Input type="text" placeholder="Enter Wedding Button Text" name="real_wedding_button" onChange={handleChange} value={readWeddingData?.real_wedding_button || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Alt real weddings image</label>
                    <Input type="text" placeholder="Enter Real Wedding Image Alt" name="alt_real_weddings_image" onChange={handleChange} value={readWeddingData?.alt_real_weddings_image || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Real Wedding Text</label>
                    <Textarea placeholder="Enter story here" onChange={handleChange}  name="real_weddings_text" value={readWeddingData.real_weddings_text} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Real Wedding Image</label>
                    <FileUploader url={readWeddingData?.real_weddings_image || ''} urlType="image" onFileUpload={(url: string) => onFileUpload(url)}  />
                </div>
                
            </div>
        </div>
    )
}

export default RealWedding;