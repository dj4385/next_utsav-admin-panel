"use client"

import ContentHeader from "@/components/ContentHeader/ContentHeader";
import { LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ContactService } from "@/services/contact.service";
import { IContactResponse } from "@/app/types/api/response/contact.response";
import Meta from "./Meta/Meta";
import { IMetaData } from "@/app/types/components/Home";
import ButtonComponent from "@/components/core/Button/Button";

const ContactForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [contactPageData, setContactPageData] = useState<IContactResponse | null>(null);
    const [metaData, setMetaData] = useState<IMetaData>({
        meta_description: "",
        meta_image: "",
        meta_title: ""
    })
    
    const { toast } = useToast();

    const getContactPage = async () => {
        try {
            const res: any = await ContactService.getContactPageDetail();
            console.log(res.data);
            if(res && res.status == 200 && res.data && res.data.data.length) {

                const {
                    meta_title, meta_description, meta_image
                } = res.data.data[0];

                setContactPageData(res.data.data[0]);
                setMetaData({
                    meta_title, meta_description, meta_image
                })
            }
        } catch (error) {
            
        }
    }

    const onSaveChanges = async () => {
        setLoading(true);
        let id = '';

        if(contactPageData) {
            id = contactPageData._id
        }

        // const req: IAddLandingPageRequest = {
        //     "_id": id,
        //     ...brandData,
        //     ...heroData,
        //     ...visionData,
        //     ...missionData,
        //     ...testimonialData,
        //     ...galleryData,
        //     ...metaData,
        //     card_events: eventData,
        //     landing_video: [landingVideoPageData],
        //     contact_us: contactData,
        //     the_gallery: galleryList,
        //     the_testimonial: testimonialList
        // }

        // const res: any = await HomeService.updateLandingPage(id, req);
        // console.log(res);
        // if(res && res.status == 200) {
        //     toast({
        //         title: "Success",
        //         description: res?.data?.message || "Home page data updated successfully",
        //     })
        // }

        // setLoading(false);
    }

    useEffect(() => {
        getContactPage();
    }, [])

    return (
        <div className="flex flex-col rounded-lg bg-gray-50 p-2">
            <div className="w-full">
                <ContentHeader title="Add/Update Home Page" icon={<LayoutDashboard />} />
            </div>
            <div className="flex flex-row mt-5">
            </div>
            <div className="flex flex-row mt-5">
            </div>
            <div className="flex flex-row mt-5">
            </div>
            <div className="flex flex-row mt-5">
            </div>
            <div className="flex flex-row mt-5">
            </div>
            <div className="flex flex-row mt-5">
            </div>
            <div className="flex flex-row mt-5">
                <Meta metaData={metaData} setMetaData={setMetaData} />
            </div>
            <Separator className="mt-5" />
            <div className="flex flex-row mt-5">
            </div>
            <div className="flex flex-row mt-5">
            </div>
            <div className="flex flex-row mt-5">
            </div>
            <div className="flex justify-center items-center mt-5">
                <ButtonComponent label="Save Changes" onClick={() => onSaveChanges()} loading={loading} type="button" customClass="bg-purple-700 hover:bg-purple-800" />
            </div>
        </div>
    )
}

export default ContactForm;