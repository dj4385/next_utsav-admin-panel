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
import { ITeamList } from "@/app/types/components/About"
import { setTeamListItem, setTeamModal, setTeamModalList } from "@/lib/features/about/TeamSlice"

const TeamModal = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { isOpen, teamListItem } = useAppSelector((state) => state.TeamSlice);
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<any>();
    const [imageUrl, setImageUrl] = useState<string>('');

    const onSubmit = (data: any) => {
        setLoading(true);

        let teamData: ITeamList;

        if (teamListItem) {
            teamData = {
                ...data,
                _id: teamListItem._id,
                image: imageUrl  ? imageUrl : teamListItem.image
            }
        } else {
            teamData = {
                ...data,
                image: imageUrl
            }
        }
        dispatch(setTeamModalList([teamData]))
        setTimeout(() => {
            setLoading(false)
            reset();
            handleClose();
        }, 1000);
    }

    const handleClose = () => {
        dispatch(setTeamModal(false))
        dispatch(setTeamListItem(null))
        reset();
    };

    const onImageUpload = (url: string) => {
        setImageUrl(url)
    }

    useEffect(() => {
        if (teamListItem) {
            setValue("alt", teamListItem.alt);
            setValue("name", teamListItem.name);
            setValue("designation", teamListItem.designation);
            setValue("quotes", teamListItem.quotes);
        } else {
            reset()
        }
    }, [teamListItem])

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="w-[50%]" aria-describedby="Event Modal">
                <DialogHeader>
                    <DialogTitle>Add/Update Award</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4 overflow-y-scroll h-[500px]">
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid lg:grid-cols-1 grid-cols-1 gap-4 p-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                                <FileUploader url={teamListItem?.image || ''} urlType="image" onFileUpload={(url: string) => onImageUpload(url)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image Alt</label>
                                <Input type="text" {...register("alt")} placeholder="Enter Title" className="mt-1 w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <Input type="text" {...register("name")} placeholder="Enter Name" className="mt-1 w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Designation</label>
                                <Input type="text" {...register("designation")} placeholder="Enter Designation" className="mt-1 w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Quotes</label>
                                <Textarea {...register("quotes")} placeholder="Enter Quotes" className="mt-1 w-full" />
                            </div>
                            
                            <ButtonComponent label="Save Changes" onClick={() => { }} loading={loading} type="submit" customClass="w-full bg-purple-700 hover:bg-purple-800" />
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default TeamModal;