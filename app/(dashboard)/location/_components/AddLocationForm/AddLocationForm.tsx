"use client"

import ButtonComponent from "@/components/core/Button/Button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { setAddLocationSuccess } from "@/lib/features/EventsSlice";
import { useAppDispatch } from "@/lib/store";
import { LocationService } from "@/services/location.service";
import { ChangeEvent, useState } from "react";

const AddLocationForm = () => {

    const [locationTitle, setLocationTitle] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const { toast } = useToast();
    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name == 'locationTitle') {
            setLocationTitle(value);
        }
        if (name == 'city') {
            setCity(value);
        }

        if (name == 'address') {
            setAddress(value)
        }

        if (name == 'state') {
            setState(value)
        }
    }

    const onSave = async () => {
        try {
            if (!locationTitle && !address && !city && !state) {
                return
            }
            setLoading(true);
            const res: any = await LocationService.addLocation({ name: locationTitle, address, city, state });
            if (res && (res.status == 200 || res.status == 201)) {
                toast({
                    title: "Success",
                    description: "Location Added Successfully"
                })
                setLocationTitle('');
                setCity('');
                setState('');
                setAddress('');
                dispatch(setAddLocationSuccess(true));
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
                <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <Input type="text" placeholder="Enter Location Name" className="mt-1 w-full" onChange={handleChange} name="locationTitle" value={locationTitle} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <Input type="text" placeholder="Enter City" className="mt-1 w-full" onChange={handleChange} name="city" value={city} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <Input type="text" placeholder="Enter State" className="mt-1 w-full" onChange={handleChange} name="state" value={state} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <Input type="text" placeholder="Enter Address" className="mt-1 w-full" onChange={handleChange} name="address" value={address} />
                </div>
            </div>
            <div className="flex justify-center items-center my-5">
                <ButtonComponent label="Save Changes" onClick={() => onSave()} loading={loading} type="button" customClass="bg-purple-700 hover:bg-purple-800" />
            </div>
        </div>
    )
}

export default AddLocationForm;