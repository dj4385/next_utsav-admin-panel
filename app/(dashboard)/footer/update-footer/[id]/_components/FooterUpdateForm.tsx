'use client'

import { IContactUsData, IPopularLinksData } from "@/app/types/components/Foooter";
import { ISocialLinksData } from "@/app/types/components/Foooter";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { FooterService } from "@/services/footer.service";
import { GemIcon } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import ContentHeader from "@/components/ContentHeader/ContentHeader";
import SocialLinks from "../../../add-footer/_components/SocialLinks/SocialLinks";
import ContactUsCard from "../../../add-footer/_components/ContactUsCard/ContactUs";
import ButtonComponent from "@/components/core/Button/Button";
import PopularLinks from "../../../add-footer/_components/PopularLinks/PopularLinks";



const FooterUpdateForm = ({ id }: { id: string }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [socialLinks, setSocialLinks] = useState<ISocialLinksData>({
        facebook: "",
        instagram: "",
        twitter: "",
        linkedin: "",
        youtube: "",
        logo: "",
    });
    const [contactUs, setContactUs] = useState<IContactUsData[]>([]);
    const [popularLinks, setPopularLinks] = useState<IPopularLinksData[]>([]);


    const router = useRouter();

    const back = () => {
        router.push("/footer");
    };

    const getFooterDetail = async () => {
        try {
            const res: any = await FooterService.getFooterDetail(id);
            debugger
            if (res?.status == 200 || res?.status == 201) {
                setSocialLinks({
                    ...res.data.data.socialLinks,
                    logo: res.data.data.logo
                });
                setContactUs(res.data.data.contactUs);
                setPopularLinks(res.data.data.popularLinks);    
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onSaveChanges = async () => {
        try {

        if (!socialLinks.logo) {
            toast({
            title: "Error",
            description: "Please upload logo",
            variant: "destructive",
            });
            return;
        }

        if (!socialLinks.facebook || !socialLinks.instagram || !socialLinks.twitter || !socialLinks.linkedin || !socialLinks.youtube) {
            toast({
            title: "Error", 
            description: "Please fill all social links",
            variant: "destructive",
            });
            return;
        }

        if (!socialLinks.facebook.startsWith('https://') || 
            !socialLinks.instagram.startsWith('https://') || 
            !socialLinks.twitter.startsWith('https://') || 
            !socialLinks.linkedin.startsWith('https://') || 
            !socialLinks.youtube.startsWith('https://')) {
            toast({
            title: "Error",
            description: "All social links must start with https://",
            variant: "destructive", 
            });
            return;
        }

        if (contactUs.length === 0) {
            toast({
            title: "Error",
            description: "Please add at least one contact us card",
            variant: "destructive",
            }); 
            return;
        }

        if (popularLinks.length === 0) {
            toast({
            title: "Error", 
            description: "Please add at least one popular link",
            variant: "destructive",
            });
            return;
        }
        
        setLoading(true);
        const req: any = {
            logo: socialLinks.logo,
            socialLinks: {
            facebook: socialLinks.facebook,
            instagram: socialLinks.instagram,
            twitter: socialLinks.twitter,
            linkedin: socialLinks.linkedin,
            youtube: socialLinks.youtube,
            },
            contactUs: contactUs,
            popularLinks: popularLinks,
        };
        const res: any = await FooterService.updateFooter(id, req);
        if (res?.status == 200 || res?.status == 201) {
            toast({
                title: "Footer Updated Successfully",
                description: res.message,
            });
            back();
        } else {
            toast({
            title: "Footer Added Failed",
            description: res?.response?.data?.error,
            variant: "destructive",
            });
        }
        } catch (error: any) {
        toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
        });
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            getFooterDetail();
        }
    }, [id]);

    return (
        <div className="flex flex-col rounded-lg bg-gray-50 p-2">
      <div className="w-full">
        <ContentHeader
          title="Update Footer"
          icon={<GemIcon />}
          buttonLabel="Back"
          buttonIcon={<ArrowLeft />}
          onBtnClick={() => back()}
        />
      </div>
      <div className="flex flex-row mt-5">
        <SocialLinks socialLinks={socialLinks} setSocialLinks={setSocialLinks} />
      </div>
      <div className="flex flex-row mt-5">
        <ContactUsCard contactUs={contactUs} setContactUs={setContactUs} />
      </div>

      <div className="flex flex-row mt-5">
        <PopularLinks popularLinks={popularLinks} setPopularLinks={setPopularLinks} />
      </div>
      <div className="flex justify-center items-center mt-5">
        <ButtonComponent
          label="Save Changes"
          onClick={() => onSaveChanges()}
          loading={loading}
          type="button"
          customClass="bg-purple-700 hover:bg-purple-800"
        />
      </div>
    </div>
    )
}   

export default FooterUpdateForm;
