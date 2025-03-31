"use client"

import ButtonComponent from "@/components/core/Button/Button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ExperienceService } from "@/services/experience.service";
import { CirclePlus } from "lucide-react";
import { ChangeEvent, useState } from "react";

const AddExperienceForm = () => {

    const [experienceTitle, setExperienceTitle] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const { toast } = useToast();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        setExperienceTitle(value);
    }

    const onSave = async () => {
        try {
            if (!experienceTitle) {
                return
            }
            setLoading(true);

            const res: any = ExperienceService.addExperience({ name: experienceTitle });
            if (res && res.status == 200) {
                toast({
                    title: "Success",
                    description: "Experience Added Successfully"
                })
                setExperienceTitle('');
            } else {
                toast({
                    title: "Error",
                    description: "Unable to add experience",
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
                        <label className="block text-sm font-medium text-gray-700">Meta Title</label>
                        <Input type="text" placeholder="Enter Meta Title" className="mt-1 w-full" onChange={handleChange} name="meta_title" />
                    </div>
                    <div className="flex justify-end items-center mt-5">
                        <ButtonComponent label="Save Changes" onClick={() => onSave()} loading={loading} type="button" customClass="bg-purple-700 hover:bg-purple-800" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddExperienceForm;