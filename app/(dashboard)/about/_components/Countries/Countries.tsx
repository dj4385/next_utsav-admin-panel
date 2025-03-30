"use client"

import { ICountries, ICountriesData, IExperience, IExperienceData } from "@/app/types/components/About";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Input } from "@/components/ui/input";
import { Globe, Star } from "lucide-react";
import { ChangeEvent, useEffect } from "react";

const Countries = ({
    countriesData, setCountriesData
}: ICountries) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setCountriesData((prev: ICountriesData) => ({
            ...prev,
            [name]: value,
        }));
    }

    const onFileUpload = (url: string) => {
        setCountriesData((prev: ICountriesData) => ({
            ...prev,
            countries_served_icon: url,
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <Globe /> Countries Section</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Countries Served Label</label>
                    <Input placeholder="Enter story here" onChange={handleChange}  name="countries_served_label" value={countriesData.countries_served_label} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Countries Serve</label>
                    <Input type="text" placeholder="Enter Brand Name" name="countries_served" onChange={handleChange} value={countriesData?.countries_served || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Alt Countries Served Icon</label>
                    <Input type="text" placeholder="Enter Brand Name" name="alt_countries_served_icon" onChange={handleChange} value={countriesData?.alt_countries_served_icon || ''} className="mt-1 w-full" />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Countries served icon</label>
                    <FileUploader url={countriesData?.countries_served_icon || ''} urlType="image" onFileUpload={(url: string) => onFileUpload(url)}  />
                </div>
                
            </div>
        </div>
    )
}

export default Countries;