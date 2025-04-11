"use client"

import { CalendarClock, CirclePlus, Edit2, Trash2 } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useEffect } from "react";
import { IContactUsCard, IContactUsData } from "@/app/types/components/Foooter";
import { setContactUsCardListItem, setContactUsCardModal } from "@/lib/features/footer/ContactUsCardSlice";

const ContactUsCard = ({
    contactUs,
    setContactUs
}: IContactUsCard) => {

    const dispatch = useAppDispatch();
    const { contactUsModalList } = useAppSelector((state) => state.ContactUsCardSlice)

    const openModal = () => {
        dispatch(setContactUsCardModal(true));
    }

    const editEvent = (data: IContactUsData) => {
        dispatch(setContactUsCardListItem(data))
        openModal();
    }

    const deleteData = (id: string | undefined) => {
        if(id) {
            const data = contactUs.filter((d) => d._id !== id);
            setContactUs(data);
        }
    }

    useEffect(() => {
        if(contactUsModalList?.length) {
            if(contactUsModalList[0]._id) {
                const data = contactUs.map((d) =>
                    d._id == contactUsModalList[0]._id ? {
                        ...d,
                        country: contactUsModalList[0].country,
                        flagIcon: contactUsModalList[0].flagIcon,
                        isExpanded: contactUsModalList[0].isExpanded,
                        contactDetails: contactUsModalList[0].contactDetails,
                        email: contactUsModalList[0].email,
                        address: contactUsModalList[0].address,
                    } : d
                );
                setContactUs([...data]);
            } else {
                setContactUs([...contactUs, ...contactUsModalList])
            }
        }
    }, [contactUsModalList])

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <CalendarClock /> Contact Us Cards</h2>
            <div className="p-2">
                <div className="flex justify-end items-center mb-2">
                    <Button variant="secondary" className="bg-purple-600 text-white hover:bg-purple-800" onClick={() => openModal()}>
                        <CirclePlus /> Add Contact Us Card
                    </Button>
                </div>
                <Table className="rounded-md">
                    <TableHeader>
                        <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
                            <TableHead className="text-white">S.No</TableHead>
                            <TableHead className="text-white">Flag Icon</TableHead>
                            <TableHead className="text-white">Country</TableHead>
                            <TableHead className="text-white w-[100px]">Contact Details</TableHead>
                            <TableHead className="text-white">Email</TableHead>
                            <TableHead className="text-white">Address</TableHead>
                            <TableHead className="text-white">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contactUs.map((contactUs, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    {
                                        contactUs && contactUs.flagIcon ? <div className="h-[50px] w-[50px]"> <Image src={contactUs.flagIcon} alt="image" width={50} height={50} className="h-full w-full rounded-md" /> </div> : null
                                    }
                                </TableCell>
                                <TableCell>{contactUs.country}</TableCell>
                                <TableCell>{contactUs.contactDetails}</TableCell>
                                <TableCell>{contactUs.email}</TableCell>
                                <TableCell>{contactUs.address}</TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-center gap-2">
                                        <Button variant="secondary" size="icon" onClick={() => editEvent(contactUs)}>
                                            <Edit2 />
                                        </Button>
                                        <Button variant="destructive" size="icon" onClick={() => deleteData(contactUs._id || contactUs.id)}>
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

export default ContactUsCard;