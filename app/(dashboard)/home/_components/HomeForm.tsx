"use client"

import ContentHeader from "@/components/ContentHeader/ContentHeader";
import { LayoutDashboard } from "lucide-react";
import Brand from "./Brand/Brand";
import Hero from "./Hero/Hero";
import { HomeService } from "@/services/home.service";
import { useEffect, useState } from "react";
import { ILandingPage } from "@/app/types/api/response/home.response";
import Vision from "./Vision/Vision";
import Mission from "./Mission/Mission";
import Testimonial from "./Testimonial/Testimonial";
import Gallery from "./Gallery/Gallery";
import Meta from "./Meta/Meta";
import { IBrandData, IContactData, IEventData, IGalleryData, IGalleryList, IHeroData, ILandingVideoPageData, IMetaData, IMissionData, ITestimonialData, ITestimonialList, IVisionData } from "@/app/types/components/Home";
import LandingVideoPage from "./LandingVideoPage/LandingVideoPage";
import { Separator } from "@/components/ui/separator";
import Event from "./Event/Event";
import ButtonComponent from "@/components/core/Button/Button";
import Contact from "./Contact/Contact";

const HomeForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [homePageData, setHomePageData] = useState<ILandingPage | null>(null);
    const [brandData, setBrandData] = useState<IBrandData>({
        alt_brand_logo: "",
        brand_logo: "",
        brand_name: ""
    });
    const [heroData, setHeroData] = useState<IHeroData>({
        background_image: "",
        heading: "",
        heading_image: "",
        alt_heading_image: "",
        story: "",
        story_heading: "",
        sub_heading: ""
    });
    const [visionData, setVisionData] = useState<IVisionData>({
        vision: "",
        vision_heading: ""
    });
    const [missionData, setMissionData] = useState<IMissionData>({
        mission: "",
        mission_heading: ""
    });
    const [testimonialData, setTestimonianlData] = useState<ITestimonialData>({
        testimonial_section: ""
    });
    const [testimonialList, setTestimonialList] = useState<ITestimonialList[]>([]);
    const [galleryData, setGalleryData] = useState<IGalleryData>({
        gallery_heading: "",
        gallery_section: ""
    });
    const [galleryList, setGalleryList] = useState<IGalleryList[]>([])

    const [metaData, setMetaData] = useState<IMetaData>({
        meta_description: "",
        meta_image: "",
        meta_title: ""
    });
    const [landingVideoPageData, setLandingVideoPageData] = useState<ILandingVideoPageData>({
        heading: "",
        sub_heading: "",
        image: "",
        alt: "",
        video: "",
        _id: "",
        video_landing: ""
    });
    const [eventData, setEventData] = useState<IEventData[]>([]);
    const [contactData, setContactData] = useState<IContactData>({
        _id: "",
        button: "",
        email: "",
        heading: "",
        phone: "",
        sub_heading: ""
    })

    const getHomepage = async () => {
        try {
            const res: any = await HomeService.getLandingPage();
            console.log(res.data);
            if(res && res.status == 200 && res.data) {
                const {
                    brand_name, brand_logo, alt_brand_logo, heading, heading_image,
                    alt_heading_image, background_image, story, story_heading,
                    sub_heading, vision, vision_heading, mission, mission_heading,
                    testimonial_section, gallery_heading, gallery_section,
                    meta_description, meta_image, meta_title, landing_video,
                    card_events, the_gallery, the_testimonial, contact_us
                } = res.data;

                const { alt, image, video, video_landing, _id } = landing_video[0];

                setHomePageData(res.data);
                setBrandData({
                    brand_name,
                    brand_logo,
                    alt_brand_logo
                });
                setHeroData({
                    background_image,
                    heading,
                    heading_image,
                    alt_heading_image,
                    story,
                    story_heading,
                    sub_heading
                })
                setVisionData({
                    vision,
                    vision_heading 
                })
                setMissionData({
                    mission,
                    mission_heading 
                })
                setTestimonianlData({
                    testimonial_section 
                })
                setGalleryData({
                    gallery_heading,
                    gallery_section
                })
                setMetaData({
                    meta_description,
                    meta_image,
                    meta_title
                })
                setLandingVideoPageData({
                    heading: landing_video[0].heading,
                    sub_heading: landing_video[0].sub_heading,
                    image,
                    alt,
                    video,
                    _id,
                    video_landing 
                })
                setEventData(card_events)
                setGalleryList(the_gallery)
                setTestimonialList(the_testimonial)
                setContactData(contact_us)
            }
        } catch (error) {
            
        }
    }

    const onSaveChanges = () => {}

    useEffect(() => {
        getHomepage()
    }, [])

    return (
        <div className="flex flex-col rounded-lg bg-gray-50 p-2">
            <div className="w-full">
                <ContentHeader title="Add/Update Home Page" icon={<LayoutDashboard />} />
            </div>
            <div className="flex flex-row mt-5">
                <Brand brandData={brandData} setBrandData={setBrandData}  />
            </div>
            <div className="flex flex-row mt-5">
                <Hero heroData={heroData} setHeroData={setHeroData} />
            </div>
            <div className="flex flex-row mt-5">
                <Vision visionData={visionData} setVisionData={setVisionData} />
            </div>
            <div className="flex flex-row mt-5">
                <Mission missionData={missionData} setMissionData={setMissionData} />
            </div>
            <div className="flex flex-row mt-5">
                <Testimonial setTestimonialData={setTestimonianlData} testimonialData={testimonialData} testimonialList={testimonialList} setTestimonialList={setTestimonialList} />
            </div>
            <div className="flex flex-row mt-5">
                <Gallery galleryData={galleryData} setGalleryData={setGalleryData} galleryList={galleryList} setGalleryList={setGalleryList} />
            </div>
            <div className="flex flex-row mt-5">
                <Meta metaData={metaData} setMetaData={setMetaData} />
            </div>
            <Separator className="mt-5" />
            <div className="flex flex-row mt-5">
                <LandingVideoPage landingVideoPageData={landingVideoPageData} setLandingVideoPageData={setLandingVideoPageData} />
            </div>
            <div className="flex flex-row mt-5">
                <Event eventData={eventData} setEventData={setEventData} />
            </div>
            <div className="flex flex-row mt-5">
                <Contact contactData={contactData} setContactData={setContactData} />
            </div>
            <div className="flex justify-center items-center mt-5">
                <ButtonComponent label="Save Changes" onClick={() => onSaveChanges()} loading={loading} type="button" customClass="bg-purple-700 hover:bg-purple-800" />
            </div>
        </div>
    )
}

export default HomeForm;