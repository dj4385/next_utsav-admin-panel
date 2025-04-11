"use client";

import {
  IHeaderImages,
  IImages,
  IThemes,
} from "@/app/types/api/request/venue.request";
import ContentHeader from "@/components/ContentHeader/ContentHeader";
import ButtonComponent from "@/components/core/Button/Button";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, GemIcon, MapPinHouse } from "lucide-react";
import { useRouter } from "next/navigation";
import RealWeddingHeaderImage from "./RealWeddingHeaderImage/RealWeddingHeaderImage";
import Meta from "./Meta/Meta";
import { IMetaData } from "@/app/types/components/Home";
import { RealWeddingService } from "@/services/real-wedding.service";
import { useState } from "react";
import RealWeddingForm from "./RealWeddingForm/RealWeddingForm";
import RealWeddingImages from "./RealWeddingImages/RealWeddingImages";

const AddRealWeddingForm = () => {
  const [realWeddingData, setRealWeddingData] = useState<any>(); 
  const [realWeddingImagesList, setRealWeddingImages] = useState<IImages[]>([]);
  const [realWeddingHeaderImageList, setRealWeddingHeaderImageList] = useState<IHeaderImages[]>([]);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [metaData, setMetaData] = useState<IMetaData>({
    meta_description: "",
    meta_image: "",
    meta_title: "",
  });
  const router = useRouter();

  const back = () => {
    router.push("/real-wedding");
  };

  const onSaveChanges = async () => {
    try {
      setLoading(true);
      console.log(realWeddingData,"realWeddingData");
      const req: any = {
        ...metaData,
        venue: realWeddingData?.venue,
        venue_name: realWeddingData?.venue_name,
        state: realWeddingData?.state_id,
        wedding_description: realWeddingData?.wedding_description,
        wedding_theme: realWeddingData?.wedding_theme,
        wedding_theme_name: realWeddingData?.wedding_theme_name,
        design_style: realWeddingData?.design_style,
        photographer: realWeddingData?.photographer,
        experience: realWeddingData?.experience_id,
        location: realWeddingData?.location_id,
        gallery: realWeddingImagesList,
        header_image_gallery: realWeddingHeaderImageList
      };

      console.log(req);
      const res: any = await RealWeddingService.addRealWedding(req);
      if (res?.status == 200 || res?.status == 201) {
        toast({
          title: "Real Wedding Added Successfully",
          description: res.message,
        });
        back();
      } else {
        toast({
          title: "Real Wedding Added Failed",
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
          title="Add Real Wedding"
          icon={<GemIcon />}
          buttonLabel="Back"
          buttonIcon={<ArrowLeft />}
          onBtnClick={() => back()}
        />
      </div>
      <div className="flex flex-row mt-5">
        <RealWeddingForm realWeddingData={realWeddingData} setRealWeddingData={setRealWeddingData} />
      </div>
      <div className="flex flex-row mt-5">
        <Meta metaData={metaData} setMetaData={setMetaData}></Meta>
      </div>

      <div className="flex flex-row mt-5">
        <RealWeddingImages
          setRealWeddingImages={setRealWeddingImages}
          realWeddingImagesList={realWeddingImagesList}
        />
      </div>
      <div className="flex flex-row mt-5">
        <RealWeddingHeaderImage
          setHeaderImageList={setRealWeddingHeaderImageList}
          headerImageList={realWeddingHeaderImageList}
        />
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

export default AddRealWeddingForm;
