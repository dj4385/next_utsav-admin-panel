"use client"

import ContentHeader from "@/components/ContentHeader/ContentHeader";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

import { useToast } from "@/hooks/use-toast";
import { DestinationService } from "@/services/destination.service";
import Meta from "./Meta/Meta";
import DestinationFields from "./DestinationFields/DestinationFields";
import ButtonComponent from "@/components/core/Button/Button";

const DestinationForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [destinations, setDestinations] = useState<any>();
    const [destinationData, setDestinationData] = useState<any>({
        moving_logo: "",
        destination_heading: "",
        destination_card_heading: "",
        destination_card_description: "",
        destination_subheading: "",
        destination_image: "",
        destination_image_alt: "",
        explore_city_heading: "",
        explore_city_description: "",
        editor_desk_heading: "",
        editor_desk_description: "",
        logo_image: ""
    });
    const [metaData, setMetaData] = useState<any>({
        meta_description: "",
        meta_image: "",
        meta_title: ""
    });
    const { toast } = useToast();

    const getDestinationListing = async () => {
        try {
            const res: any = await DestinationService.getDestinations();

            if (res && res.status === 200 && res.data.data) {
                const data = res.data.data.destination_result;
                setDestinations(data);
                setMetaData({
                    meta_description: data.meta_description,
                    meta_image: data.meta_image,
                    meta_title: data.meta_title
                });
                setDestinationData({
                    moving_logo: data.moving_logo,
                    destination_heading: data.destination_heading,
                    destination_card_heading: data.destination_card_heading,
                    destination_card_description: data.destination_card_description,
                    destination_subheading: data.destination_subheading,
                    destination_image: data.destination_image,
                    destination_image_alt: data.destination_image_alt,
                    explore_city_heading: data.explore_city_heading,
                    explore_city_description: data.explore_city_description,
                    editor_desk_heading: data.editor_desk_heading,
                    editor_desk_description: data.editor_desk_description,
                    logo_image: data.logo_image
                });
            } else {
                toast({
                    title: "Error",
                    description: res?.response?.data?.message || 'No Destination Found',
                    variant: "destructive",
                });
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.response?.data?.message || 'Something went wrong',
                variant: "destructive",
            });
        }
    };

    const onSaveChanges = async () => {
        try {
            setLoading(true);
            const req = {
                ...destinationData,
                ...metaData,
                explorecard: destinations?.explorecard || [],
                editordesk: destinations?.editordesk || []
            };
            const res: any = await DestinationService.createDestination(req);

            if (res && (res.status === 200 || res.status === 201)) {
                toast({
                    title: "Success",
                    description: res?.data?.message || 'Destination Created Successfully',
                });
            } else {
                toast({
                    title: "Error",
                    description: res?.data?.message || 'Something went wrong',
                    variant: "destructive",
                });
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.response?.data?.message || 'Something went wrong',
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const onUpdateChanges = async () => {
        try {
            setLoading(true);
            const req = {
                _id: destinations?._id, // 👈 Add the ID here
                ...destinationData,
                ...metaData,
                explorecard: destinations?.explorecard || [],
                editordesk: destinations?.editordesk || []
            };
            const res: any = await DestinationService.updateDestination(req._id,req);

            if (res && res.status === 200) {
                toast({
                    title: "Success",
                    description: res?.data?.message || 'Destination Updated Successfully',
                });
            } else {
                toast({
                    title: "Error",
                    description: res?.data?.message || 'Update failed',
                    variant: "destructive",
                });
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.response?.data?.message || 'Something went wrong',
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDestinationListing();
    }, []);

    return (
        <div className="flex flex-col rounded-lg bg-gray-50 p-2">
            <div className="w-full">
                <ContentHeader title="Add/Update Destination Page" icon={<MapPin />} />
            </div>
            <div className="flex flex-row mt-5">
                <DestinationFields destinationData={destinationData} setDestinationData={setDestinationData} />
            </div>

            <div className="flex flex-row mt-5">
                <Meta metaData={metaData} setMetaData={setMetaData} />
            </div>

            <div className="flex justify-center items-center mt-5">
                <ButtonComponent
                    label={destinations ? "Update Changes" : "Save Changes"}
                    onClick={destinations ? onUpdateChanges : onSaveChanges}
                    loading={loading}
                    type="button"
                    customClass="bg-purple-700 hover:bg-purple-800"
                />
            </div>
        </div>
    );
};

export default DestinationForm;
