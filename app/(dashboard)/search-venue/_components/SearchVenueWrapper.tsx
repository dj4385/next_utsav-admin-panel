import ContentHeader from "@/components/ContentHeader/ContentHeader";
import { MapPlusIcon } from "lucide-react";
import SearchVenueForm from "./SearchVenueForm/SearchVenueForm";
import SearchVenueTable from "./SearchVenueTable/SearchVenueTable";

const SearchVenueWrapper = () => {
    return (
        <div className="flex flex-col rounded-lg bg-gray-50 p-2">
            <div className="w-full">
                <ContentHeader title="Search Venue Page" icon={<MapPlusIcon />} />
            </div>
            <div className="flex flex-col mt-5">
                <SearchVenueForm />
                <div className="mt-2">
                    <SearchVenueTable />
                </div>
            </div>
        </div>
    )
}

export default SearchVenueWrapper;