"use client"

import ContentHeader from "@/components/ContentHeader/ContentHeader";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
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

    const getDestinationListing = async (page: number = 1) => {
        try {
            const res: any = await DestinationService.getDestinations();
            console.log(res);
            
            if (res && res.status == 200 && res.data.data) {
                setDestinations(res.data.data.destination_result);
                setMetaData({
                    meta_description: res.data.data.destination_result.meta_description,
                    meta_image: res.data.data.destination_result.meta_image,
                    meta_title: res.data.data.destination_result.meta_title
                })
                setDestinationData({
                    moving_logo: res.data.data.destination_result.moving_logo,
                    destination_heading: res.data.data.destination_result.destination_heading,
                    destination_card_heading: res.data.data.destination_result.destination_card_heading,
                    destination_card_description: res.data.data.destination_result.destination_card_description,
                    destination_subheading: res.data.data.destination_result.destination_subheading,
                    destination_image: res.data.data.destination_result.destination_image,
                    destination_image_alt: res.data.data.destination_result.destination_image_alt,
                    explore_city_heading: res.data.data.destination_result.explore_city_heading,
                    explore_city_description: res.data.data.destination_result.explore_city_description,
                    editor_desk_heading: res.data.data.destination_result.editor_desk_heading,
                    editor_desk_description: res.data.data.destination_result.editor_desk_description,
                    logo_image: res.data.data.destination_result.logo_image
                })
            } else {
                toast({
                    title: "Error",
                    description: res?.response?.data?.message || 'No Destination Found',
                    variant: "destructive",
                })
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.response?.data?.message || 'Something went wrong',
                variant: "destructive",
            })
        }
    }

    const onSaveChanges = async () => {
        try {
            setLoading(true);
            const req = {
                ...destinationData,
                ...metaData,
                explorecard: destinations?.explorecard || [],
                editordesk: destinations?.editordesk || []
            }
            const res: any = await DestinationService.createDestination(req);
            console.log(res);
            if (res && res.status == 200 || res.status == 201) {
                toast({
                    title: "Success",
                    description: res?.response?.data?.message || 'Destination Created Successfully',
                })
            } else {
                toast({
                    title: "Error",
                    description: res?.response?.data?.message || 'Something went wrong',
                    variant: "destructive",
                })
            }
            setLoading(false);
        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.response?.data?.message || 'Something went wrong',
                variant: "destructive",
            })
            setLoading(false);
        }
    }

    
    useEffect(() => {
        getDestinationListing()
    }, [])

    
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
                <ButtonComponent label="Save Changes" onClick={() => onSaveChanges()} loading={loading} type="button" customClass="bg-purple-700 hover:bg-purple-800" />
            </div>
        </div>
    )
}

export default DestinationForm;
