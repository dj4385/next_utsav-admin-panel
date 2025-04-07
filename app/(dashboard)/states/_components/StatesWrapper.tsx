import ContentHeader from "@/components/ContentHeader/ContentHeader";
import { MapPlusIcon } from "lucide-react";
import AddStateForm from "./AddState/AddState";
import StateList from "./StateList/StateList";

const StatesWrapper = () => {
    return (
        <div className="flex flex-col rounded-lg bg-gray-50 p-2">
            <div className="w-full">
                <ContentHeader title="State Page" icon={<MapPlusIcon />} />
            </div>
            <div className="flex flex-col mt-5">
                <AddStateForm />
                <div className="mt-2">
                    <StateList />
                </div>
            </div>
        </div>
    )
}

export default StatesWrapper;