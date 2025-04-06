"use client"

import ButtonComponent from "@/components/core/Button/Button";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { setAddVenueSuccess } from "@/lib/features/EventsSlice";
import { useAppDispatch } from "@/lib/store";
import { SearchVenueService } from "@/services/search-venue.service";
import { ChangeEvent, useState } from "react";

const SearchVenueForm = () => {

    const [venueHeading, setVenueHeading] = useState<string>('');
    const [venueSubHeading, setVenueSubHeading] = useState<string>('');
    const [venueImage, setVenueImage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const { toast } = useToast();
    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name == 'venueHeading') {
            setVenueHeading(value);
        }
        if (name == 'venueSubHeading') {
            setVenueSubHeading(value);
        }
    }

    const onSave = async () => {
        try {
            if (!venueHeading && !venueSubHeading) {
                return
            }
            if (!venueImage) {
                toast({
                    title: "Error",
                    description: "Please upload venue image",
                    variant: "destructive",
                }) 
                return;
            }
            setLoading(true);
            const res: any = await SearchVenueService.addVenue({ venue_heading: venueHeading, venue_subheading: venueSubHeading, venue_image: venueImage });
            if (res && (res.status == 200 || res.status == 201)) {
                toast({
                    title: "Success",
                    description: "Location Added Successfully"
                })
                setVenueHeading('');
                setVenueSubHeading('');
                setVenueImage('');
                dispatch(setAddVenueSuccess(true));
            } else {
                toast({
                    title: "Error",
                    description: "Unable to add venue",
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
                    <Input type="text" placeholder="Enter Venue Heading" className="mt-1 w-full" onChange={handleChange} name="venueHeading" value={venueHeading} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Venue Subheading</label>
                    <Input type="text" placeholder="Enter Venue Subheading" className="mt-1 w-full" onChange={handleChange} name="venueSubHeading" value={venueSubHeading} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Venue Image</label>
                    <FileUploader
                        onFileUpload={(file: string) => setVenueImage(file)}
                        url={venueImage}
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

export default SearchVenueForm;