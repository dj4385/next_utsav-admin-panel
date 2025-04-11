'use client';

import { ChangeEvent } from "react";

import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/lib/store";
import { useState } from "react";
import { setAddDesignSuccess } from "@/lib/features/EventsSlice";
import { Input } from "@/components/ui/input";
import ButtonComponent from "@/components/core/Button/Button";
import { DesignService } from "@/services/design.service";
const DesignForm = () => {
    const [name, setName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const { toast } = useToast();
    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if(name == 'name') {
            setName(value);
        }
    }

    const onSave = async () => {
        try {
            if (!name) {
                return;
            }   
            setLoading(true);
            const req: any = {
                name: name,
            }
            const res: any = await DesignService.addDesign(req);
            if (res && (res.status == 200 || res.status == 201)) { 
                toast({
                    title: "Design added successfully",
                    description: "Design added successfully",
                })
                dispatch(setAddDesignSuccess(true));
                setName('');
            } else {
                toast({
                    title: "Error",
                    description: "Unable to add design",
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
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <Input type="text" placeholder="Enter Name" className="mt-1 w-full" onChange={handleChange} name="name" value={name} />
                </div>
            </div>
            <div className="flex justify-center items-center my-5">
                <ButtonComponent label="Save Changes" onClick={() => onSave()} loading={loading} type="button" customClass="bg-purple-700 hover:bg-purple-800" />
            </div>
        </div>
    )
}

export default DesignForm;
