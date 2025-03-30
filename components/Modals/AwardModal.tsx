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
import { IAwardList } from "@/app/types/components/About"
import { setAwardListItem, setAwardModal, setAwardModalList } from "@/lib/features/about/AwardSlice"

const AwardModal = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { isOpen, awardListItem } = useAppSelector((state) => state.AwardSlice);
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<any>();

    const onSubmit = (data: any) => {
        setLoading(true);

        let awardData: IAwardList;

        if (awardListItem) {
            awardData = {
                ...data,
                _id: awardListItem._id
            }
        } else {
            awardData = {
                ...data
            }
        }
        dispatch(setAwardModalList([awardData]))
        setTimeout(() => {
            setLoading(false)
            reset();
            handleClose();
        }, 1000);
    }

    const handleClose = () => {
        dispatch(setAwardModal(false))
        dispatch(setAwardListItem(null))
        reset();
    };

    useEffect(() => {
        if (awardListItem) {
            setValue("name", awardListItem.name);
            setValue("heading", awardListItem.heading);
            setValue("title", awardListItem.title);
        } else {
            reset()
        }
    }, [awardListItem])

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
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <Input type="text" {...register("title")} placeholder="Enter Title" className="mt-1 w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Heading</label>
                                <Input type="text" {...register("heading")} placeholder="Enter Heading" className="mt-1 w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <Input type="text" {...register("name")} placeholder="Enter Image Alt" className="mt-1 w-full" />
                            </div>
                            <ButtonComponent label="Save Changes" onClick={() => { }} loading={loading} type="submit" customClass="w-full bg-purple-700 hover:bg-purple-800" />
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AwardModal;