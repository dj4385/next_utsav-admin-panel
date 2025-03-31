"use client"

import ButtonComponent from "@/components/core/Button/Button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LocationService } from "@/services/location.service";
import { ChangeEvent, useState } from "react";

const AddLocationForm = () => {

    const [locationTitle, setLocationTitle] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const { toast } = useToast();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        setLocationTitle(value);
    }

    const onSave = async () => {
        try {
            if (!locationTitle) {
                return
            }
            setLoading(true);

            const res: any = LocationService.addLocation({ name: locationTitle });
            if (res && res.status == 200) {
                toast({
                    title: "Success",
                    description: "Location Added Successfully"
                })
                setLocationTitle('');
            } else {
                toast({
                    title: "Error",
                    description: "Unable to add location",
                    variant: "destructive",
                })
            }
            setLoading(false);

        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive",
            })
            setLoading(false);
        }
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div className="flex flex-row gap-5">
                    <div className="w-[50%]"> 
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <Input type="text" placeholder="Enter Location Name" className="mt-1 w-full" onChange={handleChange} />
                    </div>
                    <div className="flex justify-end items-center mt-5">
                        <ButtonComponent label="Save Changes" onClick={() => onSave()} loading={loading} type="button" customClass="bg-purple-700 hover:bg-purple-800" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddLocationForm;