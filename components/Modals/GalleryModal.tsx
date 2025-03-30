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
import { setGalleryListItem, setGalleryModal, setGalleryModalList } from "@/lib/features/GallerySlice"
import { IGalleryList } from "@/app/types/components/Home"

const GalleryModal = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { isOpen, galleryListItem } = useAppSelector((state) => state.GallerySlice);
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<any>();
    const [imageUrl, setImageUrl] = useState<string>('');

    const onSubmit = (data: any) => {
        setLoading(true);

        let galleryData: IGalleryList;

        if (galleryListItem) {
            galleryData = {
                ...data,
                _id: galleryListItem._id,
                image: imageUrl ? imageUrl : galleryListItem.image
            }
        } else {
            galleryData = {
                ...data,
                image: imageUrl || ""
            }
        }
        dispatch(setGalleryModalList([galleryData]))
        setTimeout(() => {
            setLoading(false)
            reset();
            handleClose();
        }, 1000);
    }

    const handleClose = () => {
        dispatch(setGalleryModal(false))
        dispatch(setGalleryListItem(null))
        reset();
    }

    const onFileUpload = (url: string) => {
        setImageUrl(url);
    }

    useEffect(() => {
        if(galleryListItem) {
            setValue("alt", galleryListItem.alt)
        } else {
        reset()
        }
    }, [galleryListItem])

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="w-[50%]">
                <DialogHeader>
                    <DialogTitle>Add/Update Gallery</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid lg:grid-cols-1 grid-cols-1 gap-4 p-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Alt</label>
                                <Input type="text" {...register("alt", { required: "Alt is required" })} placeholder="Enter Image Alt" className="mt-1 w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                                <FileUploader url={galleryListItem?.image || ''} urlType="image" onFileUpload={(url: string) => onFileUpload(url)} />
                            </div>
                            <ButtonComponent label="Save Changes" onClick={() => { }} loading={loading} type="submit" customClass="w-full bg-purple-700 hover:bg-purple-800" />
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default GalleryModal;