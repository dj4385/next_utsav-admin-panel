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
// import { IRealWeddings } from "@/app/types/api/request/venue.request"
import { setRealWeddingListItem, setRealWeddingModal, setRealWeddingModalList } from "@/lib/features/venue/RealWeddingSlice"

const RealWeddingModal = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { isOpen, realWeddingListItem } = useAppSelector((state) => state.RealWeddingSlice);
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<any>();
    const [imageUrl, setImageUrl] = useState<string>('');

    const onSubmit = (data: any) => {
        setLoading(true);

        let realWeddingData: any;

        if (realWeddingListItem) {
            realWeddingData = {
                ...data,
                _id: realWeddingListItem._id,
                image: imageUrl ? imageUrl : realWeddingListItem.image
            }
        } else {
            realWeddingData = {
                ...data,
                image: imageUrl
            }
        }
        dispatch(setRealWeddingModalList([realWeddingData]))
        setTimeout(() => {
            setLoading(false)
            reset();
            handleClose();
        }, 1000);
    }

    const handleClose = () => {
        dispatch(setRealWeddingModal(false))
        dispatch(setRealWeddingListItem(null))
        reset();
    };

    const onImageUpload = (url: string) => {
        setImageUrl(url)
    }

    useEffect(() => {
        if (realWeddingListItem) {
            setValue("couple", realWeddingListItem.couple);
            setValue("description", realWeddingListItem.description);
        } else {
            reset()
        }
    }, [realWeddingListItem])

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
                                <FileUploader url={realWeddingListItem?.image || ''} urlType="image" onFileUpload={(url: string) => onImageUpload(url)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Couple</label>
                                <Input type="text" {...register("couple")} placeholder="Enter Couple Detail" className="mt-1 w-full" />
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

export default RealWeddingModal;