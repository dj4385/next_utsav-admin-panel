'use client';

import { IThemes } from "@/app/types/api/request/venue.request";
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

const UpdateVenueForm = ({ id }: { id: string }) => {
    const [venueApiResponse, setVenueApiResponse] = useState<any>();
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
                    theme_options_description: res.data.theme_options_description,
                });
                setThemeFormList(res.data.theme_options);
                setVenueImages(res.data.gallery);
                setNearestAirport(res.data.venue.nearest_airport);
            }
        } catch (error) {
            
        }
    }

    const onSaveChanges = () => {}

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
            <div className="flex justify-center items-center mt-5">
                <ButtonComponent label="Save Changes" onClick={() => onSaveChanges()} loading={loading} type="button" customClass="bg-purple-700 hover:bg-purple-800" />
            </div>
        </div>
    )
}   

export default UpdateVenueForm;
