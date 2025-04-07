"use client";

import {
  IAddVenueRequest,
  IHeaderImages,
  IImages,
  IThemes,
} from "@/app/types/api/request/venue.request";
import ContentHeader from "@/components/ContentHeader/ContentHeader";
import ButtonComponent from "@/components/core/Button/Button";
import { toast } from "@/hooks/use-toast";
import { VenueService } from "@/services/venue.service";
import { ArrowLeft, MapPinHouse } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HeaderImage from "./HeaderImage/HeaderImage";
import NearestAirport from "./NearestAirport/NearestAirport";
import ThemeForm from "./ThemeForm/ThemeForm";
import VenueForm from "./VenueForm/VenueForm";
import VenuesImages from "./VenueImages/VenuesImages";
import Meta from "./Meta/Meta";
import { IMetaData } from "@/app/types/components/Home";
const AddVenueForm = () => {
  const [venueData, setVenueData] = useState<any>();
  const [nearestAirport, setNearestAirport] = useState<any>();
  // const [realWeddings, setRealWeddings] = useState<IRealWeddings[]>([]);
  const [themeFormList, setThemeFormList] = useState<IThemes[]>([]);
  const [venueImagesList, setVenueImages] = useState<IImages[]>([]);
  const [headerImageList, setHeaderImageList] = useState<IHeaderImages[]>([]);
  const [headerImageGalleryList, setHeaderImageGalleryList] = useState<
    IHeaderImages[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [metaData, setMetaData] = useState<IMetaData>({
    meta_description: "",
    meta_image: "",
    meta_title: "",
  });
  const router = useRouter();

  const back = () => {
    router.push("/venue");
  };

  const onSaveChanges = async () => {
    try {
      setLoading(true);
      const req: IAddVenueRequest = {
        venue_name: venueData?.venue_name,
        meta_title: metaData?.meta_title,
        meta_description: metaData?.meta_description,
        meta_image: metaData?.meta_image,
        venue: {
          property_type: venueData?.property_type,
          capacity: +venueData?.capacity,
          nearest_airport: {
            name: nearestAirport?.name,
            distance_km: +nearestAirport?.distance_km,
          },
          outdoor_catering_policy: venueData?.outdoor_catering_policy,
          air_quality_index: +venueData?.air_quality_index,
          google_rating: +venueData?.google_rating,
          google_rating_review: +venueData?.google_rating_review,
          description: venueData?.description,
          map_link: venueData?.map_link,
        },
        theme_options_heading: venueData?.theme_options_heading,
        theme_options_subheading: venueData?.theme_options_subheading,
        theme_options: themeFormList,
        gallery: venueImagesList,
        location: venueData?.location?._id,
        state: venueData?.state?._id,
        experience: venueData?.experience?._id,
        header_image_gallery: headerImageList,
      };
      const res: any = await VenueService.addVenue(req);
      if (res?.status == 200 || res?.status == 201) {
        toast({
          title: "Venue Added Successfully",
          description: res.message,
        });
        back();
      } else {
        toast({
          title: "Venue Added Failed",
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
          title="Add Venue"
          icon={<MapPinHouse />}
          buttonLabel="Back"
          buttonIcon={<ArrowLeft />}
          onBtnClick={() => back()}
        />
      </div>
      <div className="flex flex-row mt-5">
        <VenueForm venueData={venueData} setVenueData={setVenueData} />
      </div>
      <div className="flex flex-row mt-5">
        <Meta metaData={metaData} setMetaData={setMetaData}></Meta>
      </div>

      <div className="flex flex-row mt-5">
        <NearestAirport
          nearestAirport={nearestAirport}
          setNearestAirport={setNearestAirport}
        />
      </div>
      {/* <div className="flex flex-row mt-5">
                <RealWedding realWeddings={realWeddings} setRealWeddings={setRealWeddings} />
            </div> */}
      <div className="flex flex-row mt-5">
        <ThemeForm
          setThemeFormList={setThemeFormList}
          themeFormList={themeFormList}
        />
      </div>
      <div className="flex flex-row mt-5">
        <VenuesImages
          setVenueImages={setVenueImages}
          venueImagesList={venueImagesList}
        />
      </div>
      <div className="flex flex-row mt-5">
        <HeaderImage
          setHeaderImageList={setHeaderImageList}
          headerImageList={headerImageList}
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

export default AddVenueForm;
