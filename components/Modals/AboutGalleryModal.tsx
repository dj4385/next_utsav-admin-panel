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
import FileUploader from "../FileUploader/FileUploader"
import { useForm } from "react-hook-form"
import ButtonComponent from "../core/Button/Button"
import { useEffect, useState } from "react"
import { IAboutGalleryData, IAwardList } from "@/app/types/components/About"
import { setAboutGalleryListItem, setAboutGalleryModal, setAboutGalleryModalList } from "@/lib/features/about/AboutGallerySlice"
import { Checkbox } from "../ui/checkbox"

const AboutGalleryModal = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { isOpen, aboutGalleryListItem } = useAppSelector((state) => state.AboutGallerySlice);
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<any>();
    const [imageUrl, setImageUrl] = useState<string>('');

    const onSubmit = (data: any) => {
        setLoading(true);

        let aboutGalleryData: IAboutGalleryData;

        if (aboutGalleryListItem) {
            aboutGalleryData = {
                ...data,
                _id: aboutGalleryListItem._id,
                image: imageUrl ? imageUrl : aboutGalleryListItem.image
            }
        } else {
            aboutGalleryData = {
                ...data,
                image: imageUrl
            }
        }
        dispatch(setAboutGalleryModalList([aboutGalleryData]))
        setTimeout(() => {
            setLoading(false)
            reset();
            handleClose();
        }, 1000);
    }

    const handleClose = () => {
        dispatch(setAboutGalleryModal(false))
        dispatch(setAboutGalleryListItem(null))
        reset();
    };

    const onImageUpload = (url: string) => {
        setImageUrl(url)
    }

    useEffect(() => {
        if (aboutGalleryListItem) {
            setValue("alt", aboutGalleryListItem.alt);
            setValue("isWide", aboutGalleryListItem.isWide);
        } else {
            reset()
        }
    }, [aboutGalleryListItem])

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="w-[50%]" aria-describedby="Event Modal">
                <DialogHeader>
                    <DialogTitle>Add/Update Award</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4 overflow-y-auto">
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid lg:grid-cols-1 grid-cols-1 gap-4 p-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                                <FileUploader url={aboutGalleryListItem?.image || ''} urlType="image" onFileUpload={(url: string) => onImageUpload(url)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image Alt</label>
                                <Input type="text" {...register("alt")} placeholder="Enter Image Alt" className="mt-1 w-full" />
                            </div>
                            <div className="flex gap-2 items-center">
                                <Checkbox id="isWide" {...register("isWide")} />
                                <label
                                    htmlFor="isWide"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    IsWide
                                </label>
                            </div>
                            <ButtonComponent label="Save Changes" onClick={() => { }} loading={loading} type="submit" customClass="w-full bg-purple-700 hover:bg-purple-800" />
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AboutGalleryModal;