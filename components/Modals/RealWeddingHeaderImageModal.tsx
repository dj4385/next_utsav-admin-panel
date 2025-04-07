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
import { useForm } from "react-hook-form"
import ButtonComponent from "../core/Button/Button"
import { useEffect, useState } from "react"
import { IHeaderImages } from "@/app/types/api/request/venue.request"
import { setRealWeddingHeaderImageModal, setRealWeddingHeaderImageModalList, setRealWeddingHeaderImageListItem } from "@/lib/features/real-wedding/RealWeddingHeaderImageSlice"

import { Checkbox } from "../ui/checkbox"
import FileUploader from "../FileUploader/FileUploader"
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/hooks/use-toast"

type FormValues = {
    alt: string;
    url: string;
    is_wide: boolean;
};


const RealWeddingHeaderImageModal = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { isOpen, realWeddingHeaderImageListItem } = useAppSelector((state) => state.RealWeddingHeaderImageSlice);
    const dispatch = useDispatch();
    const { toast } = useToast();
    const { register, handleSubmit, reset, setValue, formState: { errors }, control, watch } = useForm<FormValues>({
        defaultValues: {
            alt: '', url: '', is_wide: false
        }
    });

    const onSubmit = (data: any) => {

        if (data.url === '') {
            toast({
                title: 'Error',
                description: 'Please upload an image',
                variant: 'destructive'
            })
            return;
        }

        setLoading(true);

        let realWeddingHeaderImageData: IHeaderImages;

        if (realWeddingHeaderImageListItem) {
            realWeddingHeaderImageData = {
                ...data,
                _id: realWeddingHeaderImageListItem._id,
            }
        } else {
            realWeddingHeaderImageData = {
                ...data,
                id: uuidv4()
            }
        }
        dispatch(setRealWeddingHeaderImageModalList([realWeddingHeaderImageData]))
        setTimeout(() => {
            setLoading(false)
            reset();
            handleClose();
        }, 1000);
    }

    const handleClose = () => {
        dispatch(setRealWeddingHeaderImageModal(false))
        dispatch(setRealWeddingHeaderImageListItem(null))
        reset();
    };

    useEffect(() => {
        if (realWeddingHeaderImageListItem) {
            setValue("is_wide", realWeddingHeaderImageListItem.is_wide);
            setValue("url", realWeddingHeaderImageListItem.url);
            setValue("alt", realWeddingHeaderImageListItem.alt);
        } else {
            reset()
        }
    }, [realWeddingHeaderImageListItem])

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="w-[90%] max-h-[80vh] overflow-y-auto" aria-describedby="Event Modal">
                <DialogHeader>
                    <DialogTitle>Add/Update Real Wedding Header Image</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4 overflow-y-auto">
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid lg:grid-cols-1 grid-cols-1 gap-4 p-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image</label>
                                <FileUploader
                                    onFileUpload={(url: string) => setValue(`url`, url)}
                                    url={watch(`url`)}
                                    urlType="image"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Alt</label>
                                <Input type="text" {...register("alt")} placeholder="Enter Alt" className="mt-1 w-full" />
                            </div>
                            {/* <div>
                                <label className="block text-sm font-medium text-gray-700">Is Wide</label>
                                <Checkbox {...register("is_wide")} />
                            </div> */}
                            <ButtonComponent label="Save Changes" onClick={() => { }} loading={loading} type="submit" customClass="w-full bg-purple-700 hover:bg-purple-800" />
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default RealWeddingHeaderImageModal;