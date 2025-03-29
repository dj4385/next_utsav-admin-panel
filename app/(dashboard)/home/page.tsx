"use client"

import ContentHeader from "@/components/ContentHeader/ContentHeader";
import { LayoutDashboard } from "lucide-react";
import Brand from "./_components/Brand/Brand";
import Hero from "./_components/Hero/Hero";
import { HomeService } from "@/services/home.service";
import { useEffect, useState } from "react";
import { ILandingPage } from "@/app/types/api/response/home.response";
import Vision from "./_components/Vision/Vision";
import Mission from "./_components/Mission/Mission";
import Testimonial from "./_components/Testimonial/Testimonial";
import Gallery from "./_components/Gallery/Gallery";
import Meta from "./_components/Meta/Meta";
import { IBrandData, IEventData, IGalleryData, IHeroData, ILandingVideoPageData, IMetaData, IMissionData, ITestimonialData, IVisionData } from "@/app/types/components/Home";
import LandingVideoPage from "./_components/LandingVideoPage/LandingVideoPage";
import { Separator } from "@/components/ui/separator";
import Event from "./_components/Event/Event";

const HomePage = () => {

    const [homePageData, setHomePageData] = useState<ILandingPage | null>(null);
    const [brandData, setBrandData] = useState<IBrandData>({
        brandAlt: "",
        brandLogo: "",
        brandName: ""
    });
    const [heroData, setHeroData] = useState<IHeroData>({
        backgroundImg: "",
        heading: "",
        headingImg: "",
        headingImgAlt: "",
        story: "",
        storyHeading: "",
        subHeading: ""
    });
    const [visionData, setVisionData] = useState<IVisionData>({
        vision: "",
        visionHeading: ""
    });
    const [missionData, setMissionData] = useState<IMissionData>({
        mission: "",
        missionHeading: ""
    });
    const [testimonialData, setTestimonianlData] = useState<ITestimonialData>({
        testimonial: ""
    });
    const [galleryData, setGalleryData] = useState<IGalleryData>({
        galleryHeading: "",
        gallerySection: ""
    });
    const [metaData, setMetaData] = useState<IMetaData>({
        metaDescription: "",
        metaImageUrl: "",
        metaTitle: ""
    });
    const [landingVideoPageData, setLandingVideoPageData] = useState<ILandingVideoPageData>({
        heading: "",
        subHeading: "",
        image: "",
        alt: "",
        video: "",
        _id: "",
        videoHeading: ""
    });
    const [eventData, setEventData] = useState<IEventData[]>([])

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
                    card_events
                } = res.data;

                const { alt, image, video, video_landing, _id } = landing_video[0];

                setHomePageData(res.data);
                setBrandData({
                    brandName: brand_name,
                    brandLogo: brand_logo,
                    brandAlt: alt_brand_logo
                });
                setHeroData({
                    backgroundImg: background_image,
                    heading,
                    headingImg: heading_image,
                    headingImgAlt: alt_heading_image,
                    story,
                    storyHeading: story_heading,
                    subHeading: sub_heading
                })
                setVisionData({
                    vision,
                    visionHeading: vision_heading
                })
                setMissionData({
                    mission,
                    missionHeading: mission_heading
                })
                setTestimonianlData({
                    testimonial: testimonial_section
                })
                setGalleryData({
                    galleryHeading: gallery_heading,
                    gallerySection: gallery_section
                })
                setMetaData({
                    metaDescription: meta_description,
                    metaImageUrl: meta_image,
                    metaTitle: meta_title
                })
                setLandingVideoPageData({
                    heading: landing_video[0].heading,
                    subHeading: landing_video[0].sub_heading,
                    image,
                    alt,
                    video,
                    _id,
                    videoHeading: video_landing
                })
                setEventData(card_events)

            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getHomepage()
    }, [])

    useEffect(() => {
        console.log(brandData);
    }, [brandData])

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
                <Testimonial setTestimonialData={setTestimonianlData} testimonialData={testimonialData} />
            </div>
            <div className="flex flex-row mt-5">
                <Gallery galleryData={galleryData} setGalleryData={setGalleryData} />
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
            
        </div>
    )
}

export default HomePage;