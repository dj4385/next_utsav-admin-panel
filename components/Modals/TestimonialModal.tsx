"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useAppSelector } from "@/lib/store"
import { useDispatch } from "react-redux"
import { Textarea } from "../ui/textarea"
import FileUploader from "../FileUploader/FileUploader"
import { useForm } from "react-hook-form"
import ButtonComponent from "../core/Button/Button"
import { useEffect, useState } from "react"
import { setTestimonialListItem, setTestimonialModal, setTestimonialModalData } from "@/lib/features/home/TestimonialSlice"
import { ITestimonialList } from "@/app/types/components/Home"

const TestimonialModal = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { isOpen, testimonialListItem } = useAppSelector((state) => state.TestimonialSlice);
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<any>();
    const [imageUrl, setImageUrl] = useState<string>('');

    const onSubmit = (data: any) => {
        setLoading(true);

        let testimonalData: ITestimonialList;

        if(testimonialListItem) {
            testimonalData = {
                ...data,
                _id: testimonialListItem._id,
                testimonial: testimonialListItem.testimonial,
                image: imageUrl ? imageUrl : testimonialListItem.image
            }
        } else {
            testimonalData = {
                ...data,
                image: imageUrl || ""       
            }
        }
        dispatch(setTestimonialModalData([testimonalData]))
        setTimeout(() => {
            setLoading(false)
            reset();
            handleClose();            
        }, 1000);
    }

    const handleClose = () => {
        dispatch(setTestimonialModal(false))
        dispatch(setTestimonialListItem(null))
        reset();
    }

    const onFileUpload = (url: string) => {
        setImageUrl(url);
    }

    useEffect(() => {
      if(testimonialListItem) {
        setValue("client", testimonialListItem.client)
        setValue("alt", testimonialListItem.alt)
        setValue("text", testimonialListItem.text)
      } else {
        reset()
      }
    }, [testimonialListItem])
    

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="w-[50%]">
                <DialogHeader>
                    <DialogTitle>Add/Update Event Card</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4 overflow-y-auto h-[500px]">
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid lg:grid-cols-1 grid-cols-1 gap-4 p-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Client</label>
                                <Input type="text" {...register("client", { required: "Client is required"})} placeholder="Enter Client Name" className="mt-1 w-full" />
                                {/* {errors.heading && <p className="text-red-500 mt-2 text-sm">{errors.heading.message}</p>} */}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Text</label>
                                <Textarea {...register("text", { required: "Heading is required"})} placeholder="Enter text here..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Alt</label>
                                <Input type="text" {...register("alt", { required: "Alt is required"})} placeholder="Enter Image Alt" className="mt-1 w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                                <FileUploader url={testimonialListItem?.image || ''} urlType="image" onFileUpload={(url: string) => onFileUpload(url)} />
                            </div>
                            <ButtonComponent label="Save Changes" onClick={() => {}} loading={loading} type="submit" customClass="w-full bg-purple-700 hover:bg-purple-800" />
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default TestimonialModal;