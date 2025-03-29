"use client"

import { ITestimonial, ITestimonialData } from "@/app/types/components/Home";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Home } from "lucide-react";
import { ChangeEvent } from "react";

const Testimonial = ({
    setTestimonialData,
    testimonialData
}: ITestimonial) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setTestimonialData((prev: ITestimonialData) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 items-center p-2 bg-purple-700 text-white text-lg font-medium mb-3"> <Home /> Testimonial Section</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Testimonial Section</label>
                    <Input type="text" placeholder="Enter Mission Heading" className="mt-1 w-full" onChange={handleChange} name="testimonial" value={testimonialData.testimonial} />
                </div>
            </div>
        </div>
    )
}

export default Testimonial;