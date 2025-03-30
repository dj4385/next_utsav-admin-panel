"use client"

import ContentHeader from "@/components/ContentHeader/ContentHeader";
import { VenueService } from "@/services/venue.service";
import { ArrowLeft, MapPinHouse } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AddVenueForm = () => {

    const router = useRouter();

    const back = () => {
        router.push('/venue')
    }

    return (
        <div className="flex flex-col rounded-lg bg-gray-50 p-2">
            <div className="w-full">
                <ContentHeader title="Add Venue" icon={<MapPinHouse />} buttonLabel="Back" buttonIcon={<ArrowLeft />} onBtnClick={() => back()} />
            </div>
            <div>

            </div>
        </div>
    )
}

export default AddVenueForm;
