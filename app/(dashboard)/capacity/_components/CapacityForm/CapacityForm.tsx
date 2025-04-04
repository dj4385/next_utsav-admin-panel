'use client';

import { useAppDispatch } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { ChangeEvent, useState } from "react";
import { setAddCapacitySuccess } from "@/lib/features/EventsSlice";
import { CapacityService } from "@/services/capacity.service";
import { IAddAQIRequest } from "@/app/types/api/request/common.request";
import ButtonComponent from "@/components/core/Button/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CapacityForm = () => {

    const [range, setRange] = useState<string>('');
    const [min, setMin] = useState<string>('');
    const [max, setMax] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const { toast } = useToast();
    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if(name == 'range') {
            setRange(value);
        }
        if(name == 'min') {
            setMin(value);
        }
        if(name == 'max') {
            setMax(value);
        }
        if(name == 'description') {
            setDescription(value);
        }
    }

    const onSave = async () => {
        try {
            if (!range || !min || !max || !description) {
                return;
            }   
            setLoading(true);
            const req: IAddAQIRequest = {
                range: range,
                min: parseInt(min),
                max: parseInt(max),
                description: description
            }
            const res: any = await CapacityService.addCapacity(req);
            if (res && (res.status == 200 || res.status == 201)) { 
                toast({
                    title: "Capacity added successfully",
                    description: "Capacity added successfully",
                })
                dispatch(setAddCapacitySuccess(true));
                setRange('');
                setMin('');
                setMax('');
                setDescription('');
            } else {
                toast({
                    title: "Error",
                    description: "Unable to add capacity",
                    variant: "destructive",
                })
            }
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Range</label>
                    <Input type="text" placeholder="Enter Location Name" className="mt-1 w-full" onChange={handleChange} name="range" value={range} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Min</label>
                    <Input type="number" placeholder="Enter Min" className="mt-1 w-full" onChange={handleChange} name="min" value={min} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Max</label>
                    <Input type="number" placeholder="Enter Max" className="mt-1 w-full" onChange={handleChange} name="max" value={max} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <Textarea placeholder="Enter Description" className="mt-1 w-full" onChange={handleChange} name="description" value={description} />
                </div>
            </div>
            <div className="flex justify-center items-center my-5">
                <ButtonComponent label="Save Changes" onClick={() => onSave()} loading={loading} type="button" customClass="bg-purple-700 hover:bg-purple-800" />
            </div>
        </div>
    )
}

export default CapacityForm;
