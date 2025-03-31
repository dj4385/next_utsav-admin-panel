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
import { IGlobalPresenceList } from "@/app/types/components/Contact"
import { setGlobalPresenceListItem, setGlobalPresenceModal, setGlobalPresenceModalList } from "@/lib/features/contact/GlobalPresenceSlice"

const GlobalPresenceModal = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { isOpen, globalPresenceListItem } = useAppSelector((state) => state.GlobalPresenceSlice);
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<any>();
    const [imageUrl, setImageUrl] = useState<string>('');

    const onSubmit = (data: any) => {
        setLoading(true);

        let globalPresenceData: IGlobalPresenceList;

        if (globalPresenceListItem) {
            globalPresenceData = {
                ...data,
                _id: globalPresenceListItem._id,
                country_image: imageUrl ? imageUrl : globalPresenceListItem.country_image
            }
        } else {
            globalPresenceData = {
                ...data,
                country_image: imageUrl
            }
        }
        dispatch(setGlobalPresenceModalList([globalPresenceData]))
        setTimeout(() => {
            setLoading(false)
            reset();
            handleClose();
        }, 1000);
    }

    const handleClose = () => {
        dispatch(setGlobalPresenceModal(false))
        dispatch(setGlobalPresenceListItem(null))
        reset();
    };

    const onImageUpload = (url: string) => {
        setImageUrl(url)
    }

    useEffect(() => {
        if (globalPresenceListItem) {
            setValue("alt_country_image", globalPresenceListItem.alt_country_image);
            setValue("country_address", globalPresenceListItem.country_address);
            setValue("country_name", globalPresenceListItem.country_name);
        } else {
            reset()
        }
    }, [globalPresenceListItem])

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="w-[50%]" aria-describedby="Event Modal">
                <DialogHeader>
                    <DialogTitle>Add/Update Real Wedding</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4 overflow-y-auto">
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid lg:grid-cols-1 grid-cols-1 gap-4 p-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                                <FileUploader url={globalPresenceListItem?.country_image || ''} urlType="image" onFileUpload={(url: string) => onImageUpload(url)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Alt Country Image</label>
                                <Input type="text" {...register("alt_country_image")} placeholder="Enter Alt Country Image" className="mt-1 w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Country Name</label>
                                <Input type="text" {...register("country_name")} placeholder="Enter Country Name" className="mt-1 w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Country Address</label>
                                <Textarea {...register("country_address")} placeholder="Enter Country Address" className="mt-1 w-full" />
                            </div>
                            <ButtonComponent label="Save Changes" onClick={() => { }} loading={loading} type="submit" customClass="w-full bg-purple-700 hover:bg-purple-800" />
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default GlobalPresenceModal;