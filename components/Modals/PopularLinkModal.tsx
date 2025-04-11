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
import FileUploader from "../FileUploader/FileUploader"
import { useForm } from "react-hook-form"
import ButtonComponent from "../core/Button/Button"
import { useEffect, useState } from "react"
import { IPopularLinksData } from "@/app/types/components/Foooter"
import { setPopularLinksListItem, setPopularLinksModal, setPopularLinksModalList } from "@/lib/features/footer/PopularLinkSlice"

const PopularLinkModal = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { isOpen, popularLinksListItem } = useAppSelector((state) => state.PopularLinksSlice);
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<any>();

    const onSubmit = (data: any) => {
        setLoading(true);

        let popularLinksData: IPopularLinksData;

        if (popularLinksListItem) {
            popularLinksData = {
                ...data,
                _id: popularLinksListItem._id,
            }
        } else {
            popularLinksData = {
                ...data,
            }
        }
        dispatch(setPopularLinksModalList([popularLinksData]))
        setTimeout(() => {
            setLoading(false)
            reset();
            handleClose();
        }, 1000);
    }

    const handleClose = () => {
        dispatch(setPopularLinksModal(false))
        dispatch(setPopularLinksListItem(null))
        reset();
    };

    useEffect(() => {
        if (popularLinksListItem) {
            setValue("label", popularLinksListItem.label);
            setValue("url", popularLinksListItem.url);
        } else {
            reset()
        }
    }, [popularLinksListItem])

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="w-[50%]" aria-describedby="Event Modal">
                <DialogHeader>
                    <DialogTitle>Add/Update Popular Link</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid lg:grid-cols-1 grid-cols-1 gap-4 p-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Label</label>
                                <Input type="text" {...register("label")} placeholder="Enter Label" className="mt-1 w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Url</label>
                                <Input type="text" {...register("url")} placeholder="Enter Url" className="mt-1 w-full" />
                            </div>

                            <ButtonComponent label="Save Changes" onClick={() => { }} loading={loading} type="submit" customClass="w-full bg-purple-700 hover:bg-purple-800" />
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default PopularLinkModal;