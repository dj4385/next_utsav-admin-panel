"use client"

import ContentHeader from "@/components/ContentHeader/ContentHeader";
import { Gem, GemIcon, MapPinHouse } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import FullPageLoader from "@/components/Loader/FullPageLoader";
import { RealWeddingService } from "@/services/real-wedding.service";
import { FooterService } from "@/services/footer.service";


const FooterListing = () => {
    const [footer, setFooter] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const getFooterListing = async () => {
        try {
            setIsLoading(true);
            const res: any = await FooterService.getFooter();
          
            if (res && res.status == 200 && res?.data?.footerPage?.length) {
                setFooter(res?.data?.footerPage);
            } else {
                toast({
                    title: "Error",
                    description: res?.response?.data?.message || 'No Footer Found',
                    variant: "destructive",
                })
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.response?.data?.message || 'Something went wrong',
                variant: "destructive",
            })
        } finally {
            setIsLoading(false);
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
            setIsLoading(true);
            const res: any = await FooterService.deleteFooter(id);
            if (res && res.status == 200) {
                toast({
                    title: "Footer deleted successfully",
                    description: "Footer deleted successfully",
                })
                getFooterListing();
            } else {
                toast({
                    title: "Error",
                    description: res?.response?.data?.message || 'Unable to delete footer',
                    variant: "destructive",
                })
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.response?.data?.message || 'Something went wrong',
                variant: "destructive",
            })
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getFooterListing()
    }, [])

    return (
        <>
            {isLoading && <FullPageLoader />}
            <div className="flex flex-col rounded-lg bg-gray-50 p-2">
                <div className="w-full">
                    <ContentHeader title="Footer Listing" icon={<Gem />} buttonLabel="Add Footer" buttonIcon={<GemIcon />} onBtnClick={() => addFooter()} />
                </div>
                <div className="py-4">
                    <Table className="rounded-md">
                        <TableHeader>
                            <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
                                <TableHead className="text-white">S.No</TableHead>
                                <TableHead className="text-white">Logo</TableHead>
                                <TableHead className="text-white">Social Links</TableHead>
                                <TableHead className="text-white">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {footer.map((data, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        {data?.logo ? <div className="h-[50px] w-[50px]"> <Image src={data?.logo} alt="icon" className="h-full w-full rounded-md" width={50} height={50} /> </div> : null}
                                    </TableCell>
                                    <TableCell>
                                        {data?.socialLinks?.facebook ? <a href={data?.socialLinks?.facebook} target="_blank" rel="noopener noreferrer">Facebook</a> : null}
                                        {data?.socialLinks?.instagram ? <a href={data?.socialLinks?.instagram} target="_blank" rel="noopener noreferrer">Instagram</a> : null}
                                        {data?.socialLinks?.twitter ? <a href={data?.socialLinks?.twitter} target="_blank" rel="noopener noreferrer">Twitter</a> : null}
                                        {data?.socialLinks?.linkedin ? <a href={data?.socialLinks?.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> : null}
                                        {data?.socialLinks?.youtube ? <a href={data?.socialLinks?.youtube} target="_blank" rel="noopener noreferrer">Youtube</a> : null}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center gap-2">
                                            <Button variant="secondary" size="icon" onClick={() => edit(data)}>
                                                <Edit2 />
                                            </Button>
                                            <Button variant="destructive" size="icon" onClick={() => deleteData(data._id)}>
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
        </>
    )
}

export default FooterListing;
