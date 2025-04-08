"use client";

import { IMetaData } from "@/app/types/components/Home";
import { ISocialLinks, ISocialLinksData } from "@/app/types/components/Foooter";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";
import { Search } from "lucide-react";

const SocialLinks = ({ socialLinks, setSocialLinks }: ISocialLinks) => {

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setSocialLinks((prev: ISocialLinksData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFileUpload = (url: string) => {
    setSocialLinks((prev: ISocialLinksData) => ({
      ...prev,
      logo: url,
    }));
  };

  return (
    <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
      <h2 className="flex flex-row gap-2 items-center p-2 bg-purple-700 text-white text-lg font-medium mb-3">
        <Search /> Social Links Section
      </h2>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Facebook
          </label>
          <Input
            type="text"
            placeholder="Enter Facebook"
            className="mt-1 w-full"
            onChange={handleChange}
            name="facebook"
            value={socialLinks.facebook}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Instagram
          </label>
          <Input
            type="text"
            placeholder="Enter Instagram"
            className="mt-1 w-full"
            onChange={handleChange}
            name="instagram"
            value={socialLinks.instagram}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Twitter
          </label>
          <Input
            type="text"
            placeholder="Enter Twitter"
            className="mt-1 w-full"
            onChange={handleChange}
            name="twitter"
            value={socialLinks.twitter}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            LinkedIn
          </label>
          <Input
            type="text"
            placeholder="Enter LinkedIn"
            className="mt-1 w-full"
            onChange={handleChange}
            name="linkedin"
            value={socialLinks.linkedin}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Youtube
          </label>
          <Input
            type="text"
            placeholder="Enter Youtube"
            className="mt-1 w-full"
            onChange={handleChange}
            name="youtube"
            value={socialLinks.youtube}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Logo
          </label>
          <FileUploader
            url={socialLinks.logo || ""}
            urlType="image"
            onFileUpload={(url: string) => onFileUpload(url)}
          />
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
