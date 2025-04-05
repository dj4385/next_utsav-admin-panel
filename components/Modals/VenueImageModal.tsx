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
import MultipleFileUploader from "../MultipleFileUploader/MultipleFileUploader"
import { Input } from "../ui/input"
import { v4 as uuidv4 } from 'uuid';

const VenueImageModal = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [type, setType] = useState<string>('image');
    const { isOpen, venueImageListItem } = useAppSelector((state) => state.VenueImageSlice);
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<any>();
    const [imageUrl, setImageUrl] = useState<string>('');

    const onSubmit = (data: any) => {
        setLoading(true);

        let venueImageData: IImages;

        // need to work on logic for video and image based on type
        if (venueImageListItem) {
            venueImageData = {
                ...data,
                _id: venueImageListItem._id,
                images: imageUrl ? imageUrl : venueImageListItem.images,
                video: imageUrl ? imageUrl : venueImageListItem.video
            }
        } else {
            venueImageData = {
                ...data,
                images: data.type == 'image' ? imageUrl : '',
                video: data.type == 'video' ? imageUrl : '',
                id: uuidv4()
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

    const onSelectType = (value: string) => {
        setType(value);
    }

    useEffect(() => {
        if (venueImageListItem) {
            setValue("type", venueImageListItem.type);
            setValue("name", venueImageListItem.name);
            setValue("alt", venueImageListItem.alt);
            setType(venueImageListItem.type);
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
                                <select 
                                    className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                                    {...register("type")}
                                    onChange={(e) => onSelectType(e.target.value)}
                                >
                                    <option value="image">Image</option>
                                    <option value="video">Video</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <Input type="text" placeholder="Enter Image/Video Name" {...register("name")} className="mt-1 w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Alt</label>
                                <Input type="text" placeholder="Enter Image/Video Alt" {...register("alt")} className="mt-1 w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{type == 'image' ? 'Image' : 'Video'}</label>
                                <FileUploader url={venueImageListItem?.images || ''} urlType={type == 'image' ? 'image' : 'video'} onFileUpload={(url: string) => onImageUpload(url)} />
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