"use client"

import ButtonComponent from "@/components/core/Button/Button";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { setAddLocationSuccess } from "@/lib/features/EventsSlice";
import { useAppDispatch } from "@/lib/store";
import { LocationService } from "@/services/location.service";
import { StateService } from "@/services/state.service";
import { ChangeEvent, useEffect, useState } from "react";

const AddLocationForm = () => {

    const [locationTitle, setLocationTitle] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [locationImage, setLocationImage] = useState<string>('');
    const [stateList, setStateList] = useState<any[]>([]);


    const { toast } = useToast();
    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

    const getStateList = async () => {
        try {
            const res: any = await StateService.getStateList();
            if (res && (res.status == 200 || res.status == 201)) {
                setStateList(res.data.data);
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive",
            })
        }
    }

    const onSave = async () => {
        try {
            if (!locationTitle && !address && !city && !state) {
                return
            }
            if (!locationImage) {
                toast({
                    title: "Error",
                    description: "Please upload location image",
                    variant: "destructive",
                }) 
                return;
            }
            setLoading(true);
            const res: any = await LocationService.addLocation({ name: locationTitle, address, city, state_id: state, image: locationImage });
            if (res && (res.status == 200 || res.status == 201)) {
                toast({
                    title: "Success",
                    description: "Location Added Successfully"
                })
                setLocationTitle('');
                setCity('');
                setState('');
                setAddress('');
                setLocationImage('');
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

    useEffect(() => {
        getStateList();
    }, [])

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
                    <select className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" name="state" onChange={handleChange} value={state}  >
                        <option value="">Select State</option>
                        {
                            stateList.length ? stateList.map((loc, index) => <option key={index} value={loc._id}> {loc.name} </option>) : null
                        }
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <Input type="text" placeholder="Enter Address" className="mt-1 w-full" onChange={handleChange} name="address" value={address} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Location Image</label>
                    <FileUploader
                        onFileUpload={(file: string) => setLocationImage(file)}
                        url={locationImage}
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

export default AddLocationForm;