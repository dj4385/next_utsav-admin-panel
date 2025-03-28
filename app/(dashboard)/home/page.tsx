"use client"

import ContentHeader from "@/components/ContentHeader/ContentHeader";
import { LayoutDashboard } from "lucide-react";
import Brand from "./_components/Brand/Brand";
import Hero from "./_components/Hero/Hero";
import { HomeService } from "@/services/home.service";
import { useEffect, useState } from "react";
import { ILandingPage } from "@/app/types/api/response/home.response";

const HomePage = () => {

    const [homePageData, setHomePageData] = useState<ILandingPage | null>(null);
    const [brandData, setBrandData] = useState<any>()

    const getHomepage = async () => {
        try {
            const res: any = await HomeService.getLandingPage();
            console.log(res);
            if(res && res.status == 200 && res.data) {
                const {brand_name, brand_logo, alt_brand_logo} = res.data;
                setHomePageData(res.data);
                setBrandData({
                    brandName: brand_name,
                    brandLogo: brand_logo,
                    brandAlt: alt_brand_logo
                })
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
                <Hero />
            </div>
        </div>
    )
}

export default HomePage;