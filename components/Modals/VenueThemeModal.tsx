"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useAppSelector } from "@/lib/store"
import { useDispatch } from "react-redux"
import { Textarea } from "../ui/textarea"
import { useForm } from "react-hook-form"
import ButtonComponent from "../core/Button/Button"
import { useEffect, useState } from "react"
import { IThemes } from "@/app/types/api/request/venue.request"
import { setVenueThemeListItem, setVenueThemeModal, setVenueThemeModalList } from "@/lib/features/venue/VenueThemeSlice"
import MultipleFileUploader from "../MultipleFileUploader/MultipleFileUploader"

const VenueThemeModal = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { isOpen, themeListItem } = useAppSelector((state) => state.VenueThemeSlice);
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<any>();
    const [imageUrl, setImageUrl] = useState<string[]>([]);

    const onSubmit = (data: any) => {
        setLoading(true);

        let venueThemeData: IThemes;

        if (themeListItem) {
            venueThemeData = {
                ...data,
                _id: themeListItem._id,
                images: imageUrl ? imageUrl : themeListItem.images
            }
        } else {
            venueThemeData = {
                ...data,
                images: imageUrl
            }
        }
        dispatch(setVenueThemeModalList([venueThemeData]))
        setTimeout(() => {
            setLoading(false)
            reset();
            handleClose();
        }, 1000);
    }

    const handleClose = () => {
        dispatch(setVenueThemeModal(false))
        dispatch(setVenueThemeListItem(null))
        reset();
    };

    const onImageUpload = (url: string[]) => {
        setImageUrl(url)
    }

    useEffect(() => {
        if (themeListItem) {
            setValue("name", themeListItem.name);
            setValue("description", themeListItem.description);
        } else {
            reset()
        }
    }, [themeListItem])

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="w-[50%]" aria-describedby="Event Modal">
                <DialogHeader>
                    <DialogTitle>Add/Update Venue Theme</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4 overflow-y-auto">
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid lg:grid-cols-1 grid-cols-1 gap-4 p-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                                <MultipleFileUploader url={themeListItem?.images || []} urlType="image" onFileUpload={(url: string[]) => onImageUpload(url)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <Input type="text" {...register("name")} placeholder="Enter Theme Name" className="mt-1 w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <Textarea {...register("description")} placeholder="Enter Description" className="mt-1 w-full" />
                            </div>
                            <ButtonComponent label="Save Changes" onClick={() => { }} loading={loading} type="submit" customClass="w-full bg-purple-700 hover:bg-purple-800" />
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default VenueThemeModal;