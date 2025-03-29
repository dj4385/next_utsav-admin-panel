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
import { useState } from "react"
import { setGalleryModal } from "@/lib/features/GallerySlice"

const GalleryModal = () => {

    const { isOpen } = useAppSelector((state) => state.GallerySlice);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<any>();

    const onSubmit = (data: any) => {
        console.log(data, 'data');
    }

    const handleClose = () => dispatch(setGalleryModal(false));

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
                                <Input type="text" {...register("alt", { required: "Alt is required"})} placeholder="Enter Image Alt" className="mt-1 w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                                <FileUploader imageUrl={''} />
                            </div>
                            <ButtonComponent label="Save Changes" onClick={() => {}} loading={false} type="submit" customClass="w-full bg-purple-700 hover:bg-purple-800" />
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default GalleryModal;