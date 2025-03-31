"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useAppSelector } from "@/lib/store"
import { useDispatch } from "react-redux"
import FileUploader from "../FileUploader/FileUploader"
import { useForm } from "react-hook-form"
import ButtonComponent from "../core/Button/Button"
import { useEffect, useState } from "react"
import { IImages } from "@/app/types/api/request/venue.request"
import { setVenueImageListItem, setVenueImageModal, setVenueImageModalList } from "@/lib/features/venue/VenueImageSlice"

const VenueImageModal = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { isOpen, venueImageListItem } = useAppSelector((state) => state.VenueImageSlice);
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<any>();
    const [imageUrl, setImageUrl] = useState<string>('');

    const onSubmit = (data: any) => {
        setLoading(true);

        let venueImageData: IImages;

        if (venueImageListItem) {
            venueImageData = {
                ...data,
                _id: venueImageListItem._id,
                urls: imageUrl ? imageUrl : venueImageListItem.urls
            }
        } else {
            venueImageData = {
                ...data,
                urls: imageUrl
            }
        }
        dispatch(setVenueImageModalList([venueImageData]))
        setTimeout(() => {
            setLoading(false)
            reset();
            handleClose();
        }, 1000);
    }

    const handleClose = () => {
        dispatch(setVenueImageModal(false))
        dispatch(setVenueImageListItem(null))
        reset();
    };

    const onImageUpload = (url: string) => {
        setImageUrl(url)
    }

    useEffect(() => {
        if (venueImageListItem) {
            setValue("type", venueImageListItem.type);
        } else {
            reset()
        }
    }, [venueImageListItem])

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="w-[50%]" aria-describedby="Event Modal">
                <DialogHeader>
                    <DialogTitle>Add/Update Venue Images</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4 overflow-y-auto">
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid lg:grid-cols-1 grid-cols-1 gap-4 p-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Type</label>
                                <select className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" {...register("type")} >
                                    <option value="Image">Image</option>
                                    <option value="Video">Video</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                                <FileUploader url={venueImageListItem?.urls[0] || ''} urlType="image" onFileUpload={(url: string) => onImageUpload(url)} />
                            </div>
                            <ButtonComponent label="Save Changes" onClick={() => { }} loading={loading} type="submit" customClass="w-full bg-purple-700 hover:bg-purple-800" />
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default VenueImageModal;