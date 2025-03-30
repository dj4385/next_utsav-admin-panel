"use client"

import { ITestimonial, ITestimonialData, ITestimonialList } from "@/app/types/components/Home";
import { Input } from "@/components/ui/input";
import { CirclePlus, Edit2, Home, Trash2 } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setTestimonialModal } from "@/lib/features/TestimonialSlice";

const Testimonial = ({
    setTestimonialData,
    testimonialData,
    setTestimonialList,
    testimonialList
}: ITestimonial) => {

    const [testimonialDataList, setTestimonialDataList] = useState<ITestimonialList[]>(testimonialList)
    const dispatch = useAppDispatch();
    const { testimonialModalList } = useAppSelector((state) => state.TestimonialSlice)

    const openModal = () => {
        dispatch(setTestimonialModal(true));
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setTestimonialData((prev: ITestimonialData) => ({
            ...prev,
            [name]: value,
        }));
    }

    useEffect(() => {
        if(testimonialModalList?.length) {
            setTestimonialDataList([...testimonialList, ...testimonialModalList])
            setTestimonialList([...testimonialList, ...testimonialModalList])
        }
    }, [testimonialModalList])

    useEffect(() => {
        if(testimonialList?.length) {
            setTestimonialDataList([...testimonialList])
        }
    }, [testimonialList])

    return (
        <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
            <h2 className="flex flex-row gap-2 items-center p-2 bg-purple-700 text-white text-lg font-medium mb-3"> <Home /> Testimonial Section</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Testimonial Section</label>
                    <Input type="text" placeholder="Enter Mission Heading" className="mt-1 w-full" onChange={handleChange} name="testimonial_section" value={testimonialData.testimonial_section} />
                </div>
            </div>
            <Separator className="mt-4" />
            <div className="p-2">
                <div className="flex justify-end items-center mb-2">
                    <Button variant="secondary" className="bg-purple-600 text-white hover:bg-purple-800" onClick={() => openModal()}>
                        <CirclePlus /> Add Testimonial
                    </Button>
                </div>
                <Table className="rounded-md">
                    <TableHeader>
                        <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
                            <TableHead className="text-white">Image</TableHead>
                            <TableHead className="text-white">Alt</TableHead>
                            <TableHead className="text-white">Client</TableHead>
                            <TableHead className="text-white">Text</TableHead>
                            <TableHead className="text-white">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {testimonialDataList.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {data && data.image ? <div className="h-[50px] w-[50px]"> <Image src={data.image} alt="icon" className="h-full w-full rounded-md" width={50} height={50} /> </div> : null}
                                </TableCell>
                                <TableCell>{data.alt}</TableCell>
                                <TableCell>{data.client}</TableCell>
                                <TableCell>{data.text}</TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-center gap-2">
                                        <Button variant="secondary" size="icon">
                                            <Edit2 />
                                        </Button>
                                        <Button variant="destructive" size="icon">
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

export default Testimonial;