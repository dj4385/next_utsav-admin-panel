
"use client"

import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Gem, GemIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import { FooterService } from "@/services/footer.service";
import { useRouter } from "next/navigation";
import ContentHeader from "@/components/ContentHeader/ContentHeader";


const FooterList = () => {
    const [footerList, setFooterList] = useState<any[]>([])
    const { toast } = useToast();
    const router = useRouter();

    const getFooterList = async () => {
        try {
            const res: any = await FooterService.getFooter();
            if (res && res.status == 200 && res?.data?.data?.footerPage?.length) {
                setFooterList(res.data.data.footerPage)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const addFooter = () => {
        router.push('/footer/add-footer')
    }

    const edit = (data: any) => {
        router.push(`/footer/update-footer/${data._id}`)
    }

    const deleteData = async (id: string) => {
        try {
            const res: any = await FooterService.deleteFooter(id);
            if (res && res.status) {
                toast({
                    title: "Success",
                    description: "Footer deleted successfully",
                })
                getFooterList();
            } else {
                toast({
                    title: "Error",
                    description: "Unable to delete footer",
                    variant: "destructive",
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive",
            })
        }
    }

    useEffect(() => {
        getFooterList();
    }, [])


    return (
        <div className="flex flex-col rounded-lg bg-gray-50 p-2">
            <div className="w-full mb-4">
                <ContentHeader title="Footer Listing" icon={<Gem />} buttonLabel="Add Footer" buttonIcon={<GemIcon />} onBtnClick={() => addFooter()} />
            </div>

            <div className="border-[2px] rounded-lg overflow-hidden w-full bg-white">
                <div className="p-2">
                    <Table className="rounded-md">
                        <TableHeader>
                            <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
                                <TableHead className="text-white">S.No</TableHead>
                                <TableHead className="text-white">Image</TableHead>
                                <TableHead className="text-white">Contact Count</TableHead>
                                <TableHead className="text-white">Popular Links Count</TableHead>
                                <TableHead className="text-white">Social Links Count</TableHead>
                                <TableHead className="text-white text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {footerList?.length ? footerList.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        {item?.logo ? <div className="h-[50px] w-[50px]"> <Image src={item?.logo} className="h-full w-full rounded-md" alt="location" width={50} height={50} /> </div> : null}
                                    </TableCell>
                                    <TableCell>{item?.contactUs?.length || 0}</TableCell>
                                    <TableCell>{item?.popularLinks?.length || 0}</TableCell>
                                    <TableCell>
                                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
                                            <span className="bg-purple-500 text-white rounded-md p-2">{item?.socialLinks?.facebook}</span>
                                            <span className="bg-purple-500 text-white rounded-md p-2">{item?.socialLinks?.instagram}</span>
                                            <span className="bg-purple-500 text-white rounded-md p-2">{item?.socialLinks?.twitter}</span>
                                            <span className="bg-purple-500 text-white rounded-md p-2">{item?.socialLinks?.linkedin}</span>
                                            <span className="bg-purple-500 text-white rounded-md p-2">{item?.socialLinks?.youtube}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="destructive" size="icon" onClick={() => deleteData(item._id)}>
                                                <Trash2 />
                                            </Button>
                                        </div>

                                    </TableCell>
                                </TableRow>
                            )) : null}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default FooterList;