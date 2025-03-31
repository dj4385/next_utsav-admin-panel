"use client"

import { IFeedback, IFeedbackData } from "@/app/types/components/Contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircleMore } from "lucide-react";
import { ChangeEvent, useEffect } from "react";

const Feedback = ({
    feedbackData,
    setFeedbackData
}: IFeedback) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFeedbackData((prev: IFeedbackData) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <MessageCircleMore /> Feedback Section</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Feedback Heading</label>
                    <Input type="text" placeholder="Enter Feedback Heading" name="feedback_heading" onChange={handleChange} value={feedbackData?.feedback_heading || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Feedback Sub Heading</label>
                    <Textarea placeholder="Enter sub heading here" onChange={handleChange}  name="feedback_sub_heading" value={feedbackData.feedback_sub_heading} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <Input type="email" placeholder="Enter Brand Name" name="feedback_email" onChange={handleChange} value={feedbackData?.feedback_email || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone No.</label>
                    <Input type="email" placeholder="Enter Phone No" name="feedback_phone" onChange={handleChange} value={feedbackData?.feedback_phone || ''} className="mt-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Head Office</label>
                    <Textarea placeholder="Enter sub heading here" name="head_office" onChange={handleChange} value={feedbackData?.head_office || ''} className="mt-1 w-full" />
                </div>
                
            </div>
        </div>
    )
}

export default Feedback;