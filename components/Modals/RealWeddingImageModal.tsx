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
import { Input } from "../ui/input"
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/hooks/use-toast"
import { setRealWeddingImageModalList, setRealWeddingImageModal, setRealWeddingImageListItem } from "@/lib/features/real-wedding/RealWeddingImageSlice"

const RealWeddingImageModal = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [type, setType] = useState<string>('image');
    const { isOpen, realWeddingImageListItem } = useAppSelector((state) => state.RealWeddingImageSlice);
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<any>();
    const [imageUrl, setImageUrl] = useState<string>('');
    const { toast } = useToast();
    const onSubmit = (data: any) => {

        if (data.type == 'image' && !imageUrl) {
            toast({
                title: 'Error',
                description: 'Please upload an image',
                variant: 'destructive'
            })
            return;
        }

        if (data.type == 'video' && !imageUrl) {
            toast({
                title: 'Error',
                description: 'Please upload a video',
                variant: 'destructive'
            })
            return;
        }

        setLoading(true);

        let realWeddingImageData: IImages;

        // need to work on logic for video and image based on type
        if (realWeddingImageListItem) {
            realWeddingImageData = {
                ...data,
                _id: realWeddingImageListItem._id,
                images: imageUrl ? imageUrl : realWeddingImageListItem.images,
                video: imageUrl ? imageUrl : realWeddingImageListItem.video
            }
        } else {
            realWeddingImageData = {
                ...data,
                images: data.type == 'image' ? imageUrl : '',
                video: data.type == 'video' ? imageUrl : '',
                id: uuidv4()
            }
        }
        dispatch(setRealWeddingImageModalList([realWeddingImageData]))
        setTimeout(() => {
            setLoading(false)
            reset();
            handleClose();
        }, 1000);
    }

    const handleClose = () => {
        dispatch(setRealWeddingImageModal(false))
        dispatch(setRealWeddingImageListItem(null))
        reset();
    };

    const onImageUpload = (url: string) => {
        setImageUrl(url)
    }

    const onSelectType = (value: string) => {
        setType(value);
    }

    useEffect(() => {
        if (realWeddingImageListItem) {
            setValue("type", realWeddingImageListItem.type);
            setValue("name", realWeddingImageListItem.name);
            setValue("alt", realWeddingImageListItem.alt);
            setType(realWeddingImageListItem.type);
        } else {
            reset()
        }
    }, [realWeddingImageListItem])

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="w-[50%]" aria-describedby="Event Modal">
                <DialogHeader>
                    <DialogTitle>Add/Update Real Wedding Images</DialogTitle>
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
                                    <option value="">Select Type</option>
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
                                <FileUploader url={realWeddingImageListItem?.images || ''} urlType={type == 'image' ? 'image' : 'video'} onFileUpload={(url: string) => onImageUpload(url)} />
                            </div>
                            <ButtonComponent label="Save Changes" onClick={() => { }} loading={loading} type="submit" customClass="w-full bg-purple-700 hover:bg-purple-800" />
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default RealWeddingImageModal;