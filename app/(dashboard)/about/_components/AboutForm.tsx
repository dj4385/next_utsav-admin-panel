"use client"

import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import AboutPage from "../page";
import { AboutService } from "@/services/about.service";
import { IAddAboutPageResponse } from "@/app/types/api/response/about.response";
import { IMetaData } from "@/app/types/components/Home";
import { IAddAboutPageRequest } from "@/app/types/api/request/about.request";
import ContentHeader from "@/components/ContentHeader/ContentHeader";
import { User2 } from "lucide-react";
import Meta from "./Meta/Meta";
import { IBannerData, ILegacy, ILegacyData, IRealWeddingData } from "@/app/types/components/About";
import Banner from "./Banner/Banner";
import { Separator } from "@radix-ui/react-dropdown-menu";
import ButtonComponent from "@/components/core/Button/Button";
import RealWedding from "./RealWedding/ReadWedding";
import Legacy from "./Legacy/Legacy";
import Experience from "./Experience/Experience";
import Countries from "./Countries/Countries";
import Event from "../Event/Event";

const AboutForm = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [aboutPageData, setAboutPageData] = useState<IAddAboutPageResponse | null>(null);
    const [bannerData, setBannerData] = useState<IBannerData>({
        alt_banner: "",
        banner: "",
        banner_heading: "",
        banner_text: ""
    });
    const [realWeddingData, setRealWeddingData] = useState<IRealWeddingData>({
        alt_real_weddings_image: "",
        real_wedding_button: "",
        real_weddings_image: "",
        real_weddings_text: ""
    })
    const [metaData, setMetaData] = useState<IMetaData>({
        meta_description: "",
        meta_image: "",
        meta_title: ""
    });
    const [legacyData, setLegacyData] = useState<ILegacyData>({
        legacy_heading: "",
        legacy_section: ""
    })
    const [experienceData, setExperienceData] = useState({
        experience: "",
        experience_label: "",
        experience_icon: "",
        alt_experience_icon: "",
    })
    const [countriesData, setCountriesData] = useState({
        countries_served: "",
        countries_served_label: "",
        countries_served_icon: "",
        alt_countries_served_icon: "",
    })
    const [eventData, setEventData] = useState({
        events_count: "",
        events_count_label: "",
        events_count_icon: "",
        alt_events_count_icon: "",
    })

    const { toast } = useToast();

    const getAboutpage = async () => {
        try {
            const res: any = await AboutService.getAboutPage();
            console.log(res.data);
            if (res && res.status == 200 && res.data.data.length) {
                const {
                    banner, alt_banner, banner_heading, banner_text,
                    real_weddings_image, alt_real_weddings_image, real_weddings_text, real_wedding_button,
                    legacy_section, legacy_heading,
                    experience, experience_label, experience_icon, alt_experience_icon,
                    countries_served, countries_served_label, countries_served_icon, alt_countries_served_icon,
                    events_count, events_count_label, events_count_icon, alt_events_count_icon,
                    venues_count, venue_label, venues_count_icon, alt_venues_count_icon,
                    about_gallery,
                    celebration_heading, celebration_text, celebration_image, alt_celebration_image, celebration_pitch,
                    awards_section, about_awards,
                    team_section, managing_team,
                    pre_footer_image, pre_alt_footer_image, pre_footer_text,
                    meta_title, meta_description, meta_image
                } = res.data.data[0];

                setAboutPageData(res.data.data[0]);
                setBannerData({
                    alt_banner,
                    banner,
                    banner_heading,
                    banner_text
                })
                setRealWeddingData({
                    real_weddings_image, alt_real_weddings_image, real_weddings_text, real_wedding_button
                })
                setLegacyData({
                    legacy_section, legacy_heading,
                })
                setExperienceData({
                    experience, experience_label, experience_icon, alt_experience_icon
                })
                setCountriesData({
                    countries_served, countries_served_label, countries_served_icon, alt_countries_served_icon,
                })
                setEventData({
                    events_count, events_count_label, events_count_icon, alt_events_count_icon,
                })
                setMetaData({
                    meta_description,
                    meta_image,
                    meta_title
                })

            }
        } catch (error) {

        }
    }

    const onSaveChanges = async () => {
        setLoading(true);
        let id = '';

        if (aboutPageData) {
            id = aboutPageData._id
        }

        const req: IAddAboutPageRequest | any = {
            "_id": id,
            ...metaData,
        }

        const res: any = await AboutService.updateAboutPage(id, req);
        console.log(res);
        if (res && res.status == 200) {
            toast({
                title: "Success",
                description: res?.data?.message || "About page data updated successfully",
            })
        }

        setLoading(false);
    }

    useEffect(() => {
        getAboutpage()
    }, [])

    return (
        <div className="flex flex-col rounded-lg bg-gray-50 p-2">
            <div className="w-full">
                <ContentHeader title="Add/Update About Page" icon={<User2 />} />
            </div>
            <div className="flex flex-row mt-5">
                <Banner bannerData={bannerData} setBannerData={setBannerData} />
            </div>
            <div className="flex flex-row mt-5">
                <RealWedding readWeddingData={realWeddingData} setRealWeddingData={setRealWeddingData} />
            </div>
            <div className="flex flex-row mt-5">
                <Legacy legacyData={legacyData} setLegacyData={setLegacyData} />
            </div>
            <div className="flex flex-row mt-5">
                <Experience experienceData={experienceData} setExperienceData={setExperienceData} />
            </div>
            <div className="flex flex-row mt-5">
                <Countries countriesData={countriesData} setCountriesData={setCountriesData} />
            </div>
            <div className="flex flex-row mt-5">
                <Event eventData={eventData} setEventData={setEventData} />
            </div>
            <div className="flex flex-row mt-5">
                <Meta metaData={metaData} setMetaData={setMetaData} />
            </div>
            <Separator className="mt-5" />
            {/* <div className="flex flex-row mt-5">
                <LandingVideoPage landingVideoPageData={landingVideoPageData} setLandingVideoPageData={setLandingVideoPageData} />
            </div>
            <div className="flex flex-row mt-5">
                <Event eventData={eventData} setEventData={setEventData} />
            </div>
            <div className="flex flex-row mt-5">
                <Contact contactData={contactData} setContactData={setContactData} />
            </div> */}
            <div className="flex justify-center items-center mt-5">
                <ButtonComponent label="Save Changes" onClick={() => onSaveChanges()} loading={loading} type="button" customClass="bg-purple-700 hover:bg-purple-800" />
            </div>
        </div>
    )
}

export default AboutForm;