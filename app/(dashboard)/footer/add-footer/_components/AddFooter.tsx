"use client";

import ContentHeader from "@/components/ContentHeader/ContentHeader";
import ButtonComponent from "@/components/core/Button/Button";
import { toast } from "@/hooks/use-toast";
import { FooterService } from "@/services/footer.service";
import { ArrowLeft, GemIcon, MapPinHouse } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SocialLinks from "./SocialLinks/SocialLinks";
import { ISocialLinksData } from "@/app/types/components/Foooter";
import ContactUs from "./ContactUs/ContactUs";
import PopularLinks from "./PopularLinks/PopularLinks";
const AddFooter = () => {
  
  const [loading, setLoading] = useState<boolean>(false);
  const [socialLinks, setSocialLinks] = useState<ISocialLinksData>({
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    youtube: "",
    logo: "",
  });

  const router = useRouter();

  const back = () => {
    router.push("/footer");
  };

  const onSaveChanges = async () => {
    try {
      setLoading(true);
      const req: any = {
        
      };
      const res: any = await FooterService.addFooter(req);
      if (res?.status == 200 || res?.status == 201) {
        toast({
          title: "Footer Added Successfully",
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

  return (
    <div className="flex flex-col rounded-lg bg-gray-50 p-2">
      <div className="w-full">
        <ContentHeader
          title="Add Footer"
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
        <ContactUs />
      </div>

      <div className="flex flex-row mt-5">
        <PopularLinks />
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
  );
};

export default AddFooter;
