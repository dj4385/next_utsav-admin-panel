"use client";

import {
  IThemes,
  IHeaderImages,
  IAddVenueRequest,
} from "@/app/types/api/request/venue.request";
import ContentHeader from "@/components/ContentHeader/ContentHeader";
import { ArrowLeft, MapPinHouse } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IImages } from "@/app/types/api/request/venue.request";
import ButtonComponent from "@/components/core/Button/Button";
import { toast } from "@/hooks/use-toast";
import Meta from "@/app/(dashboard)/about/_components/Meta/Meta";
import { IMetaData } from "@/app/types/components/Home";
import { RealWeddingService } from "@/services/real-wedding.service";
import RealWeddingForm from "../../../add-real-wedding/_components/RealWeddingForm/RealWeddingForm";
import RealWeddingImages from "../../../add-real-wedding/_components/RealWeddingImages/RealWeddingImages";
import RealWeddingHeaderImage from "../../../add-real-wedding/_components/RealWeddingHeaderImage/RealWeddingHeaderImage";

const UpdateRealWeddingForm = ({ id }: { id: string }) => {
  const [realWeddingApiResponse, setRealWeddingApiResponse] = useState<any>();
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

  const getRealWeddingDetail = async () => {
    try {
      const res: any = await RealWeddingService.getRealWeddingDetail(id);
      if (res && res.status == 200) { 
        console.log(res.data?.data?.venue.state,"state");  
        setRealWeddingApiResponse(res.data.data);

        const metaData = {
          meta_title: res?.data?.data?.meta_title,
          meta_description: res?.data?.data?.meta_description,
          meta_image: res?.data?.data?.meta_image,
        };
        setMetaData(metaData);

        // ✅ Properly set the realWeddingData
        setRealWeddingData({
          venue: res.data?.data?.venue._id,
          venue_name: res.data?.data?.venue_name,
          state: res.data?.data?.venue?.state?.name,
          wedding_theme:res.data?.data?.wedding_theme,
          wedding_theme_name: res.data?.data?.wedding_theme_name,
          design_style: res.data?.data?.design_style,
          photographer: res.data?.data?.photographer,
          wedding_description: res.data?.data?.wedding_description,
          experience: res.data?.data?.venue?.experience?.name,
          location: res.data?.data?.venue?.location?.name,
        });

        setRealWeddingImages(res.data?.data?.gallery);
        setRealWeddingHeaderImageList(res.data?.data?.header_image_gallery);
      }
    } catch (error) {
      console.error("Error fetching Real Wedding detail:", error);
    }
  };

  const onSaveChanges = async () => {
    try {
      setLoading(true);
      const req: any = {
        ...metaData,
        venue: realWeddingData?.venue,
        venue_name: realWeddingData?.venue_name,
        state: realWeddingData?.state?._id,
        wedding_description: realWeddingData?.wedding_description,
        wedding_theme: realWeddingData?.wedding_theme,
        wedding_theme_name: realWeddingData?.wedding_theme_name,
        design_style: realWeddingData?.design_style,
        photographer: realWeddingData?.photographer,
        experience: realWeddingData?.experience?._id,
        location: realWeddingData?.location?._id,
        gallery: realWeddingImagesList,
        header_image_gallery: realWeddingHeaderImageList,
      };

      const res: any = await RealWeddingService.updateRealWedding(id, req);

      if (res?.status == 200 || res?.status == 201) {
        toast({
          title: "Real Wedding Updated Successfully",
          description: res.message,
        });
        back();
      } else {
        toast({
          title: "Real Wedding Update Failed",
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
      getRealWeddingDetail();
    }
  }, [id]);

  console.log(setRealWeddingData,realWeddingData);
  return (
    <div className="flex flex-col rounded-lg bg-gray-50 p-2">
      <div className="w-full">
        <ContentHeader
          title="Update RealWedding"
          icon={<MapPinHouse />}
          buttonLabel="Back"
          buttonIcon={<ArrowLeft />}
          onBtnClick={() => back()}
        />
      </div>

      <div className="flex flex-row mt-5">
        <RealWeddingForm
          realWeddingData={realWeddingData}
          setRealWeddingData={setRealWeddingData}
        />
      </div>

      <div className="flex flex-row mt-5">
        <Meta metaData={metaData} setMetaData={setMetaData} />
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
          onClick={onSaveChanges}
          loading={loading}
          type="button"
          customClass="bg-purple-700 hover:bg-purple-800"
        />
      </div>
    </div>
  );
};

export default UpdateRealWeddingForm;
