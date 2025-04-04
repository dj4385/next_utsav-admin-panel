"use client"

import ContentHeader from "@/components/ContentHeader/ContentHeader";
import { VenueService } from "@/services/venue.service";
import { ArrowLeft, MapPinHouse } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VenueForm from "./VenueForm/VenueForm";
import RealWedding from "./RealWedding/RealWedding";
import ThemeForm from "./ThemeForm/ThemeForm";
import VenuesImages from "./VenueImages/VenuesImages";
import ButtonComponent from "@/components/core/Button/Button";
import { IImages, IThemes } from "@/app/types/api/request/venue.request";
import { toast } from "@/hooks/use-toast";
import NearestAirport from "./NearestAirport/NearestAirport";

const AddVenueForm = () => {

    const [venueData, setVenueData] = useState<any>()
    const [nearestAirport, setNearestAirport] = useState<any>()
    // const [realWeddings, setRealWeddings] = useState<IRealWeddings[]>([]);
    const [themeFormList, setThemeFormList] = useState<IThemes[]>([]);
    const [venueImagesList, setVenueImages] = useState<IImages[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const back = () => {
        router.push('/venue')
    }

    const onSaveChanges = async () => {
        try {
            setLoading(true);

            const req = {
                ...venueData,
                theme_options_heading: venueData?.theme_options_heading,
                theme_options_subheading: venueData?.theme_options_subheading,
                theme_options: themeFormList,
                gallery: venueImagesList,
                location: venueData?.location,
                experience: venueData?.experience,
                venue: venueData?.venue
            }

            console.log(req, 'req');

            return;

            const res: any = await VenueService.addVenue(req);

            if (res?.status == 200) {
                toast({
                    title: "Venue Added Successfully",
                    description: res.message
                })
                back();
            }
        } catch (error: any) {
            toast({
                title: "Venue Added Failed",
                description: error.message
            })
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col rounded-lg bg-gray-50 p-2">
            <div className="w-full">
                <ContentHeader title="Add Venue" icon={<MapPinHouse />} buttonLabel="Back" buttonIcon={<ArrowLeft />} onBtnClick={() => back()} />
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
            <div className="flex justify-center items-center mt-5">
                <ButtonComponent label="Save Changes" onClick={() => onSaveChanges()} loading={loading} type="button" customClass="bg-purple-700 hover:bg-purple-800" />
            </div>
        </div>
    )
}

export default AddVenueForm;
