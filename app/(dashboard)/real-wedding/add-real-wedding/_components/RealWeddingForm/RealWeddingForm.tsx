"use client";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ExperienceService } from "@/services/experience.service";
import { LocationService } from "@/services/location.service";
import { VenueService } from "@/services/venue.service";
import { Gem, Tag } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

const RealWeddingForm = ({ realWeddingData, setRealWeddingData }: any) => {
  const [experienceList, setExperienceList] = useState<any[]>([]);
  const [stateList, setStateList] = useState<any[]>([]);
  const [locationList, setLocationList] = useState<any[]>([]);
  const [venueList, setVenueList] = useState<any[]>([]);

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
  
    if (name === "venue") {
      const selectedVenue = venueList.find((v) => v._id === value);
      console.log(selectedVenue);
      if (selectedVenue) {
        // Fetch location list based on selected venue's state
        await getLocationList(selectedVenue?.state?._id);
  
        setRealWeddingData((prev: any) => ({
          ...prev,
          venue: selectedVenue._id,
          venue_name: selectedVenue.venue_name || null,
          state: selectedVenue.state.name || null,
          location: selectedVenue.location.name || null,
          experience: selectedVenue.experience.name|| null,
          state_id: selectedVenue.state._id || null,
          location_id: selectedVenue.location._id || null,
          experience_id: selectedVenue.experience._id|| null
        }));
      }
    } else if (name === "state") {
      const selectedState = stateList.find((loc) => loc._id === value);
      setRealWeddingData((prev: any) => ({
        ...prev,
        state: selectedState || null,
      }));
      getLocationList(selectedState?._id);
    } else if (name === "venue_name") {
      setRealWeddingData((prev: any) => ({
        ...prev,
        venue_name: value,
      }));
    } else if (name === "experience") {
      const selectedExperience = experienceList.find((exp) => exp._id === value);
      setRealWeddingData((prev: any) => ({
        ...prev,
        experience: selectedExperience || null,
      }));
    } else if (name === "location") {
      const selectedLocation = locationList.find((loc) => loc._id === value);
      setRealWeddingData((prev: any) => ({
        ...prev,
        location: selectedLocation || null,
      }));
    } else {
      setRealWeddingData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const getVenueList = async () => {
    try {
      const res: any = await VenueService.getVenues();
      if (res && res.status == 200 && res.data.data.length) {
        setVenueList(res.data.data);
      }
    } catch (error) {}
  }

  const getExperienceList = async () => {
    try {
      const res: any = await ExperienceService.getExperienceList();
      if (res && res.status == 200 && res.data.data.length) {
        setExperienceList(res.data.data);
      }
    } catch (error) {}
  };

  const getStateList = async () => {
    try {
      const res: any = await LocationService.getStateList();
      if (res && res.status == 200 && res.data.data.length) {
        setStateList(res.data.data);
      }
    } catch (error) {}
  };

  const getLocationList = async (id: string) => {
    try {
      const res: any = await LocationService.getLocationList(id);
    
      if (res && res.status == 200 && res?.data?.data?.length) {
        setLocationList(res.data.data);
      } else {
        setLocationList([]);
      }
    } catch (error) {}
  };

  // useEffect(() => {
  //   if (!!realWeddingData) getLocationList(realWeddingData?.state?._id);
  // }, [realWeddingData]);

  useEffect(() => {
    getExperienceList();
    getStateList();
    getVenueList();
    
  }, []);

  // useEffect(()=>{
  //   if(realWeddingData?.location){
  //     setLocationList(realWeddingData.location);
  //   }
  // })

  return (
    <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white mt-4">
      <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3">
        <Gem /> Real Wedding Section
      </h2>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 p-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Venue
          </label>
          {/* <Input
            type="text"
            placeholder="Enter Venue Name"
            name="venue_name"
            onChange={handleChange}
            value={realWeddingData?.venue_name || ""}
            className="mt-1 w-full"
          /> */}
          <select
            className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            name="venue"
            onChange={handleChange}
            value={realWeddingData?.venue || ""}
          >
            <option value="">Select Venue</option>
            {venueList.length
              ? venueList.map((loc, index) => (
                  <option key={index} value={loc._id}>
                    {" "}
                    {loc.venue_name}{" "}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            State
          </label>

          <Input
            type="text"
            placeholder="Enter State"
            name="state"
            onChange={handleChange}
            value={realWeddingData?.state || ""}
            className="mt-1 w-full"
            readOnly
          />
          {/* <select
            className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            name="state"
            onChange={handleChange}
            value={realWeddingData?.state || ""}
          >
            <option value="">Select State</option>
            {stateList.length
              ? stateList.map((loc, index) => (
                  <option key={index} value={loc._id}>
                    {" "}
                    {loc.name}{" "}
                  </option>
                ))
              : null}
          </select> */}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <Input
            type="text"
            placeholder="Enter location"
            name="location"
            onChange={handleChange}
            value={realWeddingData?.location || ""}
            className="mt-1 w-full"
            readOnly
          />
          {/* <select
            className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            name="location"
            onChange={handleChange}
            value={realWeddingData?.location || ""}
          >
            <option value="">Select Location</option>
            {locationList.length
              ? locationList.map((loc, index) => (
                  <option key={index} value={loc._id}>
                    {" "}
                    {loc.name}{" "}
                  </option>
                ))
              : null}
          </select> */}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Experience
          </label>
          <Input
            type="text"
            placeholder="Enter Experience"
            name="experience"
            onChange={handleChange}
            value={realWeddingData?.experience || ""}
            className="mt-1 w-full"
            readOnly
          />
          
          {/* <select
            className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            name="experience"
            onChange={handleChange}
            value={realWeddingData?.experience || ""}
          >
            <option value="">Select Experience</option>
            {experienceList.length
              ? experienceList.map((exp, index) => (
                  <option key={index} value={exp._id}>
                    {" "}
                    {exp.name}{" "}
                  </option>
                ))
              : null}
          </select> */}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Design Style
          </label>
          <Input
            type="text"
            placeholder="Enter Design Style"
            name="design_style"
            onChange={handleChange}
            value={realWeddingData?.design_style || ""}
            className="mt-1 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Photographer
          </label>
          <Input
            type="text"
            placeholder="Enter Photographer"
            name="photographer"
            onChange={handleChange}
            value={realWeddingData?.photographer || ""}
            className="mt-1 w-full"
          />
        </div>
      </div>
      <Separator className="mt-4" />
      <div>
        <h2 className="flex flex-row gap-2 p-2 items-center text-lg font-medium">
          Wedding Theme Section
        </h2>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 p-2">
        <div>
            <label className="block text-sm font-medium text-gray-700">
              Wedding Theme
            </label>
            <Input
              type="text"
              placeholder="Enter Wedding Theme"
              name="wedding_theme"
              onChange={handleChange}
              value={realWeddingData?.wedding_theme || ""}
              className="mt-1 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Wedding Theme Name
            </label>
            <Input
              type="text"
              placeholder="Enter Wedding Theme Name"
              name="wedding_theme_name"
              onChange={handleChange}
              value={realWeddingData?.wedding_theme_name || ""}
              className="mt-1 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Wedding Description
            </label>
            <Input
              type="text"
              placeholder="Enter Wedding Description"
              name="wedding_description"
              onChange={handleChange}
              value={realWeddingData?.wedding_description || ""}
              className="mt-1 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealWeddingForm;
