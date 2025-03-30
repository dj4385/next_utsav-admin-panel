"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppSelector } from "@/lib/store"
import { useDispatch } from "react-redux"
import { setEventListItem, setEventModal, setEventModalList } from "@/lib/features/home/EventSlice"
import { Textarea } from "../ui/textarea"
import FileUploader from "../FileUploader/FileUploader"
import { useForm } from "react-hook-form"
import ButtonComponent from "../core/Button/Button"
import { useEffect, useState } from "react"
import { IEventData } from "@/app/types/components/Home"

const EventModal = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { isOpen, eventListItem } = useAppSelector((state) => state.EventSlice);
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<any>();
    const [imageUrl, setImageUrl] = useState<string>('');
    const [iconUrl, setIconUrl] = useState<string>('');

    const onSubmit = (data: any) => {
        debugger
        setLoading(true);

        let eventData: IEventData;

        if (eventListItem) {
            eventData = {
                ...data,
                _id: eventListItem._id,
                image: imageUrl ? imageUrl : eventListItem.image,
                icon: iconUrl ? iconUrl : eventListItem.icon
            }
        } else {
            eventData = {
                ...data,
                image: imageUrl || "",
                icon: iconUrl || ""
            }
        }
        dispatch(setEventModalList([eventData]))
        setTimeout(() => {
            setLoading(false)
            reset();
            handleClose();
        }, 1000);
    }

    const handleClose = () => {
        dispatch(setEventModal(false))
        dispatch(setEventListItem(null))
        reset();
    };

    const onImageUpload = (url: string) => {
        setImageUrl(url)
    }

    const onIconUpload = (url: string) => {
        setIconUrl(url);
    }

    useEffect(() => {
        if (eventListItem) {
            debugger
            setValue("event_ui_type", eventListItem.event_ui_type);
            setValue("heading", eventListItem.heading);
            setValue("text", eventListItem.text);
            setValue("alt", eventListItem.alt);
            setValue("alt_icon", eventListItem.alt_icon);
        } else {
            reset()
        }
    }, [eventListItem])

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="w-[50%]" aria-describedby="Event Modal">
                <DialogHeader>
                    <DialogTitle>Add/Update Event Card</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4 overflow-y-scroll h-[500px]">
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid lg:grid-cols-1 grid-cols-1 gap-4 p-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Event Type</label>
                                <select className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" {...register("event_ui_type")} >
                                    <option value="Card">Card</option>
                                    <option value="Image">Image</option>
                                </select>
                                {/* {errors.eventType && <p className="text-red-500 mt-2 text-sm">{errors.eventType.message}</p>} */}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Heading</label>
                                <Input type="text" {...register("heading")} placeholder="Enter Heading" className="mt-1 w-full" />
                                {/* {errors.heading && <p className="text-red-500 mt-2 text-sm">{errors.heading.message}</p>} */}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Text</label>
                                <Textarea {...register("text")} placeholder="Enter text here..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image Alt</label>
                                <Input type="text" {...register("alt")} placeholder="Enter Image Alt" className="mt-1 w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                                <FileUploader url={eventListItem?.image || ''} urlType="image" onFileUpload={(url: string) => onImageUpload(url)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Icon Alt</label>
                                <Input type="text" {...register("alt_icon")} placeholder="Enter Icon Alt" className="mt-1 w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                                <FileUploader url={eventListItem?.icon || ''} urlType="image" onFileUpload={(url: string) => onIconUpload(url)} />
                            </div>
                            <ButtonComponent label="Save Changes" onClick={() => { }} loading={loading} type="submit" customClass="w-full bg-purple-700 hover:bg-purple-800" />
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EventModal;