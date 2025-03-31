import ContentHeader from "@/components/ContentHeader/ContentHeader";
import { MapPlusIcon } from "lucide-react";
import AddLocationForm from "./AddLocationForm/AddLocationForm";
import LocationTable from "./LocationTable/LocationTable";

const LocationWrapper = () => {
    return (
        <div className="flex flex-col rounded-lg bg-gray-50 p-2">
            <div className="w-full">
                <ContentHeader title="Location Page" icon={<MapPlusIcon />} />
            </div>
            <div className="flex flex-col mt-5">
                <AddLocationForm />
                <div className="mt-2">
                    <LocationTable />
                </div>
            </div>
        </div>
    )
}

export default LocationWrapper;