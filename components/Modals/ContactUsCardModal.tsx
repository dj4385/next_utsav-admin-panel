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
import { IContactUsData } from "@/app/types/components/Foooter"
import { setContactUsCardListItem, setContactUsCardModal, setContactUsCardModalList } from "@/lib/features/footer/ContactUsCardSlice"

const ContactUsCardModal = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { isOpen, contactUsListItem } = useAppSelector((state) => state.ContactUsCardSlice);
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<any>();
    const [imageUrl, setImageUrl] = useState<string>('');

    const onSubmit = (data: any) => {
        setLoading(true);

        let contactUsData: IContactUsData;

        if (contactUsListItem) {
            contactUsData = {
                ...data,
                _id: contactUsListItem._id,
                flagIcon: imageUrl ? imageUrl : contactUsListItem.flagIcon
            }
        } else {
            contactUsData = {
                ...data,
                flagIcon: imageUrl
            }
        }
        dispatch(setContactUsCardModalList([contactUsData]))
        setTimeout(() => {
            setLoading(false)
            reset();
            handleClose();
        }, 1000);
    }

    const handleClose = () => {
        dispatch(setContactUsCardModal(false))
        dispatch(setContactUsCardListItem(null))
        reset();
    };

    const onImageUpload = (url: string) => {
        setImageUrl(url)
    }

    useEffect(() => {
        if (contactUsListItem) {
            setValue("flagIcon", contactUsListItem.flagIcon);
            setValue("country", contactUsListItem.country);
            setValue("isExpanded", contactUsListItem.isExpanded);
            setValue("contactDetails", contactUsListItem.contactDetails);
            setValue("email", contactUsListItem.email);
            setValue("address", contactUsListItem.address);
        } else {
            reset()
        }
    }, [contactUsListItem])

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="w-[50%]" aria-describedby="Event Modal">
                <DialogHeader>
                    <DialogTitle>Add/Update Real Wedding</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4 overflow-y-auto h-[500px]">
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid lg:grid-cols-1 grid-cols-1 gap-4 p-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Flag Logo</label>
                                <FileUploader url={contactUsListItem?.flagIcon || ''} urlType="image" onFileUpload={(url: string) => onImageUpload(url)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Country</label>
                                <Input type="text" {...register("country")} placeholder="Enter Country" className="mt-1 w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Contact Details</label>
                                <Input type="text" {...register("contactDetails")} placeholder="Enter Contact Details" className="mt-1 w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <Input type="email" {...register("email")} placeholder="Enter Email" className="mt-1 w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <Input type="text" {...register("address")} placeholder="Enter Address" className="mt-1 w-full" />
                            </div>
                            <ButtonComponent label="Save Changes" onClick={() => { }} loading={loading} type="submit" customClass="w-full bg-purple-700 hover:bg-purple-800" />
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ContactUsCardModal;