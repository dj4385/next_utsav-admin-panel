"use client"

import ButtonComponent from "@/components/core/Button/Button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { setAddExperinceSuccess } from "@/lib/features/EventsSlice";
import { useAppDispatch } from "@/lib/store";
import { ExperienceService } from "@/services/experience.service";
import { CirclePlus } from "lucide-react";
import { ChangeEvent, useState } from "react";

const AddExperienceForm = () => {

    const [experienceTitle, setExperienceTitle] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const { toast } = useToast();
    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if(name == 'experienceTitle') {
            setExperienceTitle(value);
        }
    }

    const onSave = async () => {
        try {
            if (!experienceTitle) {
                return
            }
            setLoading(true);

            const res: any = await ExperienceService.addExperience({ name: experienceTitle });

            if (res && (res.status == 200 || res.status == 201)) {
                toast({
                    title: "Success",
                    description: "Experience Added Successfully"
                })
                dispatch(setAddExperinceSuccess(true));
            } else {
                toast({
                    title: "Error",
                    description: "Unable to add experience",
                    variant: "destructive",
                })
            }
            setTimeout(() => {
                setExperienceTitle('');
            }, 1000);
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
                <div>
                    <label className="block text-sm font-medium text-gray-700">Experience</label>
                    <Input type="text" placeholder="Enter Experience" className="mt-1 w-full" onChange={handleChange} name="experienceTitle" />
                </div>
            </div>
            <div className="flex justify-center items-center my-5">
                <ButtonComponent label="Save Changes" onClick={() => onSave()} loading={loading} type="button" customClass="bg-purple-700 hover:bg-purple-800" />
            </div>
        </div>
    )
}

export default AddExperienceForm;