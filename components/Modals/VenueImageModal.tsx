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
import {
    setVenueImageListItem,
    setVenueImageModal,
    setVenueImageModalList
} from "@/lib/features/venue/VenueImageSlice"
import { Input } from "../ui/input"
import { v4 as uuidv4 } from 'uuid'
import { useToast } from "@/hooks/use-toast"

const VenueImageModal = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [type, setType] = useState<string>('image')
    const [imageUrl, setImageUrl] = useState<string>('')

    const { isOpen, venueImageListItem } = useAppSelector((state) => state.VenueImageSlice)
    const dispatch = useDispatch()
    const { toast } = useToast()

    type FormValues = {
        alt: string;
        url: string;
        is_wide: boolean;
        type: string;
        name: string;
        video:string;
    }

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
        watch,
    } = useForm<FormValues>({
        defaultValues: {
            alt: '',
            url: '',
            is_wide: false,
            type: 'image',
            name: '',
        }
    })

    useEffect(() => {
        if (venueImageListItem && Object.keys(venueImageListItem).length > 0) {
            setValue("type", venueImageListItem.type ?? 'image')
            setValue("name", venueImageListItem.name ?? '')
            setValue("alt", venueImageListItem.alt ?? '')
            setType(venueImageListItem.type ?? 'image')
            setImageUrl(venueImageListItem.images || venueImageListItem.video || '')
        } else {
            reset()
            setType('image')
            setImageUrl('')
        }
    }, [venueImageListItem, setValue, reset])

    const handleClose = () => {
        dispatch(setVenueImageModal(false))
        dispatch(setVenueImageListItem(null))
        reset()
    }

    const onImageUpload = (url: string) => {
        setImageUrl(url)
    }

    const onSelectType = (value: string) => {
        setType(value)
        setValue("type", value)
    }

    const onSubmit = (data: FormValues) => {
        if (!imageUrl) {
            toast({
                title: 'Error',
                description: `Please upload a ${data.type}`,
                variant: 'destructive'
            })
            return
        }

        setLoading(true)

        let venueImageData: IImages

        if (venueImageListItem) {
            venueImageData = {
                ...venueImageListItem,
                ...data,
                images: data.type === 'image' ? imageUrl : '',
                video: data.type === 'video' ? imageUrl : '',
                alt: data.alt
            }
        } else {
            venueImageData = {
                ...data,
                id: uuidv4(),
                images: data.type === 'image' ? imageUrl : '',
                video: data.type === 'video' ? imageUrl : '',
                alt: data.alt
            }
        }
        dispatch(setVenueImageModalList([venueImageData]))

        setTimeout(() => {
            setLoading(false)
            reset()
            handleClose()
        }, 1000)
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="w-[50%]" aria-describedby="Venue Image Modal">
                <DialogHeader>
                    <DialogTitle>Add/Update Venue Images</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4 overflow-y-auto">
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-4 p-2">
                            {/* Type Selector */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Type</label>
                                <select
                                    className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    {...register("type", { required: true })}
                                    onChange={(e) => onSelectType(e.target.value)}
                                >
                                    <option value="">Select Type</option>
                                    <option value="image">Image</option>
                                    <option value="video">Video</option>
                                </select>
                                {errors.type && <p className="text-red-500 text-xs mt-1">Type is required</p>}
                            </div>

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <Input
                                    type="text"
                                    placeholder="Enter Image/Video Name"
                                    {...register("name", { required: true })}
                                    className="mt-1 w-full"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">Name is required</p>}
                            </div>

                            {/* Alt */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Alt</label>
                                <Input
                                    type="text"
                                    placeholder="Enter Image/Video Alt"
                                    {...register("alt", { required: true })}
                                    className="mt-1 w-full"
                                />
                                {errors.alt && <p className="text-red-500 text-xs mt-1">Alt is required</p>}
                            </div>

                            {/* Uploader */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {type === 'image' ? 'Image' : 'Video'}
                                </label>
                                <FileUploader
                                    url={imageUrl}
                                    urlType={type}
                                    onFileUpload={onImageUpload}
                                />
                            </div>

                            {/* Submit Button */}
                            <ButtonComponent
                                label="Save Changes"
                                onClick={() => { }}
                                loading={loading}
                                type="submit"
                                customClass="w-full bg-purple-700 hover:bg-purple-800"
                            />
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default VenueImageModal
