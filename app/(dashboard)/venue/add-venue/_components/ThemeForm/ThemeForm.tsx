"use client"

import { CirclePlus, Edit2, Palette, Trash2 } from "lucide-react";
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
import { IThemeForm } from "@/app/types/components/Venue";
import { setVenueThemeListItem, setVenueThemeModal } from "@/lib/features/venue/VenueThemeSlice";
import { IThemes } from "@/app/types/api/request/venue.request";

const ThemeForm = ({
    setThemeFormList,
    themeFormList
}: IThemeForm) => {

    const dispatch = useAppDispatch();
    const { themeModalList } = useAppSelector((state) => state.VenueThemeSlice)

    const openModal = () => {
        dispatch(setVenueThemeModal(true));
    }

    const editModal = (data: IThemes) => {
        dispatch(setVenueThemeListItem(data))
        openModal();
    }

    const deleteData = (id: string | undefined) => {
        if(!id) {
            return;
        }
        const data = themeFormList.filter((d) => d._id !== id);
        setThemeFormList(data);
    }

    useEffect(() => {
        if(themeModalList?.length) {
            if(themeModalList[0]._id) {
                const data = themeFormList.map((d) =>
                    d._id == themeModalList[0]._id ? {
                        ...d,
                        isWide: themeModalList[0].name,
                        alt: themeModalList[0].description,
                        theme_img_gallery: themeModalList[0].theme_img_gallery,
                    } : d
                );
                setThemeFormList([...data]);
            } else {
                setThemeFormList([...themeFormList, ...themeModalList])
            }
        }
    }, [themeModalList])

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 p-2 bg-purple-700 text-white items-center text-lg font-medium mb-3"> <Palette /> Theme</h2>
            <div className="p-2">
                <div className="flex justify-end items-center mb-2">
                    <Button variant="secondary" className="bg-purple-600 text-white hover:bg-purple-800" onClick={() => openModal()}>
                        <CirclePlus /> Add Theme
                    </Button>
                </div>
                <Table className="rounded-md">
                    <TableHeader>
                        <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
                            <TableHead className="text-white">Image</TableHead>
                            <TableHead className="text-white">Theme Name</TableHead>
                            <TableHead className="text-white">Tab Name</TableHead>
                            <TableHead className="text-white">Description</TableHead>
                            <TableHead className="text-white text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {themeFormList.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {
                                        item?.theme_img_gallery?.length ? <div className="h-[50px] w-[50px]"> <Image src={item?.theme_img_gallery[0]?.images} alt="image" width={50} height={50} className="h-full w-full rounded-md" /> </div> : null
                                    }
                                </TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.description}</TableCell>
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

export default ThemeForm;
