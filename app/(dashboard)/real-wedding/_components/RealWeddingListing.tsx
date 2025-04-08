"use client"

import ContentHeader from "@/components/ContentHeader/ContentHeader";
import { VenueService } from "@/services/venue.service";
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

const ITEMS_PER_PAGE = 10;

const RealWeddingListing = () => {
    const [realWeddings, setRealWeddings] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const getRealWeddingListing = async () => {
        try {
            setIsLoading(true);
            const res: any = await RealWeddingService.getRealWedding();
          
            if (res && res.status == 200 && res.data.data) {
                setRealWeddings(res.data.data);
            } else {
                toast({
                    title: "Error",
                    description: res?.response?.data?.message || 'No Real Wedding Found',
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


    const addRealWedding = () => {
        router.push('/real-wedding/add-real-wedding')
    }

    const edit = (data: any) => {
        router.push(`/real-wedding/update-real-wedding/${data._id}`)
    }

    const deleteData = async (id: string) => {
        try {
            setIsLoading(true);
            const res: any = await RealWeddingService.deleteRealWedding(id);
            if (res && res.status == 200) {
                toast({
                    title: "Real Wedding deleted successfully",
                    description: "Real Wedding deleted successfully",
                })
                getRealWeddingListing();
            } else {
                toast({
                    title: "Error",
                    description: res?.response?.data?.message || 'Unable to delete real wedding',
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
        getRealWeddingListing()
    }, [])

    return (
        <>
            {isLoading && <FullPageLoader />}
            <div className="flex flex-col rounded-lg bg-gray-50 p-2">
                <div className="w-full">
                    <ContentHeader title="Real Wedding Listing" icon={<Gem />} buttonLabel="Add Real Wedding" buttonIcon={<GemIcon />} onBtnClick={() => addRealWedding()} />
                </div>
                <div className="py-4">
                    <Table className="rounded-md">
                        <TableHeader>
                            <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
                                <TableHead className="text-white">S.No</TableHead>
                                <TableHead className="text-white">Image</TableHead>
                                <TableHead className="text-white">Name</TableHead>
                                <TableHead className="text-white">Design Style</TableHead>
                                <TableHead className="text-white">Photographer</TableHead>
                                <TableHead className="text-white">Theme Name</TableHead>
                                <TableHead className="text-white">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {realWeddings.map((data, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        {data?.gallery?.length ? <div className="h-[50px] w-[50px]"> <Image src={data?.gallery?.filter((gallery: any) => gallery.type == 'image')[0]?.images} alt="icon" className="h-full w-full rounded-md" width={50} height={50} /> </div> : null}
                                    </TableCell>
                                    <TableCell>{data.venue_name}</TableCell>
                                    <TableCell>{data.design_style}</TableCell>
                                    <TableCell>{data.photographer}</TableCell>
                                    <TableCell>{data.wedding_theme_name}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center">
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

export default RealWeddingListing;
