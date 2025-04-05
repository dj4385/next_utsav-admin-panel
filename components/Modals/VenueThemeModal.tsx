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
import { useFieldArray, useForm } from "react-hook-form"
import ButtonComponent from "../core/Button/Button"
import { useEffect, useState } from "react"
import { IThemes } from "@/app/types/api/request/venue.request"
import { setVenueThemeListItem, setVenueThemeModal, setVenueThemeModalList } from "@/lib/features/venue/VenueThemeSlice"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import FileUploader from "../FileUploader/FileUploader"
import { v4 as uuidv4 } from 'uuid';
type FormValues = {
    name: string;
    tab_name: string;
    description: string;
    theme_img_gallery: {
        alt: string;
        images: string;
        is_wide: boolean;
    }[];
};


const VenueThemeModal = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { isOpen, themeListItem } = useAppSelector((state) => state.VenueThemeSlice);
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, setValue, formState: { errors }, control, watch } = useForm<FormValues>({
        defaultValues: {
            name: '',
            tab_name: '',
            description: '',
            theme_img_gallery: [{ alt: '', images: '', is_wide: false }],
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'theme_img_gallery',
    });

    const onSubmit = (data: any) => {
        setLoading(true);

        let venueThemeData: IThemes;

        if (themeListItem) {
            venueThemeData = {
                ...data,
                _id: themeListItem._id,
                theme_img_gallery: data.theme_img_gallery
            }
        } else {
            venueThemeData = {
                ...data,
                theme_img_gallery: data.theme_img_gallery,
                id: uuidv4()
            }
        }
        dispatch(setVenueThemeModalList([venueThemeData]))
        setTimeout(() => {
            setLoading(false)
            reset();
            handleClose();
        }, 1000);
    }

    const handleClose = () => {
        dispatch(setVenueThemeModal(false))
        dispatch(setVenueThemeListItem(null))
        reset();
    };

    useEffect(() => {
        if (themeListItem) {
            setValue("name", themeListItem.name);
            setValue("tab_name", themeListItem.tab_name)
            setValue("description", themeListItem.description);
        } else {
            reset()
        }
    }, [themeListItem])

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="w-[90%] max-h-[80vh] overflow-y-auto" aria-describedby="Event Modal">
                <DialogHeader>
                    <DialogTitle>Add/Update Venue Theme</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4 overflow-y-auto">
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid lg:grid-cols-1 grid-cols-1 gap-4 p-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <Input type="text" {...register("name")} placeholder="Enter Theme Name" className="mt-1 w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tab Name</label>
                                <Input type="text" {...register("tab_name")} placeholder="Enter Tab Name" className="mt-1 w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <Textarea {...register("description")} placeholder="Enter Description" className="mt-1 w-full" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold">Theme Image Gallery</h3>
                                {fields.map((field, index) => (
                                    <div key={field.id} className="grid lg:grid-cols-1 grid-cols-1 gap-4 p-2 border-2 rounded-lg">
                                        <FileUploader
                                            onFileUpload={(url: string) => setValue(`theme_img_gallery.${index}.images`, url)}
                                            url={watch(`theme_img_gallery.${index}.images`)}
                                            urlType="image"
                                        />
                                        <Input
                                            {...register(`theme_img_gallery.${index}.alt` as const)}
                                            placeholder="Alt text"
                                            className="border p-2 w-full"
                                        />
                                        <label className="flex items-center space-x-2">
                                            <Checkbox 
                                                {...register(`theme_img_gallery.${index}.is_wide` as const)}
                                                checked={watch(`theme_img_gallery.${index}.is_wide`)}
                                                onCheckedChange={(checked: boolean) => {
                                                    // Uncheck all other checkboxes
                                                    fields.forEach((_, i) => {
                                                        if (i !== index) {
                                                            setValue(`theme_img_gallery.${i}.is_wide`, false);
                                                        }
                                                    });
                                                    // Set the current checkbox
                                                    setValue(`theme_img_gallery.${index}.is_wide`, checked);
                                                }}
                                            />
                                            <span>Is Wide</span>
                                        </label>
                                        <div className="flex justify-end">
                                            <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                                                <Trash2 />
                                            </Button>
                                        </div>

                                    </div>
                                ))}
                                <div className="flex justify-end">
                                    <Button type="button" variant="secondary" size="icon" onClick={() => append({ alt: '', images: '', is_wide: false })}>
                                        <Plus />
                                    </Button>
                                </div>
                            </div>
                            <ButtonComponent label="Save Changes" onClick={() => { }} loading={loading} type="submit" customClass="w-full bg-purple-700 hover:bg-purple-800" />
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default VenueThemeModal;