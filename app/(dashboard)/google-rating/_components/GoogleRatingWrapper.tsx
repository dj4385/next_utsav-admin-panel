'use client';

import ContentHeader from "@/components/ContentHeader/ContentHeader";
import { StarHalf } from "lucide-react";
import GoogleRatingForm from "./GoogleRatingForm/GoogleRatingForm";
import GoogleRatingTable from "./GoogleRatingTable/GoogleRatingTable";  

const GoogleRatingWrapper = () => {
    return (
        <div className="flex flex-col rounded-lg bg-gray-50 p-2">
            <div className="w-full">
                <ContentHeader title="Google Rating" icon={<StarHalf />} />
            </div>
            <div className="flex flex-col mt-5">
                <GoogleRatingForm />
                <div className="mt-2">
                    <GoogleRatingTable />
                </div>
            </div>
        </div>
    )
}

export default GoogleRatingWrapper;
