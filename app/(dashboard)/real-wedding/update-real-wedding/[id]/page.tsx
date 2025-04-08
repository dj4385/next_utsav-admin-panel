'use client';

import { useParams } from "next/navigation";
import UpdateVenueForm from "./_components/UpdateRealWeddingForm";
//add aman m
const UpdateVenuePage = () => {
    
    const params = useParams() ;
    const id = params.id as string;

    return (
        <UpdateVenueForm id={id} />
    )
}

export default UpdateVenuePage;