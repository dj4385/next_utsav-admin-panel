"use client"

import ButtonComponent from "@/components/core/Button/Button";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { setAddStateSuccess } from "@/lib/features/EventsSlice";
import { useAppDispatch } from "@/lib/store";
import { StateService } from "@/services/state.service";
import { ChangeEvent, useState } from "react";

const AddStateForm = () => {

    const [stateTitle, setStateTitle] = useState<string>('');
    const [stateImage, setStateImage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);


    const { toast } = useToast();
    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name == 'stateTitle') {
            setStateTitle(value);
        }
        if (name == 'stateImage') {
            setStateImage(value);
        }
    }

    const onSave = async () => {
        try {
            if (!stateTitle) {
                return
            }
            if (!stateImage) {
                toast({
                    title: "Error",
                    description: "Please upload state image",
                    variant: "destructive",
                }) 
                return;
            }
            setLoading(true);
            const res: any = await StateService.addState({ name: stateTitle, image: stateImage });
            if (res && (res.status == 200 || res.status == 201)) {
                toast({
                    title: "Success",
                    description: "State Added Successfully"
                })
                setStateTitle('');
                setStateImage('');
                dispatch(setAddStateSuccess(true));
            } else {
                toast({
                    title: "Error",
                    description: "Unable to add state",
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
                <div>
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <Input type="text" placeholder="Enter State Name" className="mt-1 w-full" onChange={handleChange} name="stateTitle" value={stateTitle} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">State Image</label>
                    <FileUploader
                        onFileUpload={(file: string) => setStateImage(file)}
                        url={stateImage}
                        urlType="image"
                    />
                </div>
            </div>
            <div className="flex justify-center items-center my-5">
                <ButtonComponent label="Save Changes" onClick={() => onSave()} loading={loading} type="button" customClass="bg-purple-700 hover:bg-purple-800" />
            </div>
        </div>
    )
}

export default AddStateForm;
