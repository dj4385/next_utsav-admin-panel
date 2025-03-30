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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppSelector } from "@/lib/store"
import { useDispatch } from "react-redux"
import { setEventModal } from "@/lib/features/EventSlice"
import { Textarea } from "../ui/textarea"
import FileUploader from "../FileUploader/FileUploader"
import { useForm } from "react-hook-form"
import ButtonComponent from "../core/Button/Button"
import { useState } from "react"

const EventModal = () => {

    const { isOpen } = useAppSelector((state) => state.EventSlice);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<any>();
    const [imageUrl, setImageUrl] = useState<string>('');
    const [iconUrl, setIconUrl] = useState<string>('');

    const onSubmit = (data: any) => {
        console.log(data, 'data');
    }

    const handleClose = () => dispatch(setEventModal(false));

    const onImageUpload = (url: string) => {
        setImageUrl(url)
    }

    const onIconUpload = (url: string) => {
        setIconUrl(url);
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="w-[50%]">
                <DialogHeader>
                    <DialogTitle>Add/Update Event Card</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4 overflow-y-scroll h-[500px]">
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid lg:grid-cols-1 grid-cols-1 gap-4 p-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Event Type</label>
                                <Select {...register("eventType", { required: "Event Type is required"})}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Event Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Event Type</SelectLabel>
                                            <SelectItem value="Card">Card</SelectItem>
                                            <SelectItem value="Image">Image</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {/* {errors.eventType && <p className="text-red-500 mt-2 text-sm">{errors.eventType.message}</p>} */}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Heading</label>
                                <Input type="text" {...register("heading", { required: "Heading is required"})} placeholder="Enter Heading" className="mt-1 w-full" />
                                {/* {errors.heading && <p className="text-red-500 mt-2 text-sm">{errors.heading.message}</p>} */}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Text</label>
                                <Textarea {...register("text", { required: "Heading is required"})} placeholder="Enter text here..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image Alt</label>
                                <Input type="text" {...register("heading", { required: "Image Alt is required"})} placeholder="Enter Image Alt" className="mt-1 w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                                <FileUploader url={''} urlType="image" onFileUpload={(url: string) => onImageUpload(url)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Icon Alt</label>
                                <Input type="text" {...register("heading", { required: "Icon Alt is required"})} placeholder="Enter Icon Alt" className="mt-1 w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                                <FileUploader url={''} urlType="image" onFileUpload={(url: string) => onIconUpload(url)} />
                            </div>
                            <ButtonComponent label="Save Changes" onClick={() => {}} loading={false} type="submit" customClass="w-full bg-purple-700 hover:bg-purple-800" />
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EventModal;