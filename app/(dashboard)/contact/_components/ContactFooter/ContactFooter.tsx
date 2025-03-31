"use client"

import { IContactFooter, IContactFooterData, IContactFooterList } from "@/app/types/components/Contact";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { Book, CirclePlus, Edit2, Trash2 } from "lucide-react";
import { ChangeEvent, useEffect } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const ContactFooter = ({
    contactFooterData,
    contactFooterList,
    setContactFooterList,
    setContactFooterData
}: IContactFooter) => {

    const dispatch = useAppDispatch();
    // const {} = useAppSelector((state) => state)

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setContactFooterData((prev: IContactFooterData) => ({
            ...prev,
            [name]: value,
        }));
    }

    const onFileUpload = (url: string) => {
        setContactFooterData((prev: IContactFooterData) => ({
            ...prev,
            footer_image: url,
        }));
    }

    const openModal = () => {
        // dispatch(setAboutGalleryModal(true));
    }

    const editModal = (data: IContactFooterList) => {
        // dispatch(setAboutGalleryListItem(data))
        openModal();
    }

    const deleteData = (id: string) => {
        const data = contactFooterList.filter((d) => d._id !== id);
        setContactFooterList(data);
    }

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <Book /> Footer</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Banner</label>
                    <FileUploader url={contactFooterData?.footer_image || ''} urlType="image" onFileUpload={(url: string) => onFileUpload(url)} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Alt Footer Image</label>
                    <Input type="text" placeholder="Enter Alt Footer Image" name="alt_footer_image" onChange={handleChange} value={contactFooterData?.alt_footer_image || ''} className="mt-1 w-full" />
                </div>
            </div>
            <Separator className="mt-4" />
            <div className="p-2">
                <div className="flex justify-end items-center mb-2">
                    <Button variant="secondary" className="bg-purple-600 text-white hover:bg-purple-800" onClick={() => openModal()}>
                        <CirclePlus /> Add Footer
                    </Button>
                </div>
                <Table className="rounded-md">
                    <TableHeader>
                        <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
                            <TableHead className="text-white">Image</TableHead>
                            <TableHead className="text-white">Image Alt</TableHead>
                            <TableHead className="text-white">Name</TableHead>
                            <TableHead className="text-white">Address</TableHead>
                            <TableHead className="text-white">Email</TableHead>
                            <TableHead className="text-white">Phone</TableHead>
                            <TableHead className="text-white text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contactFooterList.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {
                                        item && item.country_image ? <div className="h-[50px] w-[50px]"> <Image src={item.country_image} alt="image" width={50} height={50} className="h-full w-full rounded-md" /> </div> : null
                                    }
                                </TableCell>
                                <TableCell>{item.alt_country_image}</TableCell>
                                <TableCell>{item.country_name}</TableCell>
                                <TableCell>{item.country_address}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="secondary" size="icon" onClick={() => editModal(item)}>
                                            <Edit2 />
                                        </Button>
                                        <Button variant="destructive" size="icon" onClick={() => deleteData(item._id)}>
                                            <Trash2 />
                                        </Button>
                                    </div>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default ContactFooter;