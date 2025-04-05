"use client"

import ContentHeader from "@/components/ContentHeader/ContentHeader";
import { VenueService } from "@/services/venue.service";
import { MapPinHouse } from "lucide-react";
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
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const ITEMS_PER_PAGE = 10;

const VenueListing = () => {
    const [venues, setVenues] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { toast } = useToast();
    const router = useRouter();

    const getVenueListing = async (page: number = 1) => {
        try {
            const res: any = await VenueService.getVenues(page, ITEMS_PER_PAGE);
            console.log(res);
            
            if (res && res.status == 200 && res.data.data) {
                setVenues(res.data.data);
                setTotalPages(Math.ceil(res.data.pagination.totalRecords / ITEMS_PER_PAGE));
            } else {
                toast({
                    title: "Error",
                    description: res?.response?.data?.message || 'No Venue Found',
                    variant: "destructive",
                })
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.response?.data?.message || 'Something went wrong',
                variant: "destructive",
            })
        }
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        getVenueListing(page);
    }

    const addVenue = () => {
        router.push('/venue/add-venue')
    }

    const edit = (data: any) => {
        router.push(`/venue/update-venue/${data._id}`)
    }

    const deleteData = async (id: string) => {
        try {
            const res: any = await VenueService.deleteVenue(id);
            if (res && res.status == 200) {
                toast({
                    title: "Venue deleted successfully",
                    description: "Venue deleted successfully",
                })
                getVenueListing(currentPage);
            } else {
                toast({
                    title: "Error",
                    description: res?.response?.data?.message || 'Unable to delete venue',
                    variant: "destructive",
                })
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.response?.data?.message || 'Something went wrong',
                variant: "destructive",
            })
        }
    }

    useEffect(() => {
        getVenueListing()
    }, [])

    const renderPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;
        const halfVisible = Math.floor(maxVisiblePages / 2);
        
        let startPage = Math.max(currentPage - halfVisible, 1);
        let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(endPage - maxVisiblePages + 1, 1);
        }

        // Add first page
        if (startPage > 1) {
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
                </PaginationItem>
            );
            if (startPage > 2) {
                items.push(
                    <PaginationItem key="ellipsis1">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
        }

        // Add pages
        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink 
                        isActive={currentPage === i}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Add last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                items.push(
                    <PaginationItem key="ellipsis2">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
            items.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink onClick={() => handlePageChange(totalPages)}>
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return items;
    };

    return (
        <div className="flex flex-col rounded-lg bg-gray-50 p-2">
            <div className="w-full">
                <ContentHeader title="Venue Listing" icon={<MapPinHouse />} buttonLabel="Add Venue" buttonIcon={<MapPinHouse />} onBtnClick={() => addVenue()} />
            </div>
            <div className="py-4">
                <Table className="rounded-md">
                    <TableHeader>
                        <TableRow className="bg-purple-600 hover:bg-purple-600 text-white">
                            <TableHead className="text-white">Image</TableHead>
                            <TableHead className="text-white">Name</TableHead>
                            <TableHead className="text-white">Type</TableHead>
                            <TableHead className="text-white">Capacity</TableHead>
                            <TableHead className="text-white">AQI</TableHead>
                            <TableHead className="text-white">Google Rating</TableHead>
                            <TableHead className="text-white">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {venues.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {data?.gallery?.length ? <div className="h-[50px] w-[50px]"> <Image src={data?.gallery[0]?.images} alt="icon" className="h-full w-full rounded-md" width={50} height={50} /> </div> : null}
                                </TableCell>
                                <TableCell>{data.venue_name}</TableCell>
                                <TableCell>{data.venue.property_type}</TableCell>
                                <TableCell>{data.venue.capacity}</TableCell>
                                <TableCell>{data.venue.air_quality_index}</TableCell>
                                <TableCell>{data.venue.google_rating}</TableCell>
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
                {totalPages > 1 && (
                    <div className="mt-4 flex justify-end">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious 
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        aria-disabled={currentPage === 1}
                                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                    />
                                </PaginationItem>
                                {renderPaginationItems()}
                                <PaginationItem>
                                    <PaginationNext 
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        aria-disabled={currentPage === totalPages}
                                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
        </div>
    )
}

export default VenueListing;
