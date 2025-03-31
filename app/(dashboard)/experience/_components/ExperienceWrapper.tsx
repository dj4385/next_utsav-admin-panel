import ContentHeader from "@/components/ContentHeader/ContentHeader";
import { Lightbulb } from "lucide-react";
import AddExperienceForm from "./AddExperienceForm/AddExperienceForm";
import ExperienceTable from "./ExperienceTable/ExperienceTable";

const ExperienceWrapper = () => {
    return (
        <div className="flex flex-col rounded-lg bg-gray-50 p-2">
            <div className="w-full">
                <ContentHeader title="Experience Page" icon={<Lightbulb />} />
            </div>
            <div className="flex flex-col mt-5">
                <AddExperienceForm />
                <div className="mt-2">
                    <ExperienceTable />
                </div>
            </div>
        </div>
    )
}

export default ExperienceWrapper;