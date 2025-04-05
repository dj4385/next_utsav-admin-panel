'use client';

import { IThemes, IHeaderImages, IAddVenueRequest } from "@/app/types/api/request/venue.request";
import ContentHeader from "@/components/ContentHeader/ContentHeader";
import { ArrowLeft, MapPinHouse } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IImages } from "@/app/types/api/request/venue.request";
import ButtonComponent from "@/components/core/Button/Button";
import VenueForm from "../../../add-venue/_components/VenueForm/VenueForm";
import ThemeForm from "../../../add-venue/_components/ThemeForm/ThemeForm";
import VenuesImages from "../../../add-venue/_components/VenueImages/VenuesImages";
import { VenueService } from "@/services/venue.service";
import NearestAirport from "../../../add-venue/_components/NearestAirport/NearestAirport";
import HeaderImage from "../../../add-venue/_components/HeaderImage/HeaderImage";
import { toast } from "@/hooks/use-toast";

const UpdateVenueForm = ({ id }: { id: string }) => {
    const [venueApiResponse, setVenueApiResponse] = useState<any>();
    const [venueData, setVenueData] = useState<any>()
    const [nearestAirport, setNearestAirport] = useState<any>()
    // const [realWeddings, setRealWeddings] = useState<IRealWeddings[]>([]);
    const [themeFormList, setThemeFormList] = useState<IThemes[]>([]);
    const [venueImagesList, setVenueImages] = useState<IImages[]>([]);
    const [headerImageList, setHeaderImageList] = useState<IHeaderImages[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const back = () => {
        router.push('/venue')
    }

    const getVenueDetail = async () => {
        try {
            const res: any = await VenueService.getVenueDetail(id);
            if (res && res.status == 200) {
                console.log(res.data, 'res');
                
                setVenueApiResponse(res.data);
                setVenueData({
                    ...res.data.venue,
                    venue_name: res.data.venue_name,
                    experience: res.data.experience,
                    location: res.data.location,
                    theme_options_heading: res.data.theme_options_heading,
                    theme_options_subheading: res.data.theme_options_subheading,
                });
                setThemeFormList(res.data.theme_options);
                setVenueImages(res.data.gallery);
                setNearestAirport(res.data.venue.nearest_airport);
                setHeaderImageList(res.data.header_image_gallery);
            }
        } catch (error) {
            
        }
    }

    const onSaveChanges = async () => {
        try {
            setLoading(true);
            debugger
            const req: IAddVenueRequest = {
                venue_name: venueData?.venue_name,
                venue: {
                    "property_type": venueData?.property_type,
                    "capacity": +venueData?.capacity,
                    "nearest_airport": {
                        "name": nearestAirport?.name,
                        "distance_km": +nearestAirport?.distance_km
                    },
                    "outdoor_catering_policy": venueData?.outdoor_catering_policy,
                    "air_quality_index": +venueData?.air_quality_index,
                    "google_rating": +venueData?.google_rating,
                    "google_rating_review": +venueData?.google_rating_review,
                    "description": venueData?.description,
                    "map_link": venueData?.map_link
                },
                theme_options_heading: venueData?.theme_options_heading,
                theme_options_subheading: venueData?.theme_options_subheading,
                theme_options: themeFormList,
                gallery: venueImagesList,
                location: venueData?.location?._id,
                experience: venueData?.experience?._id,
                header_image_gallery: headerImageList,
            }

            console.log(req, 'req');


            const res: any = await VenueService.updateVenue(id, req);

            if (res?.status == 200 || res?.status == 201) {
                toast({
                    title: "Venue Updated Successfully",
                    description: res.message
                })
                back();
            } else {
                toast({
                    title: "Venue Updated Failed",
                    description: res?.response?.data?.error,
                    variant: "destructive"
                })
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive"
            })
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            getVenueDetail();
        }
    }, [id])

    return (
        <div className="flex flex-col rounded-lg bg-gray-50 p-2">
            <div className="w-full">
                <ContentHeader title="Update Venue" icon={<MapPinHouse />} buttonLabel="Back" buttonIcon={<ArrowLeft />} onBtnClick={() => back()} />
            </div>
            <div className="flex flex-row mt-5">
                <VenueForm venueData={venueData} setVenueData={setVenueData} />
            </div>
            <div className="flex flex-row mt-5">
                <NearestAirport nearestAirport={nearestAirport} setNearestAirport={setNearestAirport} />
            </div>
            {/* <div className="flex flex-row mt-5">
                <RealWedding realWeddings={realWeddings} setRealWeddings={setRealWeddings} />
            </div> */}
            <div className="flex flex-row mt-5">
                <ThemeForm setThemeFormList={setThemeFormList} themeFormList={themeFormList} />
            </div>
            <div className="flex flex-row mt-5">
                <VenuesImages setVenueImages={setVenueImages} venueImagesList={venueImagesList} />
            </div>
            <div className="flex flex-row mt-5">
                <HeaderImage setHeaderImageList={setHeaderImageList} headerImageList={headerImageList} />
            </div>
            <div className="flex justify-center items-center mt-5">
                <ButtonComponent label="Save Changes" onClick={() => onSaveChanges()} loading={loading} type="button" customClass="bg-purple-700 hover:bg-purple-800" />
            </div>
        </div>
    )
}   

export default UpdateVenueForm;
